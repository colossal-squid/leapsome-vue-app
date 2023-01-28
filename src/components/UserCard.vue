<script setup>
const props = defineProps(["user"]);
</script>
<template>
  <router-link class="flex flex-row bg-slate-300 m-2 p-3 items-center" :to="'/user/' + user.id" tabindex="0">
    <img
      :src="user.avatar"
      alt=""
      class="flex-none w-14 h-14 rounded-full object-cover m-2"
      loading="lazy"
      decoding="async"
    />
    <div
      class="
        flex-auto
        text-base text-slate-900
        font-semibold
        dark:text-slate-300
      "
    >
      {{ user.firstName }}
      {{ user.lastName }} ({{ user.id }})
    </div>
  </router-link>
</template>