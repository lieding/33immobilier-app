<template>
  <div>
    <div>
      <div class="images" @click="swipeDialogVis = true">
        <van-swipe
          :autoplay="3000"
          @change="imageSwipeChangeHandler"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(image, index) in picList" :key="index">
            <img :src="image" @click="galleryIndex = i" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="second-info-row-detail">
      <p class="detail-title">{{ detail.title }}</p>
      <p class="detail-region">{{ detail.zip_code }} / {{ detail.city }}</p>
      <p class="price">{{ fmoney(detail.price) }}€</p>
      <p class="info-row">
        <span class="grey-color">{{ $t("message.global.LOCATION") }} ：</span>
        {{ detail.zip_code }} / {{ detail.city }}
      </p>
      <p class="info-row">
        <span class="grey-color">{{ $t("message.PAGE_SECOND_HAND.AGENT") }} ：</span>
        {{ detail.agent }}
      </p>
      <p class="info-row">
        <span class="grey-color">{{ $t("message.global.SURFACE") }} ：</span>
        {{ detail.surface }}m²
      </p>
      <p class="info-row">
        {{ $t("message.PAGE_SECOND_HAND.PIECE") }}：
        <span>{{ detail.piece }}</span>
      </p>
      <p class="info-row">
        {{ $t("message.PAGE_SECOND_HAND.CHAMBRE") }}：
        <span>{{ detail.chambre }}</span>
      </p>
      <p class="info-row">
        {{ $t("message.PAGE_SECOND_HAND.CLASS_LEVEL") }}：
        <span>{{ detail.translated_class_level }}</span>
      </p>
    </div>
    <hr class="hr" />
    <!-- 介绍 -->
    <div class="section pack">
      <div class="top">
        <div>
          <span class="section-title">{{ $t("message.global.DESCRIPTION") }}</span>
        </div>
      </div>
      <div
        :class="displayMoreDesc ? 'synopsisno' : 'synopsis'"
        style="white-space:pre-line;"
        v-html="detail.description"
      ></div>
      <div>
        <span class="pack-up" @click="toggleDisplayMore">
          {{ displayMoreDesc ? $t("message.global.seeMore") : $t("message.global.SEE_LESS") }}
        </span>
      </div>
    </div>
    <hr class="hr" />
    <div class="section">
      <van-button round block type="info" @click="btnClickHandler">{{ $t('message.global.CONTACT_US') }}</van-button>
    </div>
    <hr class="hr" />
    <div style="margin: 0 .1rem;">
      <Calculator />
    </div>
    <client-only>
      <gallery
        :images="picList"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>
      <contact-popup
        :visible="contactPopupVis"
        :titles="contactPopupTitles"
        :confirm-btn-loading="contactPopupBtnLoading"
        @close="contactPopupVis = false"
        @confirm="contactConfirmHandler"
      />
      <loading-dialog :visible="loading" :loading-text="$t('message.global.LOADING')" />
    </client-only>
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import Calculator from '../components/Mindex/calculator.vue';
import ContactPopup from '../components/Mindex/contactPopup.vue';
import LoadingDialog from '../components/Mindex/loadingDialog.vue';
import { fmoney } from '../utils'
import { extractSecondHandProperty, PostApplicationMode } from '../common/config';

