<template>
  <div class="task-list">
    <header class="task-list-header">
      <span class="task-list-header-title">
        人群优化任务列表
        <a-tooltip placement="right">
          <template #title>
            系统将每隔15天自动进行一次人群优化任务，您将定期收到人群包。
          </template>
          <QuestionCircleOutlined
            style="font-size: 16px; vertical-align: baseline"
          />
        </a-tooltip>
      </span>
      <span>
        <span class="task-list-header-category"
          >已选商品类目：{{ storeInfo?.categoryInfo?.categoryName }}</span
        >
        <a-button
          type="primary"
          @click="editCategory"
          :disabled="isExpire === true"
          >修改类目</a-button
        >
      </span>
    </header>
    <main class="task-list-main">
      <a-table
        :scroll="{
          x: 1000,
          y:
            taskList.length === 0
              ? 'calc(100vh - 372px)'
              : 'calc(100vh - 418px)',
        }"
        style="height: 100%"
        :pagination="false"
        :data-source="taskList"
        :columns="columns"
        :loading="$store.getLoading('get&/dmp/task/list')"
        :class="[taskList.length === 0 ? 'table-nodata' : 'table-scroll']"
      >
        <template #bodyCell="{ column, record, text }">
          <template v-if="column.dataIndex == 'taskStatus'">
            <TaskStatusComp :status="text"></TaskStatusComp>
          </template>
          <template v-else-if="column.dataIndex == 'completeTime'">
            {{ record.taskStatus == TaskStatus.SUCCESS ? text : "-" }}
          </template>
        </template>
      </a-table>
    </main>
    <footer class="task-list-footer" v-if="taskList.length > 0">
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
    <EditCategoryComp ref="editCategoryRef"></EditCategoryComp>
  </div>
</template>
<script lang="ts" setup>
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { reactive, ref, watch, computed } from "vue";
import EditCategoryComp from "/@/components/edit-category/index.vue";
import { getTaskListApi } from "/@/api/home";
import { useUserStore } from "/@/store/user";
import TaskStatusComp from "/@/components/task-status/index.vue";
import { TaskStatus } from "/@/components/task-status/enums";
const userStore = useUserStore();
const isExpire = computed(() => {
  return userStore.getUserInfo?.isExpire;
});
const editCategoryRef = ref();
const columns = [
  {
    title: "人群包名称",
    dataIndex: "taskName",
    key: "taskName",
    ellipsis: true,
  },
  {
    title: "一级类目",
    dataIndex: "categoryName",
    key: "categoryName",
    ellipsis: true,
  },
  {
    title: "人群规模",
    dataIndex: "crowdSize",
    key: "crowdSize",
    ellipsis: true,
  },
  {
    title: "任务状态",
    key: "taskStatus",
    dataIndex: "taskStatus",
    ellipsis: true,
  },
  {
    title: "人群推送时间",
    key: "completeTime",
    dataIndex: "completeTime",
    ellipsis: true,
  },
];
const taskList = ref([]);
const paginationInfo = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
const storeId = ref<undefined | number>(undefined);
const storeInfo = computed(() => {
  return userStore.getSelectedStoreInfo;
});
watch(
  () => userStore.getSelectedStoreInfo,
  (newValue) => {
    storeId.value = newValue?.id;
    getTaskList(paginationInfo.pageNum, paginationInfo.pageSize);
  },
  {
    immediate: true,
  }
);
function getTaskList(pageNum: number, pageSize: number) {
  if (!storeId.value) return;
  getTaskListApi({ pageNum, pageSize, merchantId: storeId.value }).then(
    (res) => {
      const { list, total } = res.data;
      taskList.value = list.map((item, index) => {
        const currentIndex = (pageNum - 1) * pageSize + index + 1;
        return {
          ...item,
          rowIndex: currentIndex,
        };
      });
      Object.assign(paginationInfo, {
        pageNum,
        pageSize,
        total,
      });
    }
  );
}
function editCategory() {
  if (!storeInfo.value) return;
  editCategoryRef.value.showModal(
    storeInfo.value.id,
    storeInfo.value.categoryInfo.id,
    !isExpire.value && storeInfo.value.authorization == 2
  );
}
function pageChange(pageNum: number, pageSize: number) {
  getTaskList(pageNum, pageSize);
}
</script>
<style lang="less" scoped>
.task-list {
  width: 100%;
  height: 100%;

  background-color: #fff;
  &-header {
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url("/@/assets/bg.png");
    background-size: cover;
    background-position: 50% 50%;
    &-title {
      opacity: 0.85;
      font-size: 24px;
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
      margin-right: 16px;
    }
  }
  &-main {
    padding: 0 16px;
    height: calc(100% - 152px);

    :deep(.ant-table-body) {
      min-height: 300px;
    }
    .table-scroll {
      :deep(.ant-table-body) {
        height: calc(100vh - 418px);
      }
    }
    .table-nodata {
      :deep(.ant-table-body) {
        height: calc(100vh - 372px);
        table {
          height: 100%;
        }
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
