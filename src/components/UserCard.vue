<script setup>
defineProps(["user"]);
</script>
<template>
  <div @click.stop="$emit('select', user)" class="flex flex-row bg-slate-300 mr-2 mb-2 p-3 items-center cursor-pointer" tabindex="0">
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
      {{ user.lastName }}
    </div>
  </div>
</template>