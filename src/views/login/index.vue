<template>
  <div class="login">
    <div class="login__wrap">
      <header class="login__head">
        <div class="login__head-left">
          <Logo1Svg />
          <div class="login__head-title">
            <span class="login__head-title-cn">人群优化云服务</span>
            <span class="login__head-title-en">Guanhe Recommendation</span>
          </div>
        </div>
        <!-- <div class="login__head-right">
          <span class="login__head-right-text text1">文档中心</span>
          <span class="login__head-right-text">关于我们</span>
        </div> -->
      </header>
      <main class="login__main">
        <section class="login__content">
          <div class="login__content-inner">
            <div class="login__content-left">
              <div>
                <h2>人群优化</h2>
                <div class="login__content-left-introduce">
                  针对在阿里达摩盘/引力魔方的广告投放，用大模型提供最有可能购买的人群包，自动化全流程操作，提升ROl效果！
                </div>
              </div>
              <CarouselComp></CarouselComp>
            </div>
            <div class="login__content-right">
              <LoginFormComp></LoginFormComp>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, UnwrapRef } from "vue";
import encrypt from "/@/utils/aes";
import { useRoute, useRouter } from "vue-router";
import { localStorage } from "/@/utils/use";
import { TOKEN_KEY, USER_KEY } from "/@/constant/AppEnum";
import { PageEnum } from "/@/constant/PageEnum";
import Logo1Svg from "/@/assets/logo1.svg?component";
import LoginFormComp from "./login-form.vue";
import CarouselComp from "./carousel.vue";
interface FormState {
  username: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  components: {
    Logo1Svg,
    CarouselComp,
    LoginFormComp,
  },
  setup() {
    const router = useRouter();
    const prefixCls = "login";
    const route = useRoute();

    const formState: UnwrapRef<FormState> = reactive({
      username: "",
      password: "",
    });
    function goHomePage() {
      router.push(PageEnum.BASE_HOME);
    }

    return {
      prefixCls,
      formState,
    };
  },
});
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  overflow: auto;

  &__wrap {
    min-height: 600px;
    min-width: 1200px;
    height: 100%;
    width: 100%;
    position: relative;
  }
  &__main {
    width: 100%;
    height: calc(100% - 66px);
    background: url("../../assets/login-bg.jpg") no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
}

.login__content {
  padding: 0 280px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 492px;
  &-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-icon {
    margin-right: 8px;
  }
  &-left {
    max-width: 486px;
    min-width: 324px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      font-size: 42px;
      font-family: PingFang SC-Semibold;
      font-weight: Semibold;
      text-align: left;
      color: #1d2e47;
      line-height: 60px;
      margin-bottom: 24px;
    }

    &-introduce {
      max-width: 409px;
      font-size: 18px;
      font-family: PingFang SC-Regular;
      font-weight: Regular;
      text-align: justify;
      color: rgba(29, 46, 71, 0.8);
      line-height: 24px;
    }
  }
  &-right {
    margin-left: 32px;
    width: 480px;
    padding: 32px 40px;
    background-color: #fff;
    flex: 0 0 480px;
    // height: 438px;
  }
}
.login__form {
  margin: 0 24px;
}
.login__btn {
  width: 100%;
}
.login__head {
  background: #021b36;
  box-shadow: 0px 2px 24px 0px rgba(28, 64, 103, 0.24);
  padding: 16px 280px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-left {
    display: flex;
    align-items: center;
  }
  &-right {
    &-text {
      font-size: 14px;
      font-family: PingFang SC-Medium;
      font-weight: Medium;
      color: #ffffff;
      line-height: 22px;
      cursor: pointer;
    }
    .text1 {
      margin-right: 32px;
    }
  }
  &-title {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    color: #fff;
    &-cn {
      font-weight: 600;
      font-size: 18px;
      line-height: 18px;
      margin-bottom: 4px;
    }
    &-en {
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
