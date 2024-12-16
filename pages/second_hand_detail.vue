<template>
  <div class="second-hand-detail-page">
    <div class="top-section desktop-placed-center">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/pc_index' }">{{ $t("message.global.HOME") }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t("message.global.SECOND_HAND_COLLECTION") }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="title">
        {{ detail.title }}
      </div>
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
          <p class="prises">
            {{ fmoney(detail.price) }}€
          </p>
          <p class="info-row">
            {{ $t("message.PAGE_SECOND_HAND.AGENT") }}：
            <span>{{ detail.agent }}</span>
          </p>
          <p class="info-row">
            {{ $t("message.global.SURFACE") }}：
            <span>{{ detail.surface }}m²</span>
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
            {{ $t("message.global.LOCATED_CITY") }}：
            <span>{{ detail.zip_code }} / {{detail.city}}</span>
          </p>
          <p class="info-row">
            {{ $t("message.PAGE_SECOND_HAND.CLASS_LEVEL") }}：
            <span>{{ detail.translated_class_level }}</span>
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

<script>
import Calculator from "~/components/desktop/calculator.vue";
import ContactDialog from '../components/desktop/ContactDialog.vue';
import { fmoney } from '../utils';
import { extractSecondHandProperty, PostApplicationMode } from '../common/config';

export default {
  name: "secondHandDetail",
  middleware: "responsive",
  components: {
    Calculator, ContactDialog,
  },
  head() {
    const { title, zip_code } = this.$route.query;
    return {
      title,
      meta: [
        {
          name: "description",
          content: `${title} (${zip_code})`
        },
        {
          name: "keywords",
          content: `${title},${zip_code}`
        },
      ]
    };
  },
  data() {
    return {
      galleryIndex: null,
      detail: {},
      contactDialogVisible: false,
      contactDialogTitles: [],
      postApplicationLoading: false,
    };
  },
  created() {
    this.fmoney = fmoney;
  },
  mounted () {
    if (process.client) this.queryDetail();
  },
  methods: {
    async queryDetail () {
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
      } catch (e) {
        console.error('query detail: ', e);
      }
    },
    propertyItemClickhandler () {
      this.contactDialogTitles = extractSecondHandProperty.call(this, this.detail);
      this.contactDialogVisible = true;
    },
    contactFormConfirmHandler (contact) {
      const { zip_code: programeId, id: propertyId } = this.detail ?? {};
      if (!programeId || !propertyId) return;
      this.postApplicationLoading = true;
      const lang = this._i18n.locale;
      this.$api.article.postApplication({ mode: PostApplicationMode.SECOND_HAND, lang, contact, programeId, propertyId })
        .then(() => {
          this.contactDialogVisible = false;
          this.$notify({ title: 'Success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS'), type: 'success' });
        })
        .catch(console.error)
        .finally(() => this.postApplicationLoading = false);
    }
  }
};
</script>

<style lang="scss" scoped>
.second-hand-detail-page {}
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
  .title {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    margin: 16px 0 30px;
  }
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
    .prises {
      font-size: 26px;
      font-weight: 600;
      color: #ff5e5e;
      display: inline-block;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
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
