<template>
  <div class="user-profile">
    <div class="user-profile-main">
      <div class="gutter-box user-profile-main-left">
        <div class="user-profile-main-left-header">账号信息</div>
        <div class="user-profile-main-left-content">
          <div class="user-profile-main-left-inner">
            <div class="user-profile-main-left-inner-label">手机号：</div>
            <div class="user-profile-main-left-inner-info">
              {{ userInfo?.phoneNumber }}
            </div>
          </div>
          <div class="user-profile-main-left-inner">
            <div class="user-profile-main-left-inner-label">
              已开通服务版本：
            </div>
            <div class="user-profile-main-left-inner-info">
              {{ userInfo?.version }}
              <span
                class="user-profile-main-left-inner-info-tip"
                v-if="userInfo?.version == '试用版'"
                @click="goRecharge"
                >购买标准版/升级版
              </span>
            </div>
          </div>
          <div class="user-profile-main-left-inner">
            <div class="user-profile-main-left-inner-label">服务到期时间：</div>
            <div class="user-profile-main-left-inner-info">
              {{
                userInfo?.expirationTime &&
                format2DateTime(userInfo?.expirationTime)
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="gutter-box user-profile-main-right">
        <div class="user-profile-main-right-header">店铺管理</div>
        <div class="purchase-record">
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
            :scroll="{
              y: 'calc(100vh - 275px)',
            }"
            :class="[dataSource.length === 0 ? 'table-nodata' : 'table-scroll']"
          >
            <template #bodyCell="{ column, text }">
              <template v-if="column.dataIndex == 'purchaseTime'">
                {{ format2DateTime(text) }}
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "/@/store/user";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { format2DateTime } from "/@/utils/date";
import { getPurchaseRecordApi } from "/@/api/user";

const router = useRouter();
const userStore = useUserStore();
const userInfo = computed(() => {
  return userStore.getUserInfo || {};
});
const columns = [
  {
    title: "服务版本",
    dataIndex: "version",
    key: "version",
    ellipsis: true,
    width: 120,
  },
  {
    title: "购买服务时长",
    dataIndex: "duration",
    key: "duration",
    ellipsis: true,
    width: 120,
  },
  {
    title: "购买时间",
    dataIndex: "purchaseTime",
    key: "purchaseTime",
    ellipsis: true,
    width: 120,
  },
];
const dataSource = ref([]);
function goRecharge() {
  router.push("/recharge");
}
function getPurchaseRecordList() {
  getPurchaseRecordApi().then((res) => {
    if (res.code == 0) {
      dataSource.value = res.data.list;
    }
  });
}
onMounted(() => {
  getPurchaseRecordList();
});
</script>
<style lang="less" scoped>
.user-profile {
  width: 100%;
  min-height: 556px;
  height: calc(100vh - 112px);
  &-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between; /* 确保间隔 */

    .gutter-row {
      width: 100%;
      height: 100%;
    }
    .gutter-box {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
    &-left {
      flex: 0 0 25%; /* 占 25% */
      margin-right: 16px; /* 右侧间隔 */
      box-sizing: border-box; /* 包含内边距和边框 */
      &-header {
        padding: 30px 24px;
        opacity: 0.85;
        font-size: 18px;
        font-family: PingFang SC-Medium;
        font-weight: Medium;
        text-align: left;
        color: #000000;
        line-height: 32px;
      }

      &-content {
        padding: 0px 24px;
      }

      &-inner {
        margin-top: 12px;
        &:first-child {
          margin-top: 0;
        }
        &-label {
          opacity: 0.85;
          font-size: 14px;
          font-family: PingFang SC-Regular;
          font-weight: Regular;
          text-align: left;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
        }
        &-info {
          margin-top: 6px;
          opacity: 0.85;
          font-size: 14px;
          font-family: PingFang SC-Medium;
          font-weight: Medium;
          text-align: left;
          color: rgba(0, 0, 0, 0.85);
          line-height: 22px;
          &-tip {
            margin-left: 16px;
            cursor: pointer;
            opacity: 0.85;
            font-size: 14px;
            font-family: PingFang SC-Medium;
            font-weight: Medium;
            text-align: left;
            color: #1677ff;
            line-height: 22px;
          }
        }
      }
    }
    &-right {
      width: calc(75% - 16px);
      flex: 1 1 auto; /* 占 75% */
      box-sizing: border-box;
      &-header {
        padding: 30px 24px;
        opacity: 0.85;
        font-size: 18px;
        font-family: PingFang SC-Medium;
        font-weight: Medium;
        text-align: left;
        color: #000000;
        line-height: 32px;
        background-image: url("/@/assets/bg.png");
        background-size: cover;
        background-position: 50% 50%;
      }
      .purchase-record {
        padding: 0 24px;
        :deep(.ant-table-body) {
          min-height: 390px;
        }
        .table-scroll {
          :deep(.ant-table-body) {
            height: calc(100vh - 275px);
          }
        }
        .table-nodata {
          :deep(.ant-table-body) {
            height: calc(100vh - 275px);
            table {
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
