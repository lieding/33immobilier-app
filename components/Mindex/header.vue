<template>
  <div class="title">
    <div class="title-left">
      <img src="~/assets/image/black.png" class="title-image" />
    </div>
    <el-popover placement="bottom" width="80" trigger="click">
      <div class="title-rig" slot="reference">
        <img src="~/assets/image/liebiao.png" class="title-img" @click="list" />
      </div>
      <ul class="title_list" @click="list">
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
        <router-link :to="{ path: '/agentList' }" tag="li">
          {{
          $t("message.global.agent")
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
  mounted() {},
  methods: {
    list() {
      this.diaplay = !this.diaplay;
    },
    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale);
      this.$router.push(this.switchLocalePath(locale));
    },
    Onrouter() {
      window.location.href = "http://www.milliome.com";
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
.el-popover {
  min-width: 110px;
}
.titler {
  height: 0.44rem;
  background: rgba(255, 255, 255, 1);
  padding: 0 0.13rem;
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
  float: left;
  margin-left: 0.1rem;
  margin-bottom: 0.05rem;
}
.title-rig {
  float: right;
  margin-right: 0.07rem;
  margin-bottom: 0.07rem;
}
.title-image {
  // width:.31rem;
  height: 0.31rem;
  float: left;
  position: relative;
  top: 0.06rem;
  margin-right: 0.11rem;
}
.title-img {
  position: relative;
  top: 0.08rem;
  margin-right: 0.03rem;
  width: 0.4rem;
  height: 0.29rem;
  background: rgba(35, 77, 212, 1);
  border-radius: 4px;
}
.title_list {
  /* animation-delay:2s; */
  /* position: absolute;
  top: 0.44rem;
  right: 0; */
  /* padding: 0rem .12rem 0 .15rem; */
  /* width:1.4rem; */
  /* width: 1.22rem; */
  /* height:3.5rem;  */
  /* width:.95rem; */
  background: rgba(255, 255, 255, 1);
  /* box-shadow:0px .02rem .04rem 0px rgba(0,0,0,0.5);
  border:.01rem solid rgba(151,151,151,1); */
  z-index: 2;
  .el-popover {
    min-width: 110px;
  }
}
.title_list li {
  width: 100%;
  text-align: center;
  font-size: 0.14rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 0.2rem;
  margin-top: 0.06rem;
  margin-bottom: 0.09rem;
}
.title_list li img {
  position: relative;
  top: 0.05rem;
}
.rental {
  line-height: 0.29rem !important;
  height: 0.29rem;
  background: rgba(35, 77, 212, 1);
  color: rgba(255, 255, 255, 1) !important;
}
</style>
