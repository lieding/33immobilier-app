<!-- <script src="../../main.js"></script>-->
<template>
  <div>
    <!-- <el-dialog 
       :visible.sync="dialogVisible"

       class="dialog">
            <van-swipe :autoplay="3000"  @change="onChange" :show-indicators='false'>
                <van-swipe-item v-for="(image, index) in picList" :key="index">
                    <img :src="image" />
                </van-swipe-item>
             </van-swipe>
    </el-dialog>-->
    <Header :title="$t('message.global.xingfangxiangqing')" />
    <div>
      <div class="video" @click="dialogVisible = true">
        <van-swipe :autoplay="3000" @change="onChange" :show-indicators="false">
          <van-swipe-item v-for="(image, index) in picList" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <img
        src="@/assets/image/VRlogo.gif"
        alt
        class="AR"
        @click="onMap(data.vrAddress)"
        v-show="data.vrAddress"
      />
      <img src="@/assets/image/share.png" alt class="share" @click="Onshare('/dialog')" />
      <div>
        <img
          src="@/assets/image/shipin.png"
          alt
          class="video_S"
          @click="onMap(data.videoUlr)"
          v-show="data.videoUlr"
        />
        <!-- <p class="video_btn">
                <span class="VR" @click="onMap(data.vrAddress)">VR</span>
                <span class="price">图片</span>
        </p>-->
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{picList.length}}</div>
      </div>
    </div>
    <div class="details">
      <p class="detalis_title">{{data.estate}}</p>
      <p class="details_province">{{data.province}}/{{data.city}}</p>
      <p class="item">
        <span class="tax font" v-if="data.taxCuts">{{data.taxCuts}}</span>
        <span class="check font" v-if="data.expressing">{{data.expressing}}</span>
        <span class="itemize font1" v-for="(item,index) in tags" :key="index">{{item}}</span>
      </p>
      <img :src="data.developersPic" alt class="details_img" />
      <p class="price">{{data.lowprice}}€ - {{data.maxPrice}}€</p>
      <p class="hand">
        <span class="time">{{$t("message.global.completionDate")}} ：</span>
        {{data.expressing}}
      </p>
      <p class="hand">
        <span class="time">{{$t("message.global.HouseNumber")}} ：</span>
        {{data.homesNum}}
      </p>
      <p class="hand">
        <span class="time">{{$t("message.global.measures")}} ：</span>
        {{data.taxCuts}}
      </p>
      <p class="hand">
        <span class="time">{{$t("message.global.jianshuiuquyu")}} ：</span>
        {{data.taxCutsArea}}
      </p>
      <p class="hand">
        <span class="time">{{$t("message.global.deductibility")}} ：</span>
        {{data.taxCutsQuota}}
      </p>
      <p class="hand">
        <span class="time">{{$t("message.global.Inventor")}} ：</span>
        {{data.province}}/{{data.city}}
      </p>
      <p class="hand">
        <span class="time">{{$t("message.global.range")}} ：</span>
        {{data.minHall}} - {{data.maxHall}}{{$t("message.global.P")}}
      </p>
    </div>
    <hr class="hr" />
    <!-- 房产顾问 -->
    <div class="estates">
      <p class="consultants">{{$t("message.global.counselor")}}</p>
      <div class="broker_box">
        <div class="broker">
          <img :src="data.brokerAvatar" alt class="img" />
          <div>
            <p class="name">{{data.brokerName}}</p>
            <p class="agent">{{data.brokerJob}}</p>
          </div>
          <div class="attestation">
            <p>
              <img src="@/assets/image/autonym.png" alt />
              <span>{{$t("message.global.authentication")}}</span>
            </p>
            <p>
              <img src="@/assets/image/licensed.png" alt />
              <span>{{$t("message.global.licensed")}}</span>
            </p>
            <p>
              <img src="@/assets/image/pro.png" alt />
              <span>{{$t("message.global.EasyPro")}}</span>
            </p>
          </div>
        </div>
        <hr />
        <div class="num">
          <p class="phone" v-if="data.brokerTelPhone">
            <img src="@/assets/image/phone1.png" alt class="margin" />
            {{data.brokerTelPhone}}
          </p>
          <p>
            <span class="wx" v-if="data.wxNumber">{{$t("message.global.WXWach")}}:{{data.wxNumber}}</span>
            <span
              class="yx"
              v-if="data.brokerEmail"
            >{{$t("message.global.mail")}}：{{data.brokerEmail}}</span>
          </p>
        </div>
        <div class="quiz">
          <div class="drug">
            <van-cell-group>
              <van-field
              v-model="ipt1"
              :placeholder="$t('message.global.YourName')"
              left-icon="contact"
              />
            </van-cell-group>

            <van-cell-group>
              <van-field
              v-model="ipt3"
              :placeholder="$t('message.global.YourPhone')"
              oninput="value=value.replace(/[^\d]/g,'')"
              left-icon="phone-o"
              />
            </van-cell-group>
            <van-cell-group>
              <van-field
              v-model="ipt2"
              :placeholder="$t('message.global.YourMessage')"
              left-icon="envelop-o"
              />
            </van-cell-group>
          </div>
          <van-cell-group>
            <van-field
            :value="ipt4"
            v-model="ipt4"
            type="textarea"
            :placeholder="$t('message.global.LeaveYourMessage')"
            autosize
            :border="false"
            />
          </van-cell-group>
          <van-button
            type="primary"
            class="btn_us"
            @click="OncontactUs"
          >{{$t("message.global.woyaotiwen")}}</van-button>
        </div>
      </div>
    </div>
    <hr class="hr" />
    <!-- 楼盘介绍 -->
    <div class="estates pack">
      <span class="consultants">{{$t("message.global.premises")}}</span>
      <span
        class="interpret"
        v-if="interpret"
        @click="oninterpret"
      >{{$t("message.global.interpret")}}</span>
      <span class="interpret" v-else @click="oninterpret">翻译法语</span>
      <p class="download interpret" @click="onMap(data.brochure)">
        <img src="@/assets/image/download.png" alt />
        {{$t("message.global.brochure")}}
      </p>
      <div
        :class="IspackUp?'synopsisno':'synopsis'"
        v-if="!interpret"
        style="white-space: pre-line;"
      >{{data.introduceCn}}</div>
      <div
        :class="IspackUp?'synopsisno':'synopsis'"
        v-else
        style="white-space: pre-line;"
      >{{data.introduceFr}}</div>
      <div>
        <span
          class="packUp"
          @click="onpackUp"
        >{{IspackUp?$t("message.global.seeMore"):$t("message.global.shouqi")}}</span>
      </div>
    </div>
    <hr class="hr" />
    <!-- 楼盘位置 -->
    <div class="estates">
      <span class="consultants">{{$t("message.global.position")}}</span>
      <p class="province">{{data.estateAddress}}</p>
      <div class="map">
        <iframe :src="Url" frameborder="0" style="100%"></iframe>
      </div>
    </div>
    <hr class="hr" />
    <!-- 户型详情 -->
    <div class="estates" v-show="aparementList.length != 0">
      <span class="consultants">{{$t("message.global.modelDetails")}}</span>
      <div class="swipe">
        <!-- <div class="swipe_div"> -->
        <div v-for="(info ,index) in aparementList" :key="index">
          <p class="hand">
            <span class="time">{{$t("message.global.chamberID")}} ：</span>
            {{info.number}}
          </p>
          <p class="hand">
            <span class="time">{{$t("message.global.DoorMode")}} ：</span>
            {{info.roomNum}}
          </p>
          <p class="hand">
            <span class="time">{{$t("message.global.usableArea")}} ：</span>
            {{info.area}}
          </p>
          <p class="hand">
            <span class="time">{{$t("message.global.level")}} ：</span>
            {{info.floor}}
          </p>
          <p class="hand">
            <span class="time">{{$t("message.global.price")}} ：</span>
            {{info.price}}
          </p>
          <p class="hand">
            <span class="time">{{$t("message.global.averagePrice")}} ：</span>
            {{info.averagePrice}}
          </p>
          <p class="hand">
            <span class="time">{{$t("message.global.RAROC")}} ：</span>
            {{info.rewards}}
          </p>
          <p class="hand" @click="onMap(info.vrAddress)">
            <span class="time">{{$t("message.global.floorPlan")}}：</span>
            <span style="border-bottom: 1px solid blue; color:rgba(34,75,215,1);">2D</span>
          </p>
          <p class="hand">
            <span class="time">{{$t("message.global.condition")}}：</span>
            {{State(info.state)}}
          </p>
          <p
            class="relation"
            @click="connectUs('./content',info.apartmentId)"
          >{{$t("message.global.connectUs")}}</p>
          <!-- </div> -->
        </div>
      </div>

      <hr class="hr" style />
    </div>

    <!-- 贷款能力计算 -->
    <div class="estates">
      <span class="consultants">{{$t("message.global.calculation")}}</span>
      <div class="repay">
        <p class="repay_p">{{$t("message.global.onnetincome")}}</p>
        <van-cell-group>
          <van-field
          v-model="revenus"
          label="€"
          label-width=".15rem"
          :placeholder="$t('message.global.qingshuru')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.calculation")}}</p>
        <van-cell-group>
          <van-field
          v-model="apport"
          label="€"
          label-width=".15rem"
          :placeholder="$t('message.global.qingshuru')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.liability")}} {{$t("message.global.Canfill")}}</p>
        <van-cell-group>
          <van-field
          v-model="rate"
          label="%"
          label-width=".15rem"
          :placeholder="$t('message.global.qingshuru')"
          type="Number"
          />
        </van-cell-group>
      </div>
      <div class="btn">
        <van-button type="info" class="btn_i" @click="oncapacity">{{$t("message.global.calculate")}}</van-button>
      </div>
      <p class="monthly" v-if="M">
        {{$t("message.global.highest")}}
        <span class="money">{{M}}€</span>
      </p>
      <div class="loans" v-if="M">
        <p class="loans_p">{{$t("message.global.Youcanloan")}}</p>
        <table>
          <tr>
            <th>{{$t("message.global.loanPeriod")}}</th>
            <th>{{$t("message.global.annual")}}</th>
            <th>{{$t("message.global.capacity")}}</th>
          </tr>
        </table>
        <table v-for="(item,index) in reckenList" :key="index">
          <tr>
            <td>{{item.year}} {{$t("message.global.ans")}}</td>
            <td>{{item.retes}}%</td>
            <td>{{item.money}}€</td>
          </tr>
        </table>
      </div>
    </div>
    <hr class="hr" />
    <!-- 还贷计算 -->
    <div class="estates">
      <span class="consultants">{{$t("message.global.loancalculate")}}</span>
      <div class="repay">
        <p class="repay_p">{{$t("message.global.Housing")}}</p>
        <van-cell-group>
          <van-field
          v-model="loan"
          label="€"
          label-width=".15rem"
          :placeholder="$t('message.global.qingshuru')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.payment")}}</p>
        <van-cell-group>
          <van-field
          v-model="downapport"
          @input="Oninput"
          label="€"
          label-width=".15rem"
          :placeholder="$t('message.global.qingshuru')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.particular")}}</p>
        <el-select v-model="year">
          <el-option v-for="item in getRate" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <p class="repay_p">{{$t("message.global.loaninterest")}}</p>
        <van-cell-group>
          <van-field
          v-model="interesrate"
          label="%"
          label-width=".2rem"
          :placeholder="$t('message.global.qingshuru')"
          type="Number"
          />
        </van-cell-group>

        <!-- <van-dropdown-menu>
                    <van-dropdown-item v-model="year" :options="option1" />
        </van-dropdown-menu>-->
      </div>
      <div class="btn">
        <van-button type="info" class="btn_i" @click="onrepay">{{$t("message.global.calculate")}}</van-button>
      </div>
      <p class="monthly" v-if="mothey">
        {{$t("message.global.highest")}}
        <span class="money">{{mothey}}</span>
      </p>
      <!-- echarts -->
      <div v-if="mothey" class="canvas">
        <div class="echart"></div>
        <div class="echart_p">
          <p>
            <span class="green"></span>
            {{$t("message.global.payment")}} € {{A}}
          </p>
          <p>
            <span class="blue"></span>
            {{$t("message.global.Interestamount")}} € {{L}}
          </p>
          <p>
            <span class="orgin"></span>
            {{$t("message.global.loans")}} € {{S}}
          </p>
        </div>
      </div>
      <div class="loanse" @click="Onclick">{{$t("message.global.minimum")}}</div>
    </div>
    <hr class="hr" />

    <div class="estates" v-if="promoteList">
      <span class="consultants">{{$t("message.global.Recommended")}}</span>
      <list :promoteList="promoteList" type="新房" />
    </div>
    <van-button
      type="info"
      size="large"
      @click="Onord('/ordIssue')"
    >{{$t("message.global.woyaomaifang")}}</van-button>
    <Footer />
  </div>
