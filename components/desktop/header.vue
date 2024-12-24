<template>
  <header class="flex justify-between">
    <div class="left-part flex-column justify-center" @click="redirect('/pc_index')">
      <img src="/33immo-logo.png" />
    </div>
    <div class="routes flex justify-center">
      <span class="route-item pointer" @click="select('/pc_index')" :class="{ active: currentPath === Path.INDEX }">
        <span class="label">{{ $t("message.global.HOME") }}</span>
      </span>
      <span class="route-item pointer" @click="toSearch(SearchMode.NewPrograme)" :class="{ active: currentPath === Path.NEW }">
        <span class="label">{{ $t("message.global.NEW_PROGRAME") }}</span>
      </span>
      <span class="route-item pointer" @click="toSearch(SearchMode.SecondHand)" :class="{ active: currentPath === Path.SECOND_HAND }">
        <span class="label">{{ $t("message.global.SECOND_HAND") }}</span>
      </span>
      <span class="route-item pointer" @click="select('/search_store')" :class="{ active: currentPath === Path.STORE }">
        <span class="label">{{ $t("message.global.STORE") }}</span>
      </span>
      <span class="route-item pointer" @click="toLoan">
        <span class="label">{{ $t("message.global.LOAN_LINK") }}</span>
      </span>
      <div v-popover:popover class="pointer route-item lang-switcher-popup-trigger">
        <img src="/i18n.svg" />
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
        @click="changeLocale('en')"
        class="flex align-center pointer lang-switcher-popup"
      >
        <img src="/english.png" alt />
        <span>{{ $t("message.global.English") }}</span>
      </div>
      <div
        @click="changeLocale('fr')"
        class="flex align-center pointer lang-switcher-popup"
        style="margin-bottom: unset;"
      >
        <img src="/french.png" alt />
        <span>{{ $t("message.global.French") }}</span>
      </div>
    </el-popover>
    <div  class="right-part">
      <el-popover width="40" trigger="click" v-if="curAuthInfo">
        <div @click="redirect('/rent_questionnaire')" class="pointer text-center">
          <span>{{ $t("message.HEADER.PUBLISH_RENT") }}</span>
        </div>
        <div @click="redirect('/rent_list')" class="pointer text-center">
          <span>{{ $t("message.HEADER.SEE_RENTS") }}</span>
        </div>
        <div @click="doLogout" class="pointer text-center danger-color">
          <span>{{ $t("message.HEADER.LOGOUT") }}</span>
        </div>
        <el-avatar slot="reference" icon="el-icon-user-solid" class="avatar-icon pointer" size="small"></el-avatar>
      </el-popover>
      <span class="login-text inline-block pointer" @click="redirect('/login_register')" v-else>
        {{ $t('message.global.LOGIN') }}
      </span>
    </div>
  </header>
</template>

<script>
import { createPath, aLink } from '../../utils';
import { SearchMode, CityRegionGeolocation } from '../../common/config'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('auth');

const LOAN_LINK_CN = process.env['IMMO_LOAN_LINK_CN'];
const LOAN_LINK_EN = process.env['IMMO_LOAN_LINK_EN'];
const LOAN_LINK_FR = process.env['IMMO_LOAN_LINK_FR'];

export default {
  name: "headers",
  data () {
    return {
      currentPath: null,
    }
  },
  computed: {
    ...mapGetters(['curAuthInfo']),
  },
  watch: {
    '$route.path' () {
      const { path, query } = this.$route;
      this.currentPath = checkCurrentPath(path, query);
    },
    '$route.query': {
      deep: true,
      handler () {
        const { path, query } = this.$route;
        this.currentPath = checkCurrentPath(path, query);
      }
    }
  },
  created () {
    this.SearchMode = SearchMode;
    this.Path = Path;
  },
  methods: {
    ...mapActions(['logout']),
    doLogout () {
      this.logout();
      this.redirect('/pc_index');
    },
    toLoan () {
      const lang = this._i18n.locale;
      let link = LOAN_LINK_EN;
      if (lang === 'fr') link = LOAN_LINK_FR;
      if (lang === 'cn') link = LOAN_LINK_CN;
      aLink(link);
    },
    redirect (path) {
      this.$router.replace({ path: createPath(path) });
    },
    select (key, query) {
      this.$router.replace({ path: createPath(key), query });
    },
    toSearch (searchMode) {
      const geolocation = CityRegionGeolocation.Paris;
      this.$router.replace({ path: createPath('/search'), query: { department_city: 'Paris', ...geolocation, searchMode } });
    },
    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    }
  }
};
const Path = {
  INDEX: 'INDEX',
  NEW: 'NEW',
  SECOND_HAND: 'SECOND_HAND',
  STORE: 'STORE',
}
function checkCurrentPath (path, query) {
  if (!path) return null;
  if (path.includes('index')) return Path.INDEX;
  if (path.includes('store')) {
    return Path.STORE;
  }
  if (path.includes('search')) {
    if (query?.searchMode) {
      if (query.searchMode === SearchMode.NewPrograme) return Path.NEW;
      if (query.searchMode === SearchMode.SecondHand) return Path.SECOND_HAND;
    }
  }
  if (path.includes('detail')) {
    if (path.includes('new')) return Path.NEW;
    if (path.includes('second')) return Path.SECOND_HAND;
  }
  return null;
}
</script>

<style lang="scss" scoped>
header {
  padding: 0 24px;
  .left-part {
    flex: unset;
    img {
      height: 50px;
    }
  }
  .routes {
    flex: 1;
    span {
      display: inline-block;
    }
    .route-item {
      padding: 16px 24px 16px 8px;
      .label {
        margin-left: 8px;
        font-size: 18px;
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
  .right-part {
    flex: unset;
    .login-text {
      padding: 16px 24px 16px 8px;
      font-size: 18px;
    }
    .avatar-icon {
      margin-top: 10px;
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
