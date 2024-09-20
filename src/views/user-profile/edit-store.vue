<template>
  <a-modal
    v-model:visible="open"
    title="修改店铺名称"
    @ok="handleOk"
    @cancel="handleCancel"
    width="444px"
    centered
    wrap-class-name="edit-store"
    :confirmLoading="$store.getLoading('post&/dmp/merchant/edit')"
  >
    <a-form autocomplete="off" ref="formRef" :rules="rules" :model="formState">
      <a-form-item label="" name="name">
        <a-input
          v-model:value="formState.name"
          placeholder="请填写要投放广告的店铺准确名称"
          show-count
          :maxlength="20"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getUserInfoApi } from "/@/api/user";
import { useUserStore } from "/@/store/user";
import { updateStoreInfoApi } from "/@/api/home";
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
};
const formState = reactive({
  name: "",
});
const merchantId = ref<number | undefined>(undefined);

const showModal = (storeId: number, name: string) => {
  open.value = true;
  formState.name = name;
  merchantId.value = storeId;
};

function updateUserInfo() {
  getUserInfoApi().then((res) => {
    userStore.setUserInfo(res.data);
    if (res.data.merchantList.length > 0) {
      userStore.setSelectedStoreInfo(res.data.merchantList[0]);
    }
  });
}

const handleOk = (e: MouseEvent) => {
  console.log(e);
  formRef.value.validate().then(() => {
    updateStoreInfoApi({
      merchantID: merchantId.value!,
      merchantName: formState.name,
    }).then(() => {
      open.value = false;
      updateUserInfo();
    });
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
