<template>
  <div class="style">
    <client-only>
      <Header :title="$t('message.global.Platform')" />
      <van-search
        :placeholder="$t('message.global.PLEASE_ENTER')"
        v-model="value"
        @change="onVal"
      />
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="value1"
          :options="$t('message.index.serving')"
          :title="$t('message.global.serving')"
          @change="onVal"
        />
        <van-dropdown-item
          v-model="value2"
          :options="provinceList"
          :title="$t('message.global.coverage')"
          @change="onmenu"
        />
      </van-dropdown-menu>
      <div class="agentList" v-for="(item, index) in agentList" :key="index">
        <div class="agent">
          <div class="perpo">
            <img :src="item.jobUrl" alt class="perpo_img" />
            <div class="introduce">
              <p>
                <span class="name">{{ item.nickName }}</span>
              </p>
              <p class="medal invoice">{{ item.personalProfile }}</p>
              <!-- <p class="phone invoice">最近一次服务：2019-12-10</p> -->
            </div>
          </div>
          <div class="card">
            <div class="car">
              <img src="~/assets/image/autonym.png" alt />
              {{ $t("message.global.authentication") }}
            </div>
            <div class="car">
              <img src="~/assets/image/licensed.png" alt />
              {{ $t("message.global.licensed") }}
            </div>
            <div class="car">
              <img src="~/assets/image/pro.png" alt />
              {{ $t("message.global.EasyPro") }}
            </div>
          </div>
          <div class="contact">
            <p class="phone_left">
              <img
                src="~/assets/image/phone1.png"
                alt
                style="margin-right:0.06rem"
              />
              {{ item.certifiedPhone }}
            </p>
            <p class="phone_right">
              <img src="~/assets/image/emil.png" alt class="email" />
              <img
                src="~/assets/image/wx.png"
                alt
                class="email"
                @click="goRouter('/dialog', item.wxNumber)"
              />
            </p>
          </div>
        </div>
        <div class="hr"></div>
      </div>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/Mindex/head.vue";
import Footer from "~/components/Mindex/footer.vue";
export default {
  name: "",
  middleware: "responsive",
  components: {
    Header,
    Footer
  },
  head() {
    return {
      title: "法国房产经纪人_法国房产中介",
      meta: [
        {
          name: "description",
          content:
            "33找房平台欢迎在法房产销售人员,房产经纪人加入法国33找房-全法最大的华人找房平台"
        },
        {
          name: "keywords",
          content: "法国房产经纪人, 法国房产中介, 双语服务, 专业法国中介经纪人"
        }
      ]
    };
  },
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      provinceList: [], // 省份 集合
      agentList: [],
      maxPage: "",
      province: "",
      page: "1",
      isLoading: false //下拉刷新
    };
  },
  mounted() {
    rem();
    let params = {};
    this.$api.article.getRegional().then(res => {
      res.data.data.spreads.forEach((item, index) => {
        let obj = {
          text: "",
          value: ""
        };
        (obj.text = item), (obj.value = index), this.provinceList.push(obj);
      });
    });
    this.OnList();
  },
  created() {
    const that = this;
    if (process.client) {
      window.onscroll = function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // 页面高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // 总共的高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          if (that.page < that.maxPage) {
            that.page++;
            that.OnList();
          }
        }
      };
    }
  },
  methods: {
    onmenu(value2) {
      if (value2 != "") {
        this.provinceList.forEach((item, index) => {
          if (value2 == item.value) {
            this.province = item.text;
          }
        });
      } else {
        this.province = "";
      }
      this.page = "1";
      this.agentList = [];
      this.OnList();
    },
    onVal() {
      this.page = "1";
      this.agentList = [];
      this.OnList();
    },
    OnList() {
      let params = {
        page: this.page,
        pageSize: 10,
        userName: this.value,
        language: this.value1,
        area: this.province
      };
      this.$api.article.getAgentList(params).then(res => {
        if (res.data.data.agentList.length != 0) {
          this.agentList.push(...res.data.data.agentList);
        } else {
          this.agentList = res.data.data.agentList;
        }

        this.maxPage = res.data.maxPage;
      });
    },
    goRouter(smt, val) {
      //   console.log(val)
      let list = {
        type: "经纪人",
        wx: val
      };
      this.$router.push({
        path: smt,
        query: list
      });
    }
  }
};
</script>
<style lang="scss">
div {
  font-size: 16px;
}

.agentList {
  .agent {
    height: 1.85rem;
    padding: 0.12rem;
  }
  .perpo {
    display: flex;
    .perpo_img {
      width: 0.61rem;
      height: 0.61rem;
      border-radius: 50%;
      margin: 0.2rem;
    }
    .name {
      font-size: 0.16rem;
      font-weight: 600;
      margin-right: 0.1rem;
      color: rgba(0, 0, 0, 0.76);
      line-height: 0.22rem;
    }
    .invoice {
      font-size: 0.12rem;
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
      line-height: 0.2rem;
    }
    .medal {
      color: rgba(68, 68, 68, 1);
      height: 0.4rem;
      overflow: hidden;
    }
    .phone {
      color: rgba(180, 180, 180, 1);
    }
    .introduce {
      margin-top: 0.2rem;
    }
  }
  .card {
    display: flex;
    .car {
      width: 0.96rem;
      overflow: hidden;
      height: 0.31rem;
      text-align: center;
      line-height: 0.31rem;
      background: rgba(248, 248, 248, 1);
      margin-right: 0.23rem;
      border: 0.01rem solid rgba(237, 237, 237, 1);
      font-size: 0.12rem;
      color: rgba(38, 38, 38, 1);
    }
    .car img {
      margin-right: 0.05rem;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .contact {
    display: flex;
    height: 0.43rem;
    background: rgba(247, 247, 247, 1);
    line-height: 0.43rem;
    position: relative;
    margin: 0.09rem 0;
    padding: 0.05rem 0.1rem 0.05rem 0.1rem;
    .phone_right {
      position: absolute;
      right: 0;
      .email {
        padding-right: 0.27rem;
      }
    }
  }
  .hr {
    height: 0.07rem;
    background: rgba(239, 239, 239, 1);
    margin-top: 0.05rem;
  }
}
</style>
