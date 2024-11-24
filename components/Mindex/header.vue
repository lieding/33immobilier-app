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
        <router-link :to="{ path: '/m_index' }" tag="li">
          {{ $t("message.global.home") }}
        </router-link>
        <router-link
          :to="{ path: '/search', query: { house: 'new' } }"
          tag="li"
        >{{ $t("message.global.NewHouse") }}</router-link>
        <router-link
          :to="{ path: '/search', query: { house: 'second_hand' } }"
          tag="li"
        >{{ $t("message.global.SECOND_HAND") }}</router-link>
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
export default {
  name: "",
  data() {
    return {
      diaplay: false,
      visible: true
    };
  },
  methods: {
    listBtnClickHandler() {
      this.diaplay = !this.diaplay;
    },
    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    },
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
.rental {
  padding: 6px 0;
  background: var(--main-blue);
  color: #fff !important;
}
</style>
