<template>
  <a-form
    :model="codeLoginForm"
    name="basic"
    autocomplete="off"
    :rules="rules"
    ref="codeLoginFormRef"
  >
    <a-form-item label="" name="telephone" :wrapper-col="{ span: 24 }">
      <a-input
        v-model:value="codeLoginForm.telephone"
        placeholder="请输入手机号码"
        @change="telephoneChange"
      />
    </a-form-item>

    <a-form-item label="" name="code">
      <a-input
        v-model:value="codeLoginForm.code"
        placeholder="请输入验证码"
        style="width: 177px"
        @change="inputChange"
      />
      <a-button
        type="link"
        :disabled="btnLoading || codeDisabled"
        @click="codeClick"
        >{{ btnText }}</a-button
      >
    </a-form-item>
    <div
      class="error-tip-text"
      style="margin-top: -20px"
      v-show="verifyTipShow"
    >
      请先发送短信验证码
    </div>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import {
  Form as AForm,
  FormItem as AFormItem,
  Button as AButton,
  Input as AInput,
} from "ant-design-vue";
import { sendCodeApi } from "/@/api/login";

const btnLoading = ref(false);
const codeLoginForm = reactive({
  telephone: "",
  code: "",
});
const emit = defineEmits(["setErrorTip"]);
const telPattern =
  /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
const second = ref(60);
const isVerify = ref(false); // 是否点击发送过验证码
const verifyTipShow = ref(false); // 是否提示显示“请先发送短信验证码”
const codeDisabled = ref(true);
const btnText = ref("获取验证码");
const clockId = ref();
const codeLoginFormRef = ref();

function telephoneChange() {
  emit("setErrorTip", "");

  if (telPattern.test(codeLoginForm.telephone)) {
    if (!btnText.value.includes("s后获取")) codeDisabled.value = false;
  } else {
    codeDisabled.value = true;
  }
}
function inputChange() {
  emit("setErrorTip", "");
  verifyTipShow.value = false;
}
const rules: any = {
  telephone: [
    {
      required: true,
      message: "请输入手机号码",
      trigger: "change",
    },
    {
      pattern: telPattern,
      message: "请输入正确的手机号",
    },
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "change",
    },
  ],
};

function codeClick() {
  btnLoading.value = true;
  sendCodeApi(codeLoginForm.telephone)
    .then(() => {
      btnLoading.value = false;
      isVerify.value = true;
      verifyTipShow.value = false;
      btnText.value = second.value + "s后获取";
      codeDisabled.value = true;
      clockId.value = setInterval(doLoop, 1000);
    })
    .finally(() => {
      btnLoading.value = false;
    });
}

function doLoop() {
  second.value--;
  if (second.value > 0) {
    btnText.value = second.value + "s后获取";
    codeDisabled.value = true;
  } else {
    resetCodeBtn();
  }
}
function validateFields() {
  return codeLoginFormRef.value.validateFields().then((res) => {
    if (!isVerify.value) {
      verifyTipShow.value = true;
      return Promise.reject();
    } else {
      return Promise.resolve(res);
    }
  });
}

function resetCodeBtn() {
  clearInterval(clockId.value); //清除js定时器
  codeDisabled.value = true;
  btnText.value = "获取验证码";
  second.value = 60; //重置时间
}

function resetFields() {
  codeLoginFormRef.value.resetFields();
  Object.assign(codeLoginForm, {
    telephone: "",
    code: "",
  });
  resetCodeBtn();
}

defineExpose({
  validateFields,
  codeLoginForm,
  resetFields,
});
onUnmounted(() => {
  clearInterval(clockId.value);
});
</script>
<style lang="less" scoped>
.error-tip-text {
  font-size: 14px;
  font-family: Source Han Sans CN, Source Han Sans CN-Regular;
  font-weight: 400;
  text-align: left;
  color: #ff4d4f;
}
</style>
