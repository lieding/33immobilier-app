<template>
  <div class="title">
    <div class="title-left">
      <img src="@/assets/image/left-arrow.png" class="title-image" @click="Onleft" />
    </div>
    <p class="title_text">{{ title }}</p>
    <el-popover placement="bottom" width="80" trigger="click">
      <img src="@/assets/image/liebiao.png" class="title-img" slot="reference" />
      <ul class="title_list">
        <router-link :to="{ path: '/m_index' }" tag="li">
          {{
          $t("message.global.home")
          }}
        </router-link>
        <router-link
          :to="{ path: '/newhouse', query: { house: '新房' } }"
          tag="li"
        >{{ $t("message.global.NewHouse") }}</router-link>
        <router-link
          :to="{ path: '/newhouse', query: { house: '二手房' } }"
          tag="li"
        >{{ $t("message.global.second-hand") }}</router-link>
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
        <li v-on:click="Onclick('zh-cn')">
          <img src="@/assets/image/chinese.png" style="margin-right: 0.1rem;" />
          <span style="display:inline-block;text-align:center;">
            {{
            $t("message.global.Chinese")
            }}
          </span>
        </li>
        <li v-on:click="Onclick('fr')">
          <img src="@/assets/image/french.png" style="margin-right: .05rem;" />
          <span style="display:inline-block;text-align:center;">{{ $t("message.global.French") }}</span>
        </li>
        <!-- <li v-on:click="Onrouter">{{$t("message.global.login")}}</li> -->
      </ul>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: ["title"],
  name: "",
  data() {
    return {};
  },
  mounted() {},
  created() {
    // if (localStorage.lang) {
    //   this.$i18n.locale = localStorage.lang;
    // }
  },
  methods: {
    Onclick(val) {
      this.$i18n.locale = val;
      localStorage.lang = val;
    },
    Onrouter() {
      window.location.href = "http://www.milliome.com";
    },
    Onleft() {
      // location.href=document.referrer;
      this.$router.go(-1);
      // go history (-1)
    }
  }
};
</script>
<style lang="less">
.el-popover {
  min-width: 110px;
}
</style>
<style lang="less" scoped>
.title {
  height: 0.44rem;
  background: rgba(255, 255, 255, 1);
  padding: 0 0.08rem;
  display: flex;
}
.title_text {
  text-align: center;
  font-size: 0.14rem;
  font-weight: 500;
  width: 60%;
  line-height: 0.5rem;
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
  float: left;
  width: 15%;
  margin-left: 0.27rem;
  margin-bottom: 0.05rem;
}
.title-image {
  width: 0.1rem;
  height: 0.18rem;
  float: left;
  position: relative;
  top: 0.15rem;
  margin-right: 0.11rem;
}
.title-img {
  position: relative;
  top: 0.08rem;
  // left: 1rem;
  // margin-right:0.03rem;
  // width:.4rem;
  // height:.29rem;
  // background:rgba(35,77,212,1);
  // border-radius:4px;
}
.title_list {
  /* animation-delay:2s;
  position: absolute;
  top: 0.44rem;
  right: 0;
    padding: 0rem .12rem 0 .15rem; */
  /* width:1.4rem; */
  /* width: 1.22rem; */
  /* height:3.5rem;  */
  /* width:.95rem;
  background:rgba(255,255,255,1);
  box-shadow:0px .02rem .04rem 0px rgba(0,0,0,0.5);
  border:.01rem solid rgba(151,151,151,1);
  z-index: 2 */
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
.rental {
  line-height: 0.29rem !important;
  height: 0.29rem;
  background: rgba(35, 77, 212, 1);
  color: rgba(255, 255, 255, 1) !important;
}
.title_list li img {
  position: relative;
  top: 0.05rem;
}
</style>
