<template>
  <div class="row">
    <client-only>
      <Header />
      <!-- <hr class="title_hr"/> -->
      <!-- logo图 -->
      <img src="~/assets/image/index.png" alt class="logo" />
      <!-- 搜索框 -->
      <div class="block flex">
        <div class="flex block_1">
          <van-dropdown-menu class="opn">
            <van-dropdown-item v-model="value1" :options="$t('message.index.option1')" />
          </van-dropdown-menu>
        </div>
        <div class="flex block_2">
          <img src="~/assets/image/Search Icon.png" class="Icon" @click="OnsearchGoods" />
          <input
            type="serch"
            :placeholder="$t('message.global.Where')"
            class="ipt"
            @keypress="searchGoods"
            v-model="ipt"
          />
        </div>
      </div>
      <!-- 多分类 -->
      <ul class="list">
        <router-link :to="{ path: '/newhouse', query: { house: 'new' } }" tag="li">
          <img src="~/assets/image/newhouse.png" class="list_img" />
          <p>{{ $t("message.global.NewHouse") }}</p>
        </router-link>
        <!-- <router-link :to="{ path: '/newhouse', query: { house: 'second_hand' } }" tag="li">
          <img src="~/assets/image/ordhouse.png" class="list_img" />
          <p>{{ $t("message.global.second-hand") }}</p>
        </router-link> -->
        <router-link :to="{ path: '/rentHouse' }" tag="li">
          <img src="~/assets/image/house.png" class="list_img" />
          <p>{{ $t("message.global.tenement") }}</p>
        </router-link>
        <router-link :to="{ path: '/agentList' }" tag="li">
          <img src="~/assets/image/peoper.png" class="list_img" />
          <p>{{ $t("message.global.agent") }}</p>
        </router-link>
        <router-link :to="{ path: '/blogs' }" tag="li">
          <img src="~/assets/image/baidu.png" class="list_img" />
          <p>{{ $t("message.global.encyclopedia") }}</p>
        </router-link>
        <!-- <router-link :to="{ path: '/service' }" tag="li">
          <img src="~/assets/image/Copy.png" class="list_img" />
          <p>{{ $t("message.global.Saas") }}</p>
        </router-link> -->
      </ul>
      <ul class="entry">
        <router-link :to="{ path: '/instrument' }" tag="li">
          <img src="~/assets/image/blue.png" class="entry_img" />
          <p>{{ $t("message.global.capacity") }}</p>
        </router-link>
        <router-link :to="{ path: '/instrument' }" tag="li">
          <img src="~/assets/image/green.png" class="entry_img" />
          <p>{{ $t("message.global.purchase") }}</p>
        </router-link>
        <router-link :to="{ path: '/article', query: { id: 3 } }" tag="li">
          <img src="~/assets/image/red.png" class="entry_img" />
          <p>{{ $t("message.global.reductionWhat") }}</p>
        </router-link>
        <router-link :to="{ path: '/article', query: { id: 4 } }" tag="li">
          <img src="~/assets/image/Violet.png" class="entry_img" />
          <p>{{ $t("message.global.interest") }}</p>
        </router-link>
      </ul>
      <!-- 新房 -->
      <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.Newbuilding") }}</span>
          <router-link
            :to="{ path: '/newhouse', query: { house: 'new' } }"
            class="watch"
          >{{ $t("message.global.examine") }}</router-link>
        </div>
        <!-- router.push({name: 'applename', query: {color: 'red' }}) -->

        <p class="detail">{{ $t("message.global.precedence") }}</p>
        <ul class="new_list">
          <router-link
            :to="{ path: '/Details', query: { id: item.id } }"
            v-for="(item, index) in newHousings"
            :key="index"
            tag="li"
          >
            <div class="img">
              <img :src="item.showUrl" class="new_img" />
              <span class="year">{{ item.expressing }}</span>
              <span class="num">
                <span class="city">{{ item.province }}</span>
                <span class="citynum">{{ item.city }}</span>
              </span>
            </div>

            <div class="text">
              <p class="text-title">{{ item.estate }}</p>
              <p class="sort">{{ item.huXing }} {{ $t("message.global.pieces") }}</p>
              <p class="font">
                <span class="itemize" v-for="(items, index) in item.tags" :key="index">{{ items }}</span>
              </p>
              <p class="money">{{ item.lowPrice }}{{ $t("message.global.rise") }}</p>
            </div>
          </router-link>
        </ul>
      </div>
      <hr class="hr" />
      <!-- 二手房 -->
      <!-- <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.ordapartment") }}</span>
          <router-link
            :to="{ path: '/newhouse', query: { house: 'second_hand' } }"
            class="watch"
          >{{ $t("message.global.AllNewHomes") }}</router-link>
        </div>
        <ul class="new_list">
          <router-link
            :to="{ path: '/ordDetails', query: { id: item.id } }"
            tag="li"
            v-for="(item, index) in homesList"
            :key="index"
          >
            <div class="img">
              <img :src="item.showUrl" class="new_img" />
            </div>
            <div class="text">
              <p class="text-title">{{ item.title }}</p>
              <p class="sort">{{ item.bigProvince }}/{{ item.province }}</p>
              <p class="font">
                <span class="itemize">{{ item.roomNum }}{{ $t("message.global.chamber") }}</span>
                <span class="itemize">{{ item.bedRoomNum }}{{ $t("message.global.crouch") }}</span>
                <span class="itemize">{{ item.acreage }}{{ $t("message.global.square") }}</span>
              </p>
              <p class="font">
                <span class="money">{{ item.total }}{{ $t("message.global.rise") }}</span>
                <span class="average">{{ item.unit }}{{ $t("message.global.square€") }}</span>
              </p>
            </div>
          </router-link>
        </ul>
      </div> -->
      <!-- <hr class="hr" /> -->
      <!-- 租房 -->
      <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.handpick") }}</span>
          <router-link :to="{ path: '/rentHouse' }" class="watch">
            {{
            $t("message.global.Allhand")
            }}
          </router-link>
        </div>
        <ul class="new_list">
          <router-link
            :to="{ path: '/rentDetails', query: { id: item.id } }"
            tag="li"
            v-for="(item, index) in rentings"
            :key="index"
          >
            <div class="img">
              <img :src="item.showUrl" class="new_img" />
              <span class="num">
                <span class="city">
                  {{
                  item.rentType
                  ? $t("message.global.sublease")
                  : $t("message.global.entireTenancy")
                  }}
                </span>
              </span>
            </div>
            <div class="text">
              <p class="text-title">{{ item.title }}</p>
              <p class="sort">{{ item.province }}/{{ item.city }}</p>
              <p class="font">
                <span class="itemize">
                  {{
                  item.source
                  ? $t("message.global.Personal")
                  : $t("message.global.Intermediary")
                  }}
                </span>
                <span class="itemize" v-show="item.isSchools == '0'">
                  {{
                  $t("message.global.jinxuexiao")
                  }}
                </span>
              </p>
              <p class="money">{{ item.total }}{{ $t("message.global.rise") }}</p>
            </div>
          </router-link>
        </ul>
      </div>
      <hr class="hr" />
      <!-- 专业房产顾问 -->
      <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.property") }}</span>
          <router-link :to="{ path: '/agentList' }" tag="li" class="watch">
            {{
            $t("message.global.economics")
            }}
          </router-link>
        </div>
        <p class="detail" style=" margin-bottom:0.07rem;">
          {{ $t("message.global.counselor") }}&nbsp;&nbsp;&nbsp;{{
          $t("message.global.ZeroFee")
          }}&nbsp;&nbsp; {{ $t("message.global.bilingualism") }}
        </p>
        <van-swipe :loop="false" :width="180" :height="78" :show-indicators="false">
          <van-swipe-item v-for="(item, index) in brokerList" :key="index" class="swipe">
            <div class="swipe_pro">
              <img :src="item.brokerAvatar" class="swipe_img" />
              <p class="swipe_P">PRO</p>
            </div>
            <div class="swipe_text">
              <p class="swipe_title">{{ item.brokerName }}</p>
              <!-- <p class="swipe_sort">1-5 pièces</p> -->
              <p class="swipe_sort">{{ item.brokerJob }}</p>
              <p class="swipe_tel">{{ item.brokerTelPhone }}</p>
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="swipe_image">
          <img src="~/assets/image/pcBroker.png" alt />
          <span style="margin-right: .1rem;">
            {{
            $t("message.global.middleman")
            }}
          </span>
          <span @click="goRouter('/dialog')" class="text_img">
            <img src="~/assets/image/pcPerson.png" alt style="margin-right: .05rem;" />
            {{ $t("message.global.jiaru") }}
          </span>
        </div>
        <!-- <img  src="~/assets/image/agent.png" class="swipe_image" /> -->
      </div>
      <hr class="hr" />
      <!-- 我们的合作伙伴 -->
      <div class="newhouse">
        <div class="font width">
          <span class="title">{{ $t("message.global.ourFri") }}</span>
        </div>
        <p class="detail">{{ $t("message.global.pionner") }}</p>
        <p class="detail">{{ $t("message.global.Courtier") }}</p>
        <img src="~/assets/image/logo_promoteur.png" class="partner_image" />
      </div>
      <hr class="hr" />
      <!-- 房价走势 -->
      <div class="newhouse trend">
        <div class="font">
          <span class="title">{{ $t("message.global.trend") }}</span>
        </div>
        <p class="trend_p">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="(item, index) in returnList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </p>
        <!-- <div style="widht:3.46rem;height:4rem;"> -->
        <div class="echart" v-if="homeTrendList"></div>
        <!-- </div> -->
      </div>
      <hr class="hr" />
      <!-- 底部 -->
      <Footer />
    </client-only>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/MIndex/header.vue";
