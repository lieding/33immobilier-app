<template>
  <div>
    <Header :title="$t('message.global.relation')" />
    <div>
      <img src="~/assets/image/content.png" alt class="img" />
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
              v-model="ipt2"
              oninput="value=value.replace(/[^\d]/g,'')"
              :placeholder="$t('message.global.YourPhone')"
              left-icon="phone-o"
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              v-model="ipt3"
              :placeholder="$t('message.global.YourMessage')"
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
        <van-button type="primary" class="btn" @click="OncontactUs">
          {{ $t("message.global.woyaotiwen") }}
        </van-button>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import Header from "~/components/mIndex/head.vue";
import Footer from "~/components/mIndex/footer.vue";
export default {
  name: "",
  middleware: "responsive",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      id: this.$route.query.id,
      apartmentId: this.$route.query.apartmentId,
      ipt1: "", //您的姓名
      ipt2: "", //您的电话
      ipt3: "", //您的邮箱
      ipt4: "" //您的信息
    };
  },
  mounted() {
    rem();
  },
  methods: {
    // 联系我们
    OncontactUs() {
      //console.log(this.ipt4)
      let params = {
        email: this.ipt3,
        phone: this.ipt2,
        content: this.ipt4,
        userName: this.ipt1,
        id: this.id,
        apartmentId: this.apartmentId,
        type: 3
      };
      this.$api.article.SendEmaila(params).then(res => {
        this.$toast(res.data.msg);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
div {
  font-size: 16px;
}
img {
  width: 100%;
  height: 1.78rem;
}
.quiz {
  padding: 0.11rem 0.15rem 0.09rem 0.04rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0.01rem 0.18rem 0px rgba(0, 0, 0, 0.11);
  height: 2.3rem;

  .drug {
    .van-cell-group {
      height: 0.28rem;
    }
    .van-cell {
      padding: 0.03rem 0.1rem;
    }
  }
  .van-field__label {
    font-size: 0.12rem;
    color: rgba(167, 167, 167, 1);
    line-height: 0.23rem;
  }
  .van-field__control {
    font-size: 0.12rem;
    color: rgba(167, 167, 167, 1);
    line-height: 0.23rem;
  }
  .van-cell-group {
    height: 0.59rem;
    margin: 0.07rem 0.11rem;
    background: rgba(240, 240, 240, 1);
  }
  .van-cell {
    background: none;
  }
  .btn {
    margin: 0.03rem 0.11rem;
    padding: 0 0.5rem;
    float: right;
  }
}
</style>
