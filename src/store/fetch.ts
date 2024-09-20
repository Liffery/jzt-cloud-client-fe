import { defineStore } from "pinia";

type loadingConfig = {
  [key: string]: boolean;
};

export const useFetchStore = defineStore({
  id: "fetch",
  state: () => ({
    loading: {} as loadingConfig,
  }),
  getters: {
    getLoading: (state) => (key: string) => !!state.loading[key],
  },
  actions: {
    setLoading(key: string, value: boolean) {
      this.loading[key] = value;
    },
  },
});
