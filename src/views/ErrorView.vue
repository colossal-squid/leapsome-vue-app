<script>
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store";
import CoreButton from '../components/CoreButton.vue';

export default defineComponent({
  components: { CoreButton },
  setup() {
    const store = useUserStore();
    const { lastError } = storeToRefs(store);
    return { lastError };
  },
});
</script>

<template>
  <div class="w-full h-full mx-6 my-6 flex flex-col items-center">
    <span class="big-emoji">😔</span>
    <h1 class="text-base text-4xl">An error has occurred</h1>
    <CoreButton class="my-4" link="true" to="/">Go Back Home</CoreButton>
    <span class="text-slate-800 mt-2">I wouldn't show this to a regular user, but somehow I believe you'll understand it just fine</span>
    <pre v-if="lastError && lastError.message" class="text-red-500">{{ lastError.message }}</pre>
    <pre v-if="lastError && lastError.stack" class="text-red-500">{{ lastError.stack }}</pre>
  </div>
</template>
<style scoped>
.big-emoji {
  font-size: 8em;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.9s ease;
  transform: translateY(0);
  opacity: 1;
}

.v-enter-from {
  transform: translateX(-20px);
}
.v-enter-active .v-leave-to {
  opacity: 0;
}
</style>