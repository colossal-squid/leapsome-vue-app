<script>
import { defineComponent, reactive, ref } from "vue";

import { findUsers } from "../data";
import UserList from "./UserList.vue";
import SearchBar from "./SearchBar.vue";

const NOOP = () => false;

export default defineComponent({
  components: { UserList, SearchBar },
  props: { isSelected: Function },
  setup(props) {
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
      isUserSelected: typeof props.isSelected === "function" ? props.isSelected : NOOP,
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
        } else {
          // clear search
          loadData();
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
      @select="(user) => $emit('select-user', user)"
      :count="usersCount"
      :is-selected="isUserSelected"
      :page="pageNumber"
      :pageSize="pageSize"
      :users="users"
    />
  </section>
</template>
