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
    <div class="routes">
      <span class="divide" @click="RoutingHop('/pc_index', true)">
        <span>{{ $t("message.global.home") }}</span>
      </span>
      <span class="divide" @click="RoutingHop('/newList', true)">
        <span>{{ $t("message.global.NewHouse") }}</span>
      </span>
      <!-- <span class="divide" @click="RoutingHop('/anyEs', true)">
        <span>{{ $t("message.global.second-hand") }}</span>
      </span> -->
      <span class="divide" @click="RoutingHop('/rentHouseList', true)">
        <span>{{ $t("message.global.tenement") }}</span>
      </span>
      <!-- <span class="divide" @click="RoutingHop('/broker', true)">
        <span>{{ $t("message.global.agent") }}</span>
      </span> -->
      <span class="divide" @click="RoutingHop('/encyclopedia', true)">
        <span>{{ $t("message.global.encyclopedia") }}</span>
      </span>
      <span class="divide" @click="RoutingHop('/calculator', true)">
        <span>{{ $t("message.global.instrument") }}</span>
      </span>
      <!-- <span class="divide" @click="RoutingHop('/serve', true)">
        <span>{{ $t("message.global.Saas") }}</span>
      </span> -->
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
    <div class="lang-switcher-wrapper">
      <el-popover width="200" trigger="hover">
        <p
          @click="changeLocale('zh')"
          class="lang-switcher-popup"
        >
          <img src="~/assets/image/chinese.png" alt />
          {{ $t("message.global.Chinese") }}
        </p>
        <p
          @click="changeLocale('fr')"
          class="lang-switcher-popup"
        >
          <img src="~/assets/image/french.png" alt />
          {{ $t("message.global.French") }}
        </p>
        <div class="lang-switcher-popup-trigger" slot="reference">
          {{ frOrCn ? "Français" : "中文" }}
          <img v-show="vas" src="~/assets/image/sortW.png" alt />
          <img v-show="!vas" src="~/assets/image/sort.png" alt />
        </div>
      </el-popover>
    </div>
    <!-- <div class="login-btn-wrapper">
      <span v-if="curAuthInfo" style="font-size:20px">
        <img
          style="width:16px;vertical-align:middle;"
          :src="curAuthInfo.picture || '/_nuxt/assets/image/renwuW.png'"
          alt
        />
        {{ curAuthInfo.nickName || '' }}
      </span>
      <nuxt-link v-else to="loginOrRegister">
        <span style="font-size:20px;cursor:pointer;">
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
      </nuxt-link>
    </div> -->
  </div>
</template>

<script>
import logoT from "~/assets/image/logoT.png";
import sellersT from "~/assets/image/sellers.png";
import sort from "~/assets/image/sort.png";
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  name: "foots",
  data() {
    const frOrCn = this.$i18n.locale === 'fr';
    return {
      imgs: {
        title: logoT,
        sellersT: sellersT,
        sort: sort
      },
      flag: false,
      frOrCn,
    };
  },
  props: ["vas"],
  computed: {
    ...mapGetters(['curAuthInfo']),
  },
  methods: {
    RoutingHop(smt, flag) {
      this.$router.push({
        path: smt,
        query: {
          flag: flag
        }
      });
    },
    changeLocale(locale) {
      this.frOrCn = locale === 'fr';
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    }
  }
};
</script>

<style lang="scss" scoped>
.titles {
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-shadow: 0px 8px 13px 0px rgba(0, 0, 0, 0.15);
  color: #fff;
  .lefts {
    flex: unset;
    .logs {
      height: 56px;
      vertical-align: middle;
    }
    .LogoN {
      font-size: 30px;
      font-weight: 700;
      vertical-align: middle;
    }
  }
  .routes {
    flex: 1;
    margin-right: 20px;
    text-align: right;
    .divide {
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      font-weight: Semibold;
      font-family: "PingFang SC";
      text-align: center;
      // width: 80px;
      padding: 0 10px;
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
  .login-btn-wrapper {
    flex: unset;
    padding-right: 20px;
  }
  .lang-switcher-wrapper {
    margin-right: 20px;
  }
}
</style>
<style lang="scss">
.lang-switcher-popup {
  display: flex;
  align-items: center;
  margin: 3px 0;
  font-size: 16px;
  padding-left: 20px;
  cursor: pointer;
  img {
    margin-right: 6px;
  }
}
.lang-switcher-popup-trigger {
  display: inline;
  cursor: pointer;
  font-size: 20px;
  img {
    width: 16px;
  }
}
</style>
