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
    <div class="programe-detail">
      <p class="detail-title">{{ programeDetail.estate_name }}</p>
      <p class="detail-region">{{ programeDetail.zip_code }} / {{ programeDetail.city }}</p>
      <p class="item">
        <van-tag type="primary" size="large" v-if="programeDetail.deliveryQuarter">
          {{ programeDetail.deliveryQuarter }}
        </van-tag>
        <van-tag type="primary" size="medium" v-for="(it) in translatedTypologies" :key="it" plain>{{ it }}</van-tag>
      </p>
      <p class="price">{{ fmoney(programeDetail.availablePropertiesMinPrice) }}€ - {{ fmoney(programeDetail.availablePropertiesMaxPrice) }}€</p>
      <p class="hand">
        <span class="time">{{ $t("message.global.completionDate") }} ：</span>
        {{ programeDetail.deliveryQuarter }}
      </p>
      <p class="hand">
        <span class="time">{{ $t("message.global.PROPERTIES_COUNT") }} ：</span>
        {{ programeDetail.availablePropertiesCount }}
      </p>
      <p class="hand">
        <span class="time">{{ $t("message.global.measures") }} ：</span>
        {{ translatedLaws }}
      </p>
      <p class="hand">
        <span class="time">{{ $t("message.global.TAX_AREA") }} ：</span>
        {{ translatedTaxArea }}
      </p>
      <p class="hand">
        <span class="time">{{ $t("message.global.LOCATION") }} ：</span>
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
          {{ displayMoreDesc ? $t("message.global.seeMore") : $t("message.global.SEE_LESS") }}
        </span>
      </div>
    </div>
    <hr class="hr" />
    <!-- 楼盘位置 -->
    <div class="section">
      <span class="section-title">{{ $t("message.global.position") }}</span>
      <p class="province">{{ programeDetail.address }}</p>
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
          <p class="hand">
            <span class="time">{{ $t("message.global.chamberID") }} ：</span>
            {{ info.number }}
          </p>
          <p class="hand">
            <span class="time">{{ $t("message.global.DoorMode") }} ：</span>
            {{ info.translatedTypology }}
          </p>
          <p class="hand">
            <span class="time">{{ $t("message.global.USABLE_AREA") }} ：</span>
            {{ info.surface }}
          </p>
          <p class="hand">
            <span class="time">{{ $t("message.global.FLOOR") }} ：</span>
            {{ info.floor }}
          </p>
          <p class="hand">
            <span class="time">{{ $t("message.global.price") }} ：</span>
            {{ info.price }}€
          </p>
          <p class="hand">
            <span class="time">{{ $t("message.global.ROI") }} ：</span>
            {{ info.profitability }}%
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
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import { Notify } from 'vant';
import JumpMap from '~/components/jumpMap.vue';
import { TypologyOptionConfig, extractProgramProperty, PostApplicationMode } from '../common/config';
import Calculator from '../components/Mindex/calculator.vue';
import ContactPopup from '../components/Mindex/contactPopup.vue';
import LoadingDialog from '../components/Mindex/loadingDialog.vue';
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
    rem();
    if (process.client) this.queryDetail();
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
        const res = await this.$api.article.getInfoNewHous({ zip_code, name_id, lang });
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
    contactConfirmHandler (contact) {
      const lang = this._i18n.locale;
      this.contactPopupBtnLoading = true;
      this.$api.article.postApplication({ mode: PostApplicationMode.JOIN, lang, contact })
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
.hand {
  font-size: 0.14rem;
  font-weight: 600;
  span {
    font-size: .16rem;
  }
}
.time {
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
