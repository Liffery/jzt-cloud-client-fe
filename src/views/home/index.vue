<template>
  <div class="home">
    <a-spin :spinning="$store.getLoading('get&/dmp/user/detail')">
      <InitComp v-if="isAddedStore === 0"></InitComp>
      <div class="home-inner" v-else-if="isAddedStore === 1">
        <ServiceWarningComp></ServiceWarningComp>
        <div class="home-inner-task-list" v-if="taskListVisible">
          <TaskListComp></TaskListComp>
        </div>
        <GuideComp v-model:visible="guideVisible"></GuideComp>
      </div>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import InitComp from "./init/index.vue";
import GuideComp from "./guide/index.vue";
import TaskListComp from "./task-list/index.vue";
import ServiceWarningComp from "./service-warning/index.vue";
import { useUserStore } from "/@/store/user";
const userStore = useUserStore();
const taskListVisible = ref(false);
const guideVisible = ref(false);
const isAddedStore = computed(() => {
  if (!(userStore.getUserInfo || {})?.merchantList) {
    return undefined;
  }
  if (userStore.getUserInfo?.merchantList.length > 0) {
    return 1;
  } else {
    return 0;
  }
});
const storeInfo = computed(() => {
  return userStore.getSelectedStoreInfo;
});
watch(
  storeInfo,
  (newValue) => {
    if (newValue == undefined) {
      taskListVisible.value = false;
      guideVisible.value = false;
      return;
    }
    if (newValue.authorization == 2) {
      taskListVisible.value = true;
      guideVisible.value = false;
    } else {
      taskListVisible.value = false;
      guideVisible.value = true;
    }
  },
  {
    immediate: true,
  }
);
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  &-inner {
    width: 100%;
    height: 100%;
    &-task-list {
      height: calc(100vh - 220px);
      min-height: 444px;
      margin-bottom: 16px;
    }
  }
  :deep(.ant-spin-nested-loading) {
    height: 100%;
    .ant-spin-container {
      height: 100%;
    }
  }
}
</style>
