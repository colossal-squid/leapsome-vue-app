<script>
import { defineComponent, reactive, ref } from "vue";

import { findUsers } from "../data";
import UserList from "./UserList.vue";
import SearchBar from "./SearchBar.vue";
import CoreButton from "./CoreButton.vue";

export default defineComponent({
  components: { UserList, SearchBar, CoreButton },
  setup() {
    const pageSize = 20;
    const users = reactive([]);
    let pageNumber = ref(1);
    let usersCount = ref(0);
    const loadData = async (name = undefined) => {
      if (typeof name !== "string") {
        name = undefined;
      }
      const response = await findUsers(pageSize, pageNumber.value - 1, name);
      users.splice(0, users.length);
      users.push(...response.users);
      usersCount.value = response.count;
    };

    return {
      users,
      usersCount,
      pageSize,
      pageNumber,
      loadData,
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
          loadData(name);
        }
      },
    };
  },
  async mounted() {
      this.loadData();
  },
});
</script>

<template>
  <section class="mx-2">
    <SearchBar
      @search="search"
      :placeholder="'Type a name of somebody you know'"
    />
    <UserList
      @forward="userListForward"
      @back="userListBack"
      @select="user => $emit('select-user', user)"
      :count="usersCount"
      :page="pageNumber"
      :pageSize="pageSize"
      :users="users"
    />
    <CoreButton
      class="
        rounded-full
        w-1
        text-center text-2xl
        m-auto
        flex-col
        absolute
        top-20
        right-8
      "
      link="true"
      to="/feedback/"
      >+</CoreButton
    >
  </section>
</template>
