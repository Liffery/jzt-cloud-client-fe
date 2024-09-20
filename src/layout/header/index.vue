<template>
  <div class="rock-header-left">
    <r-logo />
    <slot name="left"></slot>
  </div>
  <div class="rock-header-right">
    <slot name="right"></slot>
  </div>
</template>
<script lang="ts" setup>
import { RLogo } from "/@/layout";
</script>
<style lang="less" scoped>
.rock-header {
  &-left {
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC;
    flex: 0 0 auto;
    align-items: center;
  }
  &-right {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }
}
</style>
