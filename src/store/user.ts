import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: undefined as Record<string, any> | undefined,
    selectedStoreInfo: undefined as Record<string, any> | undefined,
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
    getSelectedStoreInfo: (state) => state.selectedStoreInfo,
  },
  actions: {
    setUserInfo(userInfo: Record<string, any>) {
      this.userInfo = userInfo;
    },
    setSelectedStoreInfo(selectedStoreInfo: Record<string, any>) {
      this.selectedStoreInfo = selectedStoreInfo;
    },
  },
});
