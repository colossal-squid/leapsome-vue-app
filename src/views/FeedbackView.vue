<script>
import { defineComponent, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { loadFeedback } from "../data";
import FeedbackItem from "../components/FeedbackItem.vue";
import CoreButton from "../components/CoreButton.vue";

export default defineComponent({
  components: { CoreButton, FeedbackItem },
  setup() {
    const route = useRoute(),
      feedback = reactive({}),
      loadData = async () => {
        const result = await loadFeedback({ id: route.params.feedbackId });
        Object.assign(feedback, result);
      };
    watch(route, () => loadData());
    return {
      loadData,
      route,
      feedback,
    };
  },
  mounted() {
    this.loadData();
  },
});
</script>

<template>
  <div class="w-full h-full mx-6 my-6 flex flex-col items-center">
    <FeedbackItem expanded="true" v-if="feedback.id" :feedback="feedback" />
    <CoreButton class="my-4" link="true" to="/">Go Back Home</CoreButton>
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