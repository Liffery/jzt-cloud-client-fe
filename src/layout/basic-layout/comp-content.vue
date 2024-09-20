<template>
  <section class="basic-layout__container">
    <section class="basic-layout__content">
      <router-view v-slot="{ Component }">
        <keep-alive :include="tagNames">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </section>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useKeepAliveStore } from "/@/store/keep-alive";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "LayoutContent",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const keepAliveStore = useKeepAliveStore();

    const tagNames = computed(() => keepAliveStore.getTagNames);

    watch(
      () => route.meta?.isKeepAlive,
      (newValue) => {
        if (
          route.name &&
          newValue &&
          !tagNames.value.includes(route.name as string)
        ) {
          keepAliveStore.addTagName(route.name);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    return {
      tagNames,
    };
  },
});
</script>
<style scoped lang="less">
@prefix-cls: ~"basic-layout";
@paddingWight: 24px;
@minWidth: 800px;

.@{prefix-cls}__container {
  padding: @paddingWight;
  display: flex;
  height: calc(100vh - 64px);
  min-height: 600px;
  min-width: @minWidth;
}

.@{prefix-cls}__content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}
</style>
