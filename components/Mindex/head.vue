<template>
  <div class="title">
    <div class="title-left">
      <img src="~/assets/image/left-arrow.png" @click="Onleft" />
    </div>
    <p class="title-text">{{ title }}</p>
    <div class="title-right">
      <el-popover placement="bottom" width="80" trigger="click">
        <img src="~/assets/image/liebiao.png" class="title-img" slot="reference" />
        <ul class="title-list">
          <router-link :to="{ path: '/m_index' }" tag="li">
            {{
            $t("message.global.home")
            }}
          </router-link>
          <router-link
            :to="{ path: '/newhouse', query: { house: 'new' } }"
            tag="li"
          >{{ $t("message.global.NewHouse") }}</router-link>
          <!-- <router-link
            :to="{ path: '/newhouse', query: { house: 'second_hand' } }"
            tag="li"
          >{{ $t("message.global.second-hand") }}</router-link> -->
          <router-link :to="{ path: '/rentHouse' }" tag="li">
            {{
            $t("message.global.tenement")
            }}
          </router-link>
          <router-link :to="{ path: '/blogs' }" tag="li">
            {{
            $t("message.global.encyclopedia")
            }}
          </router-link>
          <router-link :to="{ path: '/service' }" tag="li">
            {{
            $t("message.global.Saas")
            }}
          </router-link>
          <router-link :to="{ path: '/instrument' }" tag="li">
            {{
            $t("message.global.instrument")
            }}
          </router-link>
          <router-link :to="{ path: '/InRegardTo' }" tag="li">
            {{
            $t("message.global.regards")
            }}
          </router-link>
          <router-link :to="{ path: '/ordIssue' }" tag="li" class="rental">
            {{
            $t("message.global.rental")
            }}
          </router-link>
          <li v-on:click="changeLocale('zh')">
            <img src="~/assets/image/chinese.png" style="margin-right: 0.1rem;" />
            <span style="display:inline-block;text-align:center;">
              {{
              $t("message.global.Chinese")
              }}
            </span>
          </li>
          <li v-on:click="changeLocale('fr')">
            <img src="~/assets/image/french.png" style="margin-right: .05rem;" />
            <span style="display:inline-block;text-align:center;">{{ $t("message.global.French") }}</span>
          </li>
          <!-- <li v-on:click="Onrouter">{{$t("message.global.login")}}</li> -->
        </ul>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  name: "",
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    },
    Onleft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
.el-popover {
  min-width: 110px;
}
</style>
<style lang="scss" scoped>
.title {
  height: 0.44rem;
  background: #fff;
  padding: 0 0.13rem;
  display: flex;
  align-items: center;
}
.title-text {
  flex: 1;
  text-align: center;
  font-size: 0.14rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.title-span {
  float: left;
  height: 0.31rem;
  font-size: 0.14rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 0.44rem;
}
.title-left {
  flex: unset;
}
.title-right {
  flex: unset;
}
.title-list {
  li {
    width: 100%;
    text-align: center;
    font-size: 0.14rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 0.2rem;
    margin-top: 0.06rem;
    margin-bottom: 0.09rem;
  }
}
.rental {
  line-height: 0.29rem !important;
  height: 0.29rem;
  background: rgba(35, 77, 212, 1);
  color: rgba(255, 255, 255, 1) !important;
}
</style>
