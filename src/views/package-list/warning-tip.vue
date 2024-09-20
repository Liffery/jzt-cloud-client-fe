<template>
  <a-alert
    type="warning"
    closable
    @close="onClose"
    style="width: 100%"
    v-if="isExpired || accountPasswordErrorFlag"
  >
    <template #description>
      <div class="tip-text-wrapper">
        <div>
          <exclamation-circle-filled
            style="color: #faad14; margin-right: 8px"
          />
        </div>
        <div>
          <div v-if="isExpired" class="tip-text">
            您的服务已经到期，请及时充值续费
          </div>
          <div v-if="accountPasswordErrorFlag" class="tip-text">
            店铺账号或密码错误，请及时修改以免影响人群包输出
          </div>
        </div>
      </div>
    </template>
  </a-alert>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "/@/store/user";
import { ExclamationCircleFilled } from "@ant-design/icons-vue";
const userStore = useUserStore();
const isExpired = computed(() => {
  return userStore.getUserInfo?.isExpired;
});
const accountPasswordErrorFlag = computed(() => {
  return userStore.getUserInfo?.accountPasswordErrorFlag;
});
const onClose = (e: MouseEvent) => {
  console.log(e, "I was closed.");
};
</script>
<style lang="less" scoped>
.tip-text-wrapper {
  display: flex;
}
.tip-text {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: Regular;
  text-align: left;
  color: rgba(0, 0, 0, 0.88);
  line-height: 22px;
}
.ant-alert-with-description.ant-alert-no-icon {
  padding: 8px;
}
</style>