import Footer from "~/components/MIndex/footer.vue";
var echarts = require("echarts");
export default {
  components: {
    Header,
    Footer
  },
  middleware: "responsive",
  head() {
    return {
      title: "33找房, 法国第一华人找房平台",
      meta: [
        {
          name: "description",
          content:
            "法国33找房为您提供法国房产、房价、投资、减税、生活服务等信息。在法国,寻找新房、二手房、租房、服务就上法国33找房! 全法最专业的华人找房平台"
        },
        {
          name: "keywords",
          content:
            "法国找房平台,新房,二手房,租房,装修,保洁,服务,投资,减税,楼盘,法国购房,法国房产,法国租房,法国房地产网,个人急售二手房,33找房,PINEL,LMNP"
        }
      ]
    };
  },
  data() {
    return {
      newHousings: [], //新房
      homesList: [], //二手房
      rentings: [], //租房
      brokerList: [], //经纪人
      system: [], //立即加入
      returnList: [], //所有走势图
      homeTrendList: [], //echarts
      value: "Paris 1",
      show: false,
      value1: "new",
      ipt: ""
      // option1: [
      //   { text: "new", value:  "new" },
      //   { text: "second_hand", value: "second_hand" },
      //   { text: "租房", value: "租房" }
      // ]
    };
  },
  watch: {
    value(val) {
      this.ByRegion();
    }
  },
  mounted() {
    rem();
    this.ByRegion();
    //   所有走势图
    this.$api.article.trendRegion().then(res => {
      this.returnList = res.data.data.returnList;
    });
    this.$api.article.getHomePageInfo().then(res => {
      this.newHousings = res.data.data.newHousings; //新房
      this.homesList = res.data.data.homesList; //二手房
      this.rentings = res.data.data.rentings; //租房
      this.brokerList = res.data.data.brokerList; //经纪人
      this.system = res.data.data.system; //立即加入
    });
  },
  methods: {
    // 点击搜索框
    OnsearchGoods() {
      if (this.value1 == "new") {
        this.$router.push({
          path: "/newhouse",
          query: { house: "new", ipt: this.ipt }
        });
      } else if (this.value1 == "second_hand") {
        this.$router.push({
          path: "/newhouse",
          query: { house: "second_hand", ipt: this.ipt }
        });
      } else {
        this.$router.push({
          path: "/rentHouse",
          query: { type: "租房", ipt: this.ipt }
        });
      }
    },
    searchGoods(event) {
      if (event.keyCode == 13) {
        //如果按的是enter键 13是enter
        event.preventDefault(); //禁止默认事件（默认是换行）
        if (this.value1 == "new") {
          this.$router.push({
            path: "/newhouse",
            query: { house: "new", ipt: this.ipt }
          });
        } else if (this.value1 == "second_hand") {
          this.$router.push({
            path: "/newhouse",
            query: { house: "second_hand", ipt: this.ipt }
          });
        } else {
          this.$router.push({
            path: "/rentHouse",
            query: { house: "租房", ipt: this.ipt }
          });
        }
      }
    },
    goRouter(smt) {
      let list = {
        type: "经纪人",
        phone: this.system.phone
      };
      this.$router.push({
        path: smt,
        query: list
      });
    },
    ByRegion() {
      let params = { homeTrendRegion: this.value };
      let createTime = [];
      let homeTrendPrice = [];
      this.$api.article.getTrendByRegion(params).then(res => {
        this.homeTrendList = res.data.data.homeTrendList;
        res.data.data.homeTrendList.map(function(item) {
          createTime.push(item.homeTrendQuarter);
          homeTrendPrice.push(item.homeTrendPrice);
        });
        this.$nextTick(function() {
          //console.log(document.querySelector(".echart"));
          if (process.client) {
            var myChart = echarts.init(document.querySelector(".echart"));
            setTimeout(() => {
              myChart.setOption({
                xAxis: {
                  type: "category",
                  data: createTime
                },
                yAxis: {
                  type: "value",
                  name: "  € / m² "
                },
                dataZoom: [
                  {
                    show: true,
                    startValue: 0,
                    end: 100,
                    handleIcon:
                      "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                    handleSize: "80%",
                    handleStyle: {
                      color: "#fff",
                      shadowBlur: 3,
                      shadowColor: "rgba(0, 0, 0, 0.6)",
                      shadowOffsetX: 2,
                      shadowOffsetY: 2
                    }
                  }
                ],
                grid: {
                  left: "3%",
                  right: "3%",
                  bottom: "1%",
                  containLabel: true
                },
                series: [
                  {
                    label: {
                      normal: {
                        show: true,
                        position: "top"
                      }
                    },
                    data: homeTrendPrice,
                    type: "line"
                  }
                ]
              });
            }, 500);
          }
        });
      });
      // let data = [{"id":71,"createTime":970329600000,"homeTrendQuarter":"T4 2000","homeTrendRegion":"Paris 1","homeTrendPrice":"3500"},{"id":70,"createTime":978278400000,"homeTrendQuarter":"T1 2001","homeTrendRegion":"Paris 1","homeTrendPrice":"3780"},{"id":69,"createTime":986054400000,"homeTrendQuarter":"T2 2001","homeTrendRegion":"Paris 1","homeTrendPrice":"3930"},{"id":68,"createTime":993916800000,"homeTrendQuarter":"T3 2001","homeTrendRegion":"Paris 1","homeTrendPrice":"4150"},{"id":67,"createTime":1001865600000,"homeTrendQuarter":"T4 2001","homeTrendRegion":"Paris 1","homeTrendPrice":"3940"},{"id":66,"createTime":1009814400000,"homeTrendQuarter":"T1 2002","homeTrendRegion":"Paris 1","homeTrendPrice":"3720"},{"id":65,"createTime":1017590400000,"homeTrendQuarter":"T2 2002","homeTrendRegion":"Paris 1","homeTrendPrice":"4210"},{"id":64,"createTime":1025452800000,"homeTrendQuarter":"T3 2002","homeTrendRegion":"Paris 1","homeTrendPrice":"4710"},{"id":63,"createTime":1033401600000,"homeTrendQuarter":"T4 2002","homeTrendRegion":"Paris 1","homeTrendPrice":"5010"},{"id":62,"createTime":1041350400000,"homeTrendQuarter":"T1 2003","homeTrendRegion":"Paris 1","homeTrendPrice":"4860"},{"id":61,"createTime":1049126400000,"homeTrendQuarter":"T2 2003","homeTrendRegion":"Paris 1","homeTrendPrice":"4750"},{"id":60,"createTime":1056988800000,"homeTrendQuarter":"T3 2003","homeTrendRegion":"Paris 1","homeTrendPrice":"4700"},{"id":59,"createTime":1064937600000,"homeTrendQuarter":"T4 2003","homeTrendRegion":"Paris 1","homeTrendPrice":"5100"},{"id":58,"createTime":1072886400000,"homeTrendQuarter":"T1 2004","homeTrendRegion":"Paris 1","homeTrendPrice":"5610"},{"id":57,"createTime":1080748800000,"homeTrendQuarter":"T2 2004","homeTrendRegion":"Paris 1","homeTrendPrice":"5690"},{"id":56,"createTime":1088611200000,"homeTrendQuarter":"T3 2004","homeTrendRegion":"Paris 1","homeTrendPrice":"6090"},{"id":55,"createTime":1096560000000,"homeTrendQuarter":"T4 2004","homeTrendRegion":"Paris 1","homeTrendPrice":"6510"},{"id":54,"createTime":1104508800000,"homeTrendQuarter":"T1 2005","homeTrendRegion":"Paris 1","homeTrendPrice":"6030"},{"id":53,"createTime":1112284800000,"homeTrendQuarter":"T2 2005","homeTrendRegion":"Paris 1","homeTrendPrice":"6150"},{"id":52,"createTime":1120147200000,"homeTrendQuarter":"T3 2005","homeTrendRegion":"Paris 1","homeTrendPrice":"6170"},{"id":51,"createTime":1128096000000,"homeTrendQuarter":"T4 2005","homeTrendRegion":"Paris 1","homeTrendPrice":"6610"},{"id":50,"createTime":1136044800000,"homeTrendQuarter":"T1 2006","homeTrendRegion":"Paris 1","homeTrendPrice":"6700"},{"id":49,"createTime":1143820800000,"homeTrendQuarter":"T2 2006","homeTrendRegion":"Paris 1","homeTrendPrice":"6960"},{"id":48,"createTime":1151683200000,"homeTrendQuarter":"T3 2006","homeTrendRegion":"Paris 1","homeTrendPrice":"7180"},{"id":47,"createTime":1159632000000,"homeTrendQuarter":"T4 2006","homeTrendRegion":"Paris 1","homeTrendPrice":"6930"},{"id":46,"createTime":1167580800000,"homeTrendQuarter":"T1 2007","homeTrendRegion":"Paris 1","homeTrendPrice":"7090"},{"id":45,"createTime":1175356800000,"homeTrendQuarter":"T2 2007","homeTrendRegion":"Paris 1","homeTrendPrice":"7330"},{"id":44,"createTime":1183219200000,"homeTrendQuarter":"T3 2007","homeTrendRegion":"Paris 1","homeTrendPrice":"7950"},{"id":43,"createTime":1191168000000,"homeTrendQuarter":"T4 2007","homeTrendRegion":"Paris 1","homeTrendPrice":"8310"},{"id":42,"createTime":1199116800000,"homeTrendQuarter":"T1 2008","homeTrendRegion":"Paris 1","homeTrendPrice":"8790"},{"id":41,"createTime":1206979200000,"homeTrendQuarter":"T2 2008","homeTrendRegion":"Paris 1","homeTrendPrice":"8220"},{"id":40,"createTime":1214841600000,"homeTrendQuarter":"T3 2008","homeTrendRegion":"Paris 1","homeTrendPrice":"8860"},{"id":39,"createTime":1222790400000,"homeTrendQuarter":"T4 2008","homeTrendRegion":"Paris 1","homeTrendPrice":"7900"},{"id":38,"createTime":1230739200000,"homeTrendQuarter":"T1 2009","homeTrendRegion":"Paris 1","homeTrendPrice":"8560"},{"id":37,"createTime":1238515200000,"homeTrendQuarter":"T2 2009","homeTrendRegion":"Paris 1","homeTrendPrice":"7980"},{"id":36,"createTime":1246377600000,"homeTrendQuarter":"T3 2009","homeTrendRegion":"Paris 1","homeTrendPrice":"8030"},{"id":35,"createTime":1254326400000,"homeTrendQuarter":"T4 2009","homeTrendRegion":"Paris 1","homeTrendPrice":"8390"},{"id":34,"createTime":1262275200000,"homeTrendQuarter":"T1 2010","homeTrendRegion":"Paris 1","homeTrendPrice":"8540"},{"id":33,"createTime":1270051200000,"homeTrendQuarter":"T2 2010","homeTrendRegion":"Paris 1","homeTrendPrice":"8910"},{"id":32,"createTime":1277913600000,"homeTrendQuarter":"T3 2010","homeTrendRegion":"Paris 1","homeTrendPrice":"9300"},{"id":31,"createTime":1285862400000,"homeTrendQuarter":"T4 2010","homeTrendRegion":"Paris 1","homeTrendPrice":"9510"},{"id":30,"createTime":1293811200000,"homeTrendQuarter":"T1 2011","homeTrendRegion":"Paris 1","homeTrendPrice":"9930"},{"id":29,"createTime":1301587200000,"homeTrendQuarter":"T2 2011","homeTrendRegion":"Paris 1","homeTrendPrice":"10660"},{"id":28,"createTime":1309449600000,"homeTrendQuarter":"T3 2011","homeTrendRegion":"Paris 1","homeTrendPrice":"10860"},{"id":27,"createTime":1317398400000,"homeTrendQuarter":"T4 2011","homeTrendRegion":"Paris 1","homeTrendPrice":"10460"},{"id":26,"createTime":1325347200000,"homeTrendQuarter":"T1 2012","homeTrendRegion":"Paris 1","homeTrendPrice":"10700"},{"id":25,"createTime":1333209600000,"homeTrendQuarter":"T2 2012","homeTrendRegion":"Paris 1","homeTrendPrice":"10920"},{"id":24,"createTime":1341072000000,"homeTrendQuarter":"T3 2012","homeTrendRegion":"Paris 1","homeTrendPrice":"10860"},{"id":23,"createTime":1349020800000,"homeTrendQuarter":"T4 2012","homeTrendRegion":"Paris 1","homeTrendPrice":"10560"},{"id":22,"createTime":1356969600000,"homeTrendQuarter":"T1 2013","homeTrendRegion":"Paris 1","homeTrendPrice":"11130"},{"id":21,"createTime":1364745600000,"homeTrendQuarter":"T2 2013","homeTrendRegion":"Paris 1","homeTrendPrice":"9870"},{"id":20,"createTime":1372608000000,"homeTrendQuarter":"T3 2013","homeTrendRegion":"Paris 1","homeTrendPrice":"10130"},{"id":19,"createTime":1380556800000,"homeTrendQuarter":"T4 2013","homeTrendRegion":"Paris 1","homeTrendPrice":"10280"},{"id":18,"createTime":1388505600000,"homeTrendQuarter":"T1 2014","homeTrendRegion":"Paris 1","homeTrendPrice":"9820"},{"id":17,"createTime":1396281600000,"homeTrendQuarter":"T2 2014","homeTrendRegion":"Paris 1","homeTrendPrice":"10640"},{"id":16,"createTime":1404144000000,"homeTrendQuarter":"T3 2014","homeTrendRegion":"Paris 1","homeTrendPrice":"10060"},{"id":15,"createTime":1412092800000,"homeTrendQuarter":"T4 2014","homeTrendRegion":"Paris 1","homeTrendPrice":"10690"},{"id":14,"createTime":1420041600000,"homeTrendQuarter":"T1 2015","homeTrendRegion":"Paris 1","homeTrendPrice":"9910"},{"id":13,"createTime":1427817600000,"homeTrendQuarter":"T2 2015","homeTrendRegion":"Paris 1","homeTrendPrice":"9870"},{"id":12,"createTime":1435680000000,"homeTrendQuarter":"T3 2015","homeTrendRegion":"Paris 1","homeTrendPrice":"10500"},{"id":11,"createTime":1443628800000,"homeTrendQuarter":"T4 2015","homeTrendRegion":"Paris 1","homeTrendPrice":"11030"},{"id":10,"createTime":1451577600000,"homeTrendQuarter":"T1 2016","homeTrendRegion":"Paris 1","homeTrendPrice":"10390"},{"id":9,"createTime":1459440000000,"homeTrendQuarter":"T2 2016","homeTrendRegion":"Paris 1","homeTrendPrice":"10630"},{"id":8,"createTime":1467302400000,"homeTrendQuarter":"T3 2016","homeTrendRegion":"Paris 1","homeTrendPrice":"10860"},{"id":7,"createTime":1475251200000,"homeTrendQuarter":"T4 2016","homeTrendRegion":"Paris 1","homeTrendPrice":"10250"},{"id":6,"createTime":1483200000000,"homeTrendQuarter":"T1 2017","homeTrendRegion":"Paris 1","homeTrendPrice":"11410"},{"id":5,"createTime":1490976000000,"homeTrendQuarter":"T2 2017","homeTrendRegion":"Paris 1","homeTrendPrice":"11060"},{"id":4,"createTime":1498838400000,"homeTrendQuarter":"T3 2017","homeTrendRegion":"Paris 1","homeTrendPrice":"11380"},{"id":3,"createTime":1506787200000,"homeTrendQuarter":"T4 2017","homeTrendRegion":"Paris 1","homeTrendPrice":"11560"},{"id":2,"createTime":1514736000000,"homeTrendQuarter":"T1 2018","homeTrendRegion":"Paris 1","homeTrendPrice":"12050"},{"id":1,"createTime":1522512000000,"homeTrendQuarter":"T2 2018","homeTrendRegion":"Paris 1","homeTrendPrice":"11990"}]
      //   data.map(function(item){
      //          createTime.push(item.homeTrendQuarter)
      //          homeTrendPrice.push(item.homeTrendPrice)
      //   })
      //console.log(homeTrendPrice,createTime)
    }
  }
};
</script>
<style lang="scss">
.trend_p {
  .el-input__inner {
    height: 0.3rem;
  }
}
</style>
<style scoped lang="scss">
.hr {
  border: none;
  height: 0.01rem;
  margin: 0.12rem 0;
  background-color: #ececec;
}
.font {
  font-size: 16px;
}
.logo {
  height: 1.89rem;
  width: 100%;
  margin-top: 0.06rem;
}
.title_hr {
  border: none;
  height: 0.01rem;
  background-color: #c2c2c2;
  margin: 0;
}
.new_list {
  margin-top: 0.1rem;
}
.block {
  position: absolute;
  top: 2.15rem;
  margin: 0 0.18rem 0 0.18rem;
  width: 90%;
  height: 0.43rem;
  background: white;
  bottom: 0.2rem;
  z-index: 1;
  box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.11);
}
.swipe_text {
  padding: 0.05rem;
  max-width: 48%;
}
.width {
  width: 100%;
  margin-bottom: 0.2rem;
}
.block_1 {
  padding-right: 0.15rem;

  background: white;
}
.block_2 {
  padding: 0.09rem 0;
}
.flex {
  display: flex;
}
.opn {
  font-size: 0.13rem;
  width: 0.72rem;
  height: 0.43rem;
  ::v-deep {
    .van-dropdown-menu__bar {
      box-shadow: unset;
      background-color: transparent;
      height: 43px;
    }
  }
}
.van-ellipsis {
  color: rgba(38, 38, 38, 1);
}
.xiala {
  width: 0.09rem;
  height: 0.05rem;
}
.Icon {
  width: 0.16rem;
  height: 0.16rem;
  padding: 0.03rem 0.15rem;
  border-left: 1px solid #8888;
}
.ipt {
  border: none;
  width: 2rem;
  font-size: 0.13rem;
}
.list {
  font-size: 0.15rem;
  width: 100%;
  margin-top: 0.2rem;
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
  text-align: center;
  width: 24%;
  position: relative;
}
.entry {
  font-size: 0.12rem;
  height: 0.75rem;
  display: flex;
  width: 100%;
}
.entry_img {
  width: 1.04rem;
  height: 0.75rem;
}
.entry p {
  position: absolute;
  bottom: 0.35rem;
  left: 0.13rem;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(40, 40, 40, 0.76);
  line-height: 0.17rem;
}
.title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
  // padding: 0;
  color: rgba(0, 0, 0, 0.76);
}
.watch {
  font-size: 0.13rem;
  color: rgba(35, 76, 211, 1);
  line-height: 0.18rem;
  float: right;
  margin-top: 0.03rem;
}
.detail {
  font-size: 0.13rem;
  color: rgba(126, 126, 126, 0.76);
  line-height: 0.18rem;
}
.newhouse {
  margin: 0 0.12rem;
  font-size: 16px;
  padding-bottom: 0.1rem;
}
.text-title {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(80, 80, 80, 1);
  text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.5);
  min-height: .35rem;
}
.sort {
  font-size: 0.13rem;
  font-weight: 600;
  color: rgba(168, 168, 168, 1);
}
.itemize {
  /* width:0.45rem; */
  height: 0.18rem;
  background: rgba(191, 191, 191, 1);
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  margin-right: 0.06rem;
  padding: 0 0.1rem;
}
.money {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
}
.year {
  height: 0.24rem;
  background: rgba(35, 76, 211, 1);
  border-radius: 0px 0px 0px 13px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 0rem;
  right: 0;
  padding: 0 0.1rem;
}
.num {
  /* width:0.38rem; */
  height: 0.17rem;
  /* background:rgba(106,192,120,1); */
  border-radius: 1px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 0.75rem;

  left: 0;
  /* left: 0.05rem; */
  overflow: hidden;
  /* padding: 0 .1rem; */
}
.city {
  background: rgba(106, 192, 120, 1);
  margin: 0 0.03rem;
  padding: 0 0.01rem;
}
.citynum {
  font-size: 0.09rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.13rem;
}
.new_img {
  width: 1.44rem;
  height: 0.98rem;
}
.img {
  // width: 1.44rem;
  height: 0.98rem;
  position: relative;

  margin-right: 0.11rem;
}
// .swipe{
.swipe > first-child {
  width: 1.44rem;
}
// }

