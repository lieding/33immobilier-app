<template>
  <div class="broker">
    <headers :class="{ colors: flag }"></headers>
    <div class="centerS seconBrok">
      <div class="headline">
        <span>
          <span @click="goHome">{{ $t("message.global.home") }}</span>
        </span>
        /
        <span>{{ $t("message.global.agent") }}</span>
      </div>
      <div class="oductions">{{ $t("message.global.Platform") }}</div>
      <div class="selectSm">
        <div style="margin-bottom:20px;">
          <span
            style="width:193px;display:inline-block;font-size:20px;color:#000;font-weight:600;text-align:left;"
            >{{ $t("message.global.searchAgent") }}</span
          >
          <div style="display:inline-block">
            <el-input placeholder v-model="name"></el-input>
            <span
              @click="getAgentListJJ"
              style="display:inline-block;
                        height:36px;padding:0 12px;
                        box-sizing:border-box;background-color:#214ED4;
                        font-size:18px;color:#fff;text-align:center;
                        line-height:36px;vertical-align: top;
                        border:1px solid #214ED4"
              >{{ $t("message.global.seek") }}</span
            >
          </div>
        </div>
        <div class="fuwuquyu">
          <span
            style="display:inline-block;width:193px;font-size:20px;color:#000;text-align:left;font-weight:600;vertical-align: top"
            >{{ $t("message.global.serving") }}</span
          >
          <el-radio-group v-model="yyLAn" size="mini">
            <el-radio-button label="0">{{
              $t("message.global.allLan")
            }}</el-radio-button>
            <el-radio-button label="3">{{
              $t("message.global.english")
            }}</el-radio-button>
            <el-radio-button label="2">{{
              $t("message.global.francLa")
            }}</el-radio-button>
            <el-radio-button label="1">{{
              $t("message.global.chaLa")
            }}</el-radio-button>
            <el-radio-button label="4">{{
              $t("message.global.riyu")
            }}</el-radio-button>
            <el-radio-button label="5">{{
              $t("message.global.hanyu")
            }}</el-radio-button>
            <el-radio-button label="6">{{
              $t("message.global.yuenan")
            }}</el-radio-button>
            <el-radio-button label="7">{{
              $t("message.global.taiyu")
            }}</el-radio-button>
            <el-radio-button label="8">{{
              $t("message.global.jianpu")
            }}</el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin-top:10px;">
          <span
            style="display:inline-block;font-size:20px;vertical-align: top;text-align:left;width:193px;color:#000;font-weight:600;"
            >{{ $t("message.global.coverage") }}</span
          >
          <div class="fuwuquyu fuq" style="display:inline-block;width:900px">
            <el-radio-group v-model="dif" size="mini">
              <el-radio-button
                v-for="city in cities"
                border="false"
                :label="city"
                :key="city"
                >{{ city }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div
          style="margin-top:10px;text-align:center;height:20px;font-size:12px;"
        >
          <span class="quanbuQY" @click="allCi">{{
            qbqy ? $t("message.global.allquyu") : $t("message.global.shouqi")
          }}</span>
        </div>
      </div>
      <div style="min-height:500px;">
        <div class="brokerS" v-for="(item, inde) in jjrList" :key="inde">
          <img class="left" :src="item.jobUrl" alt />
          <div class="Val">
            <div style="font-size:22px;margin-bottom:4px;font-weight:600;">
              {{ item.surName }}
            </div>
            <div style="margin-bottom:8px;">{{ item.personalProfile }}</div>
            <div style="margin-bottom:10px;">
              <span
                style="vertical-align: bottom;display:inline-block;padding:1px 15px;background-color:#F7F7F7;height:32px;box-sizing:border-box;line-height:32px;margin-right:10px;"
              >
                <img
                  style="width:14px;vertical-align: middle"
                  :src="img.phone"
                  alt
                />
                &nbsp;
                <span style>
                  <span style="font-weight:600;">{{
                    item.certifiedPhone
                  }}</span>
                  &nbsp; {{ item.language }}
                </span>
              </span>
              <span
                style="vertical-align: bottom;display:inline-block;padding:1px 15px;background-color:#F7F7F7;height:32px;box-sizing:border-box;line-height:32px;margin-right:10px;"
              >
                <img
                  style="width:14px;vertical-align: middle"
                  :src="img.email"
                  alt
                />
                <span style>{{ $t("message.global.mail") }}</span>
              </span>
              <span
                style="vertical-align: bottom;display:inline-block;padding:1px 15px;background-color:#F7F7F7;height:32px;box-sizing:border-box;line-height:32px;margin-right:10px;"
              >
                <img
                  style="height:14px;vertical-align: middle"
                  :src="img.wxInd"
                  alt
                />
                <span v-show="item.flags" @click="showss(item.id)" style>{{
                  $t("message.global.lishibuluo")
                }}</span>
                <span v-show="!item.flags" style>{{ item.wxNumber }}</span>
              </span>
            </div>
            <div style="margin-bottom:10px;">
              <span
                style="font-size:14px;color:#262626;display:inline-block;margin-right:20px;padding:5px 15px;background-color: #f5f5f5;"
              >
                <img
                  style="width:22px;height:16px; vertical-align: middle"
                  :src="img.authentication"
                  alt
                />
                <span style=" vertical-align: bottom;">{{
                  $t("message.global.authentication")
                }}</span>
              </span>
              <span
                style="font-size:14px;color:#262626;display:inline-block;margin-right:20px;padding:5px 15px;background-color: #f5f5f5;"
              >
                <img
                  style="width:22px;height:16px; vertical-align: middle"
                  :src="img.proVip"
                  alt
                />
                <span style=" vertical-align: bottom;">{{
                  $t("message.global.EasyPro")
                }}</span>
              </span>
              <span
                style="font-size:14px;color:#262626;display:inline-block;margin-right:20px;padding:5px 15px;background-color: #f5f5f5;"
              >
                <img
                  style="width:22px;height:16px; vertical-align: middle"
                  :src="img.visitCard"
                  alt
                />
                <span style=" vertical-align: bottom;">{{
                  $t("message.global.licensed")
                }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <foots></foots>
  </div>
</template>

<script>
import headers from "@/components/PcIndex/moduleT/header.vue";
import foots from "@/components/PcIndex/moduleT/foot.vue";

import proVip from "@/assets/image/proVip.png";
import visitCard from "@/assets/image/visitCard.png";
import authentication from "@/assets/image/authentication.png";
import logoT from "@/assets/image/logoT.png";
import phone from "@/assets/image/phone.png";
import email from "@/assets/image/email.png";
import wxInd from "@/assets/image/wxInd.png";

export default {
  name: "broker",
  components: {
    headers,
    foots
  },
  data() {
    return {
      qbqy: true,
      img: {
        title: logoT,
        authentication,
        proVip,
        visitCard,
        phone,
        email,
        wxInd
      },
      yyLAn: 0,
      dif: "Tout sélectionner",
      flag: true,
      input1: "",
      cities: [],
      somecity: "",
      allcity: "",
      jjrList: [],
      page: 1,
      name: "",
      maxPage: "",
      shows: true
    };
  },
  watch: {
    yyLAn() {
      // //console.log(this.yyLAn)
      this.getAgentListJJ();
    },
    dif() {
      this.getAgentListJJ();
    }
  },
  created() {
    this.get();
    const that = this;

    if (process.client) {
      window.onscroll = function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          that.page = that.page + 1;
          if (that.maxPage <= that.page) {
            return;
          }
          that.getAgentListJJs();
        }
      };
    }
    this.getAgentListJJ();
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/pc_index"
      });
    },
    allCi() {
      if (this.qbqy) {
        this.cities = this.allcity;
      } else {
        this.cities = this.somecity;
      }

      this.qbqy = !this.qbqy;
    },
    showss(val) {
      // this.shows = false
      const that = this;
      this.jjrList.forEach(items => {
        if (items.id == val) {
          items.flags = false;
          that.$forceUpdate();
        }
      });
    },
    async get() {
      const getCityInfo = (await this.$api.article.getRegional()).data;
      if (getCityInfo.code == 0) {
        this.somecity = getCityInfo.data.retract;
        this.allcity = getCityInfo.data.spreads;
        this.cities = this.somecity;
      }
      //console.log(getCityInfo)
    },
    async getAgentListJJ() {
      const arr = {
        page: 1,
        pageSize: 10,
        language: this.yyLAn,
        area: this.dif,
        userName: this.name
      };
      const getAgentListJJInfo = (await this.$api.article.getAgentListJJR(arr))
        .data;
      if (getAgentListJJInfo.code == 0) {
        this.jjrList = getAgentListJJInfo.data.agentList;
        this.jjrList.forEach(item => {
          item.flags = true;
        });
        this.maxPage = getAgentListJJInfo.data.maxPage;
        this.page = 1;
      }
    },
    async getAgentListJJs() {
      const arr = {
        page: this.page,
        pageSize: 10,
        language: this.yyLAn,
        area: this.dif,
        userName: this.name
      };
      const getAgentListJJInfo = (await this.$api.article.getAgentListJJR(arr))
        .data;
      if (getAgentListJJInfo.code == 0) {
        getAgentListJJInfo.data.agentList.forEach(item => {
          item.flags = true;
          this.jjrList.push(item);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.broker {
  min-height: 100%;
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
  .selectSm {
    background-color: #f7f7f7;
    // height: 195px;
    font-size: 0;
    padding: 34px;
  }
}
.brokerS {
  height: 215px;
  box-sizing: border-box;
  padding-top: 50px;
  .left {
    width: 135px;
    height: 135px;
    float: left;
    border-radius: 68px;
  }
  .Val {
    float: left;
    margin-left: 30px;
  }
}
.colors {
  color: #000 !important;
}
.quanbuQY {
  cursor: pointer;
  padding: 4px 24px;
  display: inline-block;
  border: 1px solid #214ed4;
  box-sizing: border-box;
  color: #214ed4;
}
</style>
<style lang="less">
.fuwuquyu {
  .el-radio-button__inner {
    border: none !important;
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #214ed4 !important;
  }
}
.fuq {
  .el-radio-button {
    width: 16%;
  }
}
</style>
