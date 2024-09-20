import { createPinia } from "pinia";
import { useFetchStore } from "./fetch";

const store = createPinia();
export function setupStore(app: any) {
  app.use(store);
  app.config.globalProperties.$store = useFetchStore();
}

//export { store };
