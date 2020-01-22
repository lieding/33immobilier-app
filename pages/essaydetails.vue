<template>
  <div class="encyclopedia">
    <headers :class="{colors:flag}"></headers>
    <div v-wechat-title="outcome.title"></div>
    <div class="centerS seconBrok">
      <div class="headline">
        <span>主页</span> /
        <span>百科</span>
      </div>
      <div class="oductions">{{outcome.title}}</div>
      <div class="Maindivmain" style="overflow:hidden">
        <p>作者：{{outcome.nickName}} 发布时间: {{outcome.createTime}}</p>

        <div class="topicofthearticle">
          <div v-html="outcome.content"></div>
        </div>
        <div class="topIright">
          <div
            style="width:351px;height:auto;padding-bottom:20px;background-color:#fff;box-shadow:0px 2px 26px 0px rgba(0,0,0,0.11);float:right;"
          >
            <p style="padding: 12px;">{{$t("message.global.category")}}</p>
            <p
              v-for="(item, index) in category"
              :key="index"
              @click="cas(item.typeId)"
              style="padding:10px; 28px;background-color:#F0F0F0;width:80%;margin:0 auto;
                        margin-bottom:3px;
                        line-height:24px;
                        font-size:18px;
                        color:#234CD3"
            >
              <span
                style="display:inline-block;width:5px;height:5px;
                        border-radius:50%;background-color:#234CD3;
                        vertical-align: middle"
              ></span>
              {{item.typeName}}
            </p>
          </div>
          <br />
          <br />
          <br />
          <div
            style="width:351px;height:285px;background-color:#fff;box-shadow:0px 2px 26px 0px rgba(0,0,0,0.11);float:right;"
          >
            <p style="padding: 12px;">{{$t("message.global.zuixinxiaoxi")}}</p>
            <p
              v-for="(item, index) in abc"
              :key="index"
              @click="ccs(item.id)"
              style="padding:10px;margin-bottom:3px;margin-top:2px; 28px;background-color:#F0F0F0;width:80%;margin:0 auto;font-size:18px;color:#234CD3"
            >
              <span
                style="display:inline-block;width:5px;height:5px;
                        border-radius:50%;background-color:#234CD3;
                        vertical-align: middle"
              ></span>
              {{item.title}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <foots></foots>
  </div>
</template>

<script>
import headers from "@/components/PcIndex/moduleT/header.vue";
import foots from "@/components/PcIndex/moduleT/foot.vue";

import title from "@/assets/image/titles.jpg";
import logoT from "@/assets/image/logoTTT.png";

export default {
  name: "encyclopedia",
  components: {
    headers,
    foots
  },
  data() {
    return {
      flag: true,
      img: {
        title,
        logoT
      },
      pares: {
        page: 0,
        pageSize: "10"
      },
      options: {
        id: this.$route.query.flag
      },
      outcome: "",
      category: "",
      abc: ""
    };
  },
  created() {
    this.get(this.options);
    this.getRight();
    //console.log(this.$route.query.flag)
    //console.log('123asd')
  },
  methods: {
    ccs(val) {
      if (process.client) {
        const par = {
          id: val
        };
        this.get(par);

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    cas(vas) {
      this.$router.push({
        path: "/encyclopedia",
        query: {
          flags: vas
        }
      });
    },
    async get(pares) {
      const getInfoInfo = (await this.$api.article.getInfoLis(pares)).data;
      //console.log(getInfoInfo)
      if (getInfoInfo.code == 0) {
        this.outcome = getInfoInfo.data;
        //console.log(this.outcome)
      }
    },
    async getRight(pares) {
      const getRigthLitInfo = (await this.$api.article.getRigthLit(pares)).data;
      //console.log(getRigthLitInfo.data);
      if (getRigthLitInfo.code == 0) {
        // //console.log(getRigthLitInfo.data.typeList)
        this.category = getRigthLitInfo.data.typeList;
        this.abc = getRigthLitInfo.data.latelyList;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.seconBrok {
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
}
.Maindivmain {
  .topicofthearticle {
    width: 827px;
    display: inline-block;
  }
}
.topIright {
  float: right;
}
.centerSsss {
  width: 1360px;
  margin: 0 auto;
}
.colors {
  color: #000 !important;
}
</style>