<template>
  <a-layout style="height: 100%" class="recommend">
    <a-layout-header class="recommend-header">
      <r-header>
        <template #left>
          <a-menu
            v-model:selectedKeys="selectedKeys"
            class="recommend-menu"
            mode="horizontal"
            @click="menuClick"
          >
            <a-menu-item v-for="item in paths" :key="item.path">
              {{ item.displayName }}
            </a-menu-item>
          </a-menu>
        </template>
        <template #right>
          <!-- <SearchOutlined class="rock-tool-icon" />
          <QuestionCircleOutlined class="rock-tool-icon" />
          <BellOutlined class="rock-tool-icon" /> -->
          <div>
            <a-avatar :size="24">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <span style="margin-left: 8px">admin</span>
          </div>
        </template>
      </r-header>
    </a-layout-header>
    <a-layout-content class="recommend-content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";

import { RHeader } from "/@/layout";

import { useRouter, useRoute } from "vue-router";

import { ref, watch } from "vue";

const route = useRoute();
const router = useRouter();
const { path } = route;
const selectedKeys = ref([path]);

const menuClick = function ({ key }: any) {
  router.push(key);
};

const paths = [
  { path: "/package", displayName: "人群包列表" },
  { path: "/shop", displayName: "店铺管理" },
];

watch(
  () => route.path,
  (newValue) => {
    const curPath = paths.find((item) => item.path === newValue);
    if (curPath) {
      selectedKeys.value = [curPath.path];
    }
  }
);
</script>
<style lang="less" scoped>
.recommend {
  &-content {
    padding: 24px;
    height: calc(100% - 64px);
    background: #f5f5f5;
    width: 100%;
    overflow: auto;
  }
}
.recommend-header {
  display: flex;
  background: #fff;
  padding: 0 24px;
  justify-content: space-between;
  overflow: hidden;
  .recommend-menu {
    font-size: 16px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 400;
    flex: 1;
    color: #595959;
  }
  .recommend-tool-icon {
    margin-right: 28px;
  }
  :deep(.ant-menu-horizontal > .ant-menu-item::after) {
    border-bottom: 2px solid transparent;
  }
  :deep(.ant-menu-horizontal > .ant-menu-item:hover::after) {
    border-bottom: 2px solid transparent;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected) {
    font-weight: 600;
  }
}
</style>
