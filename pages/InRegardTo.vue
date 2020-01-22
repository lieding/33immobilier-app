<template>
    <div>
        <Header :title="$t('message.global.AboutUs')"/>
        <P class="AboutUs">{{$t("message.global.AboutUs")}}</P>
        <P class="center" >
            {{$t("message.global.AboutUsconten")}}
        </P>
        <P class="center" >{{$t("message.global.AboutMilliome")}}</P>
        <P class="center" >{{$t("message.global.AboutUsMilliome")}}</P>
        <Footer/>
    </div>
</template>
<script>
import Header from '@/components/MIndex/common/head.vue'
import Footer from '@/components/MIndex/common/footer.vue'
export default {
      components:{
        Header,
        Footer,
      },
}
</script>
<style lang="less" scoped>
div{
    font-size: 16px;
 
}
  .AboutUs{
        height:.22rem;
        font-size:.16rem;
        font-weight:600;
        color:rgba(0,0,0,1);
        line-height:.22rem;
  }
  .center{
         margin-top: 0.3rem;
            font-size: 0.14rem;
            color: #000000;
            line-height: 0.2rem;
  }
 P{
      margin: 0.1rem;
 }
</style>