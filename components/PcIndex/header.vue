<template>
  <header class="flex justify-between">
    <div class="left-part" @click="RoutingHop('/pc_index', true)">
    </div>
    <div class="routes">
      <span class="route-item" :class="{ active: currentRouteKey === RouteKey.Search }" @click="select(RouteKey.Search)">
        <i class="el-icon-search" />
        <span class="label">{{ $t("message.global.SEARCH") }}</span>
      </span>
      <span class="route-item" :class="{ active: currentRouteKey === RouteKey.Analysis }" @click="select(RouteKey.Analysis)">
        <i class="el-icon-finished" />
        <span class="label">{{ $t("message.global.ANALYSIS") }}</span>
      </span>
      <span class="route-item" :class="{ active: currentRouteKey === RouteKey.My }" @click="select(RouteKey.My)">
        <i class="el-icon-user" />
        <span class="label">{{ $t("message.global.MY") }}</span>
      </span>
      <div v-popover:popover class="pointer route-item lang-switcher-popup-trigger">
        <img :src="langSwitchImgSrc" />
        <span class="label">{{ isFr ? "中文" : "FR" }}</span>
      </div>
    </div>
    <el-popover width="40" trigger="click" ref="popover">
      <div
        @click="changeLocale('zh')"
        class="flex align-center pointer lang-switcher-popup"
      >
        <img src="/chinese.png" alt />
        <span>{{ $t("message.global.Chinese") }}</span>
      </div>
      <div
        @click="changeLocale('fr')"
        class="flex align-center pointer lang-switcher-popup"
        style="margin-bottom: unset;"
      >
        <img src="/french.png" alt />
        <span>FR</span>
      </div>
    </el-popover>
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
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth');

const RouteKey = {
  Search: 'Search',
  Like: 'Like',
  Analysis: 'Analysis',
  My: 'My',
}

export default {
  name: "headers",
  data () {
    return {
      currentRouteKey: RouteKey.Search,
    }
  },
  computed: {
    langSwitchImgSrc () {
      if (this.isFr) return '/chinese.png';
      return '/french.png';
    },
    ...mapGetters(['curAuthInfo']),
  },
  created () {
    this.isFr = this._i18n.locale === 'fr';
    this.RouteKey = RouteKey;
  },
  mounted () {
    if (process.client)
      this.currentRouteKey = getCurrentRouteKey();
  },
  methods: {
    select (key) {

    },
    changeLocale(locale) {
      this.isFr = locale === 'fr';
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    }
  }
};

function getCurrentRouteKey() {
  const path = location.pathname;
  if (path.includes('analysis')) return RouteKey.Analysis;
  if (path.includes('my')) return RouteKey.My;
  if (path.includes('index')) return RouteKey.Search;
}
</script>

<style lang="scss" scoped>
header {
  padding: 0 12px;

  .left-part {}
  .routes {
    span {
      display: inline-block;
    }
    .route-item {
      padding: 16px 24px 16px 8px;
      .label {
        margin-left: 8px;
        font-size: 14px;
      }
      &.active {
        color: var(--main-blue);
        border-bottom: 2px solid var(--main-blue);
        .label {
          margin-left: 24px;
        }
      }
      &.lang-switcher-popup-trigger {
        display: inline-block;
        .label {
          font-size: 16px;
        }
        img {
          height: 16px;
          transform: translateY(2px);
        }
      }
    }
  }
  .login-btn-wrapper {
    flex: unset;
    padding-right: 20px;
  }
}
</style>
<style lang="scss">
.lang-switcher-popup {
  justify-content: space-evenly;
  margin-bottom: 16px;
  img {
    height: 20px;
  }
  span {
    font-size: 20px;
  }
}
</style>
