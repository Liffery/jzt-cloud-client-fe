import { createApp } from "vue";
import { setupStore } from "/@/store/index";
import { router, setupRouter, setupRouterGuard } from "/@/router";
import "ant-design-vue/dist/antd.less";
import "./styles/index.less";
import "/@/assets/fonts/font.css";
import "./style.css";
import App from "./App.vue";

async function setup() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  setupRouterGuard(router);
  await router.isReady();
  app.mount("#app");
}
setup();
