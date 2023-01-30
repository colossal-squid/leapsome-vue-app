<script>
import CoreHeader from './components/CoreHeader.vue'
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "./store";

export default defineComponent({
  components: {
    CoreHeader
  },
  setup() {
    const store = useUserStore();
    const { user } = storeToRefs(store);
    const { init } = store;
    const loadData = () => init();
    return {
      user,
      loadData
    };
  },
  created () {
    this.loadData()
  },
});
</script>

<template>
  <section class="container">
    <CoreHeader :user="user"/>
    <RouterView class="mx-6 my-6" />
  </section>
</template>

<style scoped>

</style>
