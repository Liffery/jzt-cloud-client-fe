import { defineStore } from "pinia";
import { RouteRecordName } from "vue-router";

export const useKeepAliveStore = defineStore({
  id: "KeepAlive",
  state: () => ({
    tagNames: [] as string[],
  }),
  getters: {
    getTagNames: (state) => state.tagNames,
  },
  actions: {
    setTagName(value) {
      this.tagNames = value;
    },
    addTagName(value) {
      this.tagNames = [...this.tagNames, value];
    },
    clearTagName() {
      this.tagNames = [];
    },
  },
});
