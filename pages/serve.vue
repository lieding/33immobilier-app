<template>
  <div class="serve">
    <headers :class="{ colors: flag }"></headers>
    <div class="centerS">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.Saas") }}</span>
      </div>
      <p style="font-size:32px;font-weight:600;margin-top:10px;">
        {{ $t("message.global.fuwureny") }}
      </p>
      <div class="titlesss">
        <span @click="dianji(3)" :class="{ bas: fa == 3 }">{{
          $t("message.global.fitment")
        }}</span>
        <span @click="dianji(2)" :class="{ bas: fa == 2 }">{{
          $t("message.global.clean-keeping")
        }}</span>
        <span @click="dianji(1)" :class="{ bas: fa == 1 }">{{
          $t("message.global.sanitation")
        }}</span>
      </div>
      <div class="bods clearfix">
        <div
          :class="{ dis: true, mrts: i % 3 == 2 }"
          v-for="(item, i) in lis"
          :key="i"
        >
          <div class="imgF">
            <img class="img" :src="item.image" alt />
          </div>
          <p
            class="yichu1"
            style="font-size:22px;font-weight:600;margin-top:2px;"
          >
            {{ item.title }}
          </p>
          <p class="yichu" style="line-height:30px;font-size:20px;height:60px;">
            {{ item.profiles }}
          </p>
          <!-- <p>{{$t("message.global.connection")}}：{{item.phone}}</p> -->
          <p class="yichu1" style="margin-top:30px;">
            <img src="~/assets/image/times.png" alt />
            {{ $t("message.global.service") }} : {{ item.lowPrice }} -
            {{ item.topPrice }}
          </p>
          <p class="yichu1">
            <img src="~/assets/image/di.png" alt />
            {{ $t("message.global.coverage") }} : {{ item.area }}
          </p>
          <p class="yichu1">
            <img src="~/assets/image/hd.png" alt />
            {{ $t("message.global.connection") }} : {{ item.phone }}
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

export default {
  name: "sellers",
  middleware: "responsive",
  components: {
    headers,
    foots
  },
  head() {
    return {
      title:
        "法国装修_法国保洁_法国钟点工_巴黎钟点工_巴黎装修_巴黎搬家_室内设计_房屋翻新-法国33找房装修保洁搬家",
      meta: [
        {
          name: "description",
          content:
            "33找房服务频道汇集了法国装修公司及个人、设计师、保洁、钟点工、搬家等等服务的法国家具服务信息平台。为您提供齐全的法国装修,保洁,钟点工,室内设计,平面设计,钟点工,巴黎装修,巴黎保洁,设计师-法国33找房全程为您服务"
        },
        {
          name: "keywords",
          content:
            "法国装修,法国保洁,法国钟点工,法国装修设计师,巴黎钟点工,巴黎装修,巴黎搬家,设计师,室内设计-法国33找房装修保洁搬家"
        }
      ]
    };
  },
  data() {
    return {
      flag: true,
      fa: 3,
      lis: "",
      page: 1
    };
  },
  created() {
    this.getFacilitatorList();
    var that = this;
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
          that.getFacilitatorLists();
        }
      };
    }
  },
  methods: {
    dianji(val) {
      this.fa = val;
      this.getFacilitatorList();
    },
    async getFacilitatorList() {
      let as = {
        page: 1,
        pageSize: 10,
        type: this.fa
      };
      const getFaciliInfo = (await this.$api.article.getFacilitatorList(as))
        .data;
      //console.log(getFaciliInfo.data)
      if (getFaciliInfo.code == 0) {
        this.lis = getFaciliInfo.data.mapList;
        //console.log(this.lis)
        this.page = 1;
      }
    },
    async getFacilitatorLists() {
      let as = {
        page: this.page,
        pageSize: 10,
        type: this.fa
      };
      const getFaciliInfo = (await this.$api.article.getFacilitatorList(as))
        .data;
      //console.log(getFaciliInfo.data)
      if (getFaciliInfo.code == 0) {
        getFaciliInfo.data.mapList.forEach(item => {
          this.lis.push(item);
        });
        //console.log(this.lis)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.colors {
  color: #000 !important;
}
.mrts {
  margin-right: 0px !important;
}
.bods {
  min-height: 600px;
}
.dis {
  margin-bottom: 20px;
  float: left;
  width: 379px;
  box-shadow: 0px 2px 17px 0px rgba(0, 0, 0, 0.08);
  height: 418px;
  margin-right: 30px;
  p {
    padding-left: 5px;
    img {
      width: 15px;
      vertical-align: bottom;
      margin-top: 5px;
    }
  }
  .imgF {
    height: 184px;
  }
  .img {
    width: 379px;
    height: 184px;
  }
}
.titlesss {
  padding-top: 20px;
  span {
    display: inline-block;
    width: auto;
    // height:
    font-size: 20px;
    padding: 10px 0;
    color: #000;
    margin: 0 20px;
    cursor: pointer;
  }
  .bas {
    color: #234cd3;
    border-bottom: 1px solid #234cd3;
  }
}
.headline {
  padding-top: 10px;
  color: #000;
  font-size: 16px;
  span {
    cursor: pointer;
  }
}
.yichu1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.yichu {
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
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
</style>
<style lang="scss"></style>
