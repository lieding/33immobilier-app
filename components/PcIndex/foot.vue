<template>
  <div class="footH">
    <div style="overflow:hidden">
      <div class="lefts">
        <div class="leftTops">
          <img class="logs" :src="imgs.title" alt="logos" />
        </div>
        <div class="centerL">
          <span class="divide" @click="RoutingHop('/newList', true)">
            <span>{{ $t("message.global.NewHouse") }}</span>
          </span>
          <span class="divide" @click="RoutingHop('/anyEs', true)">
            <span>{{ $t("message.global.second-hand") }}</span>
          </span>
          <span class="divide" @click="RoutingHop('/rentHouseList', true)">
            <span>{{ $t("message.global.tenement") }}</span>
          </span>
          <span class="divide" @click="RoutingHop('/broker', true)">
            <span>{{ $t("message.global.agent") }}</span>
          </span>
          <span class="divide" @click="RoutingHop('/encyclopedia', true)">
            <span>{{ $t("message.global.encyclopedia") }}</span>
          </span>
          <span class="divide" @click="RoutingHop('/calculator', true)">
            <span>{{ $t("message.global.instrument") }}</span>
          </span>
          <span class="divide" @click="RoutingHop('/aboutUs', true)">
            <span>{{ $t("message.global.regards") }}</span>
          </span>
          <span class="divide backC" @click="RoutingHop('/sellers', true)">
            <img src="~/assets/image/houseAD.png" alt />
            &nbsp;{{ $t("message.global.rental") }}
          </span>
        </div>
      </div>
      <!-- // Apartment -->
      <div class="rights">
        <div class="relatMe">
          {{ $t("message.global.relation") }}: &nbsp;contact@33immobilier.com
        </div>
        <div class="LogoTex">{{ $t("message.global.NooneFc") }}</div>
      </div>
    </div>
    <div class="buildNo">© 2019 Milliome. All rights reserved.</div>
  </div>
</template>

<script>
import logoT from "~/assets/image/white.png";
import sellersT from "~/assets/image/sellers.png";

export default {
  name: "foots",
  data() {
    return {
      imgs: {
        title: logoT,
        sellersT: sellersT
      }
    };
  },
  methods: {
    RoutingHop(smt, flag) {
      this.$router.push({
        path: smt,
        query: {
          flag: flag
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.footH {
  // z-index: 10000;
  width: 100%;
  height: 260px;
  background-color: #515151;
  box-sizing: border-box;
  padding: 26px 46px;
  .lefts {
    padding-left: 20px;
    box-sizing: border-box;
    float: left;
    color: #fff;
    .leftTops {
      .logs {
        height: 70px;
        vertical-align: middle;
      }
      .LogoN {
        font-size: 30px;
        font-weight: 700;
        vertical-align: middle;
      }
    }
    .centerL {
      box-sizing: border-box;
      .divide {
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        color: #fff;
        font-weight: Semibold;
        font-family: "PingFang SC";
        text-align: center;
        padding: 0 20px;
        line-height: 60px;
        span {
          cursor: pointer;
        }
      }
      .backC {
        background-color: #234dd4;
        cursor: pointer;
        font-size: 17px;
        padding-left: 21px;
        line-height: 71px;
        padding-right: 14px;
        color: #fff;
        height: 71px;
        img {
          width: 28px;
          vertical-align: middle;
        }
      }
      .Buttons {
        margin-left: 20px;
        img {
          vertical-align: middle;
          width: 142px;
          height: 71px;
        }
      }
    }
  }
  .rights {
    border-left: 1px solid #979797;
    height: 140px;
    width: 30%;
    float: right;
    margin-top: 35px;
    padding-left: 44px;
    padding-top: 19px;
    .relatMe {
      font-size: 18px;
      font-family: SIL-Hei-Med-Jian, SIL-Hei-Med;
      color: #fff;
    }
    .LogoTex {
      margin-top: 30px;
      text-align: center;
      color: #fff;
      font-size: 28px;
    }
  }
  .buildNo {
    color: #fff;
    font-size: 14px;
    font-weight: 400 !important;
    font-family: PingFangSC-Light, PingFang SC;
    text-align: center;
  }
}
</style>
