<template>
  <div>
    <client-only>
    <Header :title="$t('message.global.ordapartment')" />
    <div>
      <div class="video">
        <van-swipe :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(image, index) in picList" :key="index">
            <img :src="image" @click="galleryIndex = index"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--<img src="~/assets/image/VRlogo.gif" alt="" class="AR" @click="onMap(data.vrAddress)" v-show="data.vrAddress">-->
      <img src="~/assets/image/share.png" alt class="share" />
      <div>
        <!-- <img src="~/assets/image/shipin.png" alt="" class="video_S" @click="onMap(data.videoUlr)" v-show="data.videoUlr"> -->
        <!-- <p class="video_btn">
                <span class="VR" @click="onMap(data.vrAddress)">VR</span>
                <span class="price">图片</span>
        </p>-->
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{picList.length}}</div>
      </div>
    </div>
    <div class="details">
      <p class="detalis_title">{{data.title}}</p>
      <p class="price">
        <span class="total">{{data.total}}€</span>
        <span class="unit">{{data.unit}}{{$t("message.global.square€")}}</span>
        <router-link
          :to="{path: '/instrument'}"
          tag="span"
          class="comper"
        >{{$t("message.global.Calculator")}}</router-link>
      </p>
      <p class="identifying">
        <span>
          <img src="~/assets/image/gongyu.png" alt />
          {{data.houseOrApartment == 1 ? $t("message.global.apartments") : $t("message.global.cottage") }}
        </span>
        <span>
          <img src="~/assets/image/rooms.png" alt />
          {{data.roomsNum}}{{$t("message.global.P")}} - {{data.bedroomNum}} {{$t("message.global.CH")}}
        </span>
        <span>
          <img src="~/assets/image/time.png" alt />
          {{data.year}}
        </span>
        <span>
          <img src="~/assets/image/aram.png" alt />
          {{data.acreage}}{{$t("message.global.square")}}
        </span>
      </p>
    </div>
    <hr class="hr" />
    <!-- 房产顾问 -->
    <div class="estates" v-if="agent">
      <p class="consultants">{{$t("message.global.CONSULTANT")}}</p>
      <div class="broker_box">
        <div class="broker">
          <img :src="agent.brokerAvatar" alt class="img" />
          <div>
            <p class="name">{{agent.brokerName}}</p>
            <!-- <p class="agent">Agent immobilier</p> -->
          </div>
          <div class="attestation">
            <p>
              <img src="~/assets/image/autonym.png" alt />
              <span>{{$t("message.global.authentication")}}</span>
            </p>
            <p>
              <img src="~/assets/image/licensed.png" alt />
              <span>{{$t("message.global.licensed")}}</span>
            </p>
            <p>
              <img src="~/assets/image/pro.png" alt />
              <span>{{$t("message.global.EasyPro")}}</span>
            </p>
          </div>
        </div>
        <hr />
        <div class="num">
          <p class="phone" v-if="agent.brokerTelPhone">
            <img src="~/assets/image/phone.png" alt class="margin" />
            {{agent.brokerTelPhone}}
          </p>
          <p>
            <span
              class="wx"
              v-if="agent.wxNumber"
            >{{$t("message.global.WXWach")}}:{{agent.wxNumber}}</span>
            <span
              class="yx"
              v-if="agent.brokerEmail"
            >{{$t("message.global.mail")}}:{{agent.brokerEmail}}</span>
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
              oninput="value=value.replace(/[^\d]/g,'')"
              v-model="ipt2"
              :placeholder="$t('message.global.YourPhone')"
              left-icon="phone-o"
              />
            </van-cell-group>
            <van-cell-group>
              <van-field
              v-model="ipt3"
              :placeholder="$t('message.global.EMAIL_ADDRESS')"
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
            @click="OncontactUs"
            class="btn_us"
          >{{$t("message.global.woyaotiwen")}}</van-button>
        </div>
      </div>
    </div>
    <hr class="hr" />
    <!-- 楼盘介绍 -->
    <div class="estates pack">
      <span class="consultants">{{$t("message.global.prem")}}</span>
      <span
        class="interpret download"
        v-if="interpret"
        @click="oninterpret"
      >{{$t("message.global.interpret")}}</span>
      <span
        class="interpret download"
        v-else
        @click="oninterpret"
      >{{$t("message.global.EasyPro")}}翻译法语</span>
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
        >{{IspackUp?$t("message.global.seeMore"):$t("message.global.SEE_LESS")}}</span>
      </div>
    </div>
    <hr class="hr" />
    <!-- 楼盘位置 -->
    <div class="estates">
      <span class="consultants">{{$t("message.global.posi")}}</span>
      <span class="province">{{data.bigProvince}}/{{data.privince}}</span>
      <div class="map">
        <iframe :src="Url" frameborder="0"></iframe>
      </div>
    </div>
    <hr class="hr" />
    <!-- 户型详情 -->
    <div class="estates">
      <span class="consultants">{{$t("message.global.huxingjiegou")}}</span>
      <img :src="data.housePlan" alt class="houseType" />
      <div class="delails">
        <div :style="{width:W}" v-for="(item,index) in ListTop" :key="index+100">
          <div class="houseType_delails">
            <p class="houseType_conter">{{item.room}}</p>
            <p class="houseType_conter">
              {{$t("message.global.SURFACE")}}：
              <span>{{item.area}}</span>
            </p>
            <p class="houseType_conter">
              {{$t("message.global.orientation")}}：
              <span>{{item.orientation}}</span>
            </p>
          </div>
        </div>
        <div :style="{width:W}" v-for="(items,index) in ListBottom" :key="index+200">
          <div class="houseType_delails">
            <p class="houseType_conter">{{items.room}}</p>
            <p class="houseType_conter">
              {{$t("message.global.SURFACE")}}:
              <span>{{items.area}}</span>
            </p>
            <p class="houseType_conter">
              {{$t("message.global.orientation")}}:
              <span>{{items.orientation}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr class="hr" />
    <!-- 贷款能力计算 -->
    <div class="estates">
      <span class="consultants">{{$t("message.global.LOAN_CAPABILITY_CALCULATION")}}</span>
      <div class="repay">
        <p class="repay_p">{{$t("message.global.onnetincome")}}</p>
        <van-cell-group>
          <van-field
          v-model="revenus"
          label="€"
          label-width=".15rem"
          :placeholder="$t('message.global.PLEASE_ENTER')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.LOAN_CAPABILITY_CALCULATION")}}</p>
        <van-cell-group>
          <van-field
          v-model="apport"
          label="€"
          label-width=".15rem"
          :placeholder="$t('message.global.PLEASE_ENTER')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.DEBT_RATIO")}} {{$t("message.global.DEBT_BURDEN")}}</p>
        <van-cell-group>
          <van-field
          v-model="rate"
          label="%"
          label-width=".2rem"
          :placeholder="$t('message.global.PLEASE_ENTER')"
          type="Number"
          />
        </van-cell-group>
      </div>
      <div class="btn">
        <van-button type="info" class="btn_i" @click="oncapacity">{{$t("message.global.calculate")}}</van-button>
      </div>
      <p class="monthly" v-if="M">
        {{$t("message.global.MAXIMUM_MONTHLY_REPAYMENT_AMOUNT")}}
        <span class="money">{{M}}€</span>
      </p>
      <div class="loans" v-if="M">
        <p class="loans_p">{{$t("message.global.LOAN_AMOUNT_CALCULATION")}}</p>
        <table>
          <tr>
            <th>{{$t("message.global.LOAN_PERIOD")}}</th>
            <th>{{$t("message.global.ANNUAL_INTEREST_RATE")}}</th>
            <th>{{$t("message.global.amount")}}</th>
          </tr>
        </table>
        <table v-for="(item,index) in reckenList" :key="index+300">
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
          :placeholder="$t('message.global.PLEASE_ENTER')"
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
          style=" vertical-align: middle"
          :placeholder="$t('message.global.PLEASE_ENTER')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.LOAN_INTEREST_RATE")}}</p>
        <van-cell-group>
          <van-field
          v-model="interesrate"
          label="%"
          label-width=".2rem"
          :placeholder="$t('message.global.PLEASE_ENTER')"
          type="Number"
          />
        </van-cell-group>
        <p class="repay_p">{{$t("message.global.particular")}}</p>
        <el-select v-model="year">
          <el-option v-for="(item,index) in getRate" :key="index+400" :label="item" :value="item"></el-option>
        </el-select>
        <!-- <van-dropdown-menu>
                    <van-dropdown-item v-model="year" :options="option1" />
        </van-dropdown-menu>-->
      </div>
      <div class="btn">
        <van-button type="info" class="btn_i" @click="onrepay">{{$t("message.global.calculate")}}</van-button>
      </div>
      <p class="monthly" v-if="mothey">
        {{$t("message.global.MAXIMUM_MONTHLY_REPAYMENT_AMOUNT")}}
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
            {{$t("message.global.INTEREST_AMOUNT")}} € {{L}}
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
    <div class="estates">
      <span class="consultants">{{$t("message.global.Recommended")}}</span>
      <List :promoteList="promoteList" type="second_hand" />
    </div>
    <van-button
      type="info"
      size="large"
      @click="Onord('/ordIssue')"
    >{{$t("message.global.SELLING_APPLICATION")}}</van-button>
    <Footer />
    <gallery
        :images="picList"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>
    </client-only>
  </div>

