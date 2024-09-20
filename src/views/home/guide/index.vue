<template>
  <div class="home-guide">
    <header class="home-guide-header">
      <span class="home-guide-header-title">开始使用人群优化服务</span>
      <span @click="handleExpand">
        <span class="home-guide-header-btn" v-if="open">
          <UpOutlined class="home-guide-header-btn-icon" />
          <span class="home-guide-header-btn-text">收起</span>
        </span>
        <span class="home-guide-header-btn" v-else>
          <DownOutlined class="home-guide-header-btn-icon" />
          <span class="home-guide-header-btn-text">展开</span>
        </span>
      </span>
    </header>
    <main class="home-guide-main" v-show="open">
      <a-image-preview-group>
        <a-row :gutter="18">
          <a-col class="gutter-row" :span="8">
            <div class="gutter-box">
              <div class="gutter-box-title">
                <span class="gutter-box-title-num">1</span
                >&nbsp;&nbsp;签订服务协议
              </div>
              <div class="gutter-box-content">
                根据阿里巴巴规定，在阿里妈妈营销拍档（amp.taobao.com）找到目标服务商的“数据营销”服务订购页面，如P1所示；填写完相关信息后，【确定下单】>>【服务商收到订单后，处理】>>【与客户签约】，如P2
                所示
              </div>
              <div class="gutter-box-img">
                <a-image width="100%" :src="imageSrc[0]" />
                <a-image
                  width="100%"
                  :src="imageSrc[1]"
                  style="margin-top: 12px"
                />
              </div>

              <div class="gutter-box-btn">
                <a-button
                  type="primary"
                  v-if="storeInfo?.authorization === 0"
                  @click="
                    jump(
                      'https://amp.taobao.com/?mxreload=7783615344680512#!/search/servicedetail?id=22102&mxreload='
                    )
                  "
                  >去签订服务协议</a-button
                >
                <span
                  class="gutter-box-btn-success"
                  v-else-if="
                    storeInfo?.authorization === 1 ||
                    storeInfo?.authorization === 2 ||
                    storeInfo?.authorization === 3
                  "
                  ><CheckCircleFilled style="color: #52c41a" />
                  <span style="color: #1677ff; margin-left: 6px"
                    >已签订协议</span
                  >
                </span>
              </div>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <div class="gutter-box">
              <div class="gutter-box-title">
                <span class="gutter-box-title-num">2</span
                >&nbsp;&nbsp;授权达摩盘
              </div>
              <div class="gutter-box-content">
                完成第1步后，请等待我们发起数据授权申请，在【消息中心】即可收到【元工厂授权申请】如
                P3
                所示；点击消息，勾选【我已阅读协议内容并同意】，再点击【确定按钮】，如
                P4 所示
              </div>
              <div class="gutter-box-img">
                <a-image width="100%" :src="imageSrc[2]" />
                <a-image
                  width="100%"
                  :src="imageSrc[3]"
                  style="margin-top: 12px"
                />
              </div>

              <div class="gutter-box-btn">
                <a-button v-if="storeInfo?.authorization === 0"
                  >待同意授权</a-button
                >
                <a-button
                  type="primary"
                  v-else-if="
                    storeInfo?.authorization === 1 ||
                    storeInfo?.authorization === 3
                  "
                  @click="
                    jump(
                      'https://dmp.taobao.com/?spm=a2e117.13868764.cfa93e800.dd623979e.6adf3aado0D8It'
                    )
                  "
                  >去授权达摩盘</a-button
                >
                <span
                  class="gutter-box-btn-success"
                  v-else-if="storeInfo?.authorization === 2"
                  ><CheckCircleFilled style="color: #52c41a" />
                  <span style="color: #1677ff; margin-left: 6px"
                    >已完成授权</span
                  >
                </span>
              </div>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <div class="gutter-box">
              <div class="gutter-box-title">
                <span class="gutter-box-title-num">3</span
                >&nbsp;&nbsp;采纳人群包
              </div>
              <div class="gutter-box-content">
                人群包预计需要3天左右计算，在达摩盘消息中心可收到通知，需要采纳人群包后，方可同步到引力魔方进行广告投放
              </div>
              <div class="gutter-box-img">
                <a-image width="100%" :src="imageSrc[4]" />
                <a-image
                  width="100%"
                  :src="imageSrc[5]"
                  style="margin-top: 12px"
                />
              </div>

              <div class="gutter-box-btn">
                <a-button
                  v-if="
                    storeInfo?.authorization === 0 ||
                    storeInfo?.authorization === 1 ||
                    storeInfo?.authorization === 3
                  "
                  >待采纳人群包</a-button
                >
                <a-button
                  type="primary"
                  v-else-if="storeInfo?.authorization === 2"
                  @click="
                    jump(
                      'https://dmp.taobao.com/index_new.html#!/services/custom'
                    )
                  "
                >
                  采纳人群包</a-button
                >
              </div>
            </div>
          </a-col>
        </a-row>
      </a-image-preview-group>
    </main>
  </div>
