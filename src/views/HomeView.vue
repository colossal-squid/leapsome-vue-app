<script>
import { defineComponent, reactive } from "vue";
import { storeToRefs } from "pinia";
import router from '../router';
import { loadFeedback } from "../data";
import { useUserStore } from "../store";
import FeedbackItem from "../components/FeedbackItem.vue";
import UserLookup from "../components/UserLookup.vue";
import CoreButton from "../components/CoreButton.vue";

export default defineComponent({
  components: { FeedbackItem, CoreButton, UserLookup },
  setup() {
    const store = useUserStore();
    const { user } = storeToRefs(store);
    return {
      user,
      recentFeedback: reactive([]),
      onUserSelect: (selected) => {
        router.push(`/user/${selected.id}`);
      },
      loadFeedback,
    };
  },
  async mounted() {
    const feedback = await this.loadFeedback({ receiver: this.user?.id });
    if (feedback.length > 3) {
      // i only want to show 3, so..
      feedback.splice(3, feedback.length - 3)
    }
    this.recentFeedback.push(
      ...(feedback)
    );
  },
});
</script>

<template>
  <main>
    <section class="mx-2" v-if="user">
      <p class="text-3xl mb-4">Hello, {{ user.firstName }}!</p>
      <p v-if="recentFeedback.length" class="text-xl mb-2">
        Here's what people have been saying about you recently!
      </p>
      <div v-if="recentFeedback.length" class="flex flex-row flex-wrap">
        <FeedbackItem
          v-for="item in recentFeedback"
          :key="item.id"
          :feedback="item"
          :receiver="user"
        />
      </div>
      <p class="text-xl mb-2">
        How about giving some useful feedback to fellow co-workers?
      </p>
      <p class="text-xl mb-2">
        Click on anyone to say a few nice works about them or press the big plus button in top right corner.
      </p>
      <UserLookup @select-user="onUserSelect"/>
        <CoreButton class="rounded-full w-1 text-center text-2xl m-auto flex-col absolute top-20 right-8" link="true" to="/feedback/">+</CoreButton>
    </section>
  </main>
</template>
