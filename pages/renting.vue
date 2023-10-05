<template>
  <div class="seconHandHous">
    <headers :class="{ colors: flag }"></headers>
    <div class="secondBod centerS clearfix">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.handpick") }}</span>
      </div>
      <div class="oductions" style="line-height:42px;">
        {{ getPostListingData.title }}
        <span
          style="float:right;color:#B9B9B9;font-size:18px;font-weight:400;cursor: pointer;"
          @click="handleOpen"
        >
          <img style="width:20px;" src="~/assets/image/wxInd.png" alt="" />
          {{ $t("message.global.WeChat") }}
        </span>
      </div>
      <div class="leftBody">
        <!-- // 轮播图 -->
        <div class="slideshow">
          <el-carousel :interval="5000" height="404px" arrow="always">
            <el-carousel-item
              v-for="(item, i) in getPostListingData.pics"
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
        <div class="atlas">
          <div class="atlasTop">
            <span class="noO">
              {{ $t("message.global.locationwz") }}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <img :src="img.location" alt="" />
            <span class="noT">
              {{ getPostListingData.province }} / {{ getPostListingData.city }}
            </span>
          </div>
          <div v-if="mapIframeSrc" style="border: 1px solid #ccc;">
            <iframe
              height="500px"
              width="710px"
              :src="mapIframeSrc"
              frameborder="0"
            ></iframe>
          </div>
        </div>
        <!-- 房屋简介 -->
        <div class="synopsis">
          <div class="synopsisTop">
            <span class="synopsisjj">
              {{ $t("message.global.Describing") }}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span class="translate" @click="frCn">
              {{ frOrCn ? "翻译中文" : "Traduction en français" }}
            </span>
          </div>
          <div class="synopsisBod">
            {{
              frOrCn
                ? getPostListingData.introduceFr
                : getPostListingData.introduceCn
            }}
          </div>
        </div>
        <!-- 户型详情 -->
        <!-- <div class="houseDetails">
          <div class="houseTop" v-show="getPostListingData.huXingUrl">
            {{ $t("message.global.floorPlan") }}
          </div>
          <div class="houseSec" v-show="getPostListingData.huXingUrl">
            <img :src="getPostListingData.huXingUrl" alt="" />
          </div>
          <div class="houseTop">
            {{ $t("message.global.modelDetails") }}
          </div>
          <el-table
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            :data="roomInc"
            :stripe="true"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              prop="roomNum"
              :label="$t('message.global.apartment')"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="roomArea"
              :label="$t('message.global.proportion')"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="direction"
              :label="$t('message.global.orientation')"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="gender"
              :label="$t('message.global.gender')"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="zodiac"
              :label="$t('message.global.constellation')"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="roomPrice"
              :label="$t('message.global.price')"
            >
            </el-table-column>
          </el-table>
        </div> -->
        <!-- 虚拟 看房 -->
        <div class="seeApartment" v-if="getPostListingData.isOpenVr">
          <div class="apartmentTop">
            {{ $t("message.global.theoretical") }}
          </div>
          <iframe
            height="500px"
            width="700px"
            :src="getPostListingData.vrAddress"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div class="rightBody">
        <div class="rightToppic">
          <!-- <img v-for="(item,i) in getPostListingData.pics" :key="i" :src="item" alt=""> -->

          <div
            :class="{ lunbotu: true, mars: i % 3 == 2 }"
            style="background-color:#ccc;"
            v-for="(item, i) in getPostListingData.pics"
            :key="i"
            v-bind:style="{ 'background-image': 'url(' + item + ')' }"
            @click="galleryIndex = i"
          ></div>
        </div>
        <div class="houseInfo">
          <p class="prises">{{ getPostListingData.total }} €</p>
          <div style="padding-top: 10px;">
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.apartment"
                alt=""
              />
              <span style=" vertical-align: middle;">
                {{
                  getPostListingData.houseOrApartment != 0
                    ? $t("message.global.apartments")
                    : $t("message.global.cottage")
                }}</span
              ></span
            >
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.bed"
                alt=""
              />
              <span style=" vertical-align: middle;">
                {{ getPostListingData.roomsNum }}{{ $t("message.global.P") }}
                {{ getPostListingData.bedroomNum
                }}{{ $t("message.global.crouch") }}</span
              ></span
            >
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.time"
                alt=""
              />
              <span style=" vertical-align: middle;">
                {{ getPostListingData.year
                }}{{ $t("message.global.ans") }}</span
              ></span
            >
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.size"
                alt=""
              />
              <span style=" vertical-align: middle;">
                {{ getPostListingData.acreage
                }}{{ $t("message.global.square") }}</span
              ></span
            >
          </div>
          <p style="font-size:20px;color:#000;font-weight:600;margin-top:10px;">
            {{ $t("message.global.supporting") }}
          </p>
          <div class="chairsNd">
            <span
              ><img :src="img.chairsG" alt="" /><br />{{
                $t("message.global.chairs")
              }}</span
            >
            <span
              ><img :src="img.chestG" alt="" /><br />{{
                $t("message.global.wardrobe")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isBed }"
              ><img
                v-if="getPostListingData.isBed"
                :src="img.bedG"
                alt=""
              /><img v-else :src="img.bedH" alt="" /><br />{{
                $t("message.global.bed")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isFrig }"
              ><img
                v-if="getPostListingData.isFrig"
                :src="img.refrigG"
                alt=""
              /><img v-else :src="img.refrigH" alt="" /><br />{{
                $t("message.global.refrigerator")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isWashing }"
              ><img
                v-if="getPostListingData.isWashing"
                :src="img.washerG"
                alt=""
              /><img v-else :src="img.washerH" alt="" /><br />{{
                $t("message.global.washer")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isSteam }"
              ><img
                v-if="getPostListingData.isSteam"
                :src="img.heatG"
                alt=""
              /><img v-else :src="img.heatH" alt="" /><br />{{
                $t("message.global.heating")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isHeater }"
              ><img
                v-if="getPostListingData.isHeater"
                :src="img.airG"
                alt=""
              /><img v-else :src="img.airH" alt="" /><br />{{
                $t("message.global.calorifier")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isBroadband }"
              ><img
                v-if="getPostListingData.isBroadband"
                :src="img.wifiG"
                alt=""
              /><img v-else :src="img.wifiH" alt="" /><br />{{
                $t("message.global.broadband")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isBed }"
              ><img :src="img.ovenG" alt="" /><br />{{
                $t("message.global.microwave")
              }}</span
            >
            <span :class="{ sizeClo: !getPostListingData.isTV }"
              ><img
                v-if="getPostListingData.isTV"
                :src="img.televisG"
                alt=""
              /><img v-else :src="img.televisH" alt="" /><br />{{
                $t("message.global.television")
              }}</span
            >
          </div>
        </div>
        <div class="broker">
          <div class="agencyLiCar">
            <div class="leftCarA">
              <img src="~/assets/image/avatar.svg" alt="" />
            </div>
            <div class="rightCarA">
              <p class="rightName">{{ getPostListingData.contactName }}</p>
              <div>
                <img :src="img.phone" alt="" style="width:12px;" />
                <span>{{ getPostListingData.contactPhone }}</span>
              </div>
              <p>
                <span>{{ $t("message.global.contactWX") }}：{{ getPostListingData.contactWx }}</span>
                <!-- <span>{{ $t("message.global.contactEmil") }}：{{ getPostListingData.contactEmail }}</span> -->
              </p>
            </div>
          </div>
          <div style="margin-bottom:10px">
            <el-input
              :placeholder="$t('message.global.YourName')"
              prefix-icon="el-icon-s-custom"
              v-model="input2"
            ></el-input>
          </div>
          <div style="margin-bottom:10px">
            <el-input
              :placeholder="$t('message.global.YourMessage')"
              prefix-icon="el-icon-message"
              v-model="input3"
            ></el-input>
          </div>
          <div style="margin-bottom:10px">
            <el-input
              :placeholder="$t('message.global.YourPhone')"
              prefix-icon="el-icon-phone"
              v-model="input4"
            ></el-input>
          </div>
          <el-input
            type="textarea"
            :placeholder="$t('message.global.LeaveYourMessage')"
            size="medium"
            v-model="input5"
            show-word-limit
          ></el-input>
          <div
            style="height:60px;font-size:20px;color:#fff;background-color:rgb(36,84,218);margin-top:25px;text-align:center;line-height:60px; cursor: pointer;"
            @click="sentEmail"
          >
            {{ $t("message.global.fsxx") }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="promoteList?.length" class="recommend">
      <div class="title">
        {{ $t("message.global.Recommended") }}
      </div>
      <div class="housingResourceL">
        <div
          class="houseReq"
          v-for="(itemas, index) in promoteList"
          :key="index"
        >
          <img
            style="width:244px;height:144px;"
            @click="routerGo(itemas.promoteId)"
            :src="itemas.promoteShowUrl"
            alt=""
          />
          <p
            class="yicu"
            style="font-size:18px;color:rgba(80,80,80,1);padding-left:10px;"
          >
            {{ itemas.promoteTitle }}
          </p>
          <div style="padding-top:5px;">
            <img
              style="width:13px;height:15px;padding-left:10px;vertical-align: middle;"
              :src="img.location"
              alt=""
            />&nbsp;
            <span style="font-size:14px;color:#A1A1A1;vertical-align: middle;"
              >{{ itemas.promoteProvince }}/{{ itemas.promoteCity }}</span
            >
          </div>
          <div style="padding-top:5px;">
            &nbsp;
            <span
              style="display:inline-block;padding:1px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-right:10px;"
              v-show="itemas.promoteSchool"
              >{{ $t("message.global.jinxuexiao") }}</span
            >
            <!-- <span style="display:inline-block;padding:1px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-left:10px;">PINEL</span> -->
            <span
              style="display:inline-block;padding:1px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-right:10px;"
              >{{
                itemas.promoteSource
                  ? $t("message.global.Personal")
                  : $t("message.global.Intermediary")
              }}</span
            >
          </div>
          <div
            style="font-size:16px;color:#FF5E5E;padding-left:10px;padding-top:3px;"
          >
            {{ itemas.promoteTotal }} €
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="1148px"
      :before-close="handleClose"
    >
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
            {{ $t("message.global.accommodation") }}：
            <span>{{ $t("message.global.RentalHousing") }}</span>
          </p>
          <p>
            {{ $t("message.global.subject") }}：<span>{{
              getPostListingData.title
            }}</span>
          </p>
          <p>
            {{ $t("message.global.price") }}：
            <span>{{ getPostListingData.total }}</span>
          </p>
          <p>
            {{ $t("message.global.proportion") }}：
            <span
              >{{ getPostListingData.acreage }}{{ $t("message.global.square") }}
            </span>
          </p>
          <p>
            {{ $t("message.global.Inventor") }}：
            <span>{{ getPostListingData.city }}</span>
          </p>
          <p>
            {{ $t("message.global.DoorMode") }}：
            <span
              >{{ getPostListingData.bedroomNum }}
              {{ $t("message.global.CH") }} {{ getPostListingData.roomsNum
              }}{{ $t("message.global.P") }}</span
            >
          </p>
          <p>
            {{ $t("message.global.property") }}：
            <span>{{ getPostListingData.contactName }}</span>
          </p>
          <p>
            {{ $t("message.global.contactEmil") }}：
            <span>{{ getPostListingData.contactEmail }}</span>
          </p>
          <p>
            {{ $t("message.global.contactPhone") }}：
            <span>{{ getPostListingData.contactPhone }}</span>
          </p>
        </div>
        <textarea
          style="z-index:-10000;font-size:0;border:1px solid #fff;"
          id="input"
        ></textarea>
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
    <gallery
      :images="getPostListingData.pics"
      :index="galleryIndex"
      @close="galleryIndex = null"
    ></gallery>
  </div>
</template>

<script>
import headers from "~/components/pcIndex/header.vue";
import foots from "~/components/pcIndex/foot.vue";
import base from "~/api/base.js";

import phone from "~/assets/image/phone.png";
import proVip from "~/assets/image/proVip.png";
import visitCard from "~/assets/image/visitCard.png";
import authentication from "~/assets/image/authentication.png";
import size from "~/assets/image/size.png";
import time from "~/assets/image/time.png";
import bed from "~/assets/image/bed.png";
import apartment from "~/assets/image/apartment.png";
import location from "~/assets/image/location.png";

import airG from "~/assets/image/picSzg/airG.png";
import airH from "~/assets/image/picSzg/airH.png";
import bedG from "~/assets/image/picSzg/bedG.png";
import bedH from "~/assets/image/picSzg/bedH.png";
import chairsG from "~/assets/image/picSzg/chairsG.png";
import chairsH from "~/assets/image/picSzg/chairsH.png";
import chestG from "~/assets/image/picSzg/chestG.png";
import chestH from "~/assets/image/picSzg/chestH.png";
import heatG from "~/assets/image/picSzg/heatG.png";
import heatH from "~/assets/image/picSzg/heatH.png";
import ovenG from "~/assets/image/picSzg/ovenG.png";
import ovenH from "~/assets/image/picSzg/ovenH.png";
import refrigG from "~/assets/image/picSzg/refrigG.png";
import refrigH from "~/assets/image/picSzg/refrigH.png";
import televisG from "~/assets/image/picSzg/televisG.png";
import televisH from "~/assets/image/picSzg/televisH.png";
import washerG from "~/assets/image/picSzg/washerG.png";
import washerH from "~/assets/image/picSzg/washerH.png";
import wifiG from "~/assets/image/picSzg/wifiG.png";
import wifiH from "~/assets/image/picSzg/wifiH.png";
import { BASE_API } from '../api'

export default {
  name: "renting",
  middleware: "responsive",
  components: {
    headers,
    foots
  },
  head() {
    return {
      title: `${this.getPostListingData.title} (${this.getPostListingData.city})`,
      meta: [
        {
          name: "description",
          content: `${this.getPostListingData.title} (${this.getPostListingData.city})`
        },
        {
          name: "keywords",
          content: `${this.getPostListingData.title},${this.getPostListingData.city}`
        },
        {
          name: "og:image",
          content: this.getPostListingData.pics?.[0] ?? '' 
        }
      ]
    };
  },
  async asyncData({ route, app }) {
    const id = route.query.flag;
    return await query(app.$api.article.getInFo, id);
  },
  data() {
    return {
      qianlan: false,
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      flag: true,
      frOrCn: false,
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
        wifiH
      },
      dialogVisible: false,
      inputs: "",
      getPostListingData: {},
      apartmentList: [],
      agent: "",
      roomInc: [],
      promoteList: [],
      mapIframeSrc: "",
      galleryIndex: null
    };
  },
  methods: {
    consf() {
      // //console.log(document.querySelector('.absc').innerText)

      if (process.client) {
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
    async sentEmail() {
      const as = {
        id: this.getPostListingData.id,
        userName: this.input2,
        email: this.input3,
        phone: this.input4,
        content: this.input5,
        type: 1
      };
      //console.log(as);
      // return
      const getInFoData = (await this.$api.article.SendEmaila(as)).data;
      if (getInFoData.code == 0) {
        this.$message({
          showClose: true,
          message: "Sent successfully.",
          type: "success"
        });
      } else {
        this.$message({
          showClose: true,
          message: "失败",
          type: "success"
        });
      }
    },
    async get(id) {
      const ret = await query(this.$api.article.getInFo, id);
      Object.assign(this, ret);
    },
    routerGo(flags) {
      this.get(flags);
      if (process.client) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    qrcode() {
      if (process.client) {
        let P = window.location.protocol + "//" + window.location.hostname;
        let qrcode = new QRCode("qrcode", {
          width: 220, // 设置宽度
          height: 220, // 设置高度
          text: P + "/rentDetails" + "?id=" + this.getPostListingData.id
        });
      }
    },
    isEmptyObject(obj) {
      //console.log(123)
      for (let key in obj) {
        return true;
        //console.log(key)
      }
      return false;
    },
    frCn() {
      this.frOrCn = !this.frOrCn;
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
    }
  }
};
async function query (queryFn, id) {
  try {
    const getInFoData = (await queryFn({ id })).data;
    if (getInFoData.code == 0) {
      const getPostListingData = getInFoData.data;
      const { latitude, longitude } = getPostListingData;
      const mapIframeSrc = (latitude && longitude) ?
        `${BASE_API.jsp}/app/map/jumpMap?lat=${latitude}&lng=${longitude}` : '';
      return {
        getPostListingData,
        mapIframeSrc,
        roomInc: getPostListingData.RentingApartmentList,
        promoteList: getPostListingData.promoteList,
      };
    }
    return {};
  } catch (err) { return {}; }
}
</script>

<style lang="scss" scoped>
.recommend {
  .title {
    font-size: 32px;
    font-weight: 600;
  }
}
.yicu {
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
.secondBod {
  
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
    padding: 16px;
    padding-bottom: 30px;
  }
  // 左侧主题
  .leftBody {
    float: left;
    width: 710px;
    margin-bottom: 20px;
    // 轮播图
    .slideshow {
      text-align: center;
      .el-carousel__item img {
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
          cursor: pointer;
        }
      }
      .synopsisBod {
        font-size: 16px;
        color: #464646;
        // white-space: nowrap;
        white-space: pre-line;
        padding-top: 20px;
      }
    }
    //详情
    .houseDetails {
      padding-top: 30px;
      // overflow: hidden;
      .houseTop {
        margin-bottom: 10px;
        margin-top: 10px;
        font-size: 32px;
        font-weight: 700;
        color: #000;
      }
      .houseSec {
        img {
          width: 701px;
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
    .rightToppic {
      div {
        width: 126px;
        height: 126px;
        display: inline-block;
        margin: 0 36px 16px 0;
      }
      .mars {
        margin-right: 0 !important;
      }
    }
    .houseInfo {
      // height: 129px;
      box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
      box-sizing: border-box;
      padding: 14px 23px;
      .prises {
        font-size: 34px;
        color: #ff5e5e;
      }
      p {
        font-size: 16px;
        color: #a1a1a1;
      }
      .count {
        color: #234cd3;
        cursor: pointer;
      }
    }
    .broker {
      box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
      margin-top: 20px;
      padding: 22px;
      .agencyLiCar {
        display: flex;
        margin-bottom: 8px;
        .leftCarA {
          img {
            width: 86px;
            height: 86px;
            border-radius: 50%;
          }
        }
        .rightCarA {
          margin-left: 10px;
          .rightName {
            font-weight: 700;
            font-size: 18px;
          }
        }
      }
    }
  }
}
.housingResourceL {
  margin-bottom: 20px;
  padding-top: 30px;
  .houseReq {
    width: 244px;
    display: inline-block;
    margin-right: 56px;
    height: 265px;
    box-sizing: border-box;
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.12);
  }
}
.qianlan {
  background-color: #234dd4 !important;
}
.chairsNd {
  padding-top: 10px;
  span {
    display: inline-block;
    text-align: center;
    width: 48px;
    margin: 0 20px 10px 0;
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
</style>
