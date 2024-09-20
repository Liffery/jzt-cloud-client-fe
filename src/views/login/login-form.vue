<template>
  <div
    class="login-form"
    v-if="
      loginStatus == LoginStatusEnum.CODE_LOGIN ||
      loginStatus == LoginStatusEnum.PASSWORD_LOGIN
    "
  >
    <a-tabs v-model:activeKey="activeKey" @change="tabChange">
      <a-tab-pane :key="LoginStatusEnum.CODE_LOGIN" tab="验证码登录">
        <CodeForm ref="codeLoginFormRef" @setErrorTip="setErrorTip"></CodeForm>
        <div style="width: 100%; position: relative">
          <a-button
            type="primary"
            style="width: 100%; position: relative"
            @click="submit"
            >注册 / 登录
          </a-button>
          <span class="error-tip">{{ errorTip }}</span>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="LoginStatusEnum.PASSWORD_LOGIN" tab="密码登录">
        <a-form
          :model="accountLoginForm"
          name="basic"
          autocomplete="off"
          :rules="accountRules"
          ref="accountLoginFormRef"
        >
          <a-form-item label="" name="account" :wrapper-col="{ span: 24 }">
            <a-input
              v-model:value="accountLoginForm.account"
              placeholder="请输入手机号码"
              @change="() => setErrorTip('')"
            />
            <span class="code-btn"></span>
          </a-form-item>

          <a-form-item label="" name="password">
            <a-input-password
              v-model:value="accountLoginForm.password"
              placeholder="请输入密码"
              @change="() => setErrorTip('')"
            />
          </a-form-item>
          <div class="forget-password">
            <span @click="forgetPasswordClick" class="forget-password-text">
              忘记密码
            </span>
          </div>
          <div style="width: 100%; position: relative">
            <a-button type="primary" style="width: 100%" @click="submit"
              >登录</a-button
            >
            <div class="error-tip" style="top: -43px; width: 366px">
              {{ errorTip }}
            </div>
          </div>
        </a-form></a-tab-pane
      >
    </a-tabs>
    <a-divider />
    <p class="font-14">
      未注册手机号验证后自动登录，注册即代表同意<span
        class="login-form-term"
        @click="jump('/term')"
        >《服务条款》</span
      >和<span class="login-form-term" @click="jump('/policy')"
        >《隐私政策》</span
      >
    </p>
  </div>
  <div
    v-else-if="
      loginStatus == LoginStatusEnum.SET_PASSWORD ||
      loginStatus == LoginStatusEnum.FORGET_PASSWORD_STEP2
    "
  >
    <div>设置密码</div>
    <a-divider style="margin: 12px 0 32px" />
    <SetPassword ref="setPasswordFormRef"></SetPassword>
    <div style="width: 100%; position: relative">
      <a-button
        type="primary"
        style="width: 100%; margin: 12px 0 20px"
        @click="submit"
        >确定</a-button
      >
    </div>
  </div>
  <div v-else-if="loginStatus == LoginStatusEnum.FORGET_PASSWORD_STEP1">
    <div>身份验证</div>
    <a-divider style="margin: 12px 0 32px" />
    <CodeForm ref="codeLoginFormRef" @setErrorTip="setErrorTip"></CodeForm>
    <div style="width: 100%; position: relative">
      <a-button type="primary" style="width: 100%" @click="submit"
        >验证</a-button
      >
      <span class="error-tip">{{ errorTip }}</span>
    </div>

    <a-divider />
    <p class="font-14">
      未注册手机号验证后自动登录，注册即代表同意<span
        class="login-form-term"
        @click="jump('/term')"
        >《服务条款》</span
      >和<span class="login-form-term" @click="jump('/policy')"
        >《隐私政策》</span
      >
    </p>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { LoginStatusEnum } from "./enums";
