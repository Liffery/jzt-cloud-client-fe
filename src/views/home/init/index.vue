<template>
  <div class="home-init">
    <div class="home-init-content">
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        autocomplete="off"
        :rules="rules"
      >
        <a-form-item :wrapper-col="{ offset: 5, span: 19 }">
          <div class="home-init-content-title">请添加淘宝店铺</div>
        </a-form-item>
        <a-form-item label="店铺名称" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="请填写要投放广告的淘宝店铺名称"
            show-count
            :maxlength="20"
          />
        </a-form-item>

        <a-form-item
          label="商品类目"
          name="category"
          style="position: relative"
        >
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
          <div class="home-init-content-tip">
            <a-tooltip placement="right">
              <template #title>
                选择淘宝官方一级商品类目，例如推广目标是护肤产品，则选择护肤的一级商品类目：美容护肤/美体/精油
              </template>
              <QuestionCircleOutlined
                style="font-size: 16px; color: rgba(0, 0, 0, 0.45)"
              />
            </a-tooltip>
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 5, span: 19 }">
          <a-button
            type="primary"
            @click="submit"
            :loading="$store.getLoading('conform-loading')"
            >提交</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { getCategoryListApi, addStoreApi } from "/@/api/home";
import { getUserInfoApi } from "/@/api/user";
import { useUserStore } from "/@/store/user";
import type { ShowSearchType } from "ant-design-vue/es/cascader";

interface FormState {
  name: string;
  category: string[];
}

const userStore = useUserStore();
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
const formState = reactive<FormState>({
  name: "",
  category: [],
});

const categoryOptions = ref([]);
const formRef = ref();
const submit = () => {
  formRef.value.validate().then(async () => {
    await addStoreApi({
      merchantName: formState.name,
      categoryID: Number(formState.category[0]),
    });
    getUserInfoApi().then((res) => {
      userStore.setUserInfo(res.data);
      userStore.setSelectedStoreInfo(res.data.merchantList[0]);
    });
  });
};

const filter: ShowSearchType["filter"] = (inputValue, path) => {
  return path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
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

onMounted(() => {
  getCategoryList();
});
</script>
<style lang="less" scoped>
.home-init {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-content {
    width: 400px;
    &-title {
      font-size: 24px;
      font-family: PingFang SC-Medium;
      font-weight: Medium;
      text-align: left;
      color: #1d2129;
      line-height: 24px;
    }
    &-tip {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -22px;
    }
  }
}
</style>
