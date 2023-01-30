<script>
import { defineComponent, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { findUsers, loadFeedback } from "../data";
import { useUserStore } from "../store";
import UserList from "../components/UserList.vue";
import FeedbackItem from "../components/FeedbackItem.vue";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent({
  components: { UserList, FeedbackItem, SearchBar },
  setup() {
    const store = useUserStore();
    const { user } = storeToRefs(store);
    const pageSize = 20;
    const users = reactive([]);
    let pageNumber = ref(1);
    let usersCount = ref(0);
    const loadData = async (name = undefined) => {
      if (typeof name !== 'string') {
        name = undefined;
      }
      const response = await findUsers(pageSize, pageNumber.value - 1, name);
      users.splice(0, users.length);
      users.push(...response.users);
      usersCount.value = response.count;
    };
    return {
      user,
      users,
      usersCount,
      pageSize,
      pageNumber,
      recentFeedback: reactive([]),
      loadData,
      loadFeedback,
      async userListForward() {
        if (
          usersCount.value > 0 &&
          pageNumber.value < usersCount.value / pageSize
        ) {
          pageNumber.value++;
          await loadData();
        }
      },
      async userListBack() {
        if (pageNumber.value > 1) {
          pageNumber.value--;
          await loadData();
        }
      },
      search: (name) => {
        if (name && name.length) {
          loadData(name)
        }
      }
    };
  },
  async mounted() {
    await this.loadData();
    const recentFeedback = await this.loadFeedback({ receiver: this.user.id });
    if (recentFeedback.length > 3) {
      // i only want to show 3, so..
      recentFeedback.splice(3, recentFeedback.length - 3)
    }
    this.recentFeedback.push(
      ...(recentFeedback)
    );
  },
});
</script>

<template>
  <main>
    <section class="mx-2" v-if="user">
      <p class="text-3xl mb-4">Hello, {{ user.firstName }}!</p>
      <p v-if="recentFeedback.length" class="text-xl">
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
      <p class="text-xl">
        How about giving some useful feedback to fellow co-workers?
      </p>
      <p class="text-xl mb-2">
        Click on anyone to say a few nice works about them!
      </p>
      <SearchBar @search="search" :placeholder="'Type a name of somebody you know'" />
      <UserList
        @forward="userListForward"
        @back="userListBack"
        :count="usersCount"
        :page="pageNumber"
        :pageSize="pageSize"
        :users="users"
      />
    </section>
  </main>
</template>
