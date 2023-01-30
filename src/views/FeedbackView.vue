<script>
import { defineComponent, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useUserStore } from "../store";
import { loadUser, createFeedback } from "../data";
import router from "../router";
import FeedbackForm from "../components/FeedbackForm.vue";
import UserList from "../components/UserList.vue";

export default defineComponent({
  components: { FeedbackForm },
  setup() {
    const route = useRoute();
    const store = useUserStore();
    const { user } = storeToRefs(store);
    const receiver = reactive({}),
      feedback = reactive({
        title: "",
        body: "",
      }),
      loadData = async () => {
        const id = route.params.userId;
        const result = await loadUser(id);
        Object.assign(receiver, result);
      };
    watch(route, () => loadData());
    return {
      feedback,
      loadData,
      receiver,
      sendFeedback: async () => {
        const receiverIds = [Number(route.params.userId)];
        const { title, body } = feedback;
        await createFeedback({ title, body, receiverIds });
        router.push(`/user/${route.params.userId}`);
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
    <section class="flex">
      <img
        v-if="user"
        :src="user.avatar"
        alt=""
        class="flex-none w-14 h-14 rounded-full object-cover m-2"
        loading="lazy"
        decoding="async"
      />
      <Transition>
        <img
          v-if="receiver && receiver.avatar"
          :src="receiver.avatar"
          alt=""
          class="flex-none w-14 h-14 rounded-full object-cover m-2"
          loading="lazy"
          decoding="async"
        />
      </Transition>
    </section>

    <Transition>
      <FeedbackForm
        v-if="receiver && receiver.avatar"
        v-model="feedback"
        @post="sendFeedback"
        :receiver="receiver"
      />
    </Transition>
  </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.9s ease;
  transform: translateY(0);
  opacity: 1;
}

.v-enter-from {
  transform: translateX(-20px);
}
.v-enter-active .v-leave-to {
  opacity: 0;
}
</style>