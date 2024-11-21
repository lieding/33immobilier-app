<template>
  <div>
    <client-only>
      <Header :title="$t('message.global.encyclopedia')" />
      <div class="center">
        <p class="title">{{ data.title }}</p>
        <p class="time">
          <span>{{ $t("message.global.author") }}:{{ data.nickName }}</span>
          <span
            >{{ $t("message.global.releaseTime") }}:{{ data.createTime }}</span
          >
        </p>
        <div ref="contentWrapper"></div>
        <hr class="hr" />
        <div class="box">
          <p class="box_title">{{ $t("message.global.category") }}</p>
          <ul class="box_list">
            <li
              v-for="(item, index) in typeList"
              :key="index"
              @click="onType(item.typeId)"
            >
              <span class="box_dot">.</span>
              {{ item.typeName }}
            </li>
          </ul>
        </div>
        <div class="box">
          <p class="box_title">{{ $t("message.global.zuixinxiaoxi") }}</p>
          <ul class="box_list">
            <li
              v-for="(items, index) in lately"
              :key="index"
              @click="onLately(items.id)"
            >
              <span class="box_dot">.</span>
              {{ items.title }}
            </li>
          </ul>
        </div>
      </div>
      <div style="height:.15rem"></div>
      <Footer />
    </client-only>
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/Mindex/header.vue";
import Footer from "~/components/Mindex/footer.vue";
export default {
  middleware: "responsive",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      id: this.$route.query.id, //文章id
      data: "",
      typeList: [],
      lately: []
    };
  },
  head() {
    return {
      title: `${this.data.title}`,
      meta: [
        {
          name: "description",
          content: `${this.data.title}`
        },
        {
          name: "keywords",
          content: `${this.data.title}`
        },
        {
          name: "og:image",
          content: this.data.picUrl
        }
      ]
    };
  },
  mounted() {
    rem();
    this.$api.article.WikigetRigth().then(res => {
      this.typeList = res.data.data.typeList;
      this.lately = res.data.data.latelyList;
    });
    this.WikigetInfo();
  },
  methods: {
    WikigetInfo() {
      let params = { id: this.id };
      this.$api.article.WikigetInfo(params).then(res => {
        if (res.data?.code) return;
        this.data = res.data.data;
        this.loadRemoteHTML();
      });
    },
    onLately(value) {
      this.id = value;
      this.WikigetInfo();
      if (process.client) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    onType(value) {
      this.$router.push({ path: "/blogs", query: { id: value } });
    },
    loadRemoteHTML () {
      const fileURL = this.data?.content;
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
div {
  font-size: 16px;
}
.center {
  padding: 0.12rem;
}
.title {
  font-size: 0.18rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 0.2rem;
}
.time {
  height: 0.19rem;
  font-size: 0.12rem;
  font-weight: 300;
  color: rgba(135, 135, 135, 1);
  line-height: 0.16rem;
  span {
    margin-right: 0.1rem;
  }
}
.box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
  margin-top: 0.2rem;
  padding: 0.1rem;
}
.box_title {
  font-size: 0.18rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 0.25rem;
  padding: 0.1rem;
}
.box_dot {
  float: left;
  font-size: 0.3rem;
  line-height: 0.3rem;
  color: #234cd3;
}
.box_list {
  padding: 0 0.1rem;
}
.box_list li {
  background: rgba(240, 240, 240, 1);
  line-height: 0.45rem;
  margin-bottom: 0.05rem;
  padding: 0 0.2rem;
  color: #234cd3;
}
.hr {
  border: none;
  height: 0.01rem;
  background-color: #979797;
}
.text {
  font-size: 0.12rem;
  font-weight: 300;
  line-height: 0.3rem;
  text-align: center;
  padding: 0 0.1rem;
}
</style>
