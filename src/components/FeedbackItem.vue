<script setup>
import CoreAvatar from "./CoreAvatar.vue";
defineProps(["feedback", "receiver"]);
</script>
<template>
  <div
    v-if="feedback"
    class="flex flex-col bg-slate-300 mr-2 mb-2 p-3 items-center"
    tabindex="0"
  >
    <router-link
      :to="'/feedback/' + feedback.id"
      class="flex flex-row items-center mr-auto min-w-fit overflow-x-hidden"
    >
      <img
        :src="feedback.author.avatar"
        alt=""
        class="flex-none w-12 h-12 rounded-full object-cover m-2"
        loading="lazy"
        decoding="async"
      />
      <router-link
        :to="'/user/' + feedback.author.id"
        class="
          text-sky-500
          dark:text-sky-400
          font-semibold
          dark:text-slate-300
          p-1
        "
      >
        {{ feedback.author.firstName }}
      </router-link>
      <span class="text-base p-1 min-w-fit">said about</span>
      <template v-if="receiver">
        <!-- receiver was passed, so we show only him + N more-->
        <span>{{ receiver.firstName }} </span>
        <img
          :src="receiver.avatar"
          alt=""
          class="flex-none w-12 h-12 rounded-full object-cover m-2"
          loading="lazy"
          decoding="async"
          :title="receiver.firstName + ' ' + receiver.lastName"
        />
        <span
          v-if="feedback.receivers.length > 1"
          class="text-base min-w-fit text-ellipsis"
        >
          + {{ feedback.receivers.length }} more
        </span>
      </template>
      <template v-else>
        <CoreAvatar
          v-for="receiver in feedback.receivers"
          :key="receiver.id"
          :user="receiver"
        />
      </template>
    </router-link>
    <div class="bg-slate-200 flex-auto mx-2 px-1 w-full">
      <p class="text-xl mb-3">{{ feedback.title }}</p>
      <p class="text">
        {{ feedback.body }}
      </p>
    </div>
  </div>
</template>