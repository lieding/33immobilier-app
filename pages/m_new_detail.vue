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
    <div class="programe-detail">
      <p class="detail-title">{{ programeDetail.estate_name }}</p>
      <div class="detail-region flex justify-between">
        <span class="inline-block">{{ programeDetail.zip_code }} / {{ programeDetail.city }}</span>
        <div class="whatsapp-btn pointer flex align-center" @click="directContact">
          <img src="/whatsapp.svg" />
          <span class="inline-block txt white bold">{{ $t('message.global.CONTACT_US') }}</span>
        </div>
      </div>
      <p class="item">
        <van-tag type="primary" size="large" v-if="programeDetail.deliveryQuarter">
          {{ programeDetail.deliveryQuarter }}
        </van-tag>
        <van-tag type="primary" size="medium" v-for="(it) in translatedTypologies" :key="it" plain>{{ it }}</van-tag>
      </p>
      <p class="price">{{ fmoney(programeDetail.availablePropertiesMinPrice) }}€ - {{ fmoney(programeDetail.availablePropertiesMaxPrice) }}€</p>
      <p class="info-row">
        <span class="grey">{{ $t("message.global.DELIVERY_DATE") }} ：</span>
        {{ programeDetail.deliveryQuarter }}
      </p>
      <p class="info-row">
        <span class="grey">{{ $t("message.global.PROPERTIES_COUNT") }} ：</span>
        {{ programeDetail.availablePropertiesCount }}
      </p>
      <p class="info-row">
        <span class="grey">{{ $t("message.global.TAX_CUTS") }} ：</span>
        {{ translatedLaws }}
      </p>
      <p class="info-row">
        <span class="grey">{{ $t("message.global.TAX_AREA") }} ：</span>
        {{ translatedTaxArea }}
      </p>
      <p class="info-row">
        <span class="grey">{{ $t("message.global.LOCATED_CITY") }} ：</span>
        {{ programeDetail.zip_code }} / {{ programeDetail.city }}
      </p>
    </div>
    <hr class="hr" />
    <!-- 楼盘介绍 -->
    <div class="section pack">
      <div class="top">
        <div>
          <span class="section-title">{{ $t("message.global.PROGRAME_DESC") }}</span>
        </div>
      </div>
      <div
        :class="displayMoreDesc ? 'synopsisno' : 'synopsis'"
        style="white-space:pre-line;"
        v-html="programeDetail.description"
      ></div>
      <div>
        <span class="pack-up" @click="toggleDisplayMore">
          {{ displayMoreDesc ? $t("message.global.SEE_MORE") : $t("message.global.SEE_LESS") }}
        </span>
      </div>
    </div>
    <hr class="hr" />
    <!-- 楼盘位置 -->
    <div class="section">
      <div class="flex justify-between">
        <span class="section-title">{{ $t("message.global.PROGRAM_POSITION") }}</span>
        <div class="download-btn white bold" @click="directContact">
          <i class="el-icon-download" />
          {{ $t('message.PROGRAME_DETAIL.DOWNLOAD_BROCHURE_BTN') }}
        </div>
      </div>
      <p class="address">{{ programeDetail.address }}</p>
      <div class="map">
        <jump-map
          v-if="programeDetail.latitude && programeDetail.longitude"
          :latitude="programeDetail.latitude"
          :longitude="programeDetail.longitude"
          :interactive="false"
          :need-circle="true"
          :need-center-logo="true"
        ></jump-map>
      </div>
    </div>
    <hr class="hr" />
    <!-- 户型详情 -->
    <div class="section" v-show="properties.length != 0">
      <span class="section-title">{{ $t("message.global.PROPERTY_DETAILS") }}</span>
      <div class="swipe">
        <div v-for="(info, index) in properties" :key="index" @click="propertyClickHandler(info)">
          <p class="info-row">
            <span class="grey">{{ $t("message.global.NEW_PROGRAME_ID") }} ：</span>
            {{ info.number }}
          </p>
          <p class="info-row">
            <span class="grey">{{ $t("message.global.APARTMENT_TYPE") }} ：</span>
            {{ info.translatedTypology }}
          </p>
          <p class="info-row">
            <span class="grey">{{ $t("message.global.USABLE_AREA") }} ：</span>
            {{ info.surface }}m²
          </p>
          <p class="info-row">
            <span class="grey">{{ $t("message.global.FLOOR") }} ：</span>
            {{ info.floor }}
          </p>
          <p class="info-row">
            <span class="grey">{{ $t("message.global.PRICE") }} ：</span>
            {{ fmoney(info.price) }}€
          </p>
          <p class="info-row">
            <span class="grey">{{ $t("message.global.RATE_OF_RETURN") }} ：</span>
            {{ info.profitability ? (info.profitability + '%') : '' }}
          </p>
        </div>
      </div>
      <hr class="hr" />
    </div>
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
import { Notify } from 'vant';
import JumpMap from '~/components/jumpMap.vue';
import { TypologyOptionConfig, extractProgramProperty, PostApplicationMode } from '../common/config';
import Calculator from '../components/mobile/calculator.vue';
import ContactPopup from '../components/mobile/contactPopup.vue';
import LoadingDialog from '../components/mobile/loadingDialog.vue';
import { fmoney } from '../utils'

