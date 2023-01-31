<script setup>
defineProps(["user"]);
</script>
<template>
  <router-link :to="'/user/' + user.id">
    <img
      :src="user.avatar"
      :alt="'photo of ' + user.firstName + ' ' + user.lastName"
      class="flex-none w-12 h-12 rounded-full object-cover m-2"
      loading="lazy"
      decoding="async"
      :title="user.firstName + ' ' + user.lastName"
    />
  </router-link>
</template>