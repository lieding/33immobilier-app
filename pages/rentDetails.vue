<template>
    <div>
        <client-only>
      <Header :title="$t('message.global.handpick')"/>
       <div>
          <div class="video">
              <van-swipe :autoplay="3000" :show-indicators='false'>
                <van-swipe-item v-for="(image, index) in picList" :key="index">
                    <img :src="image" @click="galleryIndex = index" />
                </van-swipe-item>
              </van-swipe>
          </div>
          <img src="~/assets/image/VRlogo.gif" alt="" class="AR" @click="onMap(data.vrAddress)" v-show="data.isOpenVr=='1'">
          <img src="~/assets/image/share.png" alt="" class="share" @click="Onshare('/dialog')">
           <div>
            <!-- <img src="~/assets/image/shipin.png" alt="" class="video_S" @click="onMap(data.videoUlr)" v-show="data.videoUlr"> -->
                <!-- <p class="video_btn">
                    <span class="VR" @click="onMap(data.vrAddress)">VR</span>
                    <span class="price">图片</span>
                </p> -->
                <div class="custom-indicator" slot="indicator" >
                            {{ current + 1 }}/{{picList.length}}
                </div>
           </div>
      </div>
      <div class="details">
         <p class="detalis_title">{{data.title}}</p>
         <p class="price">
             <span class="total">{{data.total}}€</span>
         </p>
         <p class="identifying">
             <span>
                 <img src="~/assets/image/gongyu.png" alt="">
                    {{data.houseOrApartment == 1 ? $t("message.global.apartments") :  $t("message.global.cottage") }}
             </span>
              <span>
                 <img src="~/assets/image/rooms.png" alt="">
                  {{data.roomsNum}}{{$t("message.global.P")}}  {{data.bedroomNum}}{{$t("message.global.CH")}}
             </span>
              <span>
                 <img src="~/assets/image/time.png" alt="">
                  {{data.year}}
             </span>
              <span>
                 <img src="~/assets/image/aram.png" alt="">
                  {{data.acreage}}{{$t("message.global.square")}}
             </span>
         </p>
       
      </div>
           <hr class="hr"/>
        <div class="estates">
          <span class="consultants facilities">{{$t("message.global.supporting")}}</span>
          <div class="assort">
              <div v-if="data.isTV">
                  <img  src="~/assets/image/download_1.png" alt="">
                   <p>{{$t("message.global.television")}}</p>
              </div>
              <div v-else>
                   <img src="~/assets/image/download1_1.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.television")}}</p>
              </div>
             <div v-if="data.isFrig">
                  <img src="~/assets/image/download_10.png" alt="">
                   <p>{{$t("message.global.refrigerator")}}</p>
              </div>
               <div v-else>
                  <img src="~/assets/image/picSzg/refrigH.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.refrigerator")}}</p>
              </div>
               <div v-if="data.isWashing">
                  <img src="~/assets/image/download_7.png" alt="">
                   <p>{{$t("message.global.washer")}}</p>
              </div>
              <div  v-else>
                  <img src="~/assets/image/picSzg/washerH.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.washer")}}</p>
              </div>
               <div v-if="data.isChair">
                  <img src="~/assets/image/chair.png" alt="">
                   <p>{{$t("message.global.chairs")}}</p>
              </div>
              <div v-else>
                  <img src="~/assets/image/chair_1.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.chairs")}}</p>
              </div>
               <div v-if="data.isHeater">
                  <img src="~/assets/image/download_3.png" alt="">
                   <p>{{$t("message.global.calorifier")}}</p>
              </div>
               <div v-else>
                  <img src="~/assets/image/download3_3.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.calorifier")}}</p>
              </div>
             
               <div v-if="data.isBed">
                  <img src="~/assets/image/download_8.png" alt="">
                   <p>{{$t("message.global.bed")}}</p>
              </div>
               <div v-else>
                  <img src="~/assets/image/download8_8.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.bed")}}</p>
              </div>

               <div v-if="data.isSteam">
                  <img src="~/assets/image/download_9.png" alt="">
                   <p>{{$t("message.global.heating")}}</p>
              </div>
              <div v-else>
                  <img src="~/assets/image/picSzg/heatH.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.heating")}}</p>
              </div>
               <div v-if="data.isBroadband">
                  <img src="~/assets/image/download_6.png" alt="">
                   <p>{{$t("message.global.broadband")}}</p>
              </div>
              <div v-else>
                  <img src="~/assets/image/download6_6.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.broadband")}}</p>
              </div>

               <div v-if="data.isWardrobe">
                  <img src="~/assets/image/download_5.png" alt="">
                   <p>{{$t("message.global.wardrobe")}}</p>
              </div>
               <div v-else>
                  <img src="~/assets/image/download5_5.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.wardrobe")}}</p>
              </div>
               <div v-if="data.isMicrowave">
                  <img src="~/assets/image/microwave1.png" alt="">
                   <p>{{$t("message.global.microwave")}}</p>
              </div>
              <div v-else>
                  <img src="~/assets/image/microwave1_1.png" alt="">
                   <p style="text-decoration: line-through; color: #E5E5E5;">{{$t("message.global.microwave")}}</p>
              </div>
          </div>
        </div>
 
      <!-- 房产顾问 -->
      <div class="estates" >
          <p class="consultants">{{$t("message.global.contact")}}</p>
          <div class="broker_box">
              <div class="broker">
                  <img :src=data.contactUrl alt="" class="img">
                  <div>
                      <p class="name">{{data.contactName}}</p>
                      <!-- <p class="agent">Agent immobilier</p> -->
                  </div>
                  <!--<div class="attestation">
                      <p>
                          <img src="~/assets/image/autonym.png" alt="">
                          <span>{{$t("message.global.authentication")}}</span>
                      </p>
                       <p>
                          <img src="~/assets/image/licensed.png" alt="">
                          <span>{{$t("message.global.licensed")}}</span>
                      </p>
                       <p>
                          <img src="~/assets/image/pro.png" alt="">
                          <span>{{$t("message.global.EasyPro")}}</span>
                      </p>
                  </div> -->
              </div>
              <hr>
              <div class="num">
                  <p class="phone"><img src="~/assets/image/phone.png" alt="" class="margin" >{{data.contactPhone}}</p>
                  <p><span class="wx">{{$t("message.global.WXWach")}}:{{data.contactWx}}</span><span class="yx">{{$t("message.global.mail")}}:{{data.contactEmail}}</span></p>
              </div>
              <div class="quiz">
                <div class="drug"> 
                  <van-cell-group>
                    <van-field
                         v-model="ipt1"
                        :placeholder='$t("message.global.YourName")'
                        left-icon="contact"
                    />
                 </van-cell-group>
                <van-cell-group>
                    <van-field
                      v-model="ipt2"
                        :placeholder='$t("message.global.YourPhone")'
                        left-icon="phone-o"
                    />
                 </van-cell-group>
                    <van-cell-group>
                    <van-field
                         v-model="ipt3"
                        :placeholder='$t("message.global.YourMessage")'
                        left-icon="envelop-o"
                    />
                 </van-cell-group>
            </div>  
                    <van-cell-group>
                    <van-field
                       :value="ipt4"
                        v-model="ipt4"
                        type="textarea"
                       :placeholder='$t("message.global.LeaveYourMessage")'
                        autosize
                        
                        :border="false"
                    />
                    </van-cell-group>
                    <van-button type="primary" class="btn" @click="OncontactUs">{{$t("message.global.woyaotiwen")}}</van-button>
              </div>
              
          </div>
      </div>
      <hr class="hr"/>
      <!-- 楼盘介绍 -->
      <div class="estates pack">
          <span class="consultants">{{$t("message.global.fwjj")}}</span>
          <span class="interpret download" v-if="interpret" @click="oninterpret">{{$t("message.global.interpret")}}</span>
          <span class="interpret download" v-else @click="oninterpret"></span>
          <div :class="IspackUp?'synopsisno':'synopsis'" v-if="!interpret" style="white-space: pre-line;">{{data.introduceCn}}</div>
          <div  :class="IspackUp?'synopsisno':'synopsis'" v-else  style="white-space: pre-line;">{{data.introduceFr}}</div>
          <div> <span class="packUp" @click="onpackUp">{{IspackUp?$t("message.global.seeMore"):$t("message.global.shouqi")}}</span></div> 
      </div>
      <hr class="hr"/>
      <!-- 楼盘位置 -->
      <div class="estates">
          <span class="consultants">{{$t("message.global.locationwz")}}</span>
          <span class="province" >{{data.privince}} /{{data.bigProvince}}</span>
            <div class="map">
               <iframe :src=Url frameborder="0" style="100%"></iframe>
          </div>
      </div>
       <hr class="hr"/>
      <!-- 户型详情 -->
      <div class="estates">
          <span class="consultants">{{$t("message.global.huxingjiegou")}}</span>
           <img :src=data.huXingUrl alt="" class="houseType">
           <!-- <div class="delails">
               <div :style="{width:W}">
                    <div class="houseType_delails">
                        <p class="houseType_conter">{{item.room}}</p>
                        <p class="houseType_conter">面积：<span>{{item.area}}</span></p>
                        <p class="houseType_conter">朝向：<span>{{item.orientation}}</span></p>
                    </div>
               </div>
                <div :style="{width:W}" >
                     <div class="houseType_delails">
                        <p class="houseType_conter">{{items.room}}</p>
                        <p class="houseType_conter">面积：<span>{{items.area}}</span></p>
                        <p class="houseType_conter">朝向：<span>{{items.orientation}}</span></p>
                    </div>
               </div>
           </div> -->
      </div>
      <hr class="hr"/>
        <!-- 还贷计算 -->
     <div class="estates" v-show="RentingApartmentList.length != 0" >
        <span class="consultants">{{$t("message.global.zukexiangqing")}} </span>
        <div  class="swipe">
            <!-- <div style="width:8rem;"> -->
                <div  v-for="info in RentingApartmentList" :key="info.id" class="swipe_details">
                        <p class="hand"><span class="time">{{$t("message.global.apartmentnum")}} ：</span> {{info.roomNum}}</p>
                            <p class="hand"><span class="time">{{$t("message.global.squareMeters")}} ：</span> {{info.roomArea}} m²</p>
                            <p class="hand"><span class="time">{{$t("message.global.orientation")}} ：</span> {{info.direction}}</p>
                            <p class="hand"><span class="time">{{$t("message.global.gender")}} ：</span> {{info.gender}}</p>
                            <p class="hand"><span class="time">{{$t("message.global.constellation")}} ：</span> {{info.zodiac}}</p>
                            <p class="hand"><span class="time">{{$t("message.global.price")}} ： </span> {{info.roomPrice}} €</p>
                <!-- </div> -->
           </div>
        </div>
         <hr class="hr"/>
     </div>
   
    <div class="estates">
          <span class="consultants">{{$t("message.global.Recommended")}}</span>
          <List :promoteList ="promoteList" type="租房"/>
    </div>
    <van-button type="info" size="large" @click="Onord('/ordIssue')" style="margin-bottom:.2rem">{{$t("message.global.woyaomaifang")}}</van-button>
     <Footer/>
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
import List from '../components/MIndex/list.vue'
import Header from '../components/MIndex/head.vue'
import Footer from '../components/MIndex/footer.vue'
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
        }
    },
    head() {
        return {
        title: `${this.data.title} (${this.data.city})`,
        meta: [
            {
            name: "description",
            content: `${this.data.title} (${this.data.city})`
            },
            {
            name: "keywords",
            content: `${this.data.title},${this.data.city}`
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
        current:0,
        value:0,
        value1: 0,
        ipt1:'',//您的姓名
        ipt1:'',//您的姓名
        ipt2:'',//您的电话
        ipt3:'',//您的邮箱
        ipt4:'',//您的信息
        id:this.$route.query.id,//房屋id
        false:false,
        data:[],//租房
        agent:{},//顾问
        picList:[],//图片列表
        interpret:true,//翻译中法文
        List:[],//房屋详情列表
        RentingApartmentList:[],//租客信息
        promoteList:[],//推荐房源
        W:'',
        Url:'',
        IspackUp:true,
        option1: [
            { text: '新房', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 }
        ],       
        galleryIndex: null};
    },
    mounted(){
        rem();
        this.Onlist();
         
  },
  methods: {
      Onlist(){
          let params = {id:this.id}
             this.$api.article.getInFo(params).then(res => {
                this.data =  res.data.data//租房
                this.picList = res.data.data.pics
                // this.W = this.ListTop.length * 2 +'rem'
                this.promoteList = res.data.data.promoteList //推荐房源
                this.RentingApartmentList = res.data.data.RentingApartmentList //租客信息
                   this.Url = "http://47.254.149.82/app/map/jumpMap?lat="+ res.data.data.latitude +'&lng=' +res.data.data.longitude
                //console.log(this.ListBottom, this.ListTop);
     });
      },
      onpackUp(){
          this.IspackUp = !this.IspackUp
      },
      Onord(value){
          this.$router.push({
            path: value,
            query: {type:'租房'}
          });
        },
        // 联系我们
        OncontactUs(){
            //console.log(this.ipt4)
             let params = {email:this.ipt3,phone:this.ipt2,content:this.ipt4,userName:this.ipt1,id:this.id,type:1}
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
                types:'租房',
                type:this.$t("message.global.tenement"),
                id:this.id,
                estate:this.data.title,
                province:this.data.province,
                city:this.data.city,
                estateAddress:this.data.estateAddress,
                brokerName:this.data.contactName,
                brokerEmail:this.data.contactEmail,
                 brokerPhone:this.data.contactPhone,
                introduceFr:this.data.introduceFr,
                total:this.data.total,//总价
                 Hall:this.data.acreage,
                roomsNum:this.data.roomsNum,//厅
                bedroomNum:this.data.bedroomNum,//卧室
             };
        this.$router.push({
            path: smt,
            query: list
        });
        }
  },
}
</script>
<style lang="scss" scoped>
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
        line-height: .20rem;
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
   .hr{
        border:none;
        height:1px;
        margin: 0.12rem 0;
        background-color:#ECECEC
   }
    th,td{
          border:none !important
    }
    .van-swipe-item{
        width:1.6rem;
        background:rgba(255,255,255,1);
        box-shadow:0px .01rem .18rem 0px rgba(0,0,0,0.11);
    }
    .swipe{
        margin-top: .05rem;
        white-space: nowrap;        //阻止文本换行
          overflow: auto;  
        padding:.1rem;
     .swipe_details{
        width:1.31rem;
        height:1.62rem;
          display: inline-block;      //设置属性（元素间不换行）
        background:rgba(255,255,255,1);
        box-shadow:0px .01rem .18rem 0px rgba(0,0,0,0.11);
        // height:.88rem;
        // float: left;
        // border:.01rem solid rgba(217,217,217,1);
        // margin-bottom: 0.07rem;
        margin-right: 0.1rem;
        padding: .06rem 0 0 .09rem;
        .time{
            color: #BABABA;
            font-size:.16rem;
            line-height: .26rem;
        }
        .hand{
            color:#000000;
            font-size: .16rem;
             line-height: .26rem;
        }
     }
    }
    .relation{
        text-align: center;
        height:.18rem;
        font-size:.13rem;
        color:rgba(34,75,215,1);
        line-height:.18rem
    }
    .facilities{
        margin: 0.07rem 0;
    }
    .assort{
        display: flex;
        flex-wrap: wrap;
        div{
            width: 20%;
            text-align: center;
            margin-bottom: .12rem;
            img{
                width: 0.3rem;
                height: 0.25rem;
            }
        }
        p{
            height:.17rem;
            font-size:.12rem;
            color:rgba(53,53,53,1);
            line-height:.17rem;
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
           margin: 0  0.12rem .1rem;
   }
   // 价格
    .price{
        width: 100%;
        font-size:.2rem;
        font-weight:600;
        color:rgba(255,94,94,1);
        line-height:.28rem;
        margin: 0.13rem 0 0.03rem 0;
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
        font-size:.14rem;
        color:rgba(35,76,211,1);
        line-height:.2rem;
        margin-right: 0.12rem;
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
                right: .4rem;
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
                text-align: center
               }
               .margin{
                   margin-right: 0.06rem;
                   width: .16rem;
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
                   padding: 0.03rem 0.1rem ;
                   font-size: 13px ;
                }
                 .van-field__label{
                    font-size:13px;
                    color:rgba(167,167,167,1);
                    line-height:.23rem;
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
            }
     }
    
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                        

   
</style>