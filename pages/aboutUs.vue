<template>
  <div class="aboutUs">
    <headers :class="{ colors: flag }"></headers>
    <div class="centerSsss seconBrok">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.AboutUs") }}</span>
      </div>
      <div class="oductions">{{ $t("message.global.AboutUs") }}</div>
      <div class="bodySs">
        <div class="leftSs">
          <img :src="img.title" alt />
        </div>
        <div class="rightSs">
          <!-- <div></div> -->
          <!-- <img style="height:104px;margin-bottom:22px;" :src="img.logoT" alt=""> -->
          <p>{{ $t("message.global.AboutUsconten") }}</p>
          <p>{{ $t("message.global.AboutMilliome") }}</p>
          <p>{{ $t("message.global.AboutUsMilliome") }}</p>
        </div>
      </div>
    </div>
    <foots></foots>
  </div>
</template>

<script>
import headers from "@/components/PcIndex/moduleT/header.vue";
import foots from "@/components/PcIndex/moduleT/foot.vue";

import title from "@/assets/image/aboutus.png";
import logoT from "@/assets/image/logoTTT.png";

export default {
  name: "aboutUs",
  middleware: "responsive",
  components: {
    headers,
    foots
  },
  data() {
    return {
      flag: true,
      img: {
        title,
        logoT
        // authentication, proVip,visitCard,phone,email,wxInd
      }
    };
  },
  created() {
    // this.get()
    //console.log('123asd')
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.centerSsss {
  width: 1360px;
  margin: 0 auto;
}
.colors {
  color: #000 !important;
}
.seconBrok {
  .headline {
    padding-top: 10px;
    color: #000;
    font-size: 16px;
    span {
      cursor: pointer;
    }
  }
  .oductions {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    padding: 16px;
    padding-bottom: 30px;
  }
}
.bodySs {
  overflow: hidden;
}
.leftSs {
  float: left;
  img {
    width: 647px;
  }
}
.rightSs {
  float: left;
  padding-left: 59px;
  width: 629px;
  p {
    font-size: 24px;
    line-height: 40px;
    margin-bottom: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
  }
}
</style>
