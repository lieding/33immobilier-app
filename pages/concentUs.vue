<template>
  <div class="concentUs">
    <headers :class="{ colors: flag }"></headers>
    <div class="centerS" style=";height:600px;padding-top:40px;">
      <div
        style="font-size:48px;font-weight:600;padding:27px 0;"
      >{{ $t("message.global.relation") }}</div>
      <div style="float:left;">
        <div style="margin-bottom:30px">
          <el-input
            :placeholder="$t('message.global.YourName')"
            prefix-icon="el-icon-s-custom"
            v-model="input2"
          ></el-input>
        </div>
        <div style="margin-bottom:30px">
          <el-input
            :placeholder="$t('message.global.YourMessage')"
            prefix-icon="el-icon-message"
            v-model="input23"
          ></el-input>
        </div>
        <div style="margin-bottom:30px">
          <el-input
            :placeholder="$t('message.global.YourPhone')"
            prefix-icon="el-icon-phone"
            v-model="input24"
          ></el-input>
        </div>
      </div>
      <div style="float:left;margin-left:40px;width:467px;height:164px;">
        <el-input
          type="textarea"
          :placeholder="$t('message.global.LeaveYourMessage')"
          size="medium"
          v-model="input25"
          show-word-limit
        ></el-input>
        <div
          style="
                height:64px;
                display:inline-block;
                line-height:62px;
                text-align:center;
                background-color:#234DD4;
                cursor: pointer;
                color:#fff;
                font-size:24px;
                width:170px;
                margin-top:28px;
                "
          @click="contactUs"
        >{{ $t("message.global.sure") }}</div>
      </div>
      <!-- <div style="height:60px;font-size:20px;color:#fff;background-color:rgb(36,84,218);margin-top:25px;text-align:center;line-height:60px; cursor: pointer;">发送消息</div> -->
    </div>
    <foots></foots>
  </div>
</template>

<script>
import headers from "~/components/pcindex/header.vue";
import foots from "~/components/pcindex/foot.vue";

export default {
  name: "concentUs",
  middleware: "responsive",
  components: {
    headers,
    foots
  },
  head() {
    return {
      title: "联系我们,33immobilier|33找房-法国第一华人找房平台",
      meta: [
        {
          name: "description",
          content:
            "法国33找房为您提供法国房产、房价、投资、减税、生活服务等信息。在法国,寻找新房、二手房、租房、服务就上法国33找房! 全法最专业的华人找房平台"
        },
        {
          name: "keywords",
          content:
            "法国找房平台,新房,二手房,租房,装修,保洁,服务,投资,减税,楼盘,法国购房,法国房产,法国租房,法国房地产网,个人急售二手房,33找房,PINEL,LMNP"
        }
      ]
    };
  },
  data() {
    return {
      input2: "",
      input23: "",
      input24: "",
      input25: "",
      id: this.$route.query.id,
      apartmentId: this.$route.query.apartmentId,
      flag: true
    };
  },
  methods: {
    async contactUs() {
      const as = {
        userName: this.input2,
        email: this.input23,
        phone: this.input24,
        content: this.input25,
        type: 3,
        apartmentId: this.apartmentId,
        id: this.id
      };
      const getInfoNewHousInfo = (await this.$api.article.SendEmaila(as)).data;
      if (getInfoNewHousInfo.code == 0) {
        //console.log(getInfoNewHousInfo.data)
        this.$message({
          message: "success",
          type: "success"
        });
      } else {
        this.$message({
          message: getInfoNewHousInfo.msg,
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.colors {
  color: #000 !important;
}
</style>

<style lang="scss">
.concentUs {
  .el-input__icon {
    line-height: 64px;
  }
  .el-icon-s-custom:before,
  .el-icon-message:before,
  .el-icon-phone:before {
    font-size: 24px;
    // line-height:44px;
    margin-top: 3px;
    color: blue;
  }
  .el-input__inner {
    font-weight: 400;
    width: 470px;
    font-size: 26px;
    background-color: #f0f0f0;
  }
  .el-textarea__inner {
    font-size: 24px;
    background-color: #f0f0f0;
    // height：170px !important;
    height: 155px !important;
  }
}
</style>
