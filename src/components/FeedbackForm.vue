<script setup>
const props = defineProps(["receiver"]);
</script>
<template>
  <div class="flex flex-col bg-slate-300 m-2 p-3" tabindex="0">
    <label class="text-base">Say something nice about {{ receiver.firstName }}</label>
    <textarea> </textarea>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-100 ml-auto">Submit</button>
  </div>
</template>