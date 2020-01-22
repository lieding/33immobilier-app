<template>
    <div class="service">
       <Header :title="$t('message.global.Saas')"/>
       <van-tabs @click="onClick">
            <van-tab :title='$t("message.global.zhuangxiu")'>
         
                    <div class="decorate" v-for="(item,index) in mapList" :key="index">
                        <img :src=item.image alt="" class="decorate_img">
                        <div class="conter">
                            <p><span class="name">{{item.title}}</span></p>
                            <p class="font">{{item.profiles}}</p>
                        </div>
                        <div class="conten conter_img">
                            <p><img src="../../assets/image/times.png" alt="">{{$t("message.global.service")}}：{{item.lowPrice}} - {{item.topPrice}}€</p>
                            <p><img src="../../assets/image/di.png" alt="">{{$t("message.global.coverage")}}：{{item.area}}</p>
                            <p><img src="../../assets/image/hd.png" alt="">{{$t("message.global.contactPhone")}}：{{item.phone}}</p>
                        </div>
                    </div>
                
            </van-tab>
            <van-tab :title='$t("message.global.clean-keeping")'>
                  <div class="decorate" v-for="(item,index) in mapList" :key="index">
                    <img :src=item.image alt="" class="decorate_img">
                    <div class="conter">
                        <p><span class="name">{{item.title}}</span></p>
                        <p class="font">{{item.profiles}}</p>
                    </div>
                       <div class="conten conter_img">
                        <p><img src="../../assets/image/times.png" alt="">{{$t("message.global.service")}}：{{item.lowPrice}} - {{item.topPrice}}€</p>
                        <p><img src="../../assets/image/di.png" alt="">{{$t("message.global.coverage")}}：{{item.area}}</p>
                        <p><img src="../../assets/image/hd.png" alt="">{{$t("message.global.contactPhone")}}：{{item.phone}}</p>
                    </div>
                 </div>
            </van-tab>
            <van-tab :title='$t("message.global.sanitation")'>
                  <div class="decorate" v-for="(item,index) in mapList" :key="index">
                    <img :src=item.image alt="" class="decorate_img">
                    <div class="conter">
                        <p><span class="name">{{item.title}}</span></p>
                        <p class="font">{{item.profiles}}</p>
                    </div>
                       <div class="conten conter_img">
                        <p><img src="../../assets/image/times.png" alt="">{{$t("message.global.service")}}：{{item.lowPrice}} - {{item.topPrice}}€</p>
                        <p><img src="../../assets/image/di.png" alt="">{{$t("message.global.coverage")}}：{{item.area}}</p>
                        <p><img src="../../assets/image/hd.png" alt="">{{$t("message.global.contactPhone")}}：{{item.phone}}</p>
                    </div>
                 </div>
            </van-tab>
        </van-tabs>
       <Footer/>
    </div>
</template>
<script>
import Header from '@/components/MIndex/common/head.vue'
import Footer from '@/components/MIndex/common/footer.vue'
export default {
     components:{
      Header,
      Footer
    },
    data() {
        return { 
            page:'1',
            type:'3',
            maxPage:'',
            mapList:[],
            isLoading: false,

        }
    },
    mounted() {
         this.onList()
    },
    created() {
       const that = this
        window.onscroll = function(){
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            // 页面高度
       		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
           // 总共的高度   
       		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
             if(scrollTop+windowHeight==scrollHeight){
                  //console.log(that.page,that.maxPage)
                  if(that.page < that.maxPage){
                     that.page ++
                     that.onList()
                  }
         }
        }
    },
    methods: {
         onClick(name, title) {
             //console.log(title)
             if(title == this.$t("message.global.zhuangxiu")){
                 this.type = '3'
                 this.page = '1'
                 this.mapList = []
                 this.onList()
             }else if (title == this.$t("message.global.clean-keeping")){
                 this.type = '2'
                  this.mapList = []
                 this.page = '1'
                 this.onList()
             }else{ 
                 this.type = "1"
                  this.mapList = []
                 this.page = '1'
                 this.onList()
             }

                
         },
         onList(){
             //console.log(this.type)
           let params = {page:this.page, pageSize:'10',type:this.type}
            this.$api.article.getFacilitatorList(params).then(res => {
                if(this.mapList.length!=0){
                    this.mapList.push( ...res.data.data.mapList)
                }else{
                   this.mapList = res.data.data.mapList
                }
     
                this.maxPage = res.data.data.maxPage
            });
         },
       },
}
</script>
<style lang="less">
 div{
      font-size: 16px;
  }
  .decorate{
    height:3.59rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 17px 0px rgba(0,0,0,0.08);
    margin: .12rem .12rem .12rem;
    // display: flex;
    .decorate_img{
        width: 100%;
        height: 1.73rem;
        // border-radius: 50%;
        // margin: .1rem .12rem.2rem.2rem;
    }
    .conter{
        font-size:.12rem;
        color:rgba(0,0,0,0.76);
        line-height:.2rem;
        // width: 100%;
        padding: .11rem ;
        height: .6rem;
        overflow: hidden;
        .font{
            font-size:.14rem;
            color:rgba(150,150,150,0.76);
            line-height:.2rem;
            height: 0.6rem;
        }
        .name{
            font-size:.16rem;
            font-weight:600;
            color:rgba(0,0,0,0.76);
            line-height:.3rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .invoice{
            float: right;
            font-size:.12rem;
            color:rgba(150,150,150,0.76);
            line-height:.17rem;
            margin-right: .11rem
        }
       
    
    }
        .conten{
            height: 1rem;
            font-size:.12rem;
            color:rgba(0,0,0,0.76);
            line-height:.2rem;
            width: 100%;
            padding: .11rem ;
            overflow: hidden;
        }
         .conter_img{
            font-size:.14rem;
            color:rgba(0,0,0,0.76);
            line-height:.2rem;
            img{
                width: .16rem;
                margin-right: .05rem;
                display: inline-block;
                vertical-align: middle;
            }
        }
  }
</style>
 