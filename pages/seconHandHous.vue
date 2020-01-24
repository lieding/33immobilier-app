<template>
  <div class="seconHandHous">
    <headers :class="{ colors: flag }"></headers>
    <div class="secondBod centerS clearfix">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.ordapartment") }}</span>
      </div>
      <div class="oductions">
        {{ getPostListingData.title }}
        <span
          @click="handleOpen"
          style="float:right;font-size:18px;color:#B9B9B9;font-weight:400;cursor: pointer;"
        >
          <img
            style="width:20px;vertical-align: middle;"
            src="@/assets/image/wxInd.png"
            alt
          />
          {{ $t("message.global.WeChat") }}
        </span>
      </div>
      <div class="leftBody">
        <!-- // 轮播图 -->
        <div class="slideshow">
          <el-carousel :interval="5000" height="400px" arrow="always">
            <el-carousel-item
              v-for="(item, i) in getPostListingData.picList"
              :key="i"
            >
              <!-- <img :src="item"> -->
              <div
                class="lunbotu"
                v-bind:style="{ 'background-image': 'url(' + item + ')' }"
              ></div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 地图 -->
        <div class="atlas">
          <div class="atlasTop">
            <span class="noO"
              >{{ $t("message.global.locationwz") }}&nbsp;&nbsp;</span
            >
            <img :src="img.location" alt />&nbsp;
            <span class="noT">
              {{ getPostListingData.bigProvince }}/{{
                getPostListingData.privince
              }}
            </span>
          </div>
          <div style="border: 1px solid #ccc;">
            <iframe
              height="500px"
              width="700px"
              :src="address_Map"
              frameborder="0"
            ></iframe>
          </div>
        </div>
        <!-- 房屋简介 -->
        <div class="synopsis">
          <div class="synopsisTop">
            <span class="synopsisjj"
              >{{ $t("message.global.fwjj") }}&nbsp;&nbsp;&nbsp;&nbsp;</span
            >
            <span class="translate" @click="switchoverS()">
              {{
                switchover
                  ? $t("message.global.interpret")
                  : $t("message.global.interpret")
              }}
            </span>
          </div>
          <div class="synopsisBod" style="white-space: pre-line;">
            {{
              switchover
                ? getPostListingData.introduceFr
                : getPostListingData.introduceCn
            }}
          </div>
        </div>
        <!-- 房屋详情 -->
        <div class="houseDetails">
          <div class="houseTop">{{ $t("message.global.construction") }}</div>
          <div class="houseSec" v-show="getPostListingData.housePlan">
            <img :src="getPostListingData.housePlan" alt />
          </div>
          <div class="introduce">
            <div
              class="houseListLa"
              v-for="(item, i) in apartmentList"
              :key="i"
            >
              <!-- <div></div> -->
              <div class="houseListTop">{{ item.room }}</div>
              <div class="houseProportion">
                {{ $t("message.global.proportion") }}：
                <span>{{ item.area }}</span>
              </div>
              <div class="houseOrientation">
                {{ $t("message.global.orientation") }}：
                <span>{{ item.orientation }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 虚拟 看房 -->
        <div class="seeApartment" v-if="getPostListingData.isOpenVR">
          <div class="apartmentTop">{{ $t("message.global.theoretical") }}</div>
          <iframe
            height="500px"
            width="710px"
            :src="getPostListingData.vrAddress"
            frameborder="0"
          ></iframe>
        </div>
      </div>
      <div class="rightBody">
        <div class="rightToppic">
          <!-- <img v-for="(item,i) in getPostListingData.picList" :key="i" :src="item" alt=""> -->
          <div
            :class="{ lunbotu: true, mars: i % 3 == 2 }"
            style="background-color:#ccc;"
            v-for="(item, i) in getPostListingData.picList"
            :key="i"
            v-bind:style="{ 'background-image': 'url(' + item + ')' }"
          ></div>
        </div>
        <div class="houseInfo">
          <p class="prises">{{ getPostListingData.total }}€</p>
          <p>
            <span class="squareMeter">
              {{ getPostListingData.unit }}
              {{ $t("message.global.square€") }}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span class="count"></span>
          </p>
          <div style="padding-top: 10px;">
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.apartment"
                alt
              />
              <span style=" vertical-align: middle;">
                {{
                  getPostListingData.houseOrApartment == 0
                    ? $t("message.global.cottage")
                    : $t("message.global.apartments")
                }}
              </span>
            </span>
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.bed"
                alt
              />
              <span style=" vertical-align: middle;">
                {{ getPostListingData.roomsNum }}{{ $t("message.global.P") }}
                {{ getPostListingData.bedroomNum }}{{ $t("message.global.CH") }}
              </span>
            </span>
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.time"
                alt
              />
              <span style=" vertical-align: middle;">
                {{ $t("message.global.De") }}
                {{ getPostListingData.year }}
              </span>
            </span>
            <span
              style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;"
            >
              <img
                style="width:14px;height:15px; vertical-align: middle"
                :src="img.size"
                alt
              />
              <span style=" vertical-align: middle;">
                {{ getPostListingData.acreage
                }}{{ $t("message.global.square") }}
              </span>
            </span>
          </div>
        </div>
        <div class="broker">
          <div class="agencyLiCar">
            <div class="leftCarA">
              <img :src="agent.brokerAvatar" alt />
            </div>
            <div class="rightCarA">
              <p class="rightName">{{ agent.brokerName }}</p>
              <!-- <p class="attestation"> Agent immobilier </p> -->
              <!-- <p class="NumberP">(33) 676122297</p> -->
            </div>
          </div>
          <!-- <div>
                        <span style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;padding:5px 15px;background-color: #f5f5f5;">
                            <img style="width:22px;height:16px; vertical-align: middle" :src="img.authentication" alt=""> <span style=" vertical-align: middle;"> {{$t("message.global.authentication")}}</span></span>
                        <span style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;padding:5px 15px;background-color: #f5f5f5;">
                            <img style="width:22px;height:16px; vertical-align: middle" :src="img.visitCard" alt=""> <span style=" vertical-align: middle;"> {{$t("message.global.licensed")}}</span></span>
                        <span style="font-size:14px;color:#262626;vertical-align: middle;display:inline-block;margin-right:20px;padding:5px 15px;background-color: #f5f5f5;">
                            <img style="width:22px;height:16px; vertical-align: middle" :src="img.proVip" alt=""> <span style=" vertical-align: middle;"> {{$t("message.global.EasyPro")}}</span></span>
          </div>-->
          <div style="text-align: center;padding-top: 16px;">
            <img
              style="width:17px;height:17px;vertical-align:middle"
              :src="img.phone"
              alt
            />
            <span style="vertical-align:middle">
              {{ agent.brokerTelPhone }}
            </span>
          </div>
          <div
            style="text-align: center;padding-top: 10px;font-size:14px;margin-bottom:20px;"
          >
            {{ $t("message.global.lishibuluo") }}：{{
              agent.wxNumber
            }}
            &nbsp;&nbsp;&nbsp; {{ $t("message.global.contactEmil") }}：{{
              agent.brokerEmail
            }}
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
            style="height:60px;font-size:20px;color:#fff;background-color:rgb(36,84,218);margin-top:25px;
                    text-align:center;line-height:60px; cursor: pointer;"
            @click="sentEmail"
          >
            {{ $t("message.global.fsxx") }}
          </div>
        </div>
      </div>
    </div>
    <div class="centerS">
      <jisuan />
    </div>
    <div class="centerS" style="margin-top:20px;" v-show="promoteList.length">
      <div style="font-size:32px;font-weight:600;">
        {{ $t("message.global.Recommended") }}
      </div>
      <div class="housingResourceL">
        <div class="houseReq" v-for="(item, index) in promoteList" :key="index">
          <img
            style="width:244px;height:144px;"
            @click="routerGo(item.promoteId)"
            :src="item.promoteShowUrl"
            alt
          />
          <p
            style="font-size:18px;color:rgba(80,80,80,1);padding-left:10px;"
            class="voerhuo"
          >
            {{ item.promoteTitle }}
          </p>
          <div style="padding-top:5px;">
            <img
              style="width:13px;height:15px;padding-left:10px;vertical-align: middle;"
              :src="img.location"
              alt
            />&nbsp;
            <span style="font-size:14px;color:#A1A1A1;vertical-align: middle;"
              >{{ item.promoteBigProvince }}/{{ item.promoteProvince }}</span
            >
          </div>
          <div style="padding-top:5px;">
            <img
              style="width:13px;height:15px;padding-left:10px;vertical-align: middle;"
              :src="img.apartment"
              alt
            />&nbsp;
            <span style="font-size:14px;color:#A1A1A1;vertical-align: middle;">
              {{ item.promoteRoomNum }} {{ $t("message.global.P") }} -
              {{ item.promoteBedRoomNum }} {{ $t("message.global.CH") }}
            </span>
          </div>
          <!-- <div style="padding-top:5px;">
                        <span style="display:inline-block;padding:1px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-left:10px;">LMNP</span>
                        <span style="display:inline-block;padding:1px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-left:10px;">PINEL</span>
                        <span style="display:inline-block;padding:1px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-left:10px;">TVA20%</span>
          </div>-->
          <div
            style="font-size:16px;color:#FF5E5E;padding-left:10px;padding-top:3px;"
          >
            {{ item.promoteTotal }}€
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title
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
            {{ $t("message.global.accommodation") }}：
            <span>{{ $t("message.global.second-hand") }}</span>
          </p>
          <p>
            {{ $t("message.global.subject") }}：
            <span>
              {{ getPostListingData.title }}
            </span>
          </p>
          <p>
            {{ $t("message.global.price") }}：
            <span>{{ getPostListingData.total }}€</span>
          </p>
          <p>
            {{ $t("message.global.averagePrice") }}：
            <span>
              {{ getPostListingData.unit }}{{ $t("message.global.square€") }}
            </span>
          </p>
          <p>
            {{ $t("message.global.proportion") }}：
            <span>
              {{ getPostListingData.acreage }}{{ $t("message.global.square") }}
            </span>
          </p>
          <!-- unit -->
          <p>
            {{ $t("message.global.Inventor") }}：
            <span>{{ getPostListingData.privince }}</span>
          </p>
          <p>
            {{ $t("message.global.DoorMode") }}：
            <span>
              {{ getPostListingData.roomsNum }}{{ $t("message.global.P") }}
              {{ getPostListingData.bedroomNum }} {{ $t("message.global.CH") }}
            </span>
          </p>
          <p>
            {{ $t("message.global.contactName") }}：
            <span>{{ agent.brokerName }}</span>
          </p>
          <p>
            {{ $t("message.global.contactEmil") }}：
            <span>{{ agent.brokerEmail }}</span>
          </p>
          <p>
            {{ $t("message.global.contactPhone") }}：
            <span>{{ agent.brokerTelPhone }}</span>
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
  </div>
</template>

<script>
import headers from "@/components/PcIndex/moduleT/header.vue";
import foots from "@/components/PcIndex/moduleT/foot.vue";
import jisuan from "@/components/PcIndex/promoteList";

import phone from "@/assets/image/phone.png";
// import proVip from '@/assets/image/proVip.png'
import visitCard from "@/assets/image/visitCard.png";
import authentication from "@/assets/image/authentication.png";
import size from "@/assets/image/size.png";
import time from "@/assets/image/time.png";
import bed from "@/assets/image/bed.png";
import proVip from "@/assets/image/proVip.png";
import apartment from "@/assets/image/apartment.png";
import location from "@/assets/image/location.png";
import baseurl from "@/api/base.js";

export default {
  name: "seconHandHous",
  components: {
    headers,
    foots,
    jisuan
  },
  head() {
    return {
      title: `${this.getPostListingData.title} | ${this.getPostListingData.privince}`,
      meta: [
        {
          name: "description",
          content: `${this.getPostListingData.title} | ${this.getPostListingData.privince}`
        },
        {
          name: "keywords",
          content: `${this.getPostListingData.title},${this.getPostListingData.privince}`
        }
      ]
    };
  },
  data() {
    return {
      qianlan: false,
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      flag: true,
      switchover: true,
      img: {
        location,
        apartment,
        bed,
        time,
        size,
        authentication,
        visitCard,
        proVip,
        phone
      },
      inputs: "",
      getPostListingData: "",
      apartmentList: [],
      agent: "",
      promoteList: "",
      dialogVisible: false,
      address_Map: "",
      baseurl: baseurl.sq
    };
  },
  created() {
    this.get(this.$route.query.flag);
    //console.log(this.$route.query.flag)
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
        type: 2
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
    qrcode() {
      if (process.client) {
        let P = window.location.protocol + "//" + window.location.hostname;
        let qrcode = new QRCode("qrcode", {
          width: 220, // 设置宽度
          height: 220, // 设置高度
          text: P + "/ordDetails" + "?id=" + this.getPostListingData.id
        });
      }
    },
    switchoverS() {
      this.switchover = !this.switchover;
      //console.log(this.switchover)
    },
    async get(smt) {
      const as = { id: smt };
      const getPostListingData = (
        await this.$api.article.getPostListingData(as)
      ).data;

      this.address_Map =
        "http://47.254.149.82/" +
        "/app/map/jumpMap?lat=" +
        getPostListingData.data.latitude +
        "&lng=" +
        getPostListingData.data.longitude;
      //console.log(getPostListingData)
      // //console.log(getPostListingData.data.promoteList)
      this.promoteList = getPostListingData.data.promoteList;
      // this.promoteList = [{}]
      if (getPostListingData.code == 0) {
        this.getPostListingData = getPostListingData.data;
      }
      this.getPostListingData.bedRoomList.forEach(item => {
        item["room"] = this.$t("message.global.bedroom");
        this.apartmentList.push(item);
      });
      this.getPostListingData.parlorList.forEach(item => {
        item["room"] = this.$t("message.global.drawingRoom");
        this.apartmentList.push(item);
      });
      this.getPostListingData.bathRoomList.forEach(item => {
        item["room"] = this.$t("message.global.showerRoom");
        this.apartmentList.push(item);
      });
      this.getPostListingData.kitChenList.forEach(item => {
        item["room"] = this.$t("message.global.kitchen");
        // item['room'] = '餐厅'
        this.apartmentList.push(item);
      });
      // this.background-image:url('\"+item+\"');
      this.agent = this.getPostListingData.agent;
      //console.log(this.agent)
      // if (agent.)
    },
    isEmptyObject(obj) {
      //console.log(123)
      for (let key in obj) {
        return true;
        //console.log(key)
      }
      return false;
    },
    routerGo(flags) {
      //console.log(flags)
      this.get(flags);
      this.$route.query.flag = flags;

      if (process.client) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
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
</script>

<style lang="less" scoped>
.qianlan {
  background-color: #234dd4 !important;
}
.mars {
  margin-right: 0 !important;
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
// 轮播图
.lunbotu {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.secondBod {
  // overflow: hidden;
  // ???
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
    line-height: 42px;
  }
  // 左侧主题
  .leftBody {
    float: left;
    width: 710px;
    // 轮播图
    .slideshow {
      // text-align:center;
      background-color: #fff;
      // line-height:404px;
      .el-carousel__item img {
        // height:404px;
        vertical-align: top;
        line-height: 404px;
        width: 100%;
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
        line-height: 42px;
        margin-bottom: 10px;
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
          cursor: pointer;
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
            font-size: 28px;
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
        padding-bottom: 10px;
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
    }
    .houseInfo {
      height: 129px;
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
      // height:705px;
      box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
      margin-top: 20px;
      padding: 22px;
      .agencyLiCar {
        background-color: #fff;
        width: 317px;
        height: 96px;
        // box-sizing: border-box;
        padding: 24px 0px 0px;
        .leftCarA {
          float: left;
          // width: 20%;
          img {
            width: 86px;
            height: 86px;
            border-radius: 50%;
          }
        }
        .rightCarA {
          float: right;
          width: 56%;
          height: 100%;
          .rightName {
            margin-top: 10px;
            color: #000000;
            font-weight: 700;
            font-size: 18px;
          }
          .attestation {
            margin-top: 20px;
            font-size: 14px;
            color: #838383;
          }
          .NumberP {
            margin-top: 14px;
            color: #0433ff;
            font-size: 16px;
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
    height: 260px;
    box-sizing: border-box;
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.12);
    display: inline-block;
    margin-right: 15px;
  }
}
.voerhuo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