</template>
<script>
import rem from "@/common/rem.js";
import Header from "@/components/MIndex/common/head.vue";
import Footer from "@/components/MIndex/common/footer.vue";
import list from "@/components/MIndex/common/list.vue";

var echarts = require("echarts");
export default {
  name: "",
  components: {
    Header,
    Footer,
    list
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.query.id;
      this.Onlist();
    },
    year(val) {
      this.interesrate = this.getRateList[val];
    }
  },
  data() {
    return {
      value: 0,
      dialogVisible: false,
      ipt1: "", //您的姓名
      ipt2: "", //您的电话
      ipt3: "", //您的邮箱
      ipt4: "", //您的信息
      rate: "30", //负债率
      apport: "0", //首付金额
      revenus: "3000", //月净收入
      M: "", //月还款金额
      A: "", //首付
      L: "", //贷款利息
      S: "", //贷款手机金额
      mothey: "", //还贷计算月还款金额
      reckenList: [], //可贷款
      loan: "300000", //房屋金额
      downapport: "0", //首付金额
      year: "25", //贷款年限
      picList: [], //图片集合
      tags: [],

      phone: "", //平台电话
      interesrate: "", //贷款利率
      promoteList: [], //推荐房源
      aparementList: [], //户型集合
      id: this.$route.query.id, //房屋id
      interpret: true,
      false: false,
      IspackUp: true,
      data: "",
      Url: "",
      current: 0,
      getRate: [], //贷款利率
      getRateList: []
    };
  },
  mounted() {
    rem();

    //console.log(this.labelLine)
    this.$api.article.getRate().then(res => {
      if (res.data.code == 0) {
        this.getRateList = res.data.data;
        this.getRate = Object.keys(res.data.data);
        //console.log(this.getRate);
        this.interesrate = res.data.data["25"];
      }
    });
    if (this.mothey) {
      this.$nextTick(function() {
        //console.log(document.querySelector(".echart"))
        var myChart = echarts.init(document.querySelector(".echart"));
        myChart.setOption(this.orgOptions);
      });
    }
    this.Onlist();
  },
  methods: {
    Oninput() {
      if (Number(this.downapport) > Number(this.loan)) {
        this.downapport = this.loan;
      }
    },
    onChange(index) {
      this.current = index;
    },
    Onclick() {
      this.$router.push("./content");
    },
    State(val) {
      if (val == 1) {
        return this.$t("message.global.beReserved");
      } else if (val == 2) {
        return this.$t("message.global.beenSold");
      } else {
        return this.$t("message.global.CanBuy");
      }
    },
    Onlist() {
      let params = { id: this.id };
      this.$api.article.getInfo(params).then(res => {
        this.data = res.data.data;
        this.picList = res.data.data.picList;
        this.phone = res.data.data.system.phone;
        this.tags = res.data.data.tags;
        this.promoteList = res.data.data.promoteList;
        this.latitude = res.data.data.latitude;
        this.longitude = res.data.data.longitude;
        this.aparementList = res.data.data.aparementList;
        this.Url =
          "http://47.254.149.82/app/map/jumpMap?lat=" +
          this.latitude +
          "&lng=" +
          this.longitude;
        //console.log(this.Url)
      });
    },
    onpackUp() {
      this.IspackUp = !this.IspackUp;
    },
    oncapacity() {
      //获取月还款金额和可贷款
      let params = {
        revenus: this.revenus,
        rate: this.rate,
        apport: this.apport
      };
      this.$api.article.loanCapability(params).then(res => {
        this.M = res.data.data.M;
        this.reckenList = res.data.data.reckenList;
      });
    },
    onrepay() {
      // 获取还贷计算
      if (this.loan < this.downapport) {
        this.$toast.message("111");
      } else {
        let params = {
          year: this.year,
          rate: this.interesrate,
          apport: this.downapport,
          loan: this.loan
        };
        this.$api.article.repayALoan(params).then(res => {
          if (res.data.code == 500) {
            alert(res.msg);
            this.mothey = "";
          } else {
            this.mothey = res.data.data.M;
            this.A = res.data.data.A;
            this.S = res.data.data.S;
            this.L = res.data.data.L;
            //console.log(this.A,this.L,this.S)
            this.echarts = [
              { value: Number(this.A), itemStyle: { color: "#7ECF34" } },
              { value: Number(this.L), itemStyle: { color: "#1B9AFB" } },
              { value: Number(this.S), itemStyle: { color: "#F4A436" } }
            ];
            //console.log(echarts)
          }
          setTimeout(() => {
            var myChart = echarts.init(document.querySelector(".echart"));
            myChart.setOption({
              legend: {
                orient: "vertical",
                x: "left",
                data: ["首付金额", "利息金额", "贷款金额"]
              },
              series: [
                {
                  type: "pie",
                  radius: ["50%", "70%"],
                  center: ["25%", "60%"],
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: this.echarts
                }
              ]
            });
          }, 100);
        });
        // setTimeout(() => {
        //     var myChart = echarts.init(document.querySelector(".echart"));
        //     myChart.setOption({
        //         legend: {
        //             orient: 'vertical',
        //             x: 'left',
        //             data:['首付金额','利息金额','贷款金额']
        //         },
        //     series: [
        //         {
        //             type:'pie',
        //             radius: ['50%', '70%'],
        //             center : ['25%', '60%'],
        //             labelLine: {
        //                 normal: {
        //                     show: false
        //                 }
        //             },
        //             data:this.echarts
        //         }
        //     ]
        //   })
        // }, 100);
      }
    },
    onMap(value) {
      window.location.href = value;
    },
    // 联系我们
    OncontactUs() {
      //console.log(this.ipt4)
      let params = {
        email: this.ipt2,
        phone: this.ipt3,
        content: this.ipt4,
        userName: this.ipt1
      };
      this.$api.article.contactUs(params).then(res => {
        this.$toast(res.data.msg);
      });
    },
    // 翻译中文
    oninterpret() {
      this.interpret = !this.interpret;
    },
    // 分享
    connectUs(val, Idx, id) {
      this.$router.push({
        path: val,
        query: {
          apartmentId: Idx,
          id: this.id
        }
      });
    },
    Onshare(smt) {
      //console.log(this.data.estate)
      let agent = {
        brokerName: this.data.brokerName,
        brokerEmail: this.data.brokerEmail,
        brokerPhone: this.data.brokerTelPhone
      };
      let list = {
        id: this.id,
        types: "新房",
        type: this.$t("message.global.NewHouse"),
        estate: this.data.estate,
        province: this.data.province,
        city: this.data.city,
        minHall: this.data.minHall,
        maxHall: this.data.maxHall,
        lowprice: this.data.lowprice,
        maxPrice: this.data.maxPrice,
        expressing: this.data.expressing,
        estateAddress: this.data.estateAddress,
        brokerName: this.data.brokerName,
        brokerEmail: this.data.brokerEmail,
        brokerPhone: this.data.brokerTelPhone,
        introduceFr: this.data.introduceFr,
        agent: agent
      };
      this.$router.push({
        path: smt,
        query: list
      });
    },
    Onord(value) {
      this.$router.push({
        path: value,
        query: { type: "二手房" }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.dialog{
    img{
        width: 100%;
    }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
   div{
       font-size: 16px
   }
    .pack{
       padding: .1rem;
       div{
           width: 100%;
         .packUp{
            float:right;
            font-size:.13rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(35,76,211,1);
            line-height:.18rem;
        }
       }
    
   }
  
   .video{
       height: 2.14rem;
       position: relative;
       img{
          height: 2.14rem;
          width: 100%;
       }
   }
   .AR{
      position: absolute;
      top: 15%;
      left: 30%;
      width: 1.5rem;

   }
   .share{
      position: absolute;
      top: 0.5rem;
      right: 0.2rem;
   }
   .video_S{
        position: absolute;
        width: .3rem;
        height: .3rem;
        top: 2.2rem;
        left: 0.1rem;
   }
   .custom-indicator{
        position: absolute;
        top: 2.35rem;
        left: 80%;
        width:.49rem;
        height:.20rem;
        background:rgba(0,0,0,1);
        border-radius:.1rem;
        opacity:0.64;
        font-size:.12rem;
        text-align: center;
        color:rgba(255,255,255,1);
   }
   .video_btn{
        position: absolute;
        top: 2.25rem;
        left: 40%;
        .VR{
            width: .37rem;
            height: .20rem;
            background: #234cd3;
            border-radius: .1rem;
            padding: 0 .1rem;
            font-size:.12rem;
            color:rgba(255,255,255,1);
            margin-right: .1rem;
        }
        .price{
            width:.37rem;
            height:.2rem;
            padding: 0 .1rem;
            background:rgba(255,255,255,1);
            border-radius:10px;
            font-size:.12rem;
            color:rgba(66,66,66,1);
            line-height:.2rem;
        }
   }
   .hr{
        border:none;
        height:1px;
        margin: 0.12rem 0;
        background-color:#ECECEC
   }
    th,td{
          border:none !important
    }
    .btn{
         height: .4rem;
         margin: .1rem;
         .btn_i{
             float:right;
             width:1.1rem;
             background:rgba(35,77,212,1);
             border-radius:.06rem;
         }
    }
    .btn_us{
        float: right;
        height: .4rem;
        margin: .1rem;
    }
     .van-button--large{
        width: 92%;
        margin-left: .1rem;
        margin-bottom: 0.3rem;
        background:rgba(35,76,211,1);
   }
   /* 标题 */
   .detalis_title{
    //    height:.28rem;
      width: 70%;
       font-size:.2rem;
       font-weight:600;
       color:rgba(0,0,0,1);
       line-height:.28rem;
       margin: 0.07rem 0 0.03rem;
   }
   .details_province{
       height:.17rem;
       font-size:.12rem;
       color:rgba(177,177,177,1);
       line-height:.17rem;
       margin-bottom: 0.11rem
   }
   .details{
       position: relative;
       margin-left: .12rem;
   }
   .tax{
       height:.26rem;
       background:rgba(106,192,120,1);
   }
   .check{
      height:.26rem;
      background:rgba(35,76,211,1);
   }
   .itemize{
       height:.18rem;
       background:rgba(191,191,191,1);
   }
    .details_img{
        width:.58rem;
        height: .59rem;
         position: absolute;
        right: .2rem;
        top: 0rem;
    }
    .item>span{
        margin-right: .08rem
    }
    .font{
        font-size:.12rem;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:.17rem;
        display: inline-block;
        padding: 0 .05rem;
        line-height: .26rem;
    }
    .font1{
        font-size:.11rem;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:.16rem;
        display: inline-block;
        padding: 0 .05rem;
        line-height: .18rem;
    }
    .price{
        height:.28rem;
        font-size:.20rem;
        font-weight:600;
        color:rgba(255,94,94,1);
        line-height:.28rem;
        padding: 0.13rem 0 0.10rem 0
    }
    .hand{
        height:.22rem;
        font-size:.14rem;
        font-weight:600;
        line-height:.20rem;
        margin-bottom: .03rem;
        padding-left: .1rem;
        padding-top: .01rem;
    }
    .time{
        color:rgba(186,186,186,1);
    }
         .consultants{
        height:.28rem;
        font-size:.2rem;
        font-weight:600;
        color:rgba(0,0,0,0.76);
        line-height:.28rem;
        margin-bottom: .09rem;
        margin-right: .1rem;
      }
    /* 房产顾问 */
    .estates{
        margin: 0  0.12rem;
 
      .broker_box{
          padding: 0.11rem 0.15rem 0.09rem 0.04rem;
          height:3.73rem;
          background:rgba(255,255,255,1);
          box-shadow:0px .01rem .18rem 0px rgba(0,0,0,0.11);
          position: relative;
           hr{
                        margin-top: .2rem;
             }
        .broker{
            display: flex;
            .attestation{
                position: absolute;
                right: .2rem;
                
                p{
                    height:.23rem;
                    background:rgba(248,248,248,1);
                    border:.01rem solid rgba(237,237,237,1);
                    padding: 0 .11rem ;
                    line-height: .23rem;
                    margin-bottom: 0.05rem;
                    img{
                            width: .17rem;
                            height: .12rem;
                            display: inline-block;
                            vertical-align: middle;
                    }
                }
                span{
                    font-size:.11rem;
                    color:rgba(38,38,38,1);
                    // line-height:.11rem;
                }

            }
               
                .img{
                    width:.62rem;
                    height:.62rem;
                    border-radius: 50%;
                    padding: 0.07rem 0.08rem 0 0.06rem 
                }
                .name{
                    padding-top: 0.1rem;
                    height:.22rem;
                    font-size:.16rem;
                    font-weight:600;
                    color:rgba(0,0,0,0.76);
                    line-height:.22rem;
                }
               .agent{
                   height: .33rem;
                   width: 1.5rem;
                   overflow: hidden;
                   font-size:.13rem;
                   color:rgba(131,131,131,0.76);
                   line-height:.18rem;
               }
            }
            .num{
                //  height:.20rem;
                height: .5rem;
                margin: 0.07rem 0 0.04rem 0;
                font-size:.14rem;
                // font-weight:600;
                color:rgba(146,146,146,1);
                line-height:.2rem;
               .phone{
                text-align: center
               }
               .margin{
                   margin-right: 0.06rem;
               }
               .wx{
                   float: left;
               }
               .yx{
                   float:right;
               }
            }
            // .quiz{
            //     font-size:.12rem;
            //     color:rgba(167,167,167,1);
            //     line-height:.17rem;
            // }
            .drug{
                
                .van-cell-group{
                    height: .28rem;
                }
                .van-cell{
                   padding: 0.03rem 0.1rem 
                }
                
            }
               
                .van-field__control{
                     font-size:.12rem;
                    color:rgba(167,167,167,1);
                    line-height:.23rem;
                }
            .van-cell-group{
              height:.59rem;
              margin: 0.07rem 0.11rem;
              background:rgba(240,240,240,1);
            }
            .van-cell{
              background: none
            }
            .btn{
                  margin: 0.03rem 0.11rem;
                  padding: 0 0.5rem;
                  float: right; 
            }
        }
    // 楼盘介绍
     .interpret{
        font-size:.13rem;
        color:rgba(35,76,211,1);
        line-height:.18rem;
     }
      .download{
          float: right;
          margin-top: 0.05rem;
      }
      .synopsis{
          margin: 0.1rem 0;
          font-size:.13rem;
          color:rgba(70,70,70,1);
          line-height:.18rem;
          overflow: hidden;
      }
      .synopsisno{
             overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 8;
            -webkit-box-orient: vertical;
            margin: 0.1rem 0;
            font-size:.13rem;
            color:rgba(70,70,70,1);
            line-height:.18rem;
            overflow: hidden;
      }
    // 楼盘位置
    .province{
        font-size:.12rem;
        color:rgba(177,177,177,1);
        line-height:.17rem;
    }
    .map{
        height:3rem;
        margin-top: 0.05rem;
    }
    iframe{
        width: 100%;
        height: 3rem;
    }
    // 户型详情
    // .van-swipe-item{
    //     width:1.6rem;
    //     background:rgba(255,255,255,1);
    //     box-shadow:0px .01rem .18rem 0px rgba(0,0,0,0.11);
    // }
    .swipe{
        margin-top: .05rem;
        // overflow-x: auto;
          white-space: nowrap;        //阻止文本换行
          overflow: auto;             //设置溢出可滚动   
    //   .swipe_div{
    //       width: 100rem;
         div{
             width: 1.68rem;
              display: inline-block;      //设置属性（元素间不换行）
             box-shadow:0px 1px 18px 0px rgba(0,0,0,0.11);
            //     box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem rgba(0.11, 0.11, 0.11, 0.11);
            //    box-shadow:.1rem .1rem .1rem 0px rgba(0,0,0,0.11);
                 padding:.1rem;
                 margin: .08rem;
        // }
      }
      
       
    //  .swipe_details{
    //     width:1.31rem;
    //     height:2.60rem;
    //     background:rgba(255,255,255,1);
    //     box-shadow:0px .01rem .18rem 0px rgba(0,0,0,0.11);
    //     float: left;
    //     margin-right: 0.1rem;
    //     padding: .06rem 0 0 .09rem;
    //     .time{
    //         color: #BABABA;
    //         font-size:.12rem;
    //         line-height: .2rem;
    //     }
    //     .hand{
    //         color:#000000;
    //         font-size: .12rem;
    //          line-height: .2rem;
    //     }
    //  }
    }
    .relation{
        text-align: center;
        height:.18rem;
        font-size:.13rem;
        color:rgba(34,75,215,1);
        line-height:.18rem
    }
    // 还款计算
    
    .repay{
        .repay_p{
             height:.18rem;
             font-size:.13rem;
             color:rgba(42,42,42,1);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
             line-height:.18rem;
             padding:0.12rem 0 0.09rem 0
         }
        .van-cell-group{
            height:.37rem;
            background:rgba(233,233,233,1);
        }
        .van-cell{
            background: none
        }
        .van-field__control{
             height:.2rem;
             font-size:.13rem;
             color:rgba(42,42,42,1);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
             line-height:.18rem;
        }
        .van-ellipsis{
                position: absolute;
                right: 2.5rem;
                top: -0.1rem;
                height:.18rem;
                font-size:.13rem;
                color:rgba(42,42,42,1);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                line-height:.18rem;
        }
        .van-dropdown-menu{
            height: .37rem;
            background:rgba(233,233,233,1);
        }
        .van-dropdown-menu__title{
             left: 1.4rem;
        }
     }
     .monthly{
         padding: 0.19rem 0.2rem 0.15rem 0.11rem;
         font-size:.17rem;
         color:rgba(0,0,0,1);
         line-height:.24rem;
     }
     .money{
         padding-left: 0.2rem;
         font-weight:500;
         color:rgba(255,94,94,1);
     }
    .canvas{
         position: relative;
     }

     .echart{
        height:1.55rem;
        background:rgba(249,249,249,1);
        div{
            right: .8rem;
        }
     }
    
     
     .loans{
        //  height:1.97rem;
         background:rgba(249,249,249,1);
         .loans_p{
            height:.25rem;
            font-size:.18rem;
            font-weight:500;
            color:rgba(41,41,41,1);
            line-height:.25rem;
            padding: 0.03rem 0 0.09rem 0.08rem;
         }
         table{
             width: 100%;
         }
         th{
             width: 33.3%;
             height:.17rem;
             font-size:.12rem;
             font-weight:500;
             color:rgba(41,41,41,1);
             line-height:.17rem;
         }
         td{
             text-align: center;
             height:.20rem;
             font-size:.14rem;
             color:rgba(134,134,134,1);
             line-height:.2rem; 
             width: 33.3%;
            }
     }
     
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    .loanse{
         height:.4rem;
         background:rgba(131,159,248,1);
         border-radius:.05rem;
         font-size:.2rem;
         font-weight:600;
         color:rgba(255,255,255,1);
         line-height:.4rem;
         text-align: center;
         margin-top: .3rem;
     }
     .echart_p{
         position: absolute;
         top: .5rem;
         right: 0;
         font-size:.14rem;
         font-weight:500;
         color:rgba(119,119,119,1);
         line-height:.2rem;
         .green{ 
             width:.12rem;
             height:.12rem;
             display: inline-block;
             border-radius: 50%;
             background:rgba(126,207,52,1);
         }
         .blue{
              width:.12rem;
             height:.12rem;
             display: inline-block;
             border-radius: 50%;
             background:rgba(27,154,251,1);
         }
         .orgin{
              width:.12rem;
             height:.12rem;
             display: inline-block;
             border-radius: 50%;
             background:rgba(244,164,54,1);
         }
        
     }
   
</style>
<style lang="less" >
.el-dialog__wrapper dialog{
            background: #2a2a2a;
    }
.dialog{
    .el-dialog__header{
    display: none;
    }
    .el-dialog{
       width: 100%;
       background: none
    }
    .van-swipe{
       top: 16%;
    }
    
}
.repay{
    .el-select:hover .el-input__inner{
         background: #e9e9e9;
         border:none
    }
   .el-input__inner{
        height: 0.37rem;
        background: #e9e9e9;
   }
  .el-input{
        position: relative;
        font-size: 14px;
        height: 0.37rem;
        background: #e9e9e9;
        border: none;
        width: 3.5rem !important;
    }  
}
.drug{
    .van-field__label{
                    font-size:.12rem;
                    color:rgba(167,167,167,1);
                    line-height:.23rem;
                }
}
</style>