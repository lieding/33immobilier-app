<template>
  <div class="titles">
    <div class="lefts" @click="RoutingHop('/pc_index', true)">
      <img
        class="logs"
        v-show="vas"
        src="~/assets/image/white.png"
        alt="logos"
      />
      <img
        class="logs"
        v-show="!vas"
        src="~/assets/image/black.png"
        alt="logos"
      />
    </div>
    <div class="rightL">
      <span @click="Onrouter" style="font-size:20px;cursor:pointer;">
        <img
          v-show="vas"
          style="width:16px;vertical-align:middle;cursor:pointer;"
          src="~/assets/image/renwuW.png"
          alt
        />
        <img
          v-show="!vas"
          style="width:16px;vertical-align:middle;cursor:pointer;"
          src="~/assets/image/pcPerson.png"
          alt
        />
        {{ $t("message.global.login") }}
      </span>
    </div>
    <div class="right" style="margin-right:10px;">
      <el-popover width="200" trigger="hover">
        <p
          v-on:click="changeLocale('zh')"
          style="margin-bottom:6px;font-size:16px;box-sizing:border-box;padding-left:20px;cursor: pointer;"
        >
          <img
            style="vertical-align: middle;margin-right:26px;"
            src="~/assets/image/chinese.png"
            alt
          />
          {{ $t("message.global.Chinese") }}
        </p>
        <p
          v-on:click="changeLocale('fr')"
          style="font-size:16px;box-sizing:border-box;padding-left:20px;cursor: pointer;"
        >
          <img
            style="vertical-align: middle;margin-right:21px;"
            src="~/assets/image/french.png"
            alt
          />
          {{ $t("message.global.French") }}
        </p>
        <span style="cursor: pointer;font-size:20px;" slot="reference">
          {{ fls ? "français" : "中文" }}
          <img
            v-show="vas"
            style="width:16px;"
            src="~/assets/image/sortW.png"
            alt
          />
          <img
            v-show="!vas"
            style="width:16px;"
            src="~/assets/image/sort.png"
            alt
          />
        </span>
      </el-popover>
    </div>
    <div class="centerL">
      <span class="divide" @click="RoutingHop('/pc_index', true)">
        <span>{{ $t("message.global.home") }}</span>
      </span>

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
      <span class="divide" @click="RoutingHop('/promoteLists', true)">
        <span>{{ $t("message.global.instrument") }}</span>
      </span>
      <span class="divide" @click="RoutingHop('/serve', true)">
        <span>{{ $t("message.global.Saas") }}</span>
      </span>
      <span class="divide" @click="RoutingHop('/aboutUs', true)">
        <span>{{ $t("message.global.regards") }}</span>
      </span>
      <!-- <span class="Buttons" @click="RoutingHop('/sellers', true)"><img :src="imgs.sellersT" alt=""></span> -->
      <span class="divide backC" @click="RoutingHop('/sellers', true)">
        <img src="~/assets/image/houseAD.png" alt />
        &nbsp;{{ $t("message.global.rental") }}
      </span>
      <!--  -->
    </div>
  </div>
</template>

<script>
import logoT from "~/assets/image/logoT.png";
import sellersT from "~/assets/image/sellers.png";
import sort from "~/assets/image/sort.png";

export default {
  name: "foots",
  data() {
    return {
      imgs: {
        title: logoT,
        sellersT: sellersT,
        sort: sort
      },
      flag: false,
      fls: 1
    };
  },
  props: ["vas"],
  methods: {
    RoutingHop(smt, flag) {
      this.$router.push({
        path: smt,
        query: {
          flag: flag
        }
      });
    },
    Onrouter() {
      window.location.href = "http://www.milliome.com";
    },
    Onclick(val) {
      //   if (val == "fr") {
      //     this.fls = 0;
      //   } else {
      //     this.fls = 1;
      //   }
      //   localStorage.lan = val;
      //   this.$i18n.locale = val;
      //   localStorage.lang = val;
    },
    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    }
  }
};
</script>

<style lang="scss" scoped>
.titles {
  height: 104px;
  line-height: 104px;
  padding: 0 12px;
  box-shadow: 0px 8px 13px 0px rgba(0, 0, 0, 0.15);
  color: #fff;
  .lefts {
    padding-left: 20px;
    box-sizing: border-box;
    float: left;
    // width: 260px;
    .logs {
      // width: 58px;
      height: 56px;
      vertical-align: middle;
    }
    .LogoN {
      font-size: 30px;
      font-weight: 700;
      vertical-align: middle;
    }
  }
  .centerL {
    float: right;
    box-sizing: border-box;
    margin-right: 2%;
    .divide {
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      font-weight: Semibold;
      font-family: "PingFang SC";
      text-align: center;
      // width: 80px;
      padding: 0 10px;
      line-height: 104px;
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
  .rightL {
    padding-right: 20px;
    float: right;
  }
}
</style>
