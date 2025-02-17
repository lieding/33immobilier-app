<template>
  <div class="mobile-header flex justify-between align-center">
    <div class="left-part" @click="toIndex">
      <img src="/33immo-logo.png" />
    </div>
    <el-popover placement="bottom" width="80" trigger="click">
      <div class="list-btn" slot="reference">
        <img src="/mobile-header-list-btn.png" @click="listBtnClickHandler" />
      </div>
      <ul class="popup-list" @click="listBtnClickHandler">
        <li @click="routerChange('m_index')" tag="li">{{ $t("message.global.HOME") }}</li>
        <li
          @click="routerChange('m_search', { searchMode: SearchMode.NewPrograme, department_city: 'Paris' })"
          tag="li"
        >{{ $t("message.global.NEW_PROGRAME") }}</li>
        <li
          @click="routerChange('m_search', { searchMode: SearchMode.SecondHand, department_city: 'Paris' })"
          tag="li"
        >{{ $t("message.global.SECOND_HAND") }}</li>
        <li
          @click="routerChange('/search_rentings', { department_city: 'Paris' })"
          tag="li"
        >{{ $t("message.global.RENTING") }}</li>
        <li @click="routerChange('m_search_store')" tag="li">{{ $t("message.global.STORE") }}</li>
        <li @click="toLoan" tag="li">{{ $t("message.global.LOAN_LINK") }}</li>
        <li @click="changeLocale('zh')" class="locale-row flex-center">
          <img src="/chinese.png" />
          <span>{{ $t("message.global.Chinese") }}</span>
        </li>
        <li @click="changeLocale('en')" class="locale-row flex-center">
          <img src="/english.png" />
          <span>{{ $t("message.global.English") }}</span>
        </li>
        <li @click="changeLocale('fr')" class="locale-row flex-center">
          <img src="/french.png" />
          <span>{{ $t("message.global.French") }}</span>
        </li>
        <template v-if="!curAuthInfo">
          <li @click="routerChange('/login_register')" tag="li">{{ $t("message.global.LOGIN") }}</li>
        </template>
        <template v-else>
          <li @click="routerChange('/rent_questionnaire')" tag="li">{{ $t("message.HEADER.PUBLISH_RENT") }}</li>
          <li @click="doLogout" tag="li">{{ $t("message.HEADER.LOGOUT") }}</li>
        </template>
      </ul>
    </el-popover>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { SearchMode, CityRegionGeolocation } from '../../common/config';
import { createPath, aLink } from '../../utils';
const { mapGetters, mapActions } = createNamespacedHelpers('auth');

const LOAN_LINK_CN = process.env['IMMO_LOAN_LINK_CN'];
const LOAN_LINK_EN = process.env['IMMO_LOAN_LINK_EN'];
const LOAN_LINK_FR = process.env['IMMO_LOAN_LINK_FR'];

export default {
  name: "",
  data() {
    return {
      diaplay: false,
      visible: true
    };
  },
  created () {
    this.SearchMode = SearchMode;
  },
  computed: {
    ...mapGetters(['curAuthInfo']),
  },
  methods: {
    ...mapActions(['logout']),
    doLogout () {
      this.logout();
      this.redirect('/m_index');
    },
    toLoan () {
      const lang = this._i18n.locale;
      let link = LOAN_LINK_EN;
      if (lang === 'fr') link = LOAN_LINK_FR;
      if (lang === 'cn') link = LOAN_LINK_CN;
      aLink(link);
    },
    toIndex () {
      this.$router.replace({ path: createPath('m_index') });
    },
    listBtnClickHandler() {
      this.diaplay = !this.diaplay;
    },
    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    },
    routerChange (path, query) {
      path = createPath(path);
      if (query?.department_city)
        query = { ...query, ...(CityRegionGeolocation[query.department_city]) };
      this.$router.replace({ path, query });
      this.listBtnClickHandler();
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-header {
  padding-right: .1rem;

  .left-part {
    img {
      padding-left: .1rem;
      padding-top: .1rem;
      height: .50rem;
    }
  }
  .list-btn {
    img {
      width: 0.4rem;
      display: block;
    }
  }
}
.popup-list {
  background: rgba(255, 255, 255, 1);
  z-index: 2;
  .el-popover {
    min-width: 110px;
  }
  li {
    width: 100%;
    color: #333;
    text-align: center;
    font-size: 0.14rem;
    font-weight: 500;
    margin: .06rem 0 .09rem;
    img {
      display: inline-block;
      height: 16px;
    }
    &.locale-row {
      column-gap: .06rem;
      span {
        display: inline-block;
        font-size: .14rem;
      }
    }
  }
}
</style>
