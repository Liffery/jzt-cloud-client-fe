<template>
  <div class="task-list">
    <WaringTip ref="warningTipRef" />
    <header class="task-list-header">
      <span class="task-list-header-title">
        人群包列表
        <a-tooltip placement="right">
          <template #title>
            系统将每隔15天自动进行一次人群优化任务，您将定期收到人群包。
          </template>
          <QuestionCircleOutlined
            style="font-size: 14px; vertical-align: baseline"
          />
        </a-tooltip>
      </span>
      <span>
        <span class="task-list-header-category">选择店铺：</span>
        <a-select
          :options="storeList"
          style="width: 150px"
          v-model:value="selectStoreId"
          @change="selectChange"
        ></a-select>
      </span>
    </header>
    <main class="task-list-main">
      <div v-if="taskList.length > 0" class="task-list-main-inner">
        <a-table
          :scroll="{
            x: 1000,
            y: '100%',
          }"
          style="height: 100%"
          :pagination="false"
          :data-source="taskList"
          :columns="columns"
          :loading="$store.getLoading('get&/mock/dmp/crowd/page')"
          class="table-scroll-basic"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex == 'pushTime'">
              {{ format2DateTime(text) }}
            </template>
          </template>
        </a-table>
        <footer class="task-list-footer">
          <a-pagination
            :show-total="(total:number) => `共有 ${total} 条`"
            v-model:current="paginationInfo.pageNum"
            v-model:page-size="paginationInfo.pageSize"
            :total="paginationInfo.total"
            show-size-changer
            show-quick-jumper
            @change="pageChange"
          />
        </footer>
      </div>
      <a-empty v-else />
    </main>

    <EditCategoryComp ref="editCategoryRef"></EditCategoryComp>
  </div>
</template>
<script lang="ts" setup>
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { reactive, ref, onMounted, computed } from "vue";
import EditCategoryComp from "/@/components/edit-category/index.vue";
import { getTaskListApi, getAllStoreInfoApi } from "/@/api/home";
import { format2DateTime } from "/@/utils/date";
import WaringTip from "./warning-tip.vue";
import { useUserStore } from "/@/store/user";
const editCategoryRef = ref();
const warningTipRef = ref();
const userStore = useUserStore();

const columns = [
  {
    title: "店铺名称",
    dataIndex: "merchantName",
    key: "merchantName",
    ellipsis: true,
  },
  {
    title: "选择推广类目",
    dataIndex: "categoryId",
    key: "categoryId",
    ellipsis: true,
  },
  {
    title: "人群包标签",
    dataIndex: "tag",
    key: "tag",
    ellipsis: true,
  },
  {
    title: "人群规模",
    key: "crowdSize",
    dataIndex: "crowdSize",
    ellipsis: true,
  },
  {
    title: "版本",
    key: "version",
    dataIndex: "version",
    ellipsis: true,
  },
  {
    title: "人群推送时间",
    key: "pushTime",
    dataIndex: "pushTime",
    ellipsis: true,
  },
];
const storeList = ref([{ value: 0, label: "全部店铺" }]);
const selectStoreId = ref(0);
const taskList = ref([]);
const paginationInfo = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

function getTaskList(pageNum: number, pageSize: number) {
  getTaskListApi({
    pageNum,
    pageSize,
    merchantIdList: selectStoreId.value == 0 ? [] : [selectStoreId.value],
  }).then((res) => {
    const { crowdList, total } = res.data;
    taskList.value = crowdList.map((item, index) => {
      return {
        ...item,
      };
    });
    Object.assign(paginationInfo, {
      pageNum,
      pageSize,
      total,
    });
  });
}

function pageChange(pageNum: number, pageSize: number) {
  getTaskList(pageNum, pageSize);
}

function getAllStoreInfo() {
  getAllStoreInfoApi().then((res) => {
    if (res.code == 0) {
      storeList.value = res.data.list.reduce((pre, item) => {
        pre.push({
          value: item.id,
          label: item.merchantName,
        });
        return pre;
      }, storeList.value);
    }
  });
}
function selectChange() {
  getTaskList(1, paginationInfo.pageSize);
}
onMounted(() => {
  getAllStoreInfo();
  getTaskList(1, 10);
});
</script>
<style lang="less" scoped>
.task-list {
  width: 100%;
  // height: 100%;
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
    &-category {
      font-size: 14px;
      font-family: PingFang SC-Regular;
      font-weight: Regular;
      text-align: left;
      color: rgba(0, 0, 0, 0.88);
      line-height: 22px;
      margin-right: 8px;
    }
  }
  &-main {
    width: 100%;
    padding: 0 16px;
    height: calc(100vh - 204px);
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #fff;
    &-inner {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }

    :deep(.ant-table-body) {
      min-height: 300px;
    }
    .table-scroll-basic {
      :deep(.ant-table-body) {
        height: calc(100vh - 340px);
      }
    }
    .table-scroll-other {
      :deep(.ant-table-body) {
        height: calc(100vh - 402px);
      }
    }
  }
  &-footer {
    padding: 24px 16px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
