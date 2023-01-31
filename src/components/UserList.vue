<script setup>
import UserCard from './UserCard.vue'
import CoreButton from './CoreButton.vue'
defineProps(['users', 'count', 'pageSize', 'page', 'isSelected'])
</script>

<template>
  <TransitionGroup tag="section" name="list" class="flex flex-row flex-wrap">
    <UserCard :class="{'selected': isSelected(user)}" v-for="user in users" :key="user.id" :user="user" @select="user => $emit('select', user)"/>
    <footer key="footer" class="flex w-full flex-row items-center justify-center">
      <CoreButton @click="$emit('back')">⬅️ Back</CoreButton>
      <p class="text-base px-3" v-if="users">Showing page {{page}} out of {{Math.trunc(count / pageSize)}}</p>
      <CoreButton @click="$emit('forward')">Forward ➡️</CoreButton>
    </footer>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}
.list-leave-active {
  transition: all 0 ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.selected {
  filter:opacity(0.8)
}
.selected:after {
  content: '✔️';
  padding: 2px 8px;
  border-radius: 50%;
  color: white;
  background: palegreen;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
