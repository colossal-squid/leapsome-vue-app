import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from "./store";
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
const { setLastError } = useUserStore();
app.config.errorHandler = (err, vm, info) => {
    setLastError(err);
    router.push('/error');
};
