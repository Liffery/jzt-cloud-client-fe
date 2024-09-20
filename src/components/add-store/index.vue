<template>
  <a-modal
    v-model:visible="open"
    title="添加店铺"
    @ok="handleOk"
    @cancel="handleCancel"
    width="444px"
    centered
    wrap-class-name="add-store"
    :confirmLoading="$store.getLoading('conform-loading')"
  >
    <a-form
      autocomplete="off"
      ref="formRef"
      :rules="rules"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="店铺名称" name="name">
        <a-input
          v-model:value="formState.name"
          placeholder="请填写要投放广告的店铺准确名称"
          show-count
          :maxlength="20"
        />
      </a-form-item>
      <a-form-item label="商品类目" name="category">
        <a-cascader
          v-model:value="formState.category"
          :options="categoryOptions"
          placeholder="请选择要推广的商品一级类目"
          :show-search="{ filter }"
          expand-trigger="hover"
          change-on-select
        >
          <template #displayRender="{ labels }">
            <span v-for="(label, index) in labels" :key="index">
              <span v-if="index === 0">
                {{ label }}
              </span>
            </span>
          </template>
        </a-cascader>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getCategoryListApi, addStoreApi } from "/@/api/home";
import { getUserInfoApi } from "/@/api/user";
import { useUserStore } from "/@/store/user";
import type { ShowSearchType } from "ant-design-vue/es/cascader";
const userStore = useUserStore();
const open = ref<boolean>(false);
const formRef = ref();
const rules = {
  name: [
    { required: true, message: "请输入店铺名称" },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
      message: "仅可以输入中文，英文，数字",
    },
  ],
  category: [{ required: true, message: "请选择商品类目" }],
};
const formState = reactive({
  name: "",
  category: [],
});
const categoryOptions = ref([]);
const showModal = () => {
  getCategoryList();
  open.value = true;
  Object.assign(formState, {
    name: "",
    category: [],
  });
};
function getCategoryList() {
  return getCategoryListApi().then((res) => {
    categoryOptions.value = res.data.categoryList.map((item) => {
      return {
        value: item.id,
        label: item.categoryName,
        children: (item.childrenCategory || []).map((childrenCategoryItem) => {
          return {
            value: childrenCategoryItem.id,
            label: childrenCategoryItem.categoryName,
          };
        }),
      };
    });
  });
}

const filter: ShowSearchType["filter"] = (inputValue, path) => {
  return path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
};
const handleOk = (e: MouseEvent) => {
  formRef.value.validate().then(async () => {
    await addStoreApi({
      merchantName: formState.name,
      categoryID: Number(formState.category[0]),
    });
    getUserInfoApi().then((res) => {
      userStore.setUserInfo(res.data);
      userStore.setSelectedStoreInfo(res.data.merchantList[0]);
    });
    open.value = false;
  });
};

function handleCancel() {
  formRef.value.clearValidate();
}

defineExpose({
  showModal,
});
</script>
<style lang="less" scoped></style>