</template>
<script>
import rem from "~/common/rem.js";
import List from '../components/Mindex/list.vue'
import Header from '../components/Mindex/head.vue'
import Footer from '../components/Mindex/footer.vue'
import { BASE_API } from "../api"

export default {
       name: '',
       middleware: "responsive",
        components:{
        Header,
        List,
        Footer
        },
        watch: {
            '$route' (to, from) {
               this.id = this.$route.query.id
                this.Onlist();
            },
             year(val) {
                      this.interesrate = this.getRateList[val];
            }
        },
        head() {
          return {
            title: `${this.data.title}（${this.data.privince}）`,
            meta: [
              {
                name: "description",
                content: `${this.data.title}（${this.data.privince}）`
              },
              {
                name: "keywords",
                content: `${this.data.title},${this.data.privince}`
              },
              {
                name: "og:image",
                content: this.data.picUrl
              }
            ]
          };
        },
      data(){
        return{
            value:0,
            value1: 0,
            ipt1:'',//您的姓名
            ipt1:'',//您的姓名
            ipt2:'',//您的电话
            ipt3:'',//您的邮箱
            ipt4:'',//您的信息
            current:0,
            id:this.$route.query.id,//房屋id
            false:false,
            data:'',//二手房
            agent:'',//顾问
            IspackUp:true,
            interpret:true,//翻译中法文
            List:[],//房屋详情列表
            ListTop:[],//上列
            ListBottom:[],//下列
            promoteList:[],//推荐房源
            picList:[],//图片列表
            rate:'30',//负债率
            apport:'0',//首付金额
            revenus:'3000',//月净收入
            M:'',//月还款金额
            A:'',//首付
            L:'' ,//贷款利息
            S:'',//贷款手机金额
            mothey:'',//还贷计算月还款金额
            reckenList:[],//可贷款
            loan:'300000',//房屋金额
            downapport:'0',//首付金额
            year:'25',//贷款年限
             interesrate:'',//贷款利率
            W:'',
               Url:'',
            option1: [
                { text: 'new', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
               getRate: [], //贷款利率
            getRateList: [],
            galleryIndex: null
        }
    },
    mounted(){
      rem();
          this.$api.article.getRate().then(res => {
          if (res.data.code == 0) {
              this.getRateList = res.data.data;
              this.getRate = Object.keys(res.data.data);
              //console.log(this.getRate);
              this.interesrate = res.data.data["25"];
          }
      });
      this.Onlist();

  },
  methods: {
      Oninput(){
            if(Number(this.downapport) > Number(this.loan)) {
            this.downapport = this.loan
            }
      },
       Onclick(){
         this.$router.push('./content')
        },
      Onlist(){
        let params = {id:this.id}
        this.$api.article.OrdInfo(params).then(res => {
          this.data =  res.data.data//二手房
          this.agent = res.data.data.agent //顾问
          res.data.data.bedRoomList.forEach(item => {
            item['room'] = this.$t("message.global.bedroom");
            this.List.push(item);
          });
          res.data.data.parlorList.forEach(item => {
              item['room'] = this.$t("message.global.drawingRoom")

                this.List.push(item)
            })
            res.data.data.bathRoomList.forEach(item => {
        item['room'] = this.$t("message.global.showerRoom")

                this.List.push(item)
            })
            res.data.data.kitChenList.forEach(item => {
          item['room'] = this.$t("message.global.kitchen")
                this.List.push(item)
            })
          this.List.forEach((item, i) => {
              //console.log(item);
              if (i%2) {
                  this.ListBottom.push(item)
              } else {
                  this.ListTop.push(item)
              }
          })
          this.Url = BASE_API.jsp + "/app/map/jumpMap?lat="+ res.data.data.latitude +'&lng=' +res.data.data.longitude

        this.W = this.ListTop.length * 2 +'rem'
          this.promoteList = res.data.data.promoteList
            this.picList = res.data.data.picList

      });
      },
       onpackUp(){
          this.IspackUp = !this.IspackUp
         },
       Onord(value){
          this.$router.push({
            path: value,
            query: {type:'second_hand'}
          });
        },
        oncapacity(){
            //获取月还款金额和可贷款
            let params = {revenus:this.revenus,rate:this.rate,apport:this.apport}
            this.$api.article.loanCapability(params).then(res => {
                    this.M = res.data.data.M
                    // this.A = res.data.data.A
                    // this.s = res.data.data.S
                    // this.L = res.data.data.L
                    this.reckenList = res.data.data.reckenList
            });
        },
        onrepay(){
            // 获取还贷计算
            let params = {year:this.year,rate:this.interesrate,apport:this.downapport,loan:this.loan}
            this.$api.article.repayALoan(params).then(res => {
                if(res.data.code == 500){
                    alert(res.msg)
                    this.mothey =''
                }else{
                   this.mothey = res.data.data.M
                    this.A = res.data.data.A
                    this.S = res.data.data.S
                    this.L = res.data.data.L
                    //console.log(this.A,this.L,this.S)
                }
            });

        },
        // 联系我们
        OncontactUs(){
            //console.log(this.ipt4)
             let params = {email:this.ipt3,phone:this.ipt2,content:this.ipt4,userName:this.ipt1,id:this.id,type:2}
            this.$api.article.SendEmaila(params).then(res => {
                this.$toast(res.data.msg);
            });
        },
        // 翻译中文
        oninterpret(){
           this.interpret = !this.interpret
        },
       Onshare(smt){
            let list={
                types:'second_hand',
                type:this.$t("message.global.second-hand"),
                id:this.id,
                 estate:this.data.title,
                province:this.data.province,
                city:this.data.city,
                Hall:this.data.acreage,
                unit:this.data.unit,
                // minHall:this.data.minHall,
                // maxHall: this.data.maxHall,
                // lowprice:this.data.lowprice ,
                // maxPrice:this.data.maxPrice,
                // expressing :this.data.expressing,
                // estateAddress:this.data.estateAddress,
                brokerName:this.data.agent.brokerName,
                brokerEmail:this.data.agent.brokerEmail,
                brokerPhone:this.data.agent.brokerTelPhone,
                introduceFr:this.data.introduceFr,
                // city:this.data.bigProvince,
                total:this.data.total,//总价
                roomsNum:this.data.roomsNum,//厅
                bedroomNum:this.data.bedroomNum,//卧室
             };
             //console.log(this.list)
        this.$router.push({
            path: smt,
            query: list
        });
        }
  },
   onMap(value){
    window.location.href = value
  },
}
</script>
<style lang="scss">
 .custom-indicator{
        position: absolute;
        top: 2.35rem;
        left: 80%;
        width:.49rem;
        height:.20rem;
      line-height: .2rem;
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
   div{
       font-size: 16px
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
     }
   .video{
       height: 2.14rem;
       position: relative;
       img{
          height: 2.14rem;
          width: 100%;
       }
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
  .AR{
      position: absolute;
      top: 15%;
      left: 30%;
      width: 1.5rem;

   }
   .share{
      position: absolute;
      top: 0.5rem;
       right: 0.16rem;

   }
   .hr{
        border:none;
        height:1px;
        margin: 0.12rem 0;
        background-color:#ECECEC
   }
   .van-button--large{
        width: 92%;
        margin-left: .1rem;
        margin-bottom: 0.3rem;
   }
    th,td{
          border:none !important
    }
      .btn{
        height: 0.5rem;
        margin: 0.1rem;
         .btn_i{
             float:right;
             width:1.1rem;
             background:rgba(35,77,212,1);
             border-radius:.06rem;
         }
    }
   /* 标题 */
   .detalis_title{
    //    height:.28rem;
       width: 80%;
       font-size:.2rem;
       font-weight:600;
       color:rgba(0,0,0,1);
       line-height:.28rem;
       margin: 0.07rem 0 0.03rem;
   }
   .details{
           margin: 0  0.12rem;
   }
   // 价格
    .price{
        width: 100%;
        font-size: 0.2rem;
        font-weight: 600;
        color: #ff5e5e;
        line-height: 0.28rem;
        margin: 0.13rem 0 0.12rem 0;
     }
     .unit{
        margin-left: 0.03rem;
        font-size:.13rem;
        color:rgba(161,161,161,1);
        line-height:.18rem;
     }
     .comper{
        position: absolute;
        right: 0;
        font-size: 0.14rem;
        color: #234cd3;
        line-height: 0.2rem;
        margin-right: 0.11rem;
     }
     //标识
     .identifying{
        font-size:.13rem;
        color:rgba(38,38,38,1);
        line-height:.18rem;
        img{
            width: .14rem;
            height: .15rem;
        }
        span{
          margin-right: .1rem;
        }
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
                right: 0.2rem;

                p{
                    height:.23rem;
                    background:rgba(248,248,248,1);
                    border:.01rem solid rgba(237,237,237,1);
                    padding: 0 .11rem ;
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
                    line-height:.11rem;
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
                   height:.18rem;
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
                text-align: center;
                img{
                    width: .17rem;
                }
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
            .drug{

                .van-cell-group{
                    height: .28rem;
                }
                .van-cell{
                   padding: 0.03rem 0.1rem
                }

            }
            .van-field__label{
                    font-size:.12rem;
                    color:rgba(167,167,167,1);
                    line-height:.23rem;
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
                //   float: right;
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
    .houseType{
        height:2.12rem;
        width: 100%
    }
    .delails{
        height: 2rem;
        width: 100%;
        overflow-x: auto;
     .houseType_delails{
        width:1.6rem;
        height:.88rem;
        float: left;
        border:.01rem solid rgba(217,217,217,1);
        margin-bottom: 0.07rem;
        margin-right: 0.07rem;
        padding: .06rem 0 0 .09rem;
        .houseType_title{
            font-size:.17rem;
            font-weight:600;
            color:rgba(38,38,38,1);
            line-height:.24rem;
        }
        .houseType_conter{
            font-size:.14rem;
            font-weight:600;
            color:rgba(38,38,38,1);
            line-height:.20rem;
            span{
                color:#ACACAC
            }
        }

     }
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
             height: .2rem  !important;
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
              width: 33.3%;
             text-align: center;
             height:.20rem;
             font-size:.14rem;
             color:rgba(134,134,134,1);
             line-height:.2rem;
            }
     }

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
      .btn_us{
                width: 1.34rem;
                float: right;
                line-height: 0.4rem;
                height: 0.4rem;
                margin: 0.1rem;
           }
</style>
<style lang="scss" >
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
</style>
