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
  <section class="container w-full">
    <CoreHeader :user="user"/>
    <RouterView v-if="user" class="mx-6 my-6 w-full" />
    <!-- little skeleton for loading. blink and you'll miss it-->
    <section class="flex flex-row flex-wrap h-48 m-4 w-screen" v-else>
      <section class="w-96 animate-pulse bg-gray-300 h-48 ml-2 mb-2" v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="i">
      </section>
    </section>
  </section>
</template>

<style scoped>

</style>