import { message } from "ant-design-vue";
import SetPassword from "./setPassword.vue";
import CodeForm from "./codeForm.vue";
import { validateCodeApi, loginApi, forgetPasswordApi } from "/@/api/login";
import { encrypt } from "/@/utils/aes";
import { localStorage } from "/@/utils/use";
import { useRouter } from "vue-router";
import { useUserStore } from "/@/store/user";
import { getUserInfoApi } from "/@/api/user";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const userStore = useUserStore();
const router = useRouter();
const loginStatus = ref(LoginStatusEnum.CODE_LOGIN);
const activeKey = ref(LoginStatusEnum.CODE_LOGIN);

const codeLoginForm = reactive({
  telephone: "",
  code: "",
});
const accountLoginForm = reactive({
  account: "",
  password: "",
});
const telPattern =
  /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;

const errorTip = ref("");
// const errorTip = ref("");
const codeLoginFormRef = ref();
const accountLoginFormRef = ref();
const setPasswordFormRef = ref();
function clearData() {
  Object.assign(codeLoginForm, {
    telephone: "",
    code: "",
  });
  Object.assign(accountLoginForm, {
    account: "",
    password: "",
  });
  errorTip.value = "";
}

onMounted(() => {
  clearData();
  loginStatus.value = LoginStatusEnum.CODE_LOGIN;
  activeKey.value = LoginStatusEnum.CODE_LOGIN;
});

