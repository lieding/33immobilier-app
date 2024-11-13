<template>
  <div>
    <van-dialog v-model="show">
      <div class="box">
        <p v-if="type != '经纪人'" class="title">
          {{ $t("message.global.scan") }}
          <img
            src="~/assets/image/go.png"
            alt=""
            class="go"
            @click="Onclick"
          />
        </p>
        <p v-if="type == '经纪人'" class="title_jjr">
          <!-- 扫描二维码联系平台  -->
          <img
            src="~/assets/image/go.png"
            alt=""
            class="go"
            @click="Onclick"
          />
        </p>
        <div
          class="img"
          id="qrCode"
          ref="qrCodeDiv"
          v-if="type != '经纪人'"
        ></div>
        <!-- 经纪人 -->
        <!-- <div class="center">
                <p v-if="wx">{{$t("message.global.lishibuluo")}}{{listList.wx}}</p>
          </div> -->

        <div class="center">
          <p v-if="listList.type && type != '经纪人'">
            {{ $t("message.global.PropertyType") }}：{{ listList.type }}
          </p>
          <!-- 标题 -->
          <p v-if="listList.estate">
            {{ $t("message.global.subject") }} ：{{ listList.estate }}
          </p>
          <p v-if="listList.city">
            {{ $t("message.global.city") }} ：{{ listList.city }}
          </p>
          <!-- 价格 -->
          <p v-if="listList.total">
            {{ $t("message.global.price") }} ：{{ listList.total }}€
          </p>
          <p v-if="listList.lowprice">
            {{ $t("message.global.priceRange") }} ：{{ listList.lowprice }}€ -
            {{ listList.maxPrice }}€
          </p>
          <!-- 均价 -->
          <p v-if="listList.unit">
            {{ $t("message.global.averagePrice") }} ：{{ listList.unit
            }}{{ $t("message.global.square€") }}
          </p>
          <p v-if="listList.phone">
            {{ $t("message.global.connection") }} ：{{ listList.phone }}
          </p>
          <p v-if="listList.wx">
            {{ $t("message.global.lishibuluo") }} : {{ listList.wx }}
          </p>
          <p v-if="listList.estateAddress">
            {{ $t("message.global.position") }} ：{{ listList.estateAddress }}
          </p>
          <p v-if="listList.roomsNum">
            {{ $t("message.global.range") }} ：{{ listList.roomsNum
            }}{{ $t("message.global.P") }} - {{ listList.bedroomNum
            }}{{ $t("message.global.CH") }}
          </p>
          <!-- 面积 -->

          <p v-if="listList.acreage">
            {{ $t("message.global.SURFACE") }} ：{{ listList.acreage
            }}{{ $t("message.global.square") }}
          </p>
          <p v-if="listList.minHall">
            {{ $t("message.global.range") }} ：{{ listList.minHall }} -
            {{ listList.maxHall }}
          </p>

          <!-- <p v-if="listList.expressing">{{$t("message.global.ANNUAL_INTEREST_RATE")}}：{{listList.year}}</p> -->
          <p v-if="listList.expressing">
            {{ $t("message.global.completionDate") }} ：{{
              listList.expressing
            }}
          </p>
          <p v-if="type != '经纪人'">
            {{ $t("message.global.Housinglink") }} ：{{ href }}
          </p>
          <p v-if="listList.introduceFr" class="FR">
            {{ $t("message.global.introduce") }} ：{{ listList.introduceFr }}
          </p>
          <p v-if="listList.brokerName">
            {{ $t("message.global.contactName") }} ：{{ listList.brokerName }}
          </p>
          <p v-if="listList.brokerEmail">
            {{ $t("message.global.post") }} ：{{ listList.brokerEmail }}
          </p>

          <p v-if="listList.brokerPhone">
            {{ $t("message.global.contactPhone") }} ：{{ listList.brokerPhone }}
          </p>
        </div>
        <div class="btn">
          <p
            class="tag-read"
            :data-clipboard-text="list"
            @click="copy"
            v-if="type != '经纪人'"
          >
            {{ $t("message.global.fuzhi") }}
          </p>
          <p class="tag-read" @click="Onclick" v-if="type == '经纪人'">
            {{ $t("message.global.CONFIRM") }}
          </p>
          <!-- <img src="~/assets/image/btn.png" alt="" class="tag-read" :data-clipboard-text="list" @click="copy" ></div>  -->
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      show: true,
      href: "",
      list: this.$router.currentRoute.query,
      type: this.$router.currentRoute.query.type,
      listList: {}
    };
  },
  created() {
    // this.$i18n.locale = localStorage.lang;
  },
  mounted() {
    //console.log(this.list)
    this.listList = this.list;
    if (this.list.type != "经纪人") {
      this.$nextTick(function() {
        this.bindQRCode();
      });
    } else {
      //console.log('111')
      this.listList.type = this.$t("message.global.agent");
    }
  },
  methods: {
    Onclick: function() {
      this.$router.go(-1);
    },
    bindQRCode: function() {
      let P = window.location.protocol + "//" + window.location.hostname;
      if (this.listList.types == "new") {
        this.href = P + "/Details" + "?id=" + this.list.id;
      } else if (this.listList.types == "second_hand") {
        this.href = P + "/ordDetails" + "?id=" + this.list.id;
      } else if (this.listList.types == "租房") {
        this.href = P + "/rentDetails" + "?id=" + this.list.id;
      }
      // var host =  window.location.href;
      //  var Url = host.split("?")[0]
      var UrlBest = this.href;
      //  this.href =  Url +'?id='+this.list.id
      //console.log(UrlBest)
      new QRCode(this.$refs.qrCodeDiv, {
        text: UrlBest,
        width: 180,
        height: 180,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    },
    copy: function() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.$toast({ type: "success", message: "复制成功" }); // 释放内存
        // this.$notify({ type: 'success', message: '复制成功' });
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$toast({ type: "danger", message: "该浏览器不支持自动复制" }); // 释放内存
        //  this.$notify({ type: 'danger', message: '该浏览器不支持自动复制' });
        clipboard.destroy();
      });
    }
  }
};
</script>
<style lang="scss">
.van-dialog {
  top: 48%;
}
.van-dialog__footer {
  display: none;
}
</style>
<style lang="scss" scoped>
#qrCode {
  img {
    width: 2rem;
    height: 2rem;
  }
}
.FR {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.go {
  width: 0.3rem;
  height: 0.3rem;
  float: right;
}
.box {
  padding: 0.1rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(151, 151, 151, 1);
  .title_jjr {
    height: 0.28rem;
  }
  .title {
    font-size: 0.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 0.28rem;
    text-align: center;
    margin: 0.2rem 0;
    // white-space: nowrap;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
  }
  .img {
    background: rgba(255, 255, 255, 1);
    position: relative;
    left: 50%;
    margin-left: -90px;
    background: #ffffff;
    width: 100%;
    display: block;
    canvas {
      margin: 0 auto;
    }
  }
  .center {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0.02rem 0.04rem 0px rgba(0, 0, 0, 0.5);
    border-radius: 7px;
    border: 1px solid rgba(151, 151, 151, 1);
    font-size: 0.12rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 0.17rem;
    margin: 0.2rem 0;
    padding: 0.15rem;
  }
  .btn {
    width: 100%;
    height: 0.4rem;
    p {
      float: right;
      height: 100%;
      padding: 0 0.1rem;
      width: 1.22rem;
      background: rgba(35, 77, 212, 1);
      line-height: 0.4rem;
      color: #ffffff;
      font-size: 0.16rem;
      text-align: center;
      border-radius: 0.04rem;
    }
  }
}
</style>
