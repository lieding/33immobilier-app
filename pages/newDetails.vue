<template>
  <div class="seconHandHous">
    <headers :class="{ colors: flag }"></headers>
    <div class="centerS secondBod clearfix">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.newdetailsXq") }}</span>
      </div>
      <div class="oductions">
        {{ $t("message.global.premisess") }}:
        {{ getPostListingData.estate }}
        <span
          style="float:right;color:#B9B9B9;font-size:18px;font-weight:400;cursor: pointer;"
          @click="handleOpen"
        >
          <img style="width:20px;" src="@/assets/image/wxInd.png" alt="" />
          {{ $t("message.global.WeChat") }}
        </span>
        <img
          style="float:right;height:73px;margin-top:-10px;margin-right:10px;vertical-align:top"
          :src="getPostListingData.developersPic"
          alt=""
        />
      </div>
      <div class="leftBody">
        <!-- // 轮播图 -->
        <div class="slideshow">
          <el-carousel :interval="5000" height="404px" arrow="always">
            <el-carousel-item
              v-for="(item, i) in getPostListingData.picList"
              :key="i"
            >
              <div
                class="lunbotu"
                v-bind:style="{ 'background-image': 'url(' + item + ')' }"
                @click="galleryIndex = i"
              ></div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 地图 -->
      </div>
      <div class="rightBody">
        <div class="ContentPakeAge">
          <p class="prises">
            {{ getPostListingData.lowprice }}€ —
            {{ getPostListingData.maxPrice }}€
          </p>
          <p class="block">
            <!-- <span style="background-color:#6AC078;padding:3px 8px;">PINEL减税</span> -->
            <span style="background-color:#234CD3;padding:3px 8px;">{{
              getPostListingData.expressing
            }}</span>
            <span
              style="background-color:#BFBFBF;padding:2px 3px; float:right;"
              v-for="(itemA, index) in getPostListingData.tags"
              :key="index"
              >{{ itemA }}</span
            >
          </p>
          <p class="smJf">
            {{ $t("message.global.completionDate") }}：
            <span>{{ getPostListingData.expressing }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.HouseNumber") }}：
            <span>{{ getPostListingData.homesNum }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.measures") }}：
            <span>{{ getPostListingData.taxCuts }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.jianshuiuquyu") }}：
            <span>{{ getPostListingData.taxCutsArea }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.deductibility") }}：
            <span>{{ getPostListingData.taxCutsQuota }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.Inventor") }}：
            <span
              >{{ getPostListingData.province }}/{{
                getPostListingData.city
              }}</span
            >
          </p>
          <p class="smJf">
            {{ $t("message.global.range") }}：
            <span
              >{{ getPostListingData.minHall }} -
              {{ getPostListingData.maxHall }}
              {{ $t("message.global.pieces") }}</span
            >
          </p>
        </div>
        <div class="counselor">
          <p style="text-align:center;font-size:22px;font-weight:600;">
            {{ $t("message.global.counselor") }}
          </p>
          <div class="plank">
            <div style="float:left;position:relative;">
              <img
                style="border-radius:50%;"
                :src="getPostListingData.brokerAvatar"
                alt=""
              />
              <img
                style="position:absolute;bottom:0px;left:50%;margin-left:-18px;width:28px;height:15px;"
                src="@/assets/image/proAgent.png"
                alt=""
              />
            </div>
            <div style="float:left; overflow:hidden">
              <p style="margin-top:10px;">
                {{ getPostListingData.brokerName }}
              </p>
              <p style="margin-top:10px;">{{ getPostListingData.brokerJob }}</p>
            </div>
            <br /><br /><br /><br />
            <p class="icons" style="margin-top:10px;text-align:right;">
              <span @click="ck(1)"
                ><img :src="img.phone" alt="" />
                {{
                  ft1
                    ? getPostListingData.brokerTelPhone
                    : $t("message.global.connection")
                }}</span
              >
              <span @click="ck(2)"
                ><img :src="img.email" alt="" />
                {{
                  ft2
                    ? getPostListingData.brokerEmail
                    : $t("message.global.mail")
                }}</span
              >
              <span @click="ck(3)"
                ><img :src="img.wxInd" alt="" />
                {{
                  ft3
                    ? getPostListingData.wxNumber
                    : $t("message.global.lishibuluo")
                }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="centerS contentS">
      <p class="titles">
        <span style="font-size:32px;margin-right:10px;font-weight:600;">{{
          $t("message.global.premises")
        }}</span>
        <span
          @click="interpretP"
          style="font-size:16px;color:#234CD3;cursor: pointer;"
        >
          {{
            interpret
              ? $t("message.global.interpret")
              : $t("message.global.interpret")
          }}</span
        >
        <span
          style="font-size:20px;color:#fff;float:right;background-color:#027AFF;padding:8px 20px;cursor: pointer"
          @click="downX(getPostListingData.brochure)"
          >{{ $t("message.global.brochure") }}</span
        >
      </p>
      <p style="margin-top: 10px; white-space: pre-line;">
        {{
          interpret
            ? getPostListingData.introduceFr
            : getPostListingData.introduceCn
        }}
      </p>
      <p class="titles" style="margin-top:10px;">
        <span style="font-size:32px;margin-right:10px;font-weight:600;"
          >{{ $t("message.global.position") }}：
          {{ getPostListingData.estateAddress }}</span
        >
      </p>
      <div style="border: 1px solid #ccc;">
        <iframe
          height="500px"
          width="1200px"
          :src="address_Map"
          frameborder="0"
        ></iframe>
      </div>
      <div v-if="getPostListingData.isOpenVR">
        <p
          class="titles"
          style="margin-top:10px;font-weight:600;padding-bottom:10px;"
        >
          <span style="font-size:32px;margin-right:10px;">{{
            $t("message.global.theoretical")
          }}</span>
        </p>
        <iframe
          height="500px"
          width="1200px"
          :src="getPostListingData.vrAddress"
          frameborder="0"
        ></iframe>
      </div>
      <p class="titles" style="margin-top:10px;padding-bottom:20px;">
        <span style="font-size:32px;margin-right:10px;font-weight:600;">{{
          $t("message.global.modelDetails")
        }}</span>
      </p>
      <el-table
        :empty-text="$t('message.global.zanwushuju')"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="number"
          :label="$t('message.global.chamberID')"
        ></el-table-column>
        <el-table-column
          prop="roomNum"
          :label="$t('message.global.DoorMode')"
        ></el-table-column>
        <el-table-column
          prop="area"
          :label="$t('message.global.usableArea')"
        ></el-table-column>
        <el-table-column
          prop="floor"
          :label="$t('message.global.level')"
        ></el-table-column>
        <el-table-column
          prop="price"
          :label="$t('message.global.price')"
        ></el-table-column>
        <el-table-column
          prop="averagePrice"
          :label="$t('message.global.averagePrice')"
        ></el-table-column>
        <el-table-column
          prop="rentPrice"
          :label="$t('message.global.estimate')"
        ></el-table-column>
        <el-table-column
          prop="rewards"
          :label="$t('message.global.RAROC')"
        ></el-table-column>
        <el-table-column :label="$t('message.global.floorPlan')">
          <template slot-scope="scope">
            <span
              style="color:#224BD7;cursor: pointer;text-decoration:underline;"
              @click="goTwoD(scope.row.vrAddress)"
              >2D</span
            >
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.global.condition')">
          <template slot-scope="scope">
            <span>{{ pdstate(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data" :label="$t('message.global.connectUs')">
          <template slot-scope="scope">
            <span
              style="color:#224BD7;cursor: pointer;text-decoration:underline;"
              @click="routerGos(scope.row.apartmentId)"
              >{{ $t("message.global.connectUs") }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="centerS">
      <calculate></calculate>
    </div>
    <div class="centerS" style="margin-top:20px;" v-show="promoteList.length">
      <div style="font-size:32px;font-weight:600;">
        {{ $t("message.global.Recommended") }}
      </div>
      <div class="housingResourceL">
        <div class="houseReq" v-for="(item, index) in promoteList" :key="index">
          <div style="position:relative;">
            <img
              @click="routerGo(item.promoteId)"
              style="width:244px;height:144px;"
              :src="item.promoteShowUrl"
              alt=""
            />
            <p style="position:absolute;bottom:10px;padding-left:5px;">
              <span
                v-show="item.promoteTaxCuts"
                style="padding:3px 9px;
                            font-size:12px;
                            color:#fff;
                            background-color:#6AC078;
                            font-weight:600;
                            margin-right:4px;"
              >
                {{ item.promoteTaxCuts }}
              </span>
              <span
                v-show="item.promoteExpressing"
                style="padding:3px 9px;
                            font-size:12px;
                            color:#fff;
                            font-weight:600;
                            background-color:#234CD3"
              >
                {{ item.promoteExpressing }}
              </span>
            </p>
          </div>
          <p
            class="huodian"
            style="font-size:18px;color:rgba(80,80,80,1);padding-left:10px;"
          >
            {{ item.promoteEstate }}
          </p>
          <div style="padding-top:5px;">
            <img
              style="width:13px;height:15px;padding-left:10px;vertical-align: middle;"
              :src="img.location"
              alt=""
            />&nbsp;
            <span style="font-size:14px;color:#A1A1A1;vertical-align: middle;"
              >{{ item.promoteProvince }}/{{ item.promoteCity }}</span
            >
          </div>
          <div style="padding-top:5px;">
            <img
              style="width:13px;height:15px;padding-left:10px;vertical-align: middle;"
              :src="img.apartment"
              alt=""
            />&nbsp;
            <span style="font-size:14px;color:#A1A1A1;vertical-align: middle;"
              >{{ item.promoteMinHall }} - {{ item.promoteMaxHall }}
              {{ $t("message.global.P") }}
            </span>
          </div>
          <div style="padding-top:5px;">
            <span
              v-for="(tags, i) in item.tags"
              :key="i"
              style="display:inline-block;padding:3px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-left:10px;"
              >{{ tags }}</span
            >
          </div>
          <div
            style="font-size:16px;
                    color:#FF5E5E;
                    padding-left:10px;
                    font-weight:600;
                    padding-top:3px;"
          >
            {{ item.promoteLowPrice }} - {{ item.promoteMaxPrice }}€
          </div>
        </div>
      </div>
    </div>
    <!--  concentUs  -->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="1148px"
      :before-close="handleClose"
    >
      <!-- <span>这是一段信息</span> -->
      <div style="overflow:hidden">
        <div
          style="float:left;width:556px;height:400px;text-align:center;box-sizing:border-box;padding:20px;"
        >
          <span
            style="font-size:30px;color:#000;margin-bottom:30px;display:inline-block;"
            >{{ $t("message.global.scan") }}</span
          >
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div
          class="absc"
          style="float:left;width:532px;height:400px;border:2px solid #979797;border-radius:20px;box-sizing:border-box;padding-top:30px;padding-left:40px;font-size:22px;"
        >
          <p>
            {{ $t("message.global.HousingTypes") }}：
            <span>{{ $t("message.global.NewHouse") }}</span>
          </p>
          <p class="huodian">
            {{ $t("message.global.subject") }}：<span>{{
              getPostListingData.estate
            }}</span>
          </p>
          <p class="huodian">
            {{ $t("message.global.position") }}：<span>{{
              getPostListingData.estateAddress
            }}</span>
          </p>
          <!-- estateAddress -->
          <p>
            {{ $t("message.global.price") }}：
            <span
              >{{ getPostListingData.lowprice }} €-
              {{ getPostListingData.maxPrice }}€</span
            >
          </p>
          <p>
            {{ $t("message.global.range") }}：
            <span
              >{{ getPostListingData.minHall }} - {{ getPostListingData.maxHall
              }}{{ $t("message.global.P") }}</span
            >
          </p>
          <p>
            {{ $t("message.global.completionDate") }}：
            <span>{{ getPostListingData.expressing }}</span>
          </p>
          <!-- <p>房源链接：<span>{{ getPostListingData.city }}</span></p> -->
          <p class="huodian">
            {{ $t("message.global.Describing") }}：{{
              getPostListingData.introduceFr
            }}
          </p>
          <p>
            {{ $t("message.global.Inventor") }}：
            <span>{{ getPostListingData.city }}</span>
          </p>
          <p>
            {{ $t("message.global.property") }}：
            <span>{{ getPostListingData.brokerName }}</span>
          </p>
          <p>
            {{ $t("message.global.post") }}：
            <span>{{ getPostListingData.brokerEmail }}</span>
          </p>
          <p>
            {{ $t("message.global.contactPhone") }}：
            <span>{{ getPostListingData.brokerTelPhone }}</span>
          </p>
        </div>
        <textarea
          style="z-index:-10000;font-size:0;border:1px solid #fff;"
          id="input"
        >
这是幕后黑手</textarea
        >
        <div
          :class="{ qianlan: qianlan }"
          style="float:right;
            width:254px;
            height:64px;
            background-color:#ADD8E6;
            margin-right:20px;
            line-height:64px;
            text-align:center;
            font-size:21px;
            color:#fff;
            cursor: pointer;
            margin-top:10px;border-radius:5px;"
          @click="consf"
        >
          {{ $t("message.global.fuzhi") }}
        </div>
      </div>
    </el-dialog>
    <foots></foots>
    <client-only>
      <gallery
        :images="getPostListingData.picList"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>
    </client-only>
  </div>
</template>

<script>
import headers from "@/components/PcIndex/moduleT/header.vue";
import foots from "@/components/PcIndex/moduleT/foot.vue";
import calculate from "@/components/PcIndex/promoteList.vue";

import wxInd from "@/assets/image/wxInd.png";
import phone from "@/assets/image/phone.png";
import email from "@/assets/image/email.png";
import proVip from "@/assets/image/proVip.png";
import visitCard from "@/assets/image/visitCard.png";
import authentication from "@/assets/image/authentication.png";
import size from "@/assets/image/size.png";
import time from "@/assets/image/time.png";
import bed from "@/assets/image/bed.png";
import apartment from "@/assets/image/apartment.png";
import location from "@/assets/image/dingwei.png";

import airG from "@/assets/image/picSzg/airG.png";
import airH from "@/assets/image/picSzg/airH.png";
import bedG from "@/assets/image/picSzg/bedG.png";
import bedH from "@/assets/image/picSzg/bedH.png";
import chairsG from "@/assets/image/picSzg/chairsG.png";
import chairsH from "@/assets/image/picSzg/chairsH.png";
import chestG from "@/assets/image/picSzg/chestG.png";
import chestH from "@/assets/image/picSzg/chestH.png";
import heatG from "@/assets/image/picSzg/heatG.png";
import heatH from "@/assets/image/picSzg/heatH.png";
import ovenG from "@/assets/image/picSzg/ovenG.png";
import ovenH from "@/assets/image/picSzg/ovenH.png";
import refrigG from "@/assets/image/picSzg/refrigG.png";
import refrigH from "@/assets/image/picSzg/refrigH.png";
import televisG from "@/assets/image/picSzg/televisG.png";
import televisH from "@/assets/image/picSzg/televisH.png";
import washerG from "@/assets/image/picSzg/washerG.png";
import washerH from "@/assets/image/picSzg/washerH.png";
import wifiG from "@/assets/image/picSzg/wifiG.png";
import wifiH from "@/assets/image/picSzg/wifiH.png";

import baseurl from "@/api/base.js";

export default {
  name: "seconHandHous",
  middleware: "responsive",
  components: {
    headers,
    foots,
    calculate
  },
  head() {
    console.log(this.getPostListingData.city);
    return {
      title: `${this.getPostListingData.estate} (${this.getPostListingData.city})`,
      meta: [
        {
          name: "description",
          content: `${this.getPostListingData.estate} (${this.getPostListingData.city})`
        },
        {
          name: "keywords",
          content: `法国新房,法国楼盘,买房投资,买房减税,PINEL减税,LMNP减税,VEFA,Logement neuf,${this.getPostListingData.estate},${this.getPostListingData.city}`
        },
        {
          name: "og:image",
          content: this.getPostListingData.picList[0]
        }
      ]
    };
  },
  async asyncData({ route, app }) {
    try {
      const as = { id: route.query.flag };
      const getInfoNewHousInfo = (await app.$api.article.getInfoNewHous(as))
        .data;
      return {
        getPostListingData: getInfoNewHousInfo.data,
        tableData: getInfoNewHousInfo.data.aparementList,
        promoteList: getInfoNewHousInfo.data.promoteList,
        address_Map:
          "http://47.254.149.82" +
          "/app/map/jumpMap?lat=" +
          getInfoNewHousInfo.data.latitude +
          "&lng=" +
          getInfoNewHousInfo.data.longitude
      };
    } catch {
      return {};
    }
  },
  data() {
    return {
      input2: "",
      flag: true,
      interpret: true,
      address_Map: "",
      ft1: false,
      ft2: false,
      ft3: false,
      img: {
        location,
        apartment,
        bed,
        time,
        size,
        authentication,
        visitCard,
        proVip,
        phone,
        airG,
        airH,
        bedG,
        bedH,
        chairsG,
        chairsH,
        chestG,
        heatG,
        heatH,
        ovenG,
        ovenH,
        refrigG,
        refrigH,
        televisG,
        televisH,
        washerG,
        washerH,
        wifiG,
        wifiH,
        email,
        wxInd
      },
      inputs: "",
      getPostListingData: "",
      apartmentList: [],
      agent: "",
      roomInc: [],
      promoteList: ["", "", "", ""],
      dialogVisible: false,
      tableData: [{}, {}],
      baseurl: baseurl.sq,
      qianlan: false,
      galleryIndex: null
    };
  },
  created() {
    this.get(this.$route.query.flag);
  },
  methods: {
    routerGos(val) {
      this.$router.push({
        path: "/concentUs",
        query: {
          apartmentId: val,
          id: this.$route.query.flag
        }
      });
    },
    // 小方法
    consf() {
      if (process.client) {
        // console.log(document.querySelector('.absc').innerText)
        const ass = document.querySelector(".absc").innerText;
        var input = document.getElementById("input");
        input.value = ass;
        input.select();
        document.execCommand("Copy");
        this.qianlan = true;
        this.$message({
          showClose: true,
          message: "success",
          type: "success"
        });
      }
    },
    goTwoD(address) {
      window.open(address, "_blank");
    },
    ck(val) {
      if (val == 1) {
        this.ft1 = true;
      } else if (val == 2) {
        this.ft2 = true;
      } else if (val == 3) {
        this.ft3 = true;
      }
    },
    interpretP() {
      this.interpret = !this.interpret;
    },
    handleClose(done) {
      this.$refs.qrcode.innerHTML = null;
      done();
    },
    handleOpen() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.qrcode();
      });
    },
    qrcode() {
      if (process.client) {
        let P = window.location.protocol + "//" + window.location.hostname;
        let qrcode = new QRCode("qrcode", {
          width: 220, // 设置宽度
          height: 220, // 设置高度
          text: P + "/Details" + "?id=" + this.getPostListingData.id
        });
      }
    },
    routerGo(flags) {
      if (process.client) {
        this.get(flags);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    pdstate(val) {
      if (val == 1) {
        return this.$t("message.global.beReserved");
      } else if (val == 2) {
        return this.$t("message.global.beenSold");
      } else if (val == 0) {
        return this.$t("message.global.CanBuy");
      }
    },
    async get(smt) {
      const as = { id: smt };
      const getInfoNewHousInfo = (await this.$api.article.getInfoNewHous(as))
        .data;
      if (getInfoNewHousInfo.code == 0) {
        this.getPostListingData = getInfoNewHousInfo.data;
        this.tableData = getInfoNewHousInfo.data.aparementList;
        this.promoteList = getInfoNewHousInfo.data.promoteList;
        this.address_Map =
          "http://47.254.149.82" +
          "/app/map/jumpMap?lat=" +
          getInfoNewHousInfo.data.latitude +
          "&lng=" +
          getInfoNewHousInfo.data.longitude;
        // console.log(this.address_Map)
      }
    },
    // 判断对象是否为空
    isEmptyObject(obj) {
      for (let key in obj) {
        return true;
        console.log(key);
      }
      return false;
    },
    downX(urls) {
      // window.location.href = urls
      window.open(urls, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.huodian {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
#qrcode {
  display: inline-block;
  img {
    width: 232px;
    height: 232px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
  }
}
.colors {
  color: #000 !important;
}
// 轮播图
.lunbotu {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.secondBod {
  padding-bottom: 12px;
  .headline {
    padding-top: 10px;
    color: #000;
    font-size: 16px;
    span {
      cursor: pointer;
    }
  }
  .oductions {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    padding: 16px;
    padding-bottom: 30px;
  }
  // 左侧主题
  .leftBody {
    float: left;
    width: 710px;
    // 轮播图
    .slideshow {
      text-align: center;
      .el-carousel__item img {
        // width: 710px;
        height: 404px;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
    // 地图
    .atlas {
      padding-top: 40px;
      .atlasTop {
        .noO {
          font-size: 32px;
          font-weight: 700;
          vertical-align: middle;
        }
        img {
          vertical-align: middle;
          width: 18px;
          height: 21px;
        }
        .noT {
          vertical-align: middle;
          font-size: 20px;
        }
      }
    }
    // 房屋
    .synopsis {
      padding-top: 40px;
      .synopsisTop {
        .synopsisjj {
          vertical-align: middle;
          color: #000;
          font-weight: 700;
          font-size: 32px;
        }
        .translate {
          font-size: 20px;
          vertical-align: middle;
          color: #234cd3;
        }
      }
      .synopsisBod {
        font-size: 16px;
        color: #464646;
        padding-top: 20px;
      }
    }
    //详情
    .houseDetails {
      padding-top: 30px;
      overflow: hidden;
      .houseTop {
        font-size: 32px;
        font-weight: 700;
        color: #000;
      }
      .houseSec {
        img {
          width: 701px;
          height: 302px;
        }
      }
      .introduce {
        .houseListLa {
          border: 2px solid #d9d9d9;
          width: 309px;
          height: 160px;
          margin: 13px;
          padding: 13px;
          box-sizing: border-box;
          float: left;
          .houseListTop {
            color: #262626;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .houseProportion {
            font-size: 24px;
            color: #262626;
            margin-bottom: 3px;
            span {
              color: #acacac;
              font-weight: 400;
            }
          }
          .houseOrientation {
            font-size: 24px;
            color: #262626;
            // font-weight: 700;
            span {
              color: #acacac;
              font-weight: 400;
            }
          }
        }
      }
    }
    // 虚拟看房
    .seeApartment {
      .apartmentTop {
        font-size: 32px;
        color: #000;
        font-weight: 700;
        padding-top: 20px;
      }
    }
    // 贷款
    .loans {
      .loansTop {
        font-size: 32px;
        color: #000;
        font-weight: 700;
        padding-top: 18px;
      }
      .calculate {
        overflow: hidden;
        padding: 12px;
        box-sizing: border-box;
        .counter {
          width: 331px;
          height: 293px;
          box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.13);
          box-sizing: border-box;
          padding: 15px;
          p {
            margin: 10px 0;
            font-size: 14px;
            color: #2a2a2a;
          }
          .buttonInput {
            background-color: #234dd4;
            width: 110px;
            height: 40px;
            border-radius: 6px;
            float: right;
            color: #fff;
            font-size: 20px;
            line-height: 40px;
            text-align: center;
            margin: 20px;
            cursor: pointer;
          }
        }
      }
      .downSm {
        height: 57px;
        background-color: #839ff8;
        border-radius: 24px;
        font-size: 24px;
        color: #fff;
        line-height: 57px;
        text-align: center;
        margin-top: 30px;
        cursor: pointer;
      }
    }
  }
  .rightBody {
    float: right;
    width: 455px;
    .ContentPakeAge {
      box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
      padding: 9px 20px;
      .prises {
        font-size: 26px;
        font-weight: 600;
        color: #ff5e5e;
        //    overflow: hidden;
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .block {
        margin-top: 4px;
        span {
          display: inline-block;
          color: #fff;
          margin-right: 8px;
        }
      }
    }
    .counselor {
      margin-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
      .plank {
        overflow: hidden;
        div {
          img {
            width: 87px;
            height: 86px;
            margin-right: 10px;
          }
        }
        .icons {
          span {
            display: inline-block;
            padding: 3px;
            background-color: #f7f7f7;
            margin-right: 15px;
          }
          img {
            width: 15px;
            //    height:15px;
            vertical-align: middle;
            margin-right: 0px;
          }
        }
      }
    }
    .smJf {
      margin-top: 6px;
      color: #bababa;
      font-weight: 600;
      font-size: 16px;
      span {
        color: #000000;
      }
    }
  }
}
.housingResourceL {
  margin-bottom: 20px;
  padding-top: 30px;
  .houseReq {
    width: 244px;
    height: 285px;
    display: inline-block;
    margin-right: 56px;
    box-sizing: border-box;
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.12);
  }
}
.chairsNd {
  padding-top: 10px;
  span {
    display: inline-block;
    text-align: center;
    width: 48px;
    margin: 0 16px;
    margin-bottom: 10px;
    img {
      width: 31px;
      height: 23px;
    }
  }
  .sizeClo {
    text-decoration: line-through;
    color: #bcbcbc;
  }
}
.contentS {
  margin-top: 10px;
  .contentS {
    span {
      display: inline-block;
    }
  }
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
.qianlan {
  background-color: #234dd4 !important;
}
</style>
<style lang="less">
.contentS {
  .el-table thead {
    font-size: 16px;
  }
}
</style>
