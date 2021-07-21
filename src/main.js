import { createApp } from "vue";
import App from "./views/Main.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import Vue3DraggableResizable from "./components/vue3-draggable-resizable2/index";
import "./components/vue3-draggable-resizable2/Vue3DraggableResizable.css";

//createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(Vue3DraggableResizable);
app.config.globalProperties.$echarts = echarts;

app.mount("#app");
