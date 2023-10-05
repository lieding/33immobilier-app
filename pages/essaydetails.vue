<template>
  <div class="encyclopedia">
    <headers :class="{ colors: flag }"></headers>
    <div v-wechat-title="outcome.title"></div>
    <div class="centerS seconBrok">
      <div class="headline">
        <span>主页</span> /
        <span>百科</span>
      </div>
      <div class="oductions">{{ outcome.title }}</div>
      <div class="Maindivmain" style="overflow:hidden">
        <p>作者：{{ outcome.nickName }} 发布时间: {{ outcome.createTime }}</p>

        <div class="topicofthearticle">
          <div ref="contentWrapper"></div>
        </div>
        <div class="topIright">
          <div
            style="width:351px;height:auto;padding-bottom:20px;background-color:#fff;box-shadow:0px 2px 26px 0px rgba(0,0,0,0.11);float:right;"
          >
            <p style="padding: 12px;">{{ $t("message.global.category") }}</p>
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
              {{ item.typeName }}
            </p>
          </div>
          <br />
          <br />
          <br />
          <div
            style="width:351px;height:285px;background-color:#fff;box-shadow:0px 2px 26px 0px rgba(0,0,0,0.11);float:right;"
          >
            <p style="padding: 12px;">
              {{ $t("message.global.zuixinxiaoxi") }}
            </p>
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
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <foots></foots>
  </div>
</template>

<script>
import headers from "~components/pcindex/header.vue";
import foots from "~components/pcindex/foot.vue";

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
      title: `${this.outcome.title}`,
      meta: [
        {
          name: "description",
          content: `${this.outcome.title}`
        },
        {
          name: "keywords",
          content: `${this.outcome.title}`
        },
        {
          name: "og:image",
          content: this.outcome.picUrl
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
  async asyncData({ route, app }) {
    try {
      const { flag: id } = route.query;
      const getInfoInfo = (await app.$api.article.getInfoLis({ id })).data;
      return {
        outcome: getInfoInfo.data
      };
    } catch {
      return {};
    }
  },
  created() {
    this.getRight();
  },
  mounted () {
    this.loadRemoteHTML();
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
    async getRight() {
      const getRigthLitInfo = (await this.$api.article.WikigetRigth()).data;
      if (getRigthLitInfo.code == 0) {
        this.category = getRigthLitInfo.data.typeList;
        this.abc = getRigthLitInfo.data.latelyList;
      }
    },
    loadRemoteHTML () {
      const fileURL = this.outcome?.content;
      const wrapper = this.$refs.contentWrapper;
      if (!wrapper || !fileURL) return;
      fetch(fileURL)
        .then(res => res.text())
        .then(content => wrapper.innerHTML = content);
    }
  }
};
</script>

<style lang="scss" scoped>
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
