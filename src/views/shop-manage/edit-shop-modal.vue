<template>
  <a-modal
    v-model:visible="open"
    :title="formState.id ? '编辑店铺' : '添加店铺'"
    @ok="handleOk"
    @cancel="handleCancel"
    width="500px"
    centered
    wrap-class-name="edit-store"
    :confirmLoading="
      $store.getLoading(
        formState.id
          ? `put&/mock/dmp/merchant/${formState.id}`
          : 'post&/mock/dmp/merchant'
      )
    "
  >
    <a-form
      autocomplete="off"
      ref="formRef"
      :rules="rules"
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 17 }"
    >
      <a-form-item label="店铺名称" name="merchantName">
        <a-input
          v-model:value="formState.merchantName"
          placeholder="请填写要投放广告的店铺准确名称"
          show-count
          :maxlength="20"
          :disabled="!!formState.id"
        />
      </a-form-item>
      <a-form-item label="商品类目" name="categoryIdList">
        <a-cascader
          v-model:value="formState.categoryIdList"
          :options="categoryOptions"
          placeholder="请选择要推广的商品一级类目"
          :show-search="{ filter }"
          :disabled="!!formState.id"
        >
        </a-cascader>
      </a-form-item>
      <a-form-item label="达摩盘账号" name="account">
        <a-input
          v-model:value="formState.account"
          placeholder="请输入账号"
          show-count
          :maxlength="20"
        />
      </a-form-item>
      <a-form-item label="达摩盘密码" name="password">
        <a-input-password
          v-model:value="formState.password"
          placeholder="请输入密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref } from "vue";
import { getUserInfoApi } from "/@/api/user";
import { useUserStore } from "/@/store/user";
import {
  addStoreApi,
  updateStoreInfoApi,
  getCategoryListApi,
} from "/@/api/home";
import type { ShowSearchType } from "ant-design-vue/es/cascader";
import { StoreInfo } from "./types";
const userStore = useUserStore();
const open = ref<boolean>(false);
const categoryOptions = ref([]);
const formRef = ref();
const filter: ShowSearchType["filter"] = (inputValue, path) => {
  return path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
};
const rules = {
  merchantName: [
    { required: true, message: "请输入店铺名称" },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
      message: "仅可以输入中文，英文，数字",
    },
  ],
  categoryIdList: [{ required: true, message: "请选择要推广的商品二级类目" }],
  account: [{ required: true, message: "请输入账号" }],
  password: [{ required: true, message: "请输入密码" }],
};
const formState = reactive<StoreInfo>({
  id: undefined,
  merchantName: "",
  categoryIdList: [],
  account: "",
  password: "",
});
const emit = defineEmits(["refresh"]);
const showModal = async (storeInfo?: StoreInfo) => {
  if (storeInfo) {
    Object.assign(formState, {
      ...storeInfo,
    });
  }
  open.value = true;
  nextTick(() => {
    formRef.value.clearValidate();
  });
  await getCategoryList();
};

const handleOk = (e: MouseEvent) => {
  formRef.value.validate().then(async () => {
    const { merchantName, categoryIdList, account, password, id } = formState;
    if (id) {
      await updateStoreInfoApi(id, {
        account,
        password,
      });
    } else {
      await addStoreApi({
        merchantName,
        categoryIdList,
        account,
        password,
      });
    }
    emit("refresh");
    open.value = false;
  });
};
function initForm() {
  Object.assign(formState, {
    id: undefined,
    merchantName: "",
    categoryIdList: [],
    account: "",
    password: "",
  });
}
function handleCancel() {
  formRef.value.resetFields();
  initForm();
}
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
defineExpose({
  showModal,
});
</script>
<style lang="less" scoped></style>
