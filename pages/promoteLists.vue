<template>
  <div>
    <Header :class="{ colors: flag }"></Header>
    <div class="headline centerS">
      <span>{{ $t("message.global.home") }}</span> /
      <span>{{ $t("message.global.instrument") }}</span>
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
  middleware: "responsive",
  components: {
    Header,
    Footer,
    promoteLists
  },
  head() {
    return {
      title:
        "法国房贷计算器_法国购房工具_贷款能力_还贷能力_月供计算,33immobilier|33找房-法国第一华人找房平台",
      meta: [
        {
          name: "description",
          content:
            "33找房购房工具频道,为您提供法国在线买房贷款计算器,包括计算贷款额度,贷款能力,还贷计算器,计算月供。了解贷款能力,评估贷款状况,法国申请贷款就上法国33找房全程为您服务"
        },
        {
          name: "keywords",
          content:
            "贷款能力计算器,法国贷款,计算贷款额度,法国贷款能力,法国如何贷款,还贷计算器,月供计算器,了解贷款能力,评估贷款状况,法国申请贷款"
        }
      ]
    };
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
