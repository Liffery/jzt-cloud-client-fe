<template>
  <div class="shop-manage">
    <header class="shop-manage-header">
      <span class="shop-manage-header-title"> 店铺管理 </span>
    </header>
    <main class="shop-manage-main">
      <div v-if="shopList.length > 0">
        <div class="shop-manage-main-statistic">
          <a-tooltip style="max-width: 410px">
            <template #title>
              阿里巴巴达摩盘{{ userInfo.version }}服务到期时间:
              {{ format2DateTime(userInfo.expirationTime) }}
            </template>
            阿里巴巴达摩盘{{ userInfo.version }}店铺额度：
          </a-tooltip>
          <span v-if="isExpired">0 </span>
          <span v-else>{{ boundStoreNum }}/{{ canBindStoreNum }}</span>
        </div>
        <div class="shop-manage-main-list">
          <div
            class="shop-manage-main-list-item"
            v-for="item in shopList"
            :key="item.id"
          >
            <div
              :class="[
                'shop-item',
                isExpired || canBindStoreNum == 0
                  ? 'shop-item-prohibit'
                  : undefined,
              ]"
            >
              <div
                class="item-title global-ellipsis-oneline"
                :title="item.merchantName"
              >
                {{ item.merchantName }}
              </div>
              <div
                class="item-category global-ellipsis-oneline"
                :title="item.categoryId"
              >
                商品类目：{{ item.categoryNameList[0] }}
                <span v-if="item.categoryNameList[1]">/</span>
                {{ item.categoryNameList[1] }}
              </div>

              <div
                class="item-tip global-ellipsis-oneline"
                :style="{
                  visibility: item.accountPasswordErrorFlag
                    ? 'visible'
                    : 'hidden',
                }"
              >
                账号或密码错误！
              </div>
              <a-button class="item-btn" size="small" @click="editStore(item)"
                >修改信息</a-button
              >
            </div>
          </div>

          <div class="shop-manage-main-list-item">
            <div class="btn-item">
              <div
                :class="[
                  'btn-item-plus',
                  isExpired || canBindStoreNum == 0
                    ? 'btn-item-prohibit'
                    : undefined,
                ]"
                @click="addStore"
              >
                <div>
                  <div class="btn-item-plus-icon">+</div>
                  <div class="btn-item-plus-text">新增店铺</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shop-manage-main-empty" v-else>
        <a-empty>
          <template #description>
            <span> 暂无店铺额度可用，请购买服务后添加店铺 </span>
          </template>
          <a-button type="primary" @click="jump">购买服务</a-button>
        </a-empty>
      </div>
    </main>
    <EditShopModal ref="editShopModalRef" @refresh="refresh"></EditShopModal>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "/@/store/user";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import EditShopModal from "./edit-shop-modal.vue";
import { getAllStoreInfoApi } from "/@/api/home";
import { StoreInfo } from "./types";
import { format2DateTime } from "/@/utils/date";
const editShopModalRef = ref();
const router = useRouter();
const shopList = ref<Record<string, any>>([]);
const userStore = useUserStore();
const userInfo = computed(() => {
  return userStore.getUserInfo || {};
});
const canBindStoreNum = computed(() => {
  return userStore.getUserInfo?.maxMerchant || 0;
});
const isExpired = computed(() => {
  return !!userStore.getUserInfo?.isExpired;
});

const boundStoreNum = ref(0);
function addStore() {
  if (isExpired.value || canBindStoreNum.value == 0) return;
  editShopModalRef.value.showModal();
}
function editStore(storeInfo: StoreInfo) {
  editShopModalRef.value.showModal(storeInfo);
}
function getAllStoreInfo() {
  getAllStoreInfoApi().then((res) => {
    if (res.code == 0) {
      shopList.value = res.data.list;
      boundStoreNum.value = shopList.value.length;
    }
  });
}
function refresh() {
  getAllStoreInfo();
}
function jump() {
  router.push("/recharge");
}
onMounted(() => {
  getAllStoreInfo();
});
</script>
<style lang="less" scoped>
.shop-manage {
  width: 100%;
  height: 100%;

  background-color: #fff;
  &-header {
    padding: 20px 24px;
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("/@/assets/bg.png");
    background-size: cover;
    background-position: 50% 50%;
    &-title {
      opacity: 0.85;
      font-size: 18px;
      font-family: PingFang SC-Medium;
      font-weight: Medium;
      text-align: left;
      color: #000000;
      line-height: 32px;
    }
  }
  &-main {
    padding: 0 16px;
    height: calc(100% - 92px);

    &-statistic {
      padding-left: 8px;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: Regular;
      text-align: left;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin-top: 8px;
      height: calc(100vh - 242px);
      min-height: 412px;
      overflow-y: auto;

      &-item {
        min-width: calc(20% - 16px);
        max-width: calc(20% - 16px); /* 根据需要设置最小宽度 */
        flex: 1 0 calc(20% - 16px); /* 计算每个块的宽度，减去间距 */
        margin: 8px; /* 设置元素块之间的间距 */
        box-sizing: border-box; /* 包含边框和内边距 */
        border-radius: 8px;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
        height: 152px;

        .shop-item {
          background: #f5f7fb;
          width: 100%;
          padding: 24px;
          height: 152px;
        }
        .shop-item-prohibit {
          background: #f5f7fb;
          color: rgba(0, 0, 0, 0.85);
          opacity: 0.5;
        }
        .btn-item {
          background: rgba(22, 122, 255, 0.09);
          width: 100%;
          height: 152px;
          &-plus {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &-icon {
              opacity: 0.85;
              color: #1677ff;
              text-align: center;
              font-size: 14px;
              font-family: PingFang SC-Regular;
              font-weight: 600;
            }
            &-text {
              opacity: 0.85;
              margin-top: 4px;
              color: #1677ff;
              font-size: 14px;
              font-family: PingFang SC-Regular;
              font-weight: 600;
            }
          }
          &-prohibit {
            opacity: 0.5;
            cursor: no-drop;
          }
        }
        .item-title {
          opacity: 0.85;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 600;
          text-align: left;
          color: rgba(0, 0, 0, 0.85);
          line-height: 22px;
        }
        .item-category {
          margin-top: 4px;
          opacity: 0.85;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: rgba(0, 0, 0, 0.85);
          line-height: 22px;
        }
        .item-tip {
          margin-top: 4px;
          opacity: 0.85;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: Regular;
          text-align: left;
          color: #e5484d;
          line-height: 20px;
        }
        .item-btn {
          margin-top: 8px;
        }
      }
    }

    &-empty {
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
}
</style>
