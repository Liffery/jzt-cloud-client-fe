<template>
  <a-alert
    message="您的服务已经到期，继续使用服务请前往充值续费"
    type="warning"
    closable
    @close="onClose"
    style="width: 100%"
    v-if="isExpire === true"
  />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "/@/store/user";
const userStore = useUserStore();
const isExpire = computed(() => {
  return userStore.getUserInfo?.isExpire;
});
const onClose = (e: MouseEvent) => {
  console.log(e, "I was closed.");
};
</script>
<style lang="less" scoped></style>
