<template>
  <div>
    <client-only>
      <Header :title="$t('message.global.handpick')" />
      <van-search :placeholder="$t('message.global.nxjzdqy')" v-model="ipt" @change="onList" />
      <div class="select">
        <!-- 区域 -->
        <van-dropdown-menu class="opn">
          <van-dropdown-item
            v-model="area"
            :options="provinceList"
            :title="$t('message.global.area')"
            @change="onmenu"
          />
        </van-dropdown-menu>
        <!-- 学校 -->
        <van-dropdown-menu class="opn">
          <van-dropdown-item
            v-model="school"
            :options="schoolList"
            :title="$t('message.global.school')"
            @change="onschool"
          />
        </van-dropdown-menu>
        <!-- 价格 -->
        <van-dropdown-menu>
          <van-dropdown-item class="asd" :title="$t('message.global.price')" ref="item">
            <div class="section">
              {{ $t("message.global.price") }} : {{ fmoney(minPrice, 1) }}€ —
              {{ fmoney(maxPrice, 1) }}€
            </div>
            <el-slider v-model="value" range :max="maxPrice" :min="minPrice" @change="onCost"></el-slider>
            <van-button type="info" @click="Onprice" class="btn_i">
              {{
              $t("message.global.sure")
              }}
            </van-button>
          </van-dropdown-item>
        </van-dropdown-menu>
        <!-- 整租 /合租 -->
        <van-dropdown-menu class="opn">
          <van-dropdown-item
            v-model="tenancy"
            :options="$t('message.index.tenancyList')"
            :title="$t('message.global.tenancy')"
            @change="onrentType"
          />
        </van-dropdown-menu>
      </div>
      <div class="map">
        <iframe :src="iframeSrc" frameborder="0"></iframe>
      </div>
      <div class="sort_title">
        <p class="second-hand">{{ $t("message.global.MethodAllRent") }}</p>
        <div class="sorting">
          <el-popover placement="bottom" width="100" v-model="visible">
            <div class="rank">
              <p @click="OnRank(1), (visible = false)">{{ $t("message.global.lowToHigh") }}</p>
              <p @click="OnRank(2), (visible = false)">{{ $t("message.global.highToLow") }}</p>
            </div>
            <span slot="reference">
              <img src="~/assets/image/sorting.png" alt class="sortimage" />
              {{ $t("message.global.paixu") }}
              <img src="~/assets/image/src.png" alt />
            </span>
          </el-popover>
        </div>
      </div>
      <ul class="new_list">
        <router-link
          v-for="(item, index) in HousingList"
          :key="index"
          :to="{ path: '/rentDetails', query: { id: item.id } }"
        >
          <li class="list_li">
            <diV class="flex">
              <div class="img">
                <img :src="item.showUrl" class="new_img" />
                <span class="num">
                  {{
                  item.rentType
                  ? $t("message.global.sublease")
                  : $t("message.global.entireTenancy")
                  }}
                </span>
              </div>
              <div class="text">
                <p class="text_title">{{ item.title }}</p>
                <p class="sort">{{ item.province }}/{{ item.city }}</p>
                <p class="money">{{ item.total }}{{ $t("message.global.rise") }}</p>
                <p class="font">
                  <span class="itemize">
                    {{
                    item.source
                    ? $t("message.global.Personal")
                    : $t("message.global.Intermediary")
                    }}
                  </span>
                  <span class="itemize" v-show="item.school == '0'">
                    {{
                    $t("message.global.jinxuexiao")
                    }}
                  </span>
                </p>
              </div>
            </diV>
          </li>
        </router-link>
        <hr class="hr" />
      </ul>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/mIndex/head.vue";
import Footer from "~/components/mIndex/footer.vue";
import mapBox from "~/components/mIndex/mapBox.vue";
import { BASE_API } from '../api';
import { fmoney } from '../utils';

