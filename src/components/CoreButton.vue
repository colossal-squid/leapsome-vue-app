<script setup>
defineProps(["link", "to", "disabled"]);
</script>
<template>
  <router-link
    :disabled="disabled"
    v-if="link"
    :to="to"
    class="
      inline-block
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      flex
      items-center
    "
  >
    <slot />
  </router-link>
  <button
    :disabled="disabled"
    v-else
    class="
      btn
      inline-block
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      flex
      items-center
    "
  >
    <slot />
  </button>
</template>
<style scoped>
* [disabled] {
    opacity: 0.5;
    pointer-events: none;
}
</style>