export default {
  name: '',
  middleware: "responsive",
  components: { Calculator, ContactPopup, LoadingDialog },
  head () {
    const { title, city } = this.$route.query;
    return {
      title: `${title} (${city})`,
      meta: [
        {
          name: "description",
          content: `${title} (${city})`
        },
        {
          name: "keywords",
          content: `法国新房,法国楼盘,买房投资,买房减税,PINEL减税,LMNP减税,VEFA,Logement neuf,${title}`
        },
      ]
    };
  },
  data () {
    return {
      loading: false,
      detail: {},
      swipeDialogVis: false,
      picList: [], //图片集合
      displayMoreDesc: true,
      swipeIdx: 0,
      galleryIndex: null,
      contactPopupVis: false,
      contactPopupTitles: [],
      contactPopupBtnLoading: false,
    }
  },
  created () {
    this.fmoney = fmoney;
  },
  mounted(){
    rem();
    if (process.client) this.queryDetail();
  },
  methods: {
    async queryDetail () {
      this.loading = true;
      const lang = this._i18n.locale;
      const { zip_code, id } = this.$route.query;
      try {
        const res = await this.$api.article.getSecondHandDetail({ zip_code, id, lang });
        const detail = res.data;
        if (!detail) return;
        const classLevel = detail.class_level;
        detail.translated_class_level = classLevel ?
          this.$t(`message.PAGE_SECOND_HAND.CLASS_LEVEL_LIST.${classLevel.replaceAll('-', '_')}`) : '';
        this.detail = detail;
        this.picList = Array.isArray(detail.images) ? detail.images : [];
      } catch (e) {
        console.error('query detail: ', e);
      } finally {
        this.loading = false;
      }
    },
    imageSwipeChangeHandler(index) {
      this.swipeIdx = index;
    },
    toggleDisplayMore() {
      this.displayMoreDesc = !this.displayMoreDesc;
    },
    btnClickHandler () {
      this.contactPopupTitles = extractSecondHandProperty.call(this, this.detail);
      this.contactPopupVis = true;
    },
    contactConfirmHandler (contact) {
      const { zip_code: programeId, id: propertyId } = this.detail ?? {};
      if (!programeId || !propertyId) return;
      const lang = this._i18n.locale;
      this.contactPopupBtnLoading = true;
      this.$api.article.postApplication({ mode: PostApplicationMode.SECOND_HAND, lang, contact, programeId, propertyId })
        .then(() => {
          this.contactPopupVis = false;
          Notify({ type: 'success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS') });
        })
        .catch(console.error)
        .finally(() => this.contactPopupBtnLoading = false);
    },
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  img {
    width: 100%;
  }
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
div {
  font-size: 16px;
}
.pack {
  padding: 0.1rem;
  div {
    .pack-up {
      float: right;
      font-size: 0.13rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(35, 76, 211, 1);
      line-height: 0.18rem;
    }
  }
}

.images {
  height: 2.14rem;
  position: relative;
  img {
    height: 2.14rem;
    width: 100%;
  }
}
.hr {
  border: none;
  height: 1px;
  margin: 0.12rem 0;
  background-color: #ececec;
}
th,
td {
  border: none !important;
}
.van-button--large {
  width: 92%;
  margin-left: 0.1rem;
  margin-bottom: 0.3rem;
  background: rgba(35, 76, 211, 1);
}
.second-info-row-detail {
  position: relative;
  margin-left: 0.12rem;
  .detail-title {
    width: 70%;
    font-size: 0.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 0.28rem;
    margin: 0.07rem 0 0.03rem;
  }
  .detail-region {
    height: 0.17rem;
    font-size: 0.12rem;
    color: rgba(177, 177, 177, 1);
    line-height: 0.17rem;
    margin-bottom: 0.11rem;
  }
}
.tax {
  height: 0.26rem;
  background: rgba(106, 192, 120, 1);
}
.check {
  height: 0.26rem;
  background: rgba(35, 76, 211, 1);
}
.itemize {
  height: 0.18rem;
  background: rgba(191, 191, 191, 1);
}

.item > span {
  margin-right: 0.08rem;
}
.font {
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  display: inline-block;
  padding: 0 0.05rem;
  line-height: 0.26rem;
}
.font1 {
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.16rem;
  display: inline-block;
  padding: 0 0.05rem;
  line-height: 0.18rem;
}
.price {
  height: 0.28rem;
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
  line-height: 0.28rem;
  padding: 0.13rem 0 0.1rem 0;
}
.info-row {
  font-size: 0.14rem;
  font-weight: 600;
  span {
    font-size: .16rem;
  }
}
.grey-color {
  color: rgba(186, 186, 186, 1);
}
.section-title {
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.76);
  margin-right: 0.1rem;
}
.section {
  margin: 0 0.12rem;
  .download {
    img {
      width: 16px;
    }
  }
  .synopsis {
    margin: 0.1rem 0;
    font-size: 0.13rem;
    color: rgba(70, 70, 70, 1);
    line-height: 0.18rem;
    overflow: hidden;
  }
  .synopsisno {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    margin: 0.1rem 0;
    font-size: 0.13rem;
    color: rgba(70, 70, 70, 1);
    line-height: 0.18rem;
    overflow: hidden;
  }
  // 楼盘位置
  .province {
    font-size: 0.12rem;
    color: rgba(177, 177, 177, 1);
    line-height: 0.17rem;
  }
  .map {
    height: 3rem;
    width: 100%;
    margin-top: 0.05rem;
  }
  .swipe {
    margin-top: 0.05rem;
    white-space: nowrap; //阻止文本换行
    overflow: auto; //设置溢出可滚动
    div {
      width: 1.68rem;
      display: inline-block; //设置属性（元素间不换行）
      box-shadow: 0px 1px 18px 0px rgba(0, 0, 0, 0.11);
      padding: 0.1rem;
      margin: 0.08rem;
    }
  }
  .relation {
    text-align: center;
    height: 0.18rem;
    font-size: 0.13rem;
    color: rgba(34, 75, 215, 1);
    line-height: 0.18rem;
  }
  .money {
    padding-left: 0.2rem;
    font-weight: 500;
    color: rgba(255, 94, 94, 1);
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    span {
      display: inline-block;
    }
  }
}
</style>
<style lang="scss">
.el-dialog__wrapper dialog {
  background: #2a2a2a;
}
.dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog {
    width: 100%;
    background: none;
  }
  .van-swipe {
    top: 16%;
  }
}
.drug {
  .van-field__label {
    font-size: 0.12rem;
    color: rgba(167, 167, 167, 1);
    line-height: 0.23rem;
  }
}
</style>