const accountRules: any = {
  account: [
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
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
    {
      pattern:
        /(^(?=.*[a-z])(?=.*[A-Z])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[a-z])(?=.*[0-9])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[a-z])(?=.*[.@$!%*#~?&^])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[A-Z])(?=.*[.@$!%*#~?&^])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[A-Z])(?=.*[0-9])[\w.@$!%*#~?&^]{6,18}$)|(^(?=.*[.@$!%*#~?&^])(?=.*[0-9])[\w.@$!%*#~?&^]{6,18}$)/,
      message: "请输入密码，6-18位数字、字母、特殊字符的组合",
    },
  ],
};

function resetAllFields() {
  codeLoginFormRef.value?.resetFields();
  accountLoginFormRef.value?.resetFields();
  setPasswordFormRef.value?.resetFields();
}

function tabChange(activeKey: any) {
  loginStatus.value = Number(activeKey);
  errorTip.value = "";
  clearData();
  resetAllFields();
}
function validateCode(telephone: string, code: string, nextStep: number) {
  validateCodeApi({
    phoneNumber: telephone,
    smsCode: code,
  })
    .then((res) => {
      // 验证码通过之后
      const { newUser } = res.data;
      if (nextStep == LoginStatusEnum.SET_PASSWORD) {
        if (newUser) {
          loginStatus.value = nextStep;
          Object.assign(codeLoginForm, {
            telephone,
            code,
          });
        } else {
          login({ phoneNumber: telephone, smsCode: code })
            .then(() => {
              message.success("登录成功");
              router.push("/");
            })
            .catch((err) => {
              errorTip.value = err.msg;
            });
        }
      } else if (nextStep == LoginStatusEnum.FORGET_PASSWORD_STEP2) {
        Object.assign(codeLoginForm, {
          telephone,
          code,
        });
        if (!newUser) {
          loginStatus.value = nextStep;
        } else {
          // errorTip.value = "该手机号未注册";
          loginStatus.value = LoginStatusEnum.SET_PASSWORD;
        }
      }
    })
    .catch((err) => {
      errorTip.value = err.msg;
    });
}

function getUserInfo() {
  getUserInfoApi().then((res) => {
    userStore.setUserInfo(res.data);
    if (res.data.merchantList.length > 0) {
      userStore.setSelectedStoreInfo(res.data.merchantList[0]);
    }
  });
}
function setErrorTip(tip1: string) {
  errorTip.value = tip1;
  // errorTip.value = tip2;
}
async function login(data: {
  phoneNumber: string;
  smsCode?: string;
  password?: string;
}) {
  const { phoneNumber, password, smsCode } = data;
  const result = await FingerprintJS.load().then((fp) => {
    return fp.get().then((result) => {
      return Promise.resolve(result);
    });
  });
  const visitorId = result.visitorId;
  localStorage.setItem("visitorId", visitorId);
  return loginApi({
    phoneNumber: phoneNumber,
    password: password,
    smsCode,
  }).then((res) => {
    const { token } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("account", phoneNumber);
    getUserInfo();
    return Promise.resolve();
  });
}

function submit() {
  if (loginStatus.value == LoginStatusEnum.CODE_LOGIN) {
    codeLoginFormRef.value.validateFields().then(() => {
      const { telephone, code } = codeLoginFormRef.value.codeLoginForm;
      validateCode(telephone, code, LoginStatusEnum.SET_PASSWORD);
    });
  } else if (loginStatus.value == LoginStatusEnum.PASSWORD_LOGIN) {
    accountLoginFormRef.value.validateFields().then(() => {
      login({
        phoneNumber: accountLoginForm.account,
        password: encrypt(accountLoginForm.password),
      })
        .then(() => {
          message.success("登录成功");
          router.push("/");
        })
        .catch((err) => {
          errorTip.value = err.msg;
        });
    });
  } else if (loginStatus.value == LoginStatusEnum.SET_PASSWORD) {
    setPasswordFormRef.value.validateFields().then(() => {
      const { password1 } = setPasswordFormRef.value.setPasswordForm;
      login({
        phoneNumber: codeLoginForm.telephone,
        smsCode: codeLoginForm.code,
        password: encrypt(password1),
      }).then(() => {
        message.success(
          "已成功创建人群优化云服务账号，您的登录账号为" +
            codeLoginForm.telephone
        );
        router.push("/");
      });
    });
  } else if (loginStatus.value == LoginStatusEnum.FORGET_PASSWORD_STEP1) {
    codeLoginFormRef.value.validateFields().then(() => {
      // 验证码通过之后
      const { telephone, code } = codeLoginFormRef.value.codeLoginForm;
      validateCode(telephone, code, LoginStatusEnum.FORGET_PASSWORD_STEP2);
    });
  } else if (loginStatus.value == LoginStatusEnum.FORGET_PASSWORD_STEP2) {
    setPasswordFormRef.value.validateFields().then(() => {
      const { password1 } = setPasswordFormRef.value.setPasswordForm;
      forgetPasswordApi({
        phoneNumber: codeLoginForm.telephone,
        smsCode: codeLoginForm.code,
        password: encrypt(password1),
      }).then((res) => {
        if (res.code == 0) {
          message.success("密码重设成功，请重新登录");
          clearData();
          loginStatus.value = LoginStatusEnum.CODE_LOGIN;
          activeKey.value = LoginStatusEnum.CODE_LOGIN;
          resetAllFields();
        }
      });
    });
  }
}

function forgetPasswordClick() {
  loginStatus.value = LoginStatusEnum.FORGET_PASSWORD_STEP1;
  errorTip.value = "";
}

function jump(path: string) {
  window.open(window.location.origin + router.resolve(path).href);
}
</script>
<style lang="less">
.login-form {
  width: 100%;
  &-term {
    color: #0958d9;
    cursor: pointer;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin-bottom: 32px;
  }
  .error-tip {
    font-size: 14px;
    font-family: Source Han Sans CN, Source Han Sans CN-Regular;
    font-weight: 400;
    color: #ff4d4f;
    position: absolute;
    left: 0;
    top: -22px;
  }
}
.font-14 {
  font-size: 14px;
}
.code-btn {
  margin-left: 32px;
  cursor: pointer;
  color: #bfbfbf;
}
.forget-password {
  position: relative;
  text-align: right;
  top: -22px;

  font-family: Source Han Sans CN, Source Han Sans CN-Regular;
  &-text {
    cursor: pointer;
    color: #2f54eb;
  }
}
</style>
