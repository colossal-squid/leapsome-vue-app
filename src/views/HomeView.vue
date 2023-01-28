<script>
import { defineComponent, reactive } from "vue";
import { storeToRefs } from "pinia";
import { findUsers, loadFeedback } from "../data";
import { useUserStore } from "../store";
import UserList from "../components/UserList.vue";
import FeedbackItem from "../components/FeedbackItem.vue";

export default defineComponent({
  components: { UserList, FeedbackItem },
  setup() {
    const store = useUserStore();
    const { user } = storeToRefs(store);
    return {
      user,
      users: reactive([]),
      recentFeedback: reactive([]),
      loadUsers: findUsers,
      loadFeedback
    };
  },
  async mounted() {
    this.users.push(...(await this.loadUsers()));
    this.recentFeedback.push(
      ...(await this.loadFeedback({ receiver: this.user.id }))
    );
  },
});
</script>

<template>
  <main>
    <section v-if="user">
      <p class="text-3xl">Hello, {{ user.firstName }}!</p>
      <p v-if="recentFeedback.length" class="text-xl">
        Here's what people have been saying about you recently!
      </p>
      <div v-if="recentFeedback.length" class="flex flex-row flex-wrap">
        <FeedbackItem
          v-for="item in recentFeedback"
          :key="item.id"
          :feedback="item"
        />
      </div>
      <p class="text-xl">How about giving some useful feedback to fellow co-workers?</p>
      <p class="text-xl">Click on anyone to say a few nice works about them!</p>
      <UserList :users="users" />
    </section>
  </main>
</template>