</template>
<script lang="ts" setup>
import {
  UpOutlined,
  DownOutlined,
  CheckCircleFilled,
} from "@ant-design/icons-vue";
import { ref, watch, computed } from "vue";
import Demo1 from "/@/assets/P1.png";
import Demo2 from "/@/assets/P2.png";
import Demo3 from "/@/assets/P3.png";
import Demo4 from "/@/assets/P4.png";
import Demo5 from "/@/assets/P5.jpg";
import Demo6 from "/@/assets/P6.jpg";
import { useUserStore } from "/@/store/user";
const userStore = useUserStore();
const storeInfo = computed(() => {
  return userStore.getSelectedStoreInfo;
});
const emit = defineEmits(["update:visible"]);
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const open = ref(props.visible);

watch(
  () => props.visible,
  (newValue) => {
    open.value = newValue;
  }
);
const imageSrc = [Demo1, Demo2, Demo3, Demo4, Demo5, Demo6];
function handleExpand() {
  open.value = !open.value;
  emit("update:visible", open.value);
}

function jump(href: string) {
  window.open(href, "_blank");
}
</script>
<style lang="less" scoped>
.home-guide {
  background-color: #fff;
  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92px;
    background-image: url("/@/assets/bg.png");
    background-size: cover;
    background-position: 50% 50%;
    border-radius: 3px 0px 0px 3px;
    padding: 0 32px 0 24px;
    &-title {
      opacity: 0.85;
      font-size: 24px;
      font-family: PingFang SC-Medium;
      font-weight: 500;
      color: #000000;
      line-height: 32px;
    }
    &-btn {
      opacity: 0.65;
      font-size: 14px;
      font-family: PingFang SC-Regular;
      color: #002066;
      cursor: pointer;
      &-icon {
        font-size: 8px;
      }
      &-text {
        margin-left: 8px;
      }
    }
  }
  &-main {
    padding: 0px 24px 32px;
    .gutter-box {
      background-color: #e9f4ff;
      min-height: 650px;
      height: calc(100vh - 236px);
      padding: 24px 28px;
      &-title {
        font-size: 18px;
        font-family: PingFang SC-Medium;
        font-weight: Medium;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        line-height: 26px;

        &-num {
          opacity: 0.65;
          font-size: 20px;
          font-family: Helvetica Neue, Helvetica Neue-Regular;
          font-weight: Regular;
          text-align: center;
          color: #000000;
          line-height: 23px;
          font-style: italic;
        }
      }
      &-img {
        max-height: calc(100% - 194px);
        overflow-y: auto;
      }
      &-content {
        margin-top: 10px;
        min-height: 40px;
        max-height: 180px;
        opacity: 0.65;
        font-size: 14px;
        font-family: PingFang SC-Regular;
        font-weight: Regular;
        text-align: justify;
        color: #160101;
        line-height: 20px;
        word-break: break-all;
        margin-bottom: 24px;
      }
      &-btn {
        margin-top: 32px;
        text-align: center;

        &-success {
          padding: 0 16px;
          display: inline-block;
          line-height: 32px;
          height: 32px;
          background: rgba(22, 119, 255, 0.1);
          border: 1px solid rgba(0, 0, 0, 0);
          border-radius: 6px;
          box-shadow: 0px 0px 12px 0px rgba(5, 25, 53, 0.28);
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
}

@media (max-width: 575.98px) {
  .gutter-box-content {
    height: 180px;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .gutter-box-content {
    height: 180px;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .gutter-box-content {
    height: 160px;
  }
}

@media (min-width: 992px) and (max-width: 1399.98px) {
  .gutter-box-content {
    height: 120px;
  }
}

@media (min-width: 1400px) {
  .gutter-box-content {
    height: 70px;
  }
}
</style>
