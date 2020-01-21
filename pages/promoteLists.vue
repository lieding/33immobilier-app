<template>
  <div>
    <Header :class="{colors:flag}"></Header>
    <div class="headline centerS">
      <span>{{$t("message.global.home")}}</span> /
      <span>{{$t("message.global.instrument")}}</span>
      <promoteLists />
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/PcIndex/moduleT/header.vue";
import Footer from "@/components/PcIndex/moduleT/foot.vue";
import promoteLists from "@/components/PcIndex/promoteList.vue";
// import Footer from "@/components/MIndex/common/footer.vue";
// var echarts = require("echarts");
export default {
  components: {
    Header,
    Footer,
    promoteLists
  },
  data() {
    return {
      flag: true
    };
  }
};
</script>

<style lang="less" scoped>
.colors {
  color: #000 !important;
}
.headline {
  padding-top: 10px;
  color: #000;
  font-size: 16px;
  span {
    cursor: pointer;
  }
}
</style>