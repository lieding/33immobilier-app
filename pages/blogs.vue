<template>
  <div>
    <client-only>
      <Header :title="$t('message.global.encyclopedia')" />
      <div class="pedia" style="width: 95%;">
        <el-input
          :placeholder="$t('message.global.qingshuru')"
          v-model="value"
          prefix-icon="el-icon-search"
          @change="OnType"
        >
          <template slot="append">
            <img src="~/assets/image/SearchIcon.png" alt />
          </template>
        </el-input>
        <div class="select_type">
          <!-- 类型 -->
          <el-select
            v-model="select"
            :placeholder="$t('message.global.category')"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <ul class="new_list">
        <li
          class="list_li"
          @click="onclick(item.id)"
          v-for="(item, index) in agentList"
          :key="index"
        >
          <diV class="flex">
            <div class="img">
              <img :src="item.picUrl" class="new_img" />
              <span class="year">{{ item.createTime }}</span>
            </div>
            <div class="text">
              <p class="text_title">{{ item.title }}</p>
              <!-- <p class="conter">{{item.content}}</p> -->
            </div>
          </diV>
          <div class="flex_size">
            <div class="image">
              <span>{{ $t("message.global.aufaburen") }}:</span>
              <span style="color:#234CD3">{{ item.nickName }}</span>
            </div>
            <p class="font">
              <span>{{ $t("message.global.category") }} :</span>
              <span style="color:#234CD3">{{ item.typeName }}</span>
            </p>
          </div>
        </li>

        <hr class="hr" />
      </ul>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/MIndex/head.vue";
import Footer from "~/components/MIndex/footer.vue";
export default {
  name: "",
  middleware: "responsive",
  components: {
    Header,
    Footer
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
  watch: {
    select(val) {
      this.value1 = val;
      this.page = "1";
      this.agentList = [];
      this.onList();
    }
  },
  data() {
    return {
      value: "",
      select: "",
      value1: this.$route.query.id, //类型
      page: 1, //页数
      isLoading: false, //下拉刷新
      agentList: [],
      typeList: [],
      Maxpage: "1", //最大页数
      switch1: false,
      switch2: false,

      // value: 50,
      areaList: [{ text: "区域", value: 0 }],
      roomList: [{ text: "一室", value: 0 }],
      proportionList: [{ text: "100m", value: 0 }]
    };
  },
  mounted() {
    rem();
    let params = {};
    this.$api.article.WikigetRigth(params).then(res => {
      //console.log(res);
      res.data.data.typeList.forEach(item => {
        item["text"] = item.typeName;
        item["value"] = item.typeId;
      });
      //console.log(res.data.data.typeList);
      this.typeList = res.data.data.typeList;
    });

    this.onList();
  },
  created() {
    const that = this;
    if (process.client) {
      window.onscroll = function() {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // 页面高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // 总共的高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          //console.log(that.page, that.Maxpage);
          if (that.page < that.maxPage) {
            that.page++;
            that.onList();
          }
        }
      };
    }
  },
  methods: {
    OnType() {
      //console.log(this.value, this.value1, 123);
      this.page = "1";
      this.agentList = [];
      this.onList();
    },
    // 列表
    onList() {
      let params = {
        page: this.page,
        pageSize: "10",
        typeId: this.value1,
        title: this.value
      };
      this.$api.article.WikigetList(params).then(res => {
        //console.log(res.data.data.agentList);
        if (res.data.data.agentList.length != 0) {
          this.agentList.push(...res.data.data.agentList);
        } else {
          this.agentList = res.data.data.agentList;
        }
        this.Maxpage = res.data.data.Maxpage;
        //console.log(this.agentList);
      });
    },
    onclick(value) {
      this.$router.push({ path: "/article", query: { id: value } });
      //console.log(value);
    }
  }
};
</script>
<style lang="scss">
.pedia {
  display: flex;
  margin-left: 0.12rem;
  .el-input-group {
    width: 54%;
  }
  .el-input-group__append {
    font-size: 0.15rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    background: rgba(77, 109, 218, 1);
  }
  .el-input__inner {
    height: 0.36rem;
    box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.11);
    color: rgba(88, 88, 88, 1);
    font-size: 0.16rem;
  }
}
.select_type {
  .el-input {
    width: 88%;
  }
  .el-input__inner {
    box-shadow: none;
    border: none;
  }
}
</style>
<style lang="scss" scoped>
div {
  font-size: 16px;
}
.year {
  // width:0.51rem;
  padding: 0 0.1rem;
  height: 0.24rem;
  background: rgba(35, 76, 211, 1);
  border-radius: 0px 0px 0px 13px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  top: 0rem;
  right: 0;
}
.flex_size {
  display: flex;
}
//   .van-dropdown-menu{
//     height:.26rem;
//     background:rgba(236,236,236,1);
//     margin-right: .08rem;
//     font-size:.14rem;
//   }
.conter {
  height: 0.34rem;
  font-size: 0.12rem;
  color: rgba(55, 55, 55, 1);
  line-height: 0.2rem;
}
.order_title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
}
.sorter {
  font-size: 0.13rem;
  color: rgba(35, 76, 211, 1);
  line-height: 0.18rem;
  float: right;
}
.list {
  font-size: 0.15rem;
  width: 100%;
  height: 1.5rem;
}
.list li {
  float: left;
  text-align: center;
  width: 33.33%;
  margin-bottom: 0.05rem;
}
.list_img {
  width: 0.49rem;
  height: 0.5rem;
}

.title {
  font-size: 0.2rem;
  font-weight: 600;
  line-height: 0.28rem;
}
.watch {
  font-size: 0.13rem;
  color: rgba(35, 76, 211, 1);
  line-height: 0.18rem;
  float: right;
}
.detail {
  font-size: 0.13rem;
  color: rgba(126, 126, 126, 0.76);
  line-height: 0.18rem;
}
.newhouse {
  margin: 0 0.12rem;
  padding-bottom: 0.1rem;
}
.text {
  width: 100%;
  overflow: hidden;
}
.text_title {
  width: 100%;
  height: 0.34rem;
  overflow: hidden;
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(80, 80, 80, 1);
  line-height: 0.18rem;
  text-shadow: 0px 0.02rem 0.03rem rgba(255, 255, 255, 0.5);
}
.new_img {
  width: 100%;
  height: 2.25rem;
}
.img {
  width: 100%;
  height: 2.25rem;
  position: relative;
  margin-right: 0.11rem;
}
.image {
  width: 1.44rem;
  margin-right: 0.11rem;
}
.new_list {
  margin-bottom: 0.2rem;
}
// .new_list li>div{
//    // display: flex;
//  //   padding-top: 0.11rem;
// }
// .flex{
//  padding-top: 0.11rem;
// }
.text p {
  padding-bottom: 0.04rem;
}
.hr {
  border: none;
  height: 1px;
  background-color: #ececec;
}
.list-img {
  width: 0.28rem;
  height: 0.28rem;
}
.list-font {
  height: 0.22rem;
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(5, 5, 5, 1);
  line-height: 0.22rem;
  position: relative;
  bottom: 0.08rem;
}
.list_li {
  margin: 0.1rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(151, 151, 151, 1);
  padding-bottom: 0.1rem;
}
.van-popup {
  height: 1rem;
}
.section {
  padding: 0.1rem;
}
.van-slider {
  margin: 0 0.15rem;
}
.asd {
  padding-bottom: 0.3rem !important;
}
.image > span,
.font > span {
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
}
.image,
.font {
  margin-top: 0.09rem;
}
</style>
