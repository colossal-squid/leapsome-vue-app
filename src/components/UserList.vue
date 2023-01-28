<script setup>
import UserCard from './UserCard.vue'
defineProps(['users'])
</script>

<template>
  <section class="flex flex-row flex-wrap">
    <UserCard v-for="user in users" :key="user.id" :user="user"/>
  </section>
</template>

<style scoped>

</style>
