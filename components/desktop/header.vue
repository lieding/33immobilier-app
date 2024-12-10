<template>
  <header class="flex justify-between">
    <div class="left-part flex-column justify-center" @click="redirect('/pc_index')">
      <img src="/33immo-logo.png" />
    </div>
    <div class="routes">
      <span class="route-item pointer" @click="select('/pc_index')" :class="{ active: currentPath === Path.INDEX }">
        <span class="label">{{ $t("message.global.HOME") }}</span>
      </span>
      <span class="route-item pointer" @click="toSearch(SearchMode.NewPrograme)" :class="{ active: currentPath === Path.NEW }">
        <span class="label">{{ $t("message.global.NEW_PROGRAME") }}</span>
      </span>
      <span class="route-item pointer" @click="toSearch(SearchMode.SecondHand)" :class="{ active: currentPath === Path.SECOND_HAND }">
        <span class="label">{{ $t("message.global.SECOND_HAND") }}</span>
      </span>
      <span class="route-item pointer" @click="toLoan">
        <span class="label">{{ $t("message.global.LOAN_LINK") }}</span>
      </span>
      <div v-popover:popover class="pointer route-item lang-switcher-popup-trigger">
        <img src="/i18n.svg" />
        <!-- <span class="label">{{ isFr ? "中文" : "FR" }}</span> -->
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
  </header>
</template>

<script>
import { createPath, aLink } from '../../utils';
import { SearchMode, CityRegionGeolocation } from '../../common/config'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth');

const LOAN_LINK = process.env['IMMO_LOAN_LINK'];

export default {
  name: "headers",
  data () {
    return {
      currentPath: null,
      isFr: false,
    }
  },
  computed: {
    langSwitchImgSrc () {
      if (this.isCn) return '/chinese.png';
      if (this.isEn) return '/english.png';
      return '/french.png';
    },
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
    this.isFr = this._i18n.locale === 'fr';
    this.isEn = this._i18n.locale === 'en';
    this.isCn = this._i18n.locale === 'cn';
    this.SearchMode = SearchMode;
    this.Path = Path;
  },
  methods: {
    toLoan () {
      aLink(LOAN_LINK);
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
      this.isFr = locale === 'fr';
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    }
  }
};
const Path = {
  INDEX: 'INDEX',
  NEW: 'NEW',
  SECOND_HAND: 'SECOND_HAND'
}
function checkCurrentPath (path, query) {
  if (!path) return null;
  if (path.includes('index')) return Path.INDEX;
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
    img {
      height: 50px;
    }
  }
  .routes {
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
