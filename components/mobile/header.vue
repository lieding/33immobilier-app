<template>
  <div class="mobile-header flex justify-between align-center">
    <div class="left-part">
      <img src="/33immo-logo.png" />
    </div>
    <el-popover placement="bottom" width="80" trigger="click">
      <div class="list-btn" slot="reference">
        <img src="/mobile-header-list-btn.png" @click="listBtnClickHandler" />
      </div>
      <ul class="popup-list" @click="listBtnClickHandler">
        <li @click="routerChange('m_index')" tag="li">
          {{ $t("message.global.HOME") }}
        </li>
        <li
          @click="routerChange('m_search', { searchMode: SearchMode.NewPrograme, department_city: 'Paris' })"
          tag="li"
        >{{ $t("message.global.NEW_PROGRAME") }}</li>
        <li
          @click="routerChange('m_search', { searchMode: SearchMode.SecondHand, department_city: 'Paris' })"
          tag="li"
        >{{ $t("message.global.SECOND_HAND") }}</li>
        <li @click="changeLocale('zh')" class="locale-row flex-center">
          <img src="/chinese.png" />
          <span>{{ $t("message.global.Chinese") }}</span>
        </li>
        <li @click="changeLocale('fr')" class="locale-row flex-center">
          <img src="/french.png" />
          <span>{{ $t("message.global.French") }}</span>
        </li>
      </ul>
    </el-popover>
  </div>
</template>

<script>
import { SearchMode, CityRegionGeolocation } from '../../common/config';
import { createPath } from '../../utils';
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
  methods: {
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
      height: .36rem;
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
