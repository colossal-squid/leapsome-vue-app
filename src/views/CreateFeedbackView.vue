<script>
import { defineComponent, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useUserStore } from "../store";
import { loadUser, createFeedback } from "../data";
import router from "../router";
import CoreButton from "../components/CoreButton.vue";
import FeedbackForm from "../components/FeedbackForm.vue";
import UserLookup from "../components/UserLookup.vue";

export default defineComponent({
  components: { CoreButton, FeedbackForm, UserLookup },
  setup() {
    const route = useRoute();
    const store = useUserStore();
    const { user } = storeToRefs(store);
    const receivers = reactive(new Set()),
      expandLookup = ref(false),
      feedback = reactive({
        title: "",
        body: "",
      }),
      isSelected = (user) => {
        return Array.from(receivers.values()).find((v) => v.id === user.id);
      },
      addReceiver = (user) => {
        if (!isSelected(user)) {
          receivers.add(user);
        }
      },
      removeReceiver = (user) => {
        const value = Array.from(receivers.values()).find(
          (v) => v.id === user.id
        );
        receivers.delete(value);
      },
      loadData = async () => {
        // pre-selected user
        const id = route.params.userId;
        if (id) {
          const result = await loadUser(id);
          receivers.add(result);
          expandLookup.value = false;
        } else {
          expandLookup.value = true;
        }
      };
    watch(route, () => loadData());
    return {
      addReceiver,
      expandLookup,
      feedback,
      loadData,
      isSelected,
      receivers,
      removeReceiver,
      toggleLookup: () => (expandLookup.value = !expandLookup.value),
      sendFeedback: async () => {
        const receiverIds = Array.from(receivers).map((r) => r.id);
        const { title, body } = feedback;
        const response = await createFeedback({ title, body, receiverIds });
        router.push(`/feedback/${response.id}`);
      },
      user,
    };
  },
  mounted() {
    this.loadData();
  },
});
</script>

<template>
  <div class="w-full">
    <h1 class="text-4xl mb-4">Create new feedback</h1>
    <section class="flex items-center">
      <img
        v-if="user"
        :src="user.avatar"
        alt=""
        class="flex-none w-14 h-14 rounded-full object-cover m-2"
        loading="lazy"
        decoding="async"
      />
      <span class="text-base"> says about </span>
      <TransitionGroup tag="div" class="flex flex-row">
        <div class="relative" v-for="receiver in receivers" :key="receiver.id">
          <img
            :src="receiver.avatar"
            alt=""
            class="flex-none w-14 h-14 rounded-full object-cover m-2"
            :class="{ selected: isSelected(receiver) }"
            loading="lazy"
            decoding="async"
          />
          <CoreButton
            @click="removeReceiver(receiver)"
            class="
              absolute
              top-1
              right-1
              h-1
              bg-red-500
              hover:bg-red-700
              focus:bg-red-700
              active:bg-red-800
              rounded-full
              text-center
              px-2
            "
            >x</CoreButton
          >
        </div>
      </TransitionGroup>
      <CoreButton
        key="show"
        class="ml-2"
        v-if="!expandLookup"
        @click="toggleLookup"
        >Show user lookup</CoreButton
      >
      <CoreButton
        key="hide"
        class="ml-2"
        v-else-if="expandLookup && receivers.size !== 0"
        @click="toggleLookup"
        >Hide user lookup</CoreButton
      >
    </section>
    <UserLookup v-if="expandLookup" class="mt-4" :is-selected="isSelected" @select-user="addReceiver" />
    <Transition>
      <FeedbackForm
        v-if="receivers && receivers.size"
        v-model="feedback"
        @post="sendFeedback"
        :receivers="Array.from(receivers)"
      />
    </Transition>
  </div>
</template>
<style scoped>
.selected {
  filter: sepia(0.2);
}
</style>