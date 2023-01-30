<script setup>
defineProps(["user"]);
</script>

<template>
  <section class="flex flex-row h-16 w-screen bg-slate-800">
    <h3 class="text-lg text-slate-50 flex font-semibold items-center mx-6">
        <a href="/">🏘️ home</a>
    </h3>
    <div class="flex w-90 items-center ml-auto mr-6" v-if="user">
        <div class="text-slate-100 dark:text-slate-100">Logged in as</div>
        <img :src="user.avatar" :alt="user.name" class="w-9 h-9 rounded-full bg-slate-100 ring-2 ring-white mx-2" loading="lazy"/>
        <router-link :to="'/user/' + user.id" class="text-sky-500 dark:text-sky-400">
            {{user.firstName}} {{user.lastName}}
        </router-link>
    </div>
  </section>
</template>

<style scoped>

</style>
