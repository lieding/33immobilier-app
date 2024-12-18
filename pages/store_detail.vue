<template>
  <div class="store-detail-page">
    <div class="top-section desktop-placed-center">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/pc_index' }">{{ $t("message.global.HOME") }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t("message.global.STORE") }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="desktop-placed-center" v-if="loading">
      <detail-skeleton />
    </div>
    <template v-else>
      <div class="page-title desktop-placed-center">
        {{ detail.title }}
      </div>
      <div class="desktop-placed-center flex">
        <div class="left-body">
          <div class="slideshow">
            <el-carousel :interval="5000" height="400px" arrow="always">
              <el-carousel-item
                v-for="(item, i) in detail.images"
                :key="i"
              >
                <div
                  class="lunbotu"
                  v-bind:style="{ 'background-image': 'url(' + item + ')' }"
                  @click="galleryIndex = i"
                ></div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right-body">
          <div class="content-package">
            <p class="info-row">
              <span>{{ detail.addressInfo }}</span>
            </p>
            <p class="pricing" style="font-size: 24px;">
              {{ fmoney(detail.price) }}€
            </p>
            <p class="info-row" v-if="detail.lower_price && detail.upper_price">
              {{ $t("message.global.ESTIMATED_PRICE_RANGE") }}：
              <span>{{ fmoney(detail.lower_price) }}€ - {{ fmoney(detail.upper_price) }}€</span>
            </p>
            <p class="info-row">
              {{ $t("message.global.SURFACE") }}：
              <span>{{ detail.surface }}m²</span>
            </p>
            <p class="info-row">
              {{ $t("message.PAGE_STORE.CATEGORY") }}：
              <span>{{ detail.translatedCategory }}</span>
            </p>
            <p class="info-row" v-if="detail.revenu">
              {{ $t("message.PAGE_STORE.REVENU") }}：
              <span>{{ detail.revenu }}</span>
            </p>
            <p class="info-row" v-if="detail.rent">
              {{ $t("message.global.ESTIMATED_MONTHLY_RENT") }}：
              <span>{{ detail.rent }}€</span>
            </p>
            <p class="info-row">
              <el-button type="primary" @click="propertyItemClickhandler">{{ $t('message.global.CONTACT_US') }}</el-button>
            </p>
          </div>
        </div>
      </div>
      <div class="desktop-placed-center content-section">
        <p class="title">
          {{ $t("message.global.DESCRIPTION") }}
        </p>
        <p class="description">
          <div v-html="detail.description"></div>
        </p>
      </div>
    </template>
    <div class="desktop-placed-center">
      <calculator />
    </div>
    <client-only>
      <gallery
        :images="detail.picList"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>
      <contact-dialog
        :visible="contactDialogVisible"
        :titles="contactDialogTitles"
        :confirm-btn-loading="postApplicationLoading"
        @close="contactDialogVisible = false"
        @confirm="contactFormConfirmHandler"
      />
    </client-only>
  </div>
</template>

<script lang="js">
import Calculator from "~/components/desktop/calculator.vue";
import ContactDialog from '../components/desktop/ContactDialog.vue';
import DetailSkeleton from '../components/desktop/detailSkeleton.vue';
import { fmoney } from '../utils';
import { PostApplicationMode } from '../common/config';
import { extractProperty, queryDetail } from '../utils/store';

export default {
  middleware: "responsive",
  components: {
    Calculator, ContactDialog, DetailSkeleton
  },
  head() {
    const { title } = this.$route.query;
    return {
      title,
      meta: [
        { name: "description", content: title },
        { name: "keywords", content: title },
      ]
    };
  },
  data() {
    return {
      loading: false,
      galleryIndex: null,
      detail: {},
      contactDialogVisible: false,
      contactDialogTitles: [],
      postApplicationLoading: false,
    };
  },
  created () {
    this.fmoney = fmoney;
  },
  mounted () {
    if (process.client) this.queryDetail();
  },
  methods: {
    async queryDetail () {
      const lang = this._i18n.locale;
      const { department_id, id } = this.$route.query;
      this.loading = true;
      try {
        await queryDetail(this, department_id, id, lang);
      } catch (e) {
        console.error('query detail: ', e);
      } finally {
        this.loading = false;
      }
    },
    propertyItemClickhandler () {
      this.contactDialogTitles = extractProperty.call(this, this.detail);
      this.contactDialogVisible = true;
    },
    contactFormConfirmHandler (contact) {
      const { id, link } = this.detail ?? {};
      if (!id || !link) return;
      this.postApplicationLoading = true;
      const lang = this._i18n.locale;
      this.$api.article.postApplication({ mode: PostApplicationMode.STORE, lang, contact, id, link })
        .then(() => {
          this.contactDialogVisible = false;
          this.$notify({ title: 'Success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS'), type: 'success' });
        })
        .catch(console.error)
        .finally(() => this.postApplicationLoading = false);
    }
  }
}
</script>

<style lang="scss" scoped>
.store-detail-page {}
// 轮播图
.lunbotu {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.top-section {
  padding-bottom: 12px;
  .breadcrumb {
    padding-top: 10px;
  }
}
.page-title {
  color: #000;
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
  margin-top: 16px;
  margin-bottom: 30px;
}
// 左侧主题
.left-body {
  width: 710px;
  // 轮播图
  .slideshow {
    text-align: center;
    .el-carousel__item img {
      height: 404px;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
.right-body {
  width: 455px;
  height: 404px;
  .content-package {
    box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
    padding: 9px 20px;
    height: inherit;
    box-sizing: border-box;
    .pricing {
      font-weight: 600;
      color: #ff5e5e;
    }
    .block {
      margin-top: 4px;
      span {
        display: inline-block;
        color: #fff;
        margin-right: 8px;
      }
    }
  }
  .info-row {
    margin-top: 6px;
    color: #2746d1;
    font-weight: 600;
    font-size: 16px;
    span {
      color: #000000;
    }
  }
}
.content-section {
  margin-top: 16px;
  margin-bottom: 16px;
  .title {
    font-size: 32px;
    margin-right: 10px;
  }
  .description {
    margin-top: 10px;
    margin-bottom: 10px;
    white-space: pre-line;
  }
}
</style>
