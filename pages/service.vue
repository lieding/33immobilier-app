<template>
  <div class="service">
    <client-only>
      <Header :title="$t('message.global.Saas')" />
      <van-tabs @click="onClick">
        <van-tab :title="$t('message.global.zhuangxiu')">
          <div class="decorate" v-for="(item, index) in mapList" :key="index">
            <img :src="item.image" alt class="decorate_img" />
            <div class="conter">
              <p>
                <span class="name">{{ item.title }}</span>
              </p>
              <p class="font">{{ item.profiles }}</p>
            </div>
            <div class="conten conter_img">
              <p>
                <img src="~/assets/image/times.png" alt />
                {{ $t("message.global.service") }}：{{ item.lowPrice }} -
                {{ item.topPrice }}€
              </p>
              <p>
                <img src="~/assets/image/di.png" alt />
                {{ $t("message.global.coverage") }}：{{ item.area }}
              </p>
              <p>
                <img src="~/assets/image/hd.png" alt />
                {{ $t("message.global.contactPhone") }}：{{ item.phone }}
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('message.global.clean-keeping')">
          <div class="decorate" v-for="(item, index) in mapList" :key="index">
            <img :src="item.image" alt class="decorate_img" />
            <div class="conter">
              <p>
                <span class="name">{{ item.title }}</span>
              </p>
              <p class="font">{{ item.profiles }}</p>
            </div>
            <div class="conten conter_img">
              <p>
                <img src="~/assets/image/times.png" alt />
                {{ $t("message.global.service") }}：{{ item.lowPrice }} -
                {{ item.topPrice }}€
              </p>
              <p>
                <img src="~/assets/image/di.png" alt />
                {{ $t("message.global.coverage") }}：{{ item.area }}
              </p>
              <p>
                <img src="~/assets/image/hd.png" alt />
                {{ $t("message.global.contactPhone") }}：{{ item.phone }}
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab :title="$t('message.global.sanitation')">
          <div class="decorate" v-for="(item, index) in mapList" :key="index">
            <img :src="item.image" alt class="decorate_img" />
            <div class="conter">
              <p>
                <span class="name">{{ item.title }}</span>
              </p>
              <p class="font">{{ item.profiles }}</p>
            </div>
            <div class="conten conter_img">
              <p>
                <img src="~/assets/image/times.png" alt />
                {{ $t("message.global.service") }}：{{ item.lowPrice }} -
                {{ item.topPrice }}€
              </p>
              <p>
                <img src="~/assets/image/di.png" alt />
                {{ $t("message.global.coverage") }}：{{ item.area }}
              </p>
              <p>
                <img src="~/assets/image/hd.png" alt />
                {{ $t("message.global.contactPhone") }}：{{ item.phone }}
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/mindex/head.vue";
import Footer from "~/components/mindex/footer.vue";
export default {
  middleware: "responsive",
  components: {
    Header,
    Footer
  },
  head() {
    return {
      title:
        "法国装修_法国保洁_法国钟点工_巴黎钟点工_巴黎装修_巴黎搬家_室内设计_房屋翻新-法国33找房装修保洁搬家",
      meta: [
        {
          name: "description",
          content:
            "33找房服务频道汇集了法国装修公司及个人、设计师、保洁、钟点工、搬家等等服务的法国家具服务信息平台。为您提供齐全的法国装修,保洁,钟点工,室内设计,平面设计,钟点工,巴黎装修,巴黎保洁,设计师-法国33找房全程为您服务"
        },
        {
          name: "keywords",
          content:
            "法国装修,法国保洁,法国钟点工,法国装修设计师,巴黎钟点工,巴黎装修,巴黎搬家,设计师,室内设计-法国33找房装修保洁搬家"
        }
      ]
    };
  },
  data() {
    return {
      page: "1",
      type: "3",
      maxPage: "",
      mapList: [],
      isLoading: false
    };
  },
  mounted() {
    rem();
    this.onList();
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
          //console.log(that.page,that.maxPage)
          if (that.page < that.maxPage) {
            that.page++;
            that.onList();
          }
        }
      };
    }
  },
  methods: {
    onClick(name, title) {
      //console.log(title)
      if (title == this.$t("message.global.zhuangxiu")) {
        this.type = "3";
        this.page = "1";
        this.mapList = [];
        this.onList();
      } else if (title == this.$t("message.global.clean-keeping")) {
        this.type = "2";
        this.mapList = [];
        this.page = "1";
        this.onList();
      } else {
        this.type = "1";
        this.mapList = [];
        this.page = "1";
        this.onList();
      }
    },
    onList() {
      //console.log(this.type)
      let params = { page: this.page, pageSize: "10", type: this.type };
      this.$api.article.getFacilitatorList(params).then(res => {
        if (this.mapList.length != 0) {
          this.mapList.push(...res.data.data.mapList);
        } else {
          this.mapList = res.data.data.mapList;
        }

        this.maxPage = res.data.data.maxPage;
      });
    }
  }
};
</script>
<style lang="scss">
div {
  font-size: 16px;
}
.decorate {
  height: 3.59rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 17px 0px rgba(0, 0, 0, 0.08);
  margin: 0.12rem 0.12rem 0.12rem;
  // display: flex;
  .decorate_img {
    width: 100%;
    height: 1.73rem;
    // border-radius: 50%;
    // margin: .1rem .12rem.2rem.2rem;
  }
  .conter {
    font-size: 0.12rem;
    color: rgba(0, 0, 0, 0.76);
    line-height: 0.2rem;
    // width: 100%;
    padding: 0.11rem;
    height: 0.6rem;
    overflow: hidden;
    .font {
      font-size: 0.14rem;
      color: rgba(150, 150, 150, 0.76);
      line-height: 0.2rem;
      height: 0.6rem;
    }
    .name {
      font-size: 0.16rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.76);
      line-height: 0.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .invoice {
      float: right;
      font-size: 0.12rem;
      color: rgba(150, 150, 150, 0.76);
      line-height: 0.17rem;
      margin-right: 0.11rem;
    }
  }
  .conten {
    height: 1rem;
    font-size: 0.12rem;
    color: rgba(0, 0, 0, 0.76);
    line-height: 0.2rem;
    width: 100%;
    padding: 0.11rem;
    overflow: hidden;
  }
  .conter_img {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.76);
    line-height: 0.2rem;
    img {
      width: 0.16rem;
      margin-right: 0.05rem;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
