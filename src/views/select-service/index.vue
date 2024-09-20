<template>
  <div class="select-service">
    <div class="select-service-inner">
      <h2 class="select-service-title">欢迎使用人群优化云服务</h2>
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item name="platform">
          <a-select
            v-model:value="formState.platform"
            placeholder="请选择平台版本"
            size="large"
          >
            <a-select-option value="1">阿里巴巴达摩盘</a-select-option>
            <a-select-option value="2">阿里巴巴元工厂</a-select-option>
            <a-select-option value="3">京东京准通</a-select-option>
          </a-select>
        </a-form-item>
        <a-button
          type="primary"
          style="width: 100%; margin-top: 12px"
          size="large"
          @click="handleClick"
        >
          进入产品
        </a-button>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const formState = reactive({
  platform: undefined,
});
const formRef = ref();
const rules: Record<string, Rule[]> = {
  platform: [
    {
      required: true,
      message: "请选择平台版本",
      trigger: "change",
    },
  ],
};
function handleClick() {
  formRef.value.validate().then(() => {
    if (formState.platform == 1) {
      router.push("/dmp/recharge");
    } else if (formState.platform == 2) {
      router.push("/ygc");
    } else if (formState.platform == 3) {
      router.push("/jzt/recharge");
    }
  });
}
</script>
<style lang="less" scoped>
.select-service {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-inner {
  }
  &-title {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 600;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    margin-bottom: 48px;
  }
}
</style>
