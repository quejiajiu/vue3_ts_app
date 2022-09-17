import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import 'lib-flexible/flexible'
import { vantPlugins } from "./utils/vant";
import "vant/lib/index.css";
import api from "./api";

const app = createApp(App);
app.config.globalProperties.$api = api;
vantPlugins.install(app);
app.use(router).mount('#app')
