<template>
  <a-layout class="recommend">
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
          <div
            class="recommend-header-recharge"
            @click="goRecharge"
            v-if="!$route.path.includes('recharge')"
          >
            <div class="recommend-header-recharge-inner">
              <img :src="diamond" v-if="userInfo?.version != '试用版'" />
              <span v-if="userInfo?.version == '试用版'">充值续费</span>
              <span v-else-if="userInfo?.version == '标准版'">标准版会员</span>
              <span v-else-if="userInfo?.version == '升级版'">升级版用户</span>
            </div>
          </div>

          <a-dropdown>
            <span
              @click.prevent
              style="display: inline-block; line-height: 32px"
            >
              <a-avatar :size="24">
                <template #icon><UserOutlined /></template>
              </a-avatar>
              <!-- <span style="margin-left: 8px">{{ userAccount }}</span> -->
            </span>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1"> 个人中心 </a-menu-item>
                <a-menu-item key="4"> 退出登录 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </r-header>
    </a-layout-header>
    <a-layout-content class="recommend-content">
      <comp-scrollbar>
        <CompContent />
      </comp-scrollbar>
    </a-layout-content>
    <AddStoreComp ref="addStoreRef"></AddStoreComp>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons-vue";
import CompContent from "./comp-content.vue";
import { RHeader } from "/@/layout";
import CompScrollbar from "../scrollbar/index.vue";
import { useRouter, useRoute } from "vue-router";
import { logoutApi } from "/@/api/login";
import {
  ref,
  watch,
  onMounted,
  computed,
  defineComponent,
  createVNode,
} from "vue";
import { localStorage } from "/@/utils/use";
import { TOKEN_KEY, USER_KEY } from "/@/constant/AppEnum";
import type { MenuProps } from "ant-design-vue";
import AddStoreComp from "/@/components/add-store/index.vue";
import { useUserStore } from "/@/store/user";
import diamond from "/@/assets/diamond.png";
import { Modal } from "ant-design-vue";

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

const route = useRoute();
const { path } = route;
const selectedKeys = ref([path]);
const userStore = useUserStore();
const router = useRouter();
// const selectedKeys = ref([path]);
const userAccount = ref("");
const addStoreRef = ref();
const userInfo = computed(() => {
  return userStore.getUserInfo;
});
const canBindStoreNum = computed(() => {
  const num =
    (userStore.getUserInfo?.saleInfo?.maxMerchant || 0) -
    merchantOptions.value.length;
  return num < 0 ? 0 : num;
});
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
const storeId = ref(undefined);
watch(
  () => userStore.getSelectedStoreInfo,
  (newValue) => {
    if (newValue?.id) {
      storeId.value = newValue.id;
    }
  },
  {
    immediate: true,
  }
);
const merchantOptions = computed<any[]>(() => {
  return (userStore.getUserInfo?.merchantList || []).map((item) => {
    return {
      label: item.merchantName,
      value: item.id,
    };
  });
});

function logout() {
  Modal.confirm({
    title: "确认要退出登录？",
    icon: createVNode(ExclamationCircleFilled),
    content: createVNode(
      "div",
      { style: "color:rgba(0,0,0,0.88);" },
      "退出后不影响人群任务运行。"
    ),
    onOk() {
      return logoutApi().then((res) => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem("visitorId");
        router.push("/login");
      });
    },
    onCancel() {
      console.log("Cancel");
    },
    centered: true,
  });
}

function merchantChange(value: any) {
  const merchantInfo = (userStore.getUserInfo?.merchantList || []).find(
    (item) => item.id == value
  );
  userStore.setSelectedStoreInfo(merchantInfo);
}

const handleMenuClick: MenuProps["onClick"] = (e) => {
  if (e.key === "1") {
    router.push("/user");
  } else if (e.key === "2") {
    // 下载文档
  } else if (e.key === "3") {
    // router.push("/user");
  } else if (e.key === "4") {
    logout();
  }
};

function addItem() {
  if (canBindStoreNum.value == 0 || userInfo.value?.isExpire) return;
  addStoreRef.value.showModal();
}

function goRecharge() {
  router.push("/recharge");
}
onMounted(() => {
  userAccount.value = localStorage.getItem(USER_KEY) || "";
});
</script>
<style lang="less" scoped>
.recommend {
  background: #fafafa;
  height: 100%;
  width: 100%;

  &-content {
    width: 100%;
  }
  &-header {
    display: flex;
    background: #fff;
    padding: 0 24px;
    justify-content: space-between;
    overflow: hidden;
    &-recharge {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 16px;
      cursor: pointer;
      &-inner {
        padding: 0 10px;
        height: 24px;
        background: linear-gradient(
          90deg,
          #ffeec3 0%,
          #ffd7a7 76%,
          #fcb8b3 100%
        );
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 24px;
        box-shadow: 0px 2px 0px 0px rgba(255, 205, 155, 0.2);
        line-height: 24px;
        text-align: center;
        font-size: 14px;
        font-family: PingFang SC;
        color: #64360d;
      }
    }
  }
  &-menu {
    font-size: 16px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 400;
    flex: 1;
    color: #595959;
  }
  &-tool-icon {
    margin-right: 28px;
  }
  :deep(.ant-menu-horizontal > .ant-menu-item::after) {
    border-bottom: 2px solid transparent;
  }
  :deep(.ant-menu-horizontal > .ant-menu-item:hover::after) {
    border-bottom: 2px solid transparent;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover) {
    color: #1890ff;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected) {
    font-weight: 600;
    color: #1890ff;
  }
}
.merchant-select {
  padding: 9px 16px;
  cursor: pointer;
}
.not-allow {
  opacity: 0.6;
  cursor: no-drop;
}
</style>
