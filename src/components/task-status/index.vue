<template>
  <span v-if="status === TaskStatus.PROCESSING">
    <span style="background-color: #1890ff" class="task-status-dot"></span>
    进行中
  </span>
  <span v-else-if="status === TaskStatus.SUCCESS">
    <span style="background-color: #52c41a" class="task-status-dot"></span>
    已完成
  </span>
  <span v-else-if="status === TaskStatus.FAIL">
    <span style="background-color: #f5222d" class="task-status-dot"></span>
    失败
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TaskStatus } from "./enums";

export default defineComponent({
  props: {
    status: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      TaskStatus,
    };
  },
});
</script>

<style lang="less">
.task-status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
