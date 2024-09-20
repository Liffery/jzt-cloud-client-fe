<template>
  <a-modal
    v-model:visible="open"
    title="修改商品类目"
    @ok="handleOk"
    @cancel="handleCancel"
    width="444px"
    centered
    wrap-class-name="edit-category"
    :confirmLoading="$store.getLoading('post&/dmp/merchant/edit')"
  >
    <a-form
      autocomplete="off"
      ref="formRef"
      :rules="rules"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
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
      <a-form-item
        :wrapper-col="{ offset: 5, span: 19 }"
        style="margin-top: -8px"
        v-if="isShow"
      >
        <div class="edit-category-tip">
          每隔7天可以修改一次类目，如遇特殊情况可联系客服
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref } from "vue";
import { getUserInfoApi } from "/@/api/user";
import { useUserStore } from "/@/store/user";
import { getCategoryListApi, updateStoreInfoApi } from "/@/api/home";
import type { ShowSearchType } from "ant-design-vue/es/cascader";

const userStore = useUserStore();
const open = ref<boolean>(false);
const isShow = ref<boolean>(false);
const formRef = ref();
const rules = {
  category: [{ required: true, message: "请选择商品类目" }],
};
const categoryOptions = ref([]);
const formState = reactive<{ category: number[] }>({
  category: [],
});
const merchantId = ref<number | undefined>(undefined);
const showModal = async (
  storeId: number,
  categoryId: number,
  isShowTip: boolean
) => {
  open.value = true;
  isShow.value = isShowTip;
  nextTick(() => {
    formRef.value.clearValidate();
  });
  await getCategoryList();
  merchantId.value = storeId;
  formState.category = [categoryId];
};

const handleOk = (e: MouseEvent) => {
  formRef.value.validate().then(() => {
    updateStoreInfoApi({
      merchantID: merchantId.value!,
      categoryID: formState.category[0],
    }).then(() => {
      open.value = false;
      updateUserInfo();
    });
  });
};

const filter: ShowSearchType["filter"] = (inputValue, path) => {
  return path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
};

function handleCancel() {
  formRef.value.clearValidate();
}

function updateUserInfo() {
  getUserInfoApi().then((res) => {
    userStore.setUserInfo(res.data);
    if (res.data.merchantList.length > 0) {
      const id = userStore.getSelectedStoreInfo?.id;
      const selectedStoreInfo = res.data.merchantList.find(
        (item) => item.id == id
      );
      selectedStoreInfo && userStore.setSelectedStoreInfo(selectedStoreInfo);
    }
  });
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
<style lang="less">
.edit-category {
  &-tip {
    opacity: 0.85;
    font-size: 12px;
    font-family: PingFang SC-Regular;
    font-weight: Regular;
    text-align: left;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
  }
}
</style>
