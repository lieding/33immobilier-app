<template>
  <div>
  <client-only>
    <div v-if="fromSearchPage" class="to-list flex align-center" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
      <span>{{ $t('message.global.RETURN_TO_LIST') }}</span>
    </div>
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
      <p class="detail-location">{{ detail.zip_code }} / {{ detail.city }}</p>
      <p class="price">{{ fmoney(detail.price) }}€</p>
      <p class="info-row">
        <span class="grey">{{ $t("message.global.LOCATED_CITY") }} ：</span>
        {{ detail.zip_code }} / {{ detail.city }}
      </p>
      <p class="info-row">
        <span class="grey">{{ $t("message.PAGE_SECOND_HAND.AGENT") }} ：</span>
        {{ detail.agent }}
      </p>
      <p class="info-row">
        <span class="grey">{{ $t("message.global.SURFACE") }} ：</span>
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
          <span class="section-title">{{ $t("message.global.PROPERTY_DESCRIPTION") }}</span>
        </div>
      </div>
      <div
        :class="displayMoreDesc ? 'synopsisno' : 'synopsis'"
        style="white-space:pre-line;"
        v-html="detail.description"
      ></div>
      <div>
        <span class="pack-up" @click="toggleDisplayMore">
          {{ displayMoreDesc ? $t("message.global.SEE_MORE") : $t("message.global.SEE_LESS") }}
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
  </client-only>
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import Calculator from '../components/mobile/calculator.vue';
import ContactPopup from '../components/mobile/contactPopup.vue';
import LoadingDialog from '../components/mobile/loadingDialog.vue';
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
      fromSearchPage: false,
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
  mounted () {
    if (!process.client) return;
    rem();
    this.queryDetail();
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
      this.$api.article.postApplication({ mode: PostApplicationMode.SECOND_HAND, lang, contact, programeId, propertyId, selfLink: location.href })
        .then(() => {
          this.contactPopupVis = false;
          Notify({ type: 'success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS') });
        })
        .catch(console.error)
        .finally(() => this.contactPopupBtnLoading = false);
    },
  },
  beforeRouteEnter (to, from, next) {
    let fromSearchPage = undefined;
    if (from.path.includes('search')) {
      fromSearchPage = true;
    }
    next(vm => vm.fromSearchPage = fromSearchPage);
  }
}
</script>

<style lang="scss" scoped>
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
  .detail-location {
    height: 0.17rem;
    font-size: 0.12rem;
    color: rgba(177, 177, 177, 1);
    line-height: 0.17rem;
    margin-bottom: 0.11rem;
  }
}
.price {
  height: 0.28rem;
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
  line-height: 0.28rem;
  padding: 0.13rem 0 0.1rem 0;
}
.to-list {
  margin: .1rem 0;
}
.info-row {
  font-size: 0.14rem;
  font-weight: 600;
  span {
    font-size: .16rem;
  }
}
.section-title {
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.76);
  margin-right: 0.1rem;
}
.section {
  margin: 0 0.12rem;
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