export default {
  name: "Details",
  middleware: "responsive",
  components: {
    JumpMap,
    Calculator,
    ContactPopup,
    LoadingDialog,
  },
  head() {
    const { estate_name, city } = this.$route.query;
    return {
      title: `${estate_name} (${city})`,
      meta: [
        {
          name: "description",
          content: `${estate_name} (${city})`
        },
        {
          name: "keywords",
          content: `法国新房,法国楼盘,买房投资,买房减税,PINEL减税,LMNP减税,VEFA,Logement neuf,${estate_name},${city}`
        },
      ]
    };
  },
  data() {
    return {
      fromSearchPage: false,
      loading: false,
      programeDetail: {},
      swipeDialogVis: false,
      picList: [], //图片集合
      properties: [], //户型集合
      displayMoreDesc: true,
      brokerInfo: {},
      swipeIdx: 0,
      galleryIndex: null,
      translatedTypologies: [],
      translatedTaxArea: '',
      translatedLaws: '',
      contactPopupVis: false,
      contactPopupTitles: [],
      contactPopupBtnLoading: false,
    };
  },
  created () {
    this.fmoney = fmoney;
  },
  mounted() {
    if (!process.client) return;
    rem();
    this.queryDetail();
  },
  methods: {
    async queryDetail () {
      this.loading = true;
      const lang = this._i18n.locale;
      const { zip_code, name_id } = this.$route.query;
      this.TypologyI18NConfig = TypologyOptionConfig.map(({ incluedKey, I18NKey }) =>
        ({ incluedKey, label: this.$t(`message.NEW_LIST.${I18NKey}`) })
      );
      try {
        const res = await this.$api.article.getProgrameDetail({ zip_code, name_id, lang });
        const { properties, typologies, taxArea, laws } = res.data;
        if (Array.isArray(properties)) {
          for (const it of properties) {
            it.price = it.prices?.[0]?.price;
            it.rentPrice = it.prices?.[0]?.monthlyRent;
            it.planLink = it.plan?.url;
            it.profitability = it.prices?.[0]?.profitability;
            it.translatedTypology = this.TypologyI18NConfig.find(itt =>
              it.typology?.toLowerCase().includes(itt.incluedKey))?.label
          }
        }
        const translatedTypologies = typologies
          .map(it => it.toLowerCase())
          .map(it => this.TypologyI18NConfig.find(itt => it.includes(itt.incluedKey))?.label)
          .filter(Boolean);
        const translatedTaxArea =
          taxArea ? this.$t(`message.PROGRAME_DETAIL.TAX_AREA.${taxArea.toUpperCase()}`) : null;
        const translatedLaws = laws.map(it => this.$t(`message.PROGRAME_DETAIL.LAW_ITEM["${it}"]`)).join(',')
        Object.assign(this, {
          programeDetail: res.data,
          picList: res.data.images,
          properties,
          translatedTypologies,
          translatedTaxArea,
          translatedLaws,
        });
      } catch (e) {
        console.error('query detail: ', e);
      } finally {
        this.loading = false;
      }
    },
    imageSwipeChangeHandler(index) {
      this.swipeIdx = index;
    },
    propertyClickHandler (property) {
      this.contactPopupTitles = extractProgramProperty.call(this, property);
      this.contactPopupVis = true;
      this.__selectedProperty = property;
    },
    directContact () {
      this.contactPopupTitles = [];
      this.contactPopupVis = true;
    },
    contactConfirmHandler (contact) {
      const property = this.__selectedProperty;
      const propertyId = property?.id ?? ' ', programeId = this.programeDetail.id;
      if (!programeId || !propertyId) return;
      const lang = this._i18n.locale;
      this.contactPopupBtnLoading = true;
      this.$api.article.postApplication({ mode: PostApplicationMode.PROGRAME_PROPERTY, lang, contact, programeId, propertyId, selfLink: location.href })
        .then(() => {
          this.contactPopupVis = false;
          Notify({ type: 'success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS') });
        })
        .catch(console.error)
        .finally(() => this.contactPopupBtnLoading = false);
    },
    toggleDisplayMore() {
      this.displayMoreDesc = !this.displayMoreDesc;
    },
  },
  beforeRouteEnter (to, from, next) {
    let fromSearchPage = undefined;
    if (from.path.includes('search')) {
      fromSearchPage = true;
    }
    next(vm => vm.fromSearchPage = fromSearchPage);
  }
};
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
.programe-detail {
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
    margin-right: .12rem;
    font-size: 0.12rem;
    color: rgba(177, 177, 177, 1);
  }
}
.to-list {
  margin: .1rem 0;
}
.tax {
  height: 0.26rem;
  background: rgba(106, 192, 120, 1);
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
.section-title {
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.76);
  margin-right: 0.1rem;
}
.section {
  margin: 0 0.12rem;
  .download-btn {
    background: var(--main-blue);
    padding: .03rem .1rem;
    border-radius: 6px;
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
  .address {
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
