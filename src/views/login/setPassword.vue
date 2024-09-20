<template>
  <a-form
    :model="setPasswordForm"
    name="basic"
    autocomplete="off"
    :rules="rules"
    ref="setPasswordFormRef"
  >
    <a-form-item label="" name="password1" :wrapper-col="{ span: 24 }">
      <a-input-password
        v-model:value="setPasswordForm.password1"
        placeholder="请输入密码，6-18位数字、字母、特殊字符的组合"
        @change="inputChange"
      />
      <span class="code-btn"></span>
    </a-form-item>

    <a-form-item label="" name="password2">
      <a-input-password
        v-model:value="setPasswordForm.password2"
        placeholder="请再次输入密码"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import {
  Form as AForm,
  FormItem as AFormItem,
  InputPassword as AInputPassword,
} from "ant-design-vue";
const setPasswordFormRef = ref();
const setPasswordForm = reactive({
  password1: "",
  password2: "",
});
const passwordReg =
  /(^(?=.*[a-z])(?=.*[A-Z])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[a-z])(?=.*[0-9])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[a-z])(?=.*[.@$!%*#~?&^])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[A-Z])(?=.*[.@$!%*#~?&^])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[A-Z])(?=.*[0-9])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[.@$!%*#~?&^])(?=.*[0-9])[\w.@$!%*#~?&^]{6,18}$)/;
const rules: any = {
  password1: [
    {
      required: true,
      message: "请输入密码，6-18位数字、字母、特殊字符的组合",
      trigger: "change",
    },
    {
      pattern: passwordReg,
      message: "请输入密码，6-18位数字、字母、特殊字符的组合",
    },
  ],
  password2: [
    {
      validator: async (rule, value) => {
        if (!value) {
          return Promise.reject("请再次输入密码");
        }
        if (!passwordReg.test(value)) {
          return Promise.reject("请输入密码，6-18位数字、字母、特殊字符的组合");
        }
        if (setPasswordForm.password1 != value) {
          return Promise.reject("两次输入不一致！");
        }
        return Promise.resolve();
      },
    },
  ],
};
function inputChange() {
  if (setPasswordForm.password2) {
    setPasswordFormRef.value.validateFields(["password2"]);
  }
}
function validateFields() {
  return setPasswordFormRef.value.validateFields();
}
function resetFields() {
  Object.assign(setPasswordForm, {
    password1: "",
    password2: "",
  });
  setPasswordFormRef.value.resetFields();
}
defineExpose({ validateFields, resetFields, setPasswordForm });
</script>
<style lang="less" scoped></style>