export default {
  name: "",
  middleware: "responsive",
  components: {
    Header,
    Footer,
    mapBox
  },
  head() {
    return {
      title: "法国租房_出租房源_法国租房就上法国33找房",
      meta: [
        {
          name: "description",
          content:
            "法国33找房租房频道为您查找真实优质的法国出租房源,包括法国整租、合租、公寓出租等信息,法国出租房东联系信息、经纪人信息、品牌公寓等信息。找法国租房房源,就上法国33找房"
        },
        {
          name: "keywords",
          content:
            "法国租房,法国出租房源,分租,合租,整租,买房出租,法国买房投资,法国学区房"
        }
      ]
    };
  },
  data() {
    return {
      visible: false,
      area: "", //区域
      province: "", //区域名称
      school: "", //学校
      schoolId: "0", //学校id
      price: 0, //价格
      total: "", //价格
      tenancy: "", //整租/合租
      rentType: "", //出租类型
      page: 1, //页数
      isLoading: false, //下拉刷新
      HousingList: [], //租房
      schoolList: [], //学校
      Maxpage: "1", //租房的最大页数
      minPrice: "", //最小金额
      maxPrice: "", //最大金额
      minCost: "",
      maxCost: "",
      display: false,
      sort: 0,
      value: [4, 8], //'价格'
      provinceList: [], // 省份 集合
      fullscreenLoading: false,
      ipt: this.$route.query.ipt //获取搜索的值
    };
  },
  mounted() {
    rem();
    this.onList();
    let params = {};
    this.$api.article.getSearch(params).then(res => {
      res.data.date.schoolList.forEach((item, index) => {
        item["text"] = item.schoolName;
        item["value"] = item.id;
      });
      this.schoolList = res.data.date.schoolList; //学校
      this.price = Number(res.data.date.minPrice);
      this.minCost = Number(res.data.date.minPrice); //	最低金额
      this.maxCost = Number(res.data.date.maxPrice); //	最高金额
      this.minPrice = Number(res.data.date.minPrice); //	最低金额
      this.maxPrice = Number(res.data.date.maxPrice); //	最高金额
      this.value[0] = this.minPrice;
      this.value[1] = this.maxPrice;
    });
    this.$api.article.getRegional(params).then(res => {
      res.data.data.spreads.forEach((item, index) => {
        let obj = {
          text: "",
          value: ""
        };
        (obj.text = item), (obj.value = index), this.provinceList.push(obj);
      });
    });
  },
  created() {
    this.fmoney = fmoney;
    const that = this;
    if (process.client) {
      this.iframeSrc = BASE_API.sq + '/map/rentMap';
      window.onscroll = function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // 页面高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // 总共的高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (
          scrollTop + windowHeight <= scrollHeight + 10 &&
          scrollTop + windowHeight >= scrollHeight - 10
        ) {
          //console.log(that.page,that.Maxpage)
          if (that.page < that.Maxpage) {
            that.page++;
            that.onList();
          }
        }
      };
    }
  },
  methods: {
    openFullScreen() {
      this.fullscreenLoading = true;
    },
    openFullScreen() {
      const loading = this.$loading({
        spinner: "el-icon-loading",
        customClass: "rgba(0, 0, 0, 0.8)",
        lock: true,
        text: "Loding..."
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    },
    onclick() {
      this.display = !this.display;
      //console.log(this.display)
    },
    OnRank(val) {
      this.page = "1";
      this.HousingList = [];
      this.sort = val;
      this.onList();
      this.display = false;
    },
    //  价格弹框
    onCost(value) {
      this.$toast("当前值：最小值" + value[0] + " 最大值" + value[1]);
      this.minCost = value[0];
      this.maxCost = value[1];
    },
    Onprice() {
      this.$refs.item.toggle();
      this.page = "1";
      this.HousingList = [];
      this.onList();
    },
    //  区域
    onmenu(value) {
      //console.log(value)
      if (value != "") {
        this.provinceList.forEach((item, index) => {
          //  //console.log(value,item.value,item.text)
          if (value == item.value) {
            this.province = item.text;
          }
        });
      } else {
        this.province = "";
      }
      this.page = "1";
      this.HousingList = [];
      this.onList();
    },
    //  学校
    onschool(value) {
      //  if(value != ''){
      this.schoolId = value;
      //  }
      this.page = "1";
      this.HousingList = [];
      this.onList();
    },
    // 出租类型
    onrentType(value) {
      //console.log(value)
      this.rentType = value;
      this.page = "1";
      this.HousingList = [];
      this.onList();
    },
    // 列表
    onList() {
      this.openFullScreen();
      let params = {
        page: this.page,
        pageSize: "10",
        province: this.province,
        schoolId: this.schoolId,
        search: this.ipt,
        rentType: this.rentType,
        minPrice: this.minCost,
        maxPrice: this.maxCost,
        sort: this.sort
      };
      this.$api.article.getRentingList(params).then(res => {
        this.fullscreenLoading = false;
        if (res.data.data.rentingPoLists.length != 0) {
          this.HousingList.push(...res.data.data.rentingPoLists); //租房
        } else {
          this.HousingList = res.data.data.rentingPoLists;
        }

        this.Maxpage = res.data.data.maxPage; //最大值
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.sortimage {
  position: relative;
  top: 0.02rem;
}
iframe {
  width: 100%;
  height: 100%;
}
.rank {
  // position: absolute;
  // background: #eee;
  // padding: .2rem;
  // z-index: 1;
  // right: .1rem;
  // top: 4.7rem;
  line-height: 0.3rem;
}
div {
  font-size: 16px;
}
.select {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: .6rem;
}
.select > div {
  width: 20%;
}
.map {
  height: 3.28rem;
  margin: 0.11rem 0.13rem;
}
.van-search {
  padding: 0.05rem 0.05rem 0;
}
.van-dropdown-menu {
  margin-top: 0.12rem;
}
.order_title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
}
.sort_title {
  margin: 0.12rem;
  overflow: hidden;
  .second-hand {
    font-size: 0.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.76);
    line-height: 0.28rem;
    float: left;
  }
  .sorting {
    width: 0.81rem;
    height: 0.32rem;
    background: rgba(233, 233, 233, 1);
    float: right;
    font-size: 0.13rem;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 0.32rem;
    text-align: center;
  }
}
.sorter {
  font-size: 0.13rem;
  color: rgba(35, 76, 211, 1);
  line-height: 0.18rem;
  float: right;
}
.list {
  font-size: 0.15rem;
  width: 100%;
  height: 1.5rem;
}
.list li {
  float: left;
  text-align: center;
  width: 33.33%;
  margin-bottom: 0.05rem;
}
.list_img {
  width: 0.49rem;
  height: 0.5rem;
}
.entry li {
  float: left;
  text-align: center;
  width: 24%;
  position: relative;
}
.entry {
  font-size: 0.12rem;
  height: 0.75rem;
}
.entry_img {
  width: 1.04rem;
  height: 0.75rem;
}
.entry p {
  position: absolute;
  bottom: 0.4rem;
  right: 0.5rem;
}
.title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
}
.watch {
  font-size: 0.13rem;
  color: rgba(35, 76, 211, 1);
  line-height: 0.18rem;
  float: right;
}
.detail {
  font-size: 0.13rem;
  color: rgba(126, 126, 126, 0.76);
  line-height: 0.18rem;
}
.newhouse {
  margin: 0 0.12rem;
  padding-bottom: 0.1rem;
}
.text_title {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(80, 80, 80, 1);
  line-height: 0.18rem;
  text-shadow: 0px 0.02rem 0.03rem rgba(255, 255, 255, 0.5);
}
.sort {
  font-size: 0.13rem;
  font-weight: 600;
  color: rgba(168, 168, 168, 1);
  line-height: 0.18rem;
}
.itemize {
  width: 0.45rem;
  height: 0.18rem;
  background: rgba(191, 191, 191, 1);
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.16rem;
  margin-right: 0.06rem;
  padding: 0 0.1rem;
}
.money {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
  line-height: 0.22rem;
}
.year {
  width: 0.51rem;
  height: 0.24rem;
  background: rgba(35, 76, 211, 1);
  border-radius: 0px 0px 0px 13px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  top: 0rem;
  left: 0.93rem;
}
.num {
  // width:0.38rem;
  padding: 0 0.1rem;
  height: 0.17rem;
  background: rgba(106, 192, 120, 1);
  border-radius: 1px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  top: 0.75rem;
  left: 0.05rem;
}
.new_img {
  width: 1.44rem;
  height: 0.98rem;
}
.img {
  width: 1.44rem;
  height: 0.98rem;
  position: relative;
  margin-right: 0.11rem;
}
.image {
  width: 1.44rem;
  margin-right: 0.11rem;
}
.new_list {
  padding-bottom: 0.2rem;
}
.new_list li > div {
  display: flex;
  padding-bottom: 0.1rem;
  //   padding-top: 0.11rem;
}
.flex {
  padding-top: 0.11rem;
}
.text p {
  line-height: 1.2;
}
.hr {
  border: none;
  height: 1px;
  background-color: #ececec;
}
.list-img {
  width: 0.28rem;
  height: 0.28rem;
}
.list-font {
  height: 0.22rem;
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(5, 5, 5, 1);
  line-height: 0.22rem;
  position: relative;
  bottom: 0.08rem;
}
.list_li {
  padding: 0 0 0 0.1rem;
}
.van-popup {
  height: 1rem;
}
.section {
  padding: 0.1rem;
}
.van-slider {
  margin: 0 0.15rem;
}
.asd {
  padding-bottom: 0.3rem !important;
}
.btn_i {
  float: right;
  width: 1.1rem;
  background: rgba(35, 77, 212, 1);
  border-radius: 0.06rem;
}
.btn_us {
  float: right;
  height: 0.4rem;
  margin: 0.1rem;
}
</style>
<style lang="scss">
.el-tooltip__popper.is-dark {
  display: none;
}
/* .van-button--normal{
     position: relative;
     left: 1.6rem;
     margin-top: .1rem;
  } */
.van-popup {
  padding-left: 0.1rem;
  padding-top: 0.1rem;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 96%;
}
.el-slider {
  padding: 0 0.2rem;
}
</style>
