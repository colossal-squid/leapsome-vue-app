<script>
import CoreButton from "./CoreButton.vue";
import { computed } from "vue";
export default {
  components: { CoreButton },
  props: {
    modelValue: Object,
    receivers: Array,
  },
  setup(props, { emit }) {
    const feedback = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {
      feedback,
      onKeyDown: (event) => {
        if (
          event.key === "Enter" &&
          (event.metaKey || event.ctrlKey) &&
          feedback.value.title &&
          feedback.value.body
        ) {
          emit("post");
        }
      },
    };
  },
};
</script>
<template>
  <div class="flex flex-col bg-slate-300 m-2 p-3" tabindex="0">
    <label class="mb-2"> Title </label>
    <input
      :class="[
        'text-base',
        'mb-2',
        'border',
        { 'border-red-500': !feedback.title.length },
      ]"
      type="text"
      v-model="feedback.title"
    />
    <span v-if="!feedback.title.length" class="text-sm text-red-500 mb-2"
      >Can't be empty</span
    >
    <label class="text-base mb-2" v-if="receivers"
      >Something nice about <TransitionGroup name="list"><span class="mr-1" v-for="receiver in receivers" :key="receiver.id"> {{ receiver.firstName }},</span></TransitionGroup></label
    >
    <textarea
      @keydown="onKeyDown"
      :class="[
        'flex',
        'basis-48',
        'text-base',
        'mb-2',
        'border',
        { 'border-red-500': !feedback.body.length },
      ]"
      v-model="feedback.body"
    >
    </textarea>
    <span v-if="!feedback.body.length" class="text-sm text-red-500 mb-2"
      >Can't be empty</span
    >
        <span v-else class="text-sm text-slate-500 mb-2"
      >CMD+Enter ( CTRL+Enter) to send it!</span>
    <CoreButton
      :disabled="!feedback.title.length || !feedback.body.length"
      class="ml-auto mt-2"
      @click="$emit('post')"
    >
      Submit
    </CoreButton>
  </div>
</template>
<style scoped>

</style>