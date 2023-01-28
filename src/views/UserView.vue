<script>
import { reactive, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { loadUser, loadFeedback } from "../data";
import FeedbackItem from "../components/FeedbackItem.vue";
import FeedbackForm from "../components/FeedbackForm.vue";

export default defineComponent({
  components: { FeedbackItem, FeedbackForm },
  setup() {
    const route = useRoute();
    const user = reactive({}),
      feedback = reactive([]),
      loadData = async () => {
        const id = route.params.userId;
        const result = await loadUser(id);
        const feedbackFor = await loadFeedback({ receiver: id });
        Object.assign(user, result);
        feedback.splice(0, feedback.length)
        feedback.push(...feedbackFor);
      };
    watch(route, () => loadData())
    return {
      loadData,
      user,
      feedback,
    };
  },
  mounted() {
    this.loadData();
  },
});
</script>

<template>
  <div>
    <figure
      class="
        w-full
        flex flex-col
        items-center
        rounded-lg
        p-6
        dark:bg-slate-800 dark:highlight-white/5
      "
    >
      <figcaption class="flex flex-col items-center space-x-4">
        <img
          :src="user.avatar"
          alt=""
          class="flex-none w-48 h-48 rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div class="flex-auto">
          <div
            class="text-base text-slate-900 font-semibold dark:text-slate-300"
          >
            <h1 class="text-3xl">{{ user.firstName }} {{ user.lastName }}</h1>
          </div>
        </div>
      </figcaption>
    </figure>
    <FeedbackForm :receiver="user"/>
    <h2 class="text-2xl" v-if="feedback.length">
      What others have said about {{ user.firstName }} {{ user.lastName }}:
    </h2>
    <h2 class="text-2xl" v-else>
      Nobody has said anything about {{ user.firstName }} {{ user.lastName }} just yet. Be the first one!
    </h2>
    <div class="flex">
      <!-- <pre>{{JSON.stringify(feedback, null, 2)}}</pre> -->
      <FeedbackItem v-for="item in feedback" :key="item.id" 
        :feedback="item"
        :receiver="user"/>
    </div>
  </div>
</template>

<style>
</style>
