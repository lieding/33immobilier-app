<template>
  <div class="encyclopedia">
    <headers :class="{ colors: flag }"></headers>
    <div class="seconBrok clearfix">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.encyclopedia") }}</span>
      </div>
      <div class="oductions">
        {{ $t("message.global.encyclopedia") }}
        <span style="float:right">
          <!-- <el-input v-model="input" style="width:296px;height:45px!important;background-color:#f0f0f0;border:0;"
          placeholder="请输入内容"></el-input>-->
          <input
            style="width:210px;padding-left:5px;background-color:#f0f0f0;border:0;font-weight:400;height:42px;font-size:18px;"
            type="text"
            name
            id
            v-model="value"
          />
          <span
            style="background-color:#4D6DDA;display:inline-block;height:42px;width:55px;text-align:center;
                    cursor: pointer;vertical-align: bottom;"
            @click="consts"
          >
            <img
              style="width:26px;height:26px;"
              src="~/assets/image/sousuo.png"
              alt
            />
          </span>
        </span>
      </div>
      <div class="leftsS">
        <div
          :class="{ mars: i % 3 == 2, leftSa: true }"
          v-for="(item, i) in outcome"
          :key="i"
        >
          <div class="picZs" @click="RoutingHop(item.id)">
            <img :src="item.picUrl" alt />
          </div>
          <p class="titlesINNew">{{ item.title }}</p>
          <p>
            {{ $t("message.global.author") }}：
            <span style>{{ item.nickName }}</span>
            <span style="float:right">
              {{ $t("message.global.category") }}：
              <span>{{ item.typeName }}</span>
            </span>
          </p>
        </div>
      </div>
      <div class="rightsS">
        <div
          class="rightTops"
          style="box-shadow:0px 2px 26px 0px rgba(0,0,0,0.11);"
        >
          <p style="padding-left:20px;margin-bottom:15px;">
            {{ $t("message.global.category") }}
          </p>
          <p
            v-for="(itea, ind) in category"
            :key="ind"
            style="cursor: pointer;width:80%;margin:0 auto;margin-top:2px!important;
                    background-color:#F0F0F0;padding:10px;
                    vertical-align: middle"
            @click="tabs(itea.typeId)"
          >
            <span
              style="display:inline-block;
                        width:5px;height:5px;
                        border-radius:50%;background-color:#4D6DDA;
                        vertical-align: middle"
            ></span>
            {{ itea.typeName }}
          </p>
        </div>
      </div>
    </div>
    <foots></foots>
  </div>
</template>

<script>
import headers from "~/components/PcIndex/header.vue";
import foots from "~/components/PcIndex/foot.vue";

import title from "~/assets/image/titles.jpg";
import logoT from "~/assets/image/logoTTT.png";

export default {
  name: "encyclopedia",
  middleware: "responsive",
  components: {
    headers,
    foots
  },
  head() {
    return {
      title: "法国房产百科_法国房产知识大全_法国买房卖房租房攻略-法国33找房",
      meta: [
        {
          name: "description",
          content:
            "法国33找房百科为您提供法国房产百科,法国房产知识大全,法国买房卖房租房攻略,法国房产政策,法国租房政策"
        },
        {
          name: "keywords",
          content:
            "法国房产百科,法国房产知识大全,法国买房卖房租房攻略,法国房产政策,法国租房政策,blog immo"
        }
      ]
    };
  },
  data() {
    return {
      flag: true,
      img: {
        title,
        logoT
      },
      typeId: "",
      pares: {
        page: 1,
        pageSize: "10"
      },
      options: {},
      outcome: "",
      category: "",
      abc: "",
      value: "",
      page: 1
    };
  },
  watch: {
    typeId() {
      this.get();
    }
  },
  created() {
    // if (this.$router.query.flags == true) {
    //     this.typeId = this.$router.query.flags
    // }
    this.get();
    this.getRight();
    //console.log('123asd')
    let that = this;
    if (process.client) {
      window.onscroll = function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          that.page++;
          that.gets();
        }
      };
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.onscroll = function() {};
    }
  },
  methods: {
    consts() {
      //console.log(this.value)
      this.get();
    },
    tabs(val) {
      this.typeId = val;
    },
    async get() {
      const pares = {
        page: 1,
        pageSize: 9,
        typeId: this.typeId,
        title: this.value
      };
      const getListWzInfo = (await this.$api.article.getListWz(pares)).data;
      //console.log(getListWzInfo)
      if (getListWzInfo.code == 0) {
        this.outcome = getListWzInfo.data.agentList;
        //console.log(this.outcome)
        this.page = 1;
      }
    },
    async gets() {
      // this.page++
      const pares = {
        page: this.page,
        pageSize: 9,
        typeId: this.typeId,
        title: ""
      };
      const getListWzInfo = (await this.$api.article.getListWz(pares)).data;
      //console.log(getListWzInfo)
      if (getListWzInfo.code == 0) {
        getListWzInfo.data.agentList.forEach(item => {
          this.outcome.push(item);
        });
      }
    },
    async getRight(pares) {
      const getRigthLitInfo = (await this.$api.article.getRigthLit(pares)).data;
      //console.log(getRigthLitInfo.data);
      if (getRigthLitInfo.code == 0) {
        this.category = getRigthLitInfo.data.typeList;
        this.abc = getRigthLitInfo.data.latelyList;
      }
    },
    RoutingHop(flag) {
      this.$router.push({
        path: "/essaydetails",
        query: {
          flag: flag
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.centerSsss {
  width: 1360px;
  margin: 0 auto;
}
.colors {
  color: #000 !important;
}
.seconBrok {
  width: 1400px;
  min-height: 600px;
  margin: 0 auto;
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
    padding-right: 0px;
    padding-bottom: 30px;
  }
}
.leftsS {
  min-height: 600px;
  float: left;
  overflow: hidden;
  width: 78%;
  .mars {
    margin-right: 0px !important;
  }
  .leftSa {
    padding-bottom: 10px;
    display: inline-block;
    margin-right: 30px;
    overflow: hidden;
    width: 339px;
    .picZs {
      width: 339px;
      height: 220px;
      overflow: hidden;
      img {
        cursor: pointer;
        width: 339px;
        height: 220px;
      }
    }
    .titlesINNew {
      width: 275px;
      height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.rightsS {
  float: right;
  padding-bottom: 23px;
  width: 19%;
  margin-right: 3px;
  .rightTops {
    font-weight: 600;
    padding-bottom: 20px;
    padding-top: 10px;
  }
}
.titleSsa {
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
</style>
<style lang="scss">
.el-input__inner {
  height: 42px;
  box-shadow: none;
  vertical-align: bottom;
}
</style>
