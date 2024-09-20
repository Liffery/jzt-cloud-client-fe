<template>
  <div class="recharge">
    <header class="recharge-header">
      <span class="recharge-header-title">请选择服务版本</span>
    </header>
    <main class="recharge-main">
      <div class="container">
        <div class="gutter-row">
          <div class="gutter-box box0">权益对比</div>
        </div>
        <div class="gutter-row" :span="6">
          <div class="gutter-box box1">
            <div class="gutter-box-title title1">试用版</div>
            <div class="gutter-box-content content1">7天免费试用</div>
            <div class="gutter-box-desc">
              每个店铺仅可享受1次试用体验，切换新账号无效
            </div>
            <div class="gutter-box-btn">立即试用</div>
          </div>
        </div>
        <div class="gutter-row" :span="6">
          <div class="gutter-box box2">
            <div class="gutter-box-title title2">标准版</div>
            <div class="gutter-box-content content2">
              <span class="content2-text1">
                ¥ <span style="font-size: 24px">756.00</span>/年
              </span>
              <span class="content2-text2"> ¥ <span>90.00</span>/月 </span>
            </div>
            <div class="gutter-box-desc">比月付价格优惠30%</div>
            <div class="gutter-box-btn">付费购买</div>
          </div>
        </div>
        <div class="gutter-row" :span="6">
          <div class="gutter-box box3">
            <div class="gutter-box-title title3">升级版</div>
            <div class="gutter-box-content content3">
              <span class="content2-text1 content3">
                ¥ <span style="font-size: 24px">1512.00</span>/年
              </span>
              <span class="content2-text2 content3">
                ¥ <span>180.00</span>/月
              </span>
            </div>
            <div class="gutter-box-desc content3">比月付价格优惠30%</div>
            <div class="gutter-box-btn">付费购买</div>
          </div>
        </div>
      </div>

      <a-table
        class="recharge-main-table"
        size="large"
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :show-header="false"
        :row-class-name="
          (_record, index) => (index % 2 === 0 ? 'table-striped' : undefined)
        "
      >
        <template #bodyCell="{ text, index }">
          <CloseCircleFilled
            v-if="text == '' && index != 4"
            style="color: red; font-size: 18px"
          />
          <span v-else>{{ text }}</span>
        </template>
      </a-table>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { CloseCircleFilled } from "@ant-design/icons-vue";
const sharedOnCell = (_, index) => {
  if (index === 4) {
    return { colSpan: 0 };
  }
};
const columns: any[] = [
  {
    title: "可添加店铺数量",
    dataIndex: "leftTitle",
    key: "leftTitle",
    width: "25%",
  },
  {
    title: "试用版",
    dataIndex: "trialVersion",
    key: "trialVersion",
    width: "25%",
    customCell: (_, index) => ({
      colSpan: index == 4 ? 3 : 1,
    }),
  },
  {
    title: "标准版",
    dataIndex: "standardEdition",
    key: "standardEdition",
    width: "25%",
    customCell: sharedOnCell,
  },
  {
    title: "升级版",
    dataIndex: "upgradedVersion",
    key: "upgradedVersion",
    width: "25%",
    customCell: sharedOnCell,
  },
];
const data = [
  {
    leftTitle: "可添加店铺数量",
    trialVersion: "最多可以添加 1 个店铺",
    standardEdition: "最多可以添加 3 个店铺",
    upgradedVersion: "最多可以添加 5 个店铺",
  },
  {
    leftTitle: "专业顾问服务",
    trialVersion: "",
    standardEdition: "1对1专业顾问服务",
    upgradedVersion: "1对1专业顾问服务",
  },
  {
    leftTitle: "私域渠道",
    trialVersion: "",
    standardEdition: "",
    upgradedVersion: "添加私域渠道特征，人群更加精准",
  },
  {
    leftTitle: "自定义SQL人群包",
    trialVersion: "",
    standardEdition: "",
    upgradedVersion: "支持更加灵活自定义的SQL人群包",
  },
  {
    leftTitle: "服务方式（各版本相同）",
    trialVersion:
      "基于阿里妈妈元工厂能力，通过数据分析方法获得最有可能转化的人群包结果。需要您在阿里妈妈营销拍档与我们签订服务协议。",
    standardEdition: "",
    upgradedVersion: "",
  },
];
</script>
<style lang="less" scoped>
.recharge {
  &-header {
    // margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92px;
    border-radius: 3px 0px 0px 3px;
    padding: 0 32px 0 24px;
    background-color: #fff;
    background-image: url("/@/assets/bg.png");
    background-size: cover;
    background-position: 50% 50%;
    &-title {
      opacity: 0.85;
      font-size: 18px;
      font-family: PingFang SC-Medium;
      font-weight: 500;
      color: #000000;
      line-height: 32px;
    }
  }
  &-main {
    min-height: 420px;
    overflow: auto;
    height: calc(100vh - 204px);
    background-color: #fff;
    padding: 0px 24px 24px;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: stretch; /* 使元素高度一致 */
      gap: 12px; /* 元素之间的间距 */
    }
    .gutter-row {
      width: 25%;
      flex: 1; /* 使每个元素占据相同的空间 */
      box-sizing: border-box; /* 包含内边距和边框在内的宽度和高度 */
    }
    .gutter-box {
      padding: 32px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-title {
        font-size: 24px;
        font-family: PingFang SC-Semibold;
        text-align: center;
        line-height: 32px;
        text-align: center;
      }
      &-desc {
        margin-top: 4px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: Regular;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
        text-align: left;
      }
      &-btn {
        width: 100%;
        margin-top: 16px;
        line-height: 50px;
        background: #ffffff;
        border-radius: 4px;
        opacity: 0.85;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: Medium;
        text-align: center;
        color: #7e4f1a;
        cursor: pointer;
        &:hover {
          background: linear-gradient(90deg, #f8ab34, #cf7423);
          color: #ffffff;
        }
      }
      &-content {
        margin-top: 24px;
        line-height: 32px;
        min-height: 32px;
      }
      .content1 {
        opacity: 0.85;
        font-size: 18px;
        font-family: PingFang SC-Medium;
        color: #000000;
        line-height: 32px;
      }
      .content2 {
        line-height: 32px;
        &-text1 {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: Medium;
          text-align: left;
          color: #27241f;
        }
        &-text2 {
          margin-left: 16px;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: Regular;
          text-align: center;
          color: #27241f;
        }
      }
      .content3 {
        color: #f5d6ac;
      }
    }
    &-table {
      margin-top: 24px;
      :deep(.table-striped) {
        background-color: #fafbfc;
      }
    }

    .box0 {
      opacity: 0.6;
      background: rgba(22, 119, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.85;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Semibold;
      font-weight: Semibold;
      text-align: left;
      color: #000000;
      height: 100%;
    }
    .box1 {
      background-color: #f5f7fb;
    }
    .box2 {
      background-color: #ffe1be;
    }
    .box3 {
      background-color: #2b3898;
      color: #f5d6ac;
    }
    .title1 {
      opacity: 0.85;
      color: #000000;
    }
    .title2 {
      opacity: 0.85;
      color: #000000;
    }
    .title3 {
      opacity: 0.85;
      color: #ffe1be;
    }
  }
}
</style>
