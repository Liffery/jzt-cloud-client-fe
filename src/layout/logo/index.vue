<template>
  <a class="recommend-logo" @click="() => $router.push('/')">
    <Logo />
    <div class="recommend-title">
      <span class="recommend-title-cn">人群优化云服务</span>
      <span class="recommend-title-en">Guanhe Recommendation</span>
    </div>
  </a>
</template>
<script lang="ts" setup>
import Logo from "/@/assets/logo.svg?component";
</script>
<style lang="less" scoped>
.recommend-logo {
  display: flex;
  align-items: center;
  margin-right: 50px;

  font-size: 20px;
  font-family: PingFang SC-Semibold;
  font-weight: Semibold;
  text-align: left;
  color: #323843;
  line-height: 24px;

  svg {
    margin-right: 8px;
    width: 32px;
  }
}
.recommend-title {
  display: flex;
  flex-direction: column;
  color: #000000;
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
</style>
