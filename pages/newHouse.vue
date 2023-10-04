<template>
  <div class="house">
    <Header
      :title="
        house == 'new'
          ? $t('message.global.homeList')
          : $t('message.global.second-hand')
      "
    />
    <!-- '$t('message.global.homeList)':'second-hand' -->
    <div :class="house == 'new' ? 'select' : 'section'">
      <!-- 区域 -->
      <!-- <van-dropdown-menu  class="opn" >
               <van-dropdown-item :title='$t("message.global.area")' ref="item">
                     <van-tree-select
                     :items="province"
                     :active-id.sync="activeId"
                      @navclick="onNavClick"
                      @itemclick="onItemClick"
                     :main-active-index.sync="activeIndex"
                     />
               </van-dropdown-item>
      </van-dropdown-menu>-->
      <van-dropdown-menu class="opn" v-if="house == 'new'">
        <van-dropdown-item
          v-model="pro"
          :options="provinces"
          :title="$t('message.global.quyu')"
          @change="onquyu"
        />
      </van-dropdown-menu>
      <van-dropdown-menu class="opn" v-if="house == 'second_hand'">
        <van-dropdown-item
          v-model="pro"
          :options="provinceList"
          :title="$t('message.global.quyu')"
          @change="onmenu"
        />
      </van-dropdown-menu>
      <!-- 价格 -->

      <van-dropdown-menu v-if="house == 'new'">
        <van-dropdown-item
          class="asd"
          :title="$t('message.global.price')"
          ref="item2"
        >
          <div class="section">
            {{ $t("message.global.price") }} : {{ fmoney(minCost, 1) }}€ —
            {{ fmoney(maxCost, 1) }}€
          </div>
          <el-slider
            v-model="value"
            range
            :max="maxPrice"
            :min="minPrice"
            @change="onCost"
          ></el-slider>
          <van-button type="info" @click="Onprice" class="btn_i">{{
            $t("message.global.sure")
          }}</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>

      <van-dropdown-menu v-if="house == 'second_hand'">
        <van-dropdown-item
          class="asd"
          :title="$t('message.global.price')"
          ref="item6"
        >
          <div class="section">
            {{ $t("message.global.price") }} : {{ fmoney(minCost, 1) }}€ —
            {{ fmoney(maxCost, 1) }}€
          </div>
          <el-slider
            v-model="value"
            range
            :max="maxPrice"
            :min="minPrice"
            @change="onCost"
          ></el-slider>
          <van-button type="info" @click="Onpir" class="btn_i">{{
            $t("message.global.sure")
          }}</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 面积 -->
      <van-dropdown-menu v-if="house == 'second_hand'">
        <van-dropdown-item
          class="asd"
          :title="$t('message.global.proportion')"
          ref="item5"
        >
          <div class="section">
            {{ $t("message.global.proportion") }} : {{ minArea }}m² —
            {{ maxArea }}m²
          </div>
          <el-slider
            v-model="Acreage"
            range
            :max="maxAcreage"
            :min="minAcreage"
            @change="onAcreage"
          ></el-slider>
          <van-button type="info" @click="Onpir" class="btn_i">{{
            $t("message.global.sure")
          }}</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 交房时间 -->
      <!-- <van-dropdown-menu v-if="house == 'new'">
               <van-dropdown-item v-model="delivery" :options='$t("message.index.time")' :title='$t("message.global.completionDate")' @change="onList"/>
      </van-dropdown-menu>-->
      <van-dropdown-menu v-if="house == 'new'">
        <van-dropdown-item
          v-model="delivery"
          :options="$t('message.index.option4')"
          :title="$t('message.global.completionDate')"
          @change="OnTime"
        />
      </van-dropdown-menu>
      <!-- 居室 -->

      <van-dropdown-menu class="opn" v-if="house == 'new'">
        <van-dropdown-item
          class="asd"
          :title="$t('message.global.habitable')"
          ref="item3"
        >
          <div class="section">
            {{ $t("message.global.habitable") }} : {{ minroom[0] }} —
            {{ minroom[1] }}
          </div>
          <el-slider
            v-model="minroom"
            range
            :max="maxHall"
            :min="minHall"
            @change="onroom"
          ></el-slider>
          <van-button type="info" @click="Onprice" class="btn_i">{{
            $t("message.global.sure")
          }}</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 居室 -->
      <van-dropdown-menu class="opn" v-if="house == 'second_hand'">
        <van-dropdown-item
          v-model="LivingRoomNum"
          :options="$t('message.index.option2')"
          :title="$t('message.global.habitable')"
          @change="onroomNum"
        />
      </van-dropdown-menu>
      <!-- 卧室 -->
      <van-dropdown-menu class="opn" v-if="house == 'second_hand'">
        <van-dropdown-item
          v-model="bedRoomNum"
          :options="$t('message.index.option3')"
          :title="$t('message.global.bedroom')"
          @change="onroomNum"
        />
      </van-dropdown-menu>
    </div>
    <div class="map">
      <iframe
        :src="latestApi + '/map/newMap'"
        frameborder="0"
        v-if="house == 'new'"
      ></iframe>
      <iframe
        :src="latestApi + '/map/homesMap'"
        frameborder="0"
        v-if="house == 'second_hand'"
      ></iframe>
      <!-- <mapBox/> -->
    </div>
    <div class="sort_title" v-if="house == 'second_hand'">
      <p class="second-hand">{{ $t("message.global.ordHouseapartment") }}</p>

      <div class="sorting">
        <!-- <el-popover
               placement="bottom"
               width="100">
               <div class="rank" >
                   <p @click="OnRank(1)" >{{$t("message.global.lowToHigh")}}</p>
                   <p @click="OnRank(2)">{{$t("message.global.highToLow")}}</p>
                </div>
                  <span slot="reference">
                     <img src="~/assets/image/sorting.png" alt="" class="sortimage">
                        {{$t("message.global.paixu")}}
                     <img src="~/assets/image/src.png" alt="">
                  </span>
        </el-popover>-->
        <el-popover placement="bottom" width="100" v-model="visible">
          <div class="rank">
            <p @click="OnRank(1), (visible = false)">
              {{ $t("message.global.lowToHigh") }}
            </p>
            <p @click="OnRank(2), (visible = false)">
              {{ $t("message.global.highToLow") }}
            </p>
          </div>
          <span slot="reference">
            <img src="~/assets/image/sorting.png" alt class="sortimage" />
            {{ $t("message.global.paixu") }}
            <img src="~/assets/image/src.png" alt />
          </span>
          <!-- <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
          </div>-->
        </el-popover>
      </div>
    </div>

    <!-- <infinite-loading  @refresh="onRefresh" v-model="isLoading"> -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <ul class="new_list">
      <router-link
        :to="{ path: '/Details', query: { id: item.id } }"
        v-for="(item, index) in HousingList"
        :key="index"
      >
        <li class="list_li" v-if="house == 'new'">
          <diV class="flex">
            <div class="img">
              <img :src="item.showUrl" class="new_img" v-if="house == 'new'" />
              <span class="year" v-if="item.expressing">{{
                item.expressing
              }}</span>
              <span class="num" v-if="item.province">{{ item.province }}</span>
              <!--<div class="image" >
                      <img :src="item.developersPic" alt="" class="list-img"  >
                      <span class="list-font">{{item.developers}}</span>
              </div>-->
            </div>
            <div class="text">
              <p class="text_title">{{ item.estate }}</p>
              <p class="sort">{{ item.province }}/{{ item.city }}</p>
              <p class="sort">
                {{ item.minHall }} pièces - {{ item.maxHall }} pièces
              </p>
              <!-- <p class="font">
                           <span class="itemize">低TVA</span>
                           <span class="itemize">低TVA</span>
                           <span class="itemize">低TVA</span>
              </p>-->
              <p class="money">
                {{ item.lowPrice }}{{ $t("message.global.rise") }} -
                {{ item.maxPrice }}{{ $t("message.global.rise") }}
              </p>
            </div>
          </diV>
          <div>
            <!-- <p class="font" >
                          <span class="itemize" v-for="(items,index) in item.tags" :key="index">{{items}}</span>
            </p>-->
          </div>
        </li>
      </router-link>
      <router-link
        :to="{ path: '/ordDetails', query: { id: item.id } }"
        v-for="(item, index) in HousList"
        :key="index"
      >
        <li class="list_li" v-if="house == 'second_hand'">
          <diV class="flex">
            <div class="img">
              <img :src="item.showUrl" class="new_img" />
              <span class="year">{{
                item.houseOrApartment == 1
                  ? $t("message.global.apartments")
                  : $t("message.global.cottage")
              }}</span>
              <span class="num">{{
                item.oneselfOrAgent == 1
                  ? $t("message.global.agent")
                  : $t("message.global.Personal")
              }}</span>
            </div>
            <div class="text">
              <p class="text_title">{{ item.title }}</p>
              <p class="sort">{{ item.bigProvince }}/{{ item.province }}</p>
              <!-- <p class="sort">{{item.roomsNum}} {{$t("message.global.P")}} - {{item.bedroomNum}}{{$t("message.global.CH")}} </p> -->
              <p class="money">
                {{ item.total }}{{ $t("message.global.rise") }}
                <span class="unit"
                  >{{ item.unit }}€/{{ $t("message.global.square") }}</span
                >
              </p>
              <p class="font">
                <span class="itemize"
                  >{{ item.roomsNum }}{{ $t("message.global.chamber") }}</span
                >
                <span class="itemize"
                  >{{ item.bedroomNum }}{{ $t("message.global.crouch") }}</span
                >
                <span class="itemize"
                  >{{ item.acreage }}{{ $t("message.global.square") }}</span
                >
              </p>
            </div>
          </diV>
          <!-- <div>
                  <div class="image" >
                  </div>
                  
          </div>-->
        </li>
      </router-link>
      <hr class="hr" />
    </ul>
    <!-- </infinite-loading> -->
    <div style="height:.15rem">
      <Footer />
    </div>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/mIndex/head.vue";