.new_list li {
  display: flex;
  padding-top: 0.11rem;
}
.text p {
  line-height: 1.25;
}
.average {
  font-size: 0.12rem;
  color: rgba(172, 172, 172, 1);
  line-height: 0.17rem;
  margin-left: 0.07rem;
}
.van-swipe-item {
  // width:1.8rem !important;
  height: 0.78rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 2px rgba(191, 191, 191, 0.14);
  display: flex;
}
.swipe_pro {
  width: 50%;
}
.swipe_img {
  width: 0.51rem;
  height: 0.5rem;
  border-radius: 50px;
  position: absolute;
  left: 0.1rem;
}
.swipe_P {
  width: 17px;
  height: 9px;
  background: rgba(0, 101, 255, 1);
  border-radius: 1px;
  font-size: 5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 9px;
  position: absolute;
  text-align: center;
  top: 0.45rem;
  left: 0.28rem;
}
.swipe_title {
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.76);
  line-height: 0.16rem;
}
.swipe_sort {
  font-size: 0.11rem;
  color: rgba(131, 131, 131, 0.76);
  line-height: 0.16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 1.4rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.swipe_tel {
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(4, 51, 255, 0.76);
  line-height: 0.16rem;
}
.swipe_image {
  height: 0.66rem;
  box-sizing: border-box;
  padding-top: 0.06rem;
  width: 100%;
  position: relative;
  background: rgba(35, 76, 211, 1);
  img {
    width: 0.48rem;
    vertical-align: middle;
  }
  span {
    color: #ffffff;
    font-size: 0.18rem;
  }
  .text_img {
    // width:.8rem;
    height: 0.27rem;
    position: absolute;
    right: 0.08rem;
    top: 0.15rem;
    background: rgba(255, 255, 255, 1);
    // padding:.13rem;
    img {
      width: 0.12rem;
    }
    padding: 0.03rem 0.05rem;
    text-align: center;
    font-size: 12px;
    color: rgba(48, 52, 64, 1);
    line-height: 0.27rem;
  }
}
.partner_image {
  width: 3.52rem;
  height: 1.7rem;
  margin-top: 0.12rem;
}
.echart {
  /* width: 6.29rem; */
  height: 2rem;
}

.echart {
  height: 2rem;
}
/* 房价走势 */
.trend {
  position: relative;
}

.trend_p {
  position: absolute;
  bottom: 1.8rem;
  right: 0;
  z-index: 2;
  input {
    height: 0.3rem;
  }
}
.el-dropdown-menu {
  overflow: scroll;
  height: 2rem;
}
.el-dropdown {
  z-index: 2;
}
</style>
