<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>
<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ref, onBeforeMount } from "vue";
import { getUserInfoApi } from "/@/api/user";
import { useUserStore } from "/@/store/user";
import { localStorage } from "/@/utils/use";
import { TOKEN_KEY } from "/@/constant/AppEnum";
const userStore = useUserStore();
const locale = ref(zhCN);
onBeforeMount(async () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    getUserInfoApi().then((res) => {
      userStore.setUserInfo(res.data);
    });
  }
});
</script>
<style style="less">
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  width: 6px;
  opacity: 0;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.3);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}
</style>
