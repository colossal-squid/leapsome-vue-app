<script setup>
const props = defineProps(["feedback", "receiver"]);
</script>
<template>
  <div class="flex flex-col bg-slate-300 m-2 p-3 items-center" tabindex="0">
    <router-link
      :to="'/user/' + feedback.author.id"
      class="flex flex-row items-center mr-auto min-w-fit overflow-x-hidden"
    >
      <img
        :src="feedback.author.avatar"
        alt=""
        class="flex-none w-12 h-12 rounded-full object-cover m-2"
        loading="lazy"
        decoding="async"
      />
      <span
        class="
          text-sky-500
          dark:text-sky-400
          font-semibold
          dark:text-slate-300
          p-1
        "
      >
        {{ feedback.author.firstName }}
      </span>
      <span class="text-base p-1 min-w-fit">said about</span>
      <span>{{ receiver.firstName }} </span>
      <img
        :src="receiver.avatar"
        alt=""
        class="flex-none w-12 h-12 rounded-full object-cover m-2"
        loading="lazy"
        decoding="async"
      />
      <span v-if="feedback.receivers.length > 1" class="text-base min-w-fit text-ellipsis">
          + {{feedback.receivers.length}} more
      </span>
    </router-link>
    <div class="bg-slate-200 flex-auto mx-2 px-1">
      <p class="text-xl mb-3">{{ feedback.title }}</p>
      <p class="text">
        {{ feedback.body }}
      </p>
    </div>
  </div>
</template>