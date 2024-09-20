<template>
  <a-carousel dot-position="top" autoplay>
    <div class="carousel">
      <div class="carousel-content">
        <div class="carousel-content-left">
          <img :src="CarouselImg1" />
        </div>
        <div class="carousel-content-right">
          <div class="carousel-content-right-text1">领先的理论模型</div>
          <div class="carousel-content-right-text2">
            基于图模式等业界领先的自主创新核心理论
          </div>
        </div>
      </div>
    </div>
    <div class="carousel">
      <div class="carousel-content">
        <div class="carousel-content-left">
          <img :src="CarouselImg2" />
        </div>
        <div class="carousel-content-right">
          <div class="carousel-content-right-text1">领先应用模式</div>
          <div class="carousel-content-right-text2">云服务，省时省力</div>
        </div>
      </div>
    </div>
    <div class="carousel">
      <div class="carousel-content">
        <div class="carousel-content-left">
          <img :src="CarouselImg3" />
        </div>
        <div class="carousel-content-right">
          <div class="carousel-content-right-text1">目标清晰</div>
          <div class="carousel-content-right-text2">
            拉新/转化/复购，均可提供对应的能力
          </div>
        </div>
      </div>
    </div>
    <div class="carousel">
      <div class="carousel-content">
        <div class="carousel-content-left">
          <img :src="CarouselImg4" />
        </div>
        <div class="carousel-content-right">
          <div class="carousel-content-right-text1">自动化操作</div>
          <div class="carousel-content-right-text2">
            自动同步人群包到达摩盘，一键投放广告
          </div>
        </div>
      </div>
    </div>
    <div class="carousel">
      <div class="carousel-content">
        <div class="carousel-content-left">
          <img :src="CarouselImg5" />
        </div>
        <div class="carousel-content-right">
          <div class="carousel-content-right-text1">快速复用</div>
          <div class="carousel-content-right-text2">
            可快速复用在各个店铺的各个类目
          </div>
        </div>
      </div>
    </div>
  </a-carousel>
</template>
<script lang="ts" setup>
import CarouselImg1 from "/@/assets/carousel-img1.png";
import CarouselImg2 from "/@/assets/carousel-img2.png";
import CarouselImg3 from "/@/assets/carousel-img3.png";
import CarouselImg4 from "/@/assets/carousel-img4.png";
import CarouselImg5 from "/@/assets/carousel-img5.png";
</script>
<style lang="less" scoped>
.carousel {
  width: 486px;
  padding: 34px 24px;
  background: linear-gradient(
    91deg,
    rgba(255, 255, 255, 0.5) 52%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 16px;
  &-content {
    display: flex;
    align-items: center;
    &-left {
      flex: 0 0 auto;
    }
    &-right {
      margin-left: 16px;
      &-text1 {
        font-size: 32px;
        font-family: PingFang SC-Medium;
        font-weight: Medium;
        text-align: justify;
        color: rgba(29, 46, 71, 0.86);
        line-height: 32px;
      }
      &-text2 {
        margin-top: 16px;
        font-size: 18px;
        font-family: PingFang SC-Regular;
        font-weight: Regular;
        text-align: left;
        color: rgba(29, 46, 71, 0.8);
        line-height: 26px;
      }
    }
  }
}

:deep(.slick-dots-top) {
  width: 240px;
  top: -30px;
  margin: 0;
}

:deep(.slick-dots li) {
  width: 40px;
  background: #fff;
  height: 5px;
}
:deep(.slick-dots li.slick-active) {
  width: 40px;
  background: #1d2e47;
  height: 5px;
  button {
    background: #1d2e47;
  }
}
</style>