import Footer from "~/components/mIndex/footer.vue";
import mapBox from "~/components/mIndex/mapBox.vue";
import { BASE_API } from "~/api";
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
    if (this.house == "new") {
      return {
        title: "法国新房_楼盘_买新房就上法国33找房网",
        meta: [
          {
            name: "description",
            content:
              "法国33找房新房频道为您查找真实优质的法国新开盘楼盘, 法国新房投资,PINEL减税,LMNP减税,法国33找房收录全法最新最全新房信息。"
          },
          {
            name: "keywords",
            content:
              "法国新房,法国买新房,法国楼盘,33找房,找房,买房投资,买房减税,PINEL减税,LMNP减税,Programme neuf,VEFA,Logement neuf,Promoteur immobilier"
          }
        ]
      };
    }
    return {
      title: "法国二手房_巴黎二手房出售买卖信息网-法国33找房",
      meta: [
        {
          name: "description",
          content:
            "法国33找房二手房频道为您查找真实优质的法国二手房信息,买房,卖房就上33找房-全法最专业的华人找房平台"
        },
        {
          name: "keywords",
          content:
            "法国,巴黎,二手房,法国二手房出售,法国二手房房源,法国二手房买卖,法国二手房交易,找房,买房投资,买房减税,LMNP减税,巴黎房价,achat et vente appartment maison,Paris et toute la France, ancien, LMNP,SCI"
        }
      ]
    };
  },
  data() {
    return {
      fullscreenLoading: false,
      isLoadingNew: false,
      visible: false,
      activeId: 1,
      activeIndex: 0,
      house: this.$route.query.house, //获取是房子
      ipt: this.$route.query.ipt, //获取搜索的值
      minroom: [0, 1], //居室
      value: [4, 8], //'价格'
      Acreage: [0, 1], //面积
      bedroom: [0, 1], //卧室
      minbedroom: "", //最小卧室数量
      maxbedroom: "", //最大卧室数量
      minArea: "", //最小面积
      display: false,
      maxArea: "", //最大面积
      minPrice: "", //价格
      minCost: "", //最小价格上传
      maxCost: "", //最大价格上传
      maxPrice: "", //最大价格
      minAcreage: "", //最小面积
      maxAcreage: "", //最大面积
      minroomHall: "", //最小房间数
      maxroomHall: "", //最大房间数
      delivery: "", //交房时间
      page: 1, //页数
      isLoading: false, //下拉刷新
      HousingList: [], //新房
      HousList: [],
      Maxpage: "1", //新房的最大页数
      provinceList: [], //大小省
      provinces: [],
      pro: "", //小省
      bigProvince: "", //大省
      room: "", //房屋
      minHall: "", //最大居室
      maxHall: "", //最大居室
      sort: 0,
      bedRoomNum: "",
      switch1: false,
      switch2: false,
      LivingRoomNum: ""
    };
  },
  watch: {
    $route(to, from) {
      this.house = this.$route.query.house;
      this.getList();
    }
  },

  mounted() {
    rem();
    this.page = "1";
    this.getList();
  },
  created() {
    this.fmoney = fmoney;
    if (process.client) {
      const that = this;
      window.onscroll = function() {
        if (that.isLoadingNew == true) {
          return;
        }
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
          that.isLoadingNew = true;
          if (that.page < that.Maxpage) {
            that.page++;
            that.onList();
          }
        }
      };
      this.$api.article.getRegionalNew().then(res => {
        res.data.data.spreads.forEach((item, index) => {
          let obj = {
            text: "",
            value: ""
          };
          (obj.text = item), (obj.value = index), this.provinces.push(obj);
        });
      });
      this.latestApi = BASE_API.sq;
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
    onquyu(value) {
      if (value != "") {
        this.provinces.forEach((item, index) => {
          if (value == item.value) {
            this.pro = item.text;
          }
        });
      } else {
        this.pro = "";
      }
      this.page = "1";
      (this.HousList = []),
        (this.HousingList = []), //新房
        this.onList();
    },
    onmenu(value) {
      if (value != "") {
        this.provinceList.forEach((item, index) => {
          if (value == item.value) {
            this.pro = item.text;
          }
        });
      } else {
        this.pro = "";
      }
      this.page = "1";
      (this.HousList = []),
        (this.HousingList = []), //新房
        this.onList();
    },
    getList() {
      let params = {};
      //  获取大小省
      // this.$api.article.getAddress(params).then(res => {
      //    this.province = res.data.data
      //    //console.log(this.province)
      // });
      //  获取新房搜索
      if (this.house == "new") {
        this.$api.article.NewgetSearch(params).then(res => {
          this.minPrice = Number(res.data.date.minPrice);
          this.value[0] = this.minPrice;
          this.maxPrice = Number(res.data.date.maxPrice);
          this.value[1] = this.maxPrice;
          this.minAcreage = Number(res.data.date.minAcreage);
          this.maxAcreage = Number(res.data.date.maxAcreage);

          // this.minArea[0] = this.minAcreage
          // this.minArea[1] = this.maxAcreage
          this.minHall = Number(res.data.date.minHall);
          this.minroom[0] = this.minHall;
          this.maxHall = Number(res.data.date.maxHall);
          this.minroom[1] = this.maxHall;
          // this.minroomHall= Number(res.data.date.minHall)
          // this.maxroomHall= Number(res.data.date.maxHall)
          this.minCost = Number(res.data.date.minPrice);
          this.maxCost = Number(res.data.date.maxPrice);
          this.onList();
        });
      } else {
        this.$api.article.OrdSearch(params).then(res => {
          this.minPrice = Number(res.data.date.minPrice);
          this.maxPrice = Number(res.data.date.maxPrice);
          this.value[0] = this.minPrice;
          this.value[1] = this.maxPrice;
          this.minAcreage = Number(res.data.date.minAcreage);
          this.maxAcreage = Number(res.data.date.maxAcreage);
          this.Acreage[0] = this.minAcreage;
          this.Acreage[1] = this.maxAcreage;
          this.minCost = Number(res.data.date.minPrice);
          this.maxCost = Number(res.data.date.maxPrice);
          this.minArea = Number(res.data.date.minAcreage);
          this.maxArea = Number(res.data.date.maxAcreage);
          this.onList();
        });
      }
    },
    onclick() {
      this.display = !this.display;
    },
    OnRank(val) {
      this.sort = val;
      this.display = false;
      this.page = 1;
      this.HousingList = [];
      this.HousList = [];
      this.onList();
    },
    handleCommand() {
      this.$message("click on item " + command);
    },
    onroomNum() {
      this.page = 1;
      this.HousingList = [];
      this.HousList = [];
      this.onList();
    },
    //  面积
    onAcreage(value) {
      //  this.$toast('当前值：最小值' + value[0] + ' 最大值' + value[1]);
      this.minArea = value[0];
      this.maxArea = value[1];
    },
    //  价格弹框
    onCost(value) {
      // this.$toast('当前值：最小值' + value[0] + ' 最大值' + value[1]);
      this.minCost = value[0];
      this.maxCost = value[1];
    },
    Onprice() {
      this.page = 1;
      this.$refs.item2.toggle();
      this.$refs.item3.toggle();
      this.HousingList = [];
      this.HousList = [];
      this.onList();
    },
    OnTime() {
      this.page = 1;
      this.HousingList = [];
      this.HousList = [];
      this.onList();
    },
    Onpir() {
      this.page = 1;
      this.$refs.item5.toggle();
      this.$refs.item6.toggle();
      this.HousingList = [];
      this.HousList = [];
      this.onList();
    },
    //
    onroom(value) {
      this.minroomHall = value[0];
      this.maxroomHall = value[1];
    },
    // 列表
    onList() {
      if (this.house == "new") {
        this.openFullScreen();
        let params = {
          page: this.page,
          pageSize: "10",
          search: this.ipt,
          bigProvince: this.bigProvince,
          Province: this.pro,
          lowPrice: this.minCost,
          maxPrice: this.maxCost,
          expressing: this.delivery,
          minHall: this.minroomHall,
          maxHall: this.maxroomHall
        };
        this.$api.article.getList(params).then(res => {
          this.fullscreenLoading = false;
          this.isLoadingNew = false;
          if (res.data.data.newHousingList.length != 0) {
            this.HousingList.push(...res.data.data.newHousingList); //新房
          } else {
            this.HousingList = res.data.data.newHousingList;
          }

          this.Maxpage = res.data.data.maxPage; //最大值
        });
      } else if (this.house == "second_hand") {
        this.openFullScreen();
        let params = {
          page: this.page,
          pageSize: "10",
          sort: this.sort,
          bigProvince: this.bigProvince,
          Province: this.pro,
          search: this.ipt,
          lowestHousePrice: this.minCost,
          highestHousePrice: this.maxCost,
          loweAcreage: this.minArea,
          highestAcreage: this.maxArea,
          LivingRoomNum: this.LivingRoomNum,
          bedRoomNum: this.bedRoomNum
        };
        this.$api.article.OrdList(params).then(res => {
          if (res.data.data.homesList.length != 0) {
            this.fullscreenLoading = false;
            this.HousList.push(...res.data.data.homesList); //二手房
          } else {
            this.HousList = res.data.date.homesList;
          }

          this.Maxpage = res.data.data.maxPage; //最大值
        });
      }
    }
  },
  beforeDestroy () {
    window.onscroll = undefined;
  }
};
</script>
<style lang="scss" scoped>
.sortimage {
  position: relative;
  top: 0.02rem;
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
iframe {
  width: 100%;
  height: 100%;
}
div {
  font-size: 16px;
}
.select,
.section {
  display: flex;
}
.select > div {
  width: 25%;
}
.section > div {
  width: 20%;
}
.map {
  height: 3.24rem;
  margin: 0 0.13rem 0.11rem 0.13rem;
}
.unit {
  font-size: 0.12rem;
  color: rgba(172, 172, 172, 1);
  line-height: 0.17rem;
  padding-left: 0.1rem;
}
.order_title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
}
.van-pull-refresh__track {
  margin-bottom: 0.25rem;
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
  padding: 0 0.05rem;
  margin-right: 0.06rem;
}
.money {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
  line-height: 0.22rem;
}
.year {
  // width:0.51rem;
  height: 0.24rem;
  background: rgba(35, 76, 211, 1);
  border-radius: 0px 0px 0px 0.13rem;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  top: 0rem;
  right: 0;
  padding: 0 0.15rem;
  line-height: 0.24rem;
}
.num {
  // width:0.38rem;
  height: 0.17rem;
  background: rgba(106, 192, 120, 1);
  border-radius: 1px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  padding: 0 0.15rem;
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
.new_list li > div {
  display: flex;
  //   padding-top: 0.11rem;
}
.flex {
  padding-top: 0.11rem;
}
.text p {
  padding-bottom: 0.04rem;
}
.hr {
  border: none;
  height: 1px;
  background-color: #ececec;
}
// hr:last-child {
//    margin-bottom: .24rem;
// }
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
  padding: 0.1rem 0.1rem 0 0.1rem;
}
.van-slider {
  margin: 0 0.15rem;
}
.asd {
  padding-bottom: 0.3rem !important;
}
.el-slider {
  padding: 0 0.2rem;
}
.btn_i {
  float: right;
  width: 1.1rem;
  margin: 0.1rem 0.2rem;
  background: rgba(35, 77, 212, 1);
  border-radius: 0.06rem;
}
</style>
<style lang="scss">
/* .house{
   .el-popover{
      padding:0,
   }
   .el-popper .popper__arrow, .el-popper .popper__arrow::after {
   display: none;
   }
} */

.van-tree-select__item {
  font-weight: 400;
  font-size: 14px !important;
}
.el-tooltip__popper {
  display: none !important;
}
.van-popup {
  padding-left: 0.1rem;
  padding-top: 0.1rem;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 96%;
}
.el-input__inner {
  height: 0.3rem;
}
</style>
