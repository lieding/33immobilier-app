<template>
  <div class="rent-detail-page">
    <div v-if="isMobile && fromSearchPage" class="return-to-list flex align-center" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
      <span>{{ $t('message.global.RETURN_TO_LIST') }}</span>
    </div>
    <div class="desktop-placed-center top-section" v-if="isDesktop">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/pc_index' }">{{ $t("message.global.HOME") }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t("message.global.Rental_list") }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="desktop-placed-center" v-if="isDesktop && loading">
      <detail-skeleton />
    </div>
    <template v-if="!loading">
      <!-- Title -->
      <div class="desktop-placed-center" v-if="isDesktop">
        <div class="page-title desktop bold">
          {{ detail.title }}
        </div>
      </div>
      <div :class="{ 'desktop-placed-center': isDesktop, flex: isDesktop }">
        <client-only>
          <div class="carousel-part" v-if="isDesktop">
            <!-- 轮播图 -->
            <div class="slideshow">
              <el-carousel :interval="5000" height="404px" arrow="always">
                <el-carousel-item v-for="(item, i) in detail.images" :key="i" :label="detail.imageTags[i]">
                  <div class="carousel" :style="{ 'background-image': 'url(' + item + ')' }" @click="galleryIndex = i"></div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="mobile-carousel" v-if="isMobile">
            <van-swipe :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="(image, index) in detail.images" :key="index" @change="swipeIdx = $event">
                <img :src="image" @click="galleryIndex = index" />
              </van-swipe-item>
              <template #indicator>
                <div>{{ detail.imageTags[swipeIdx] }}</div>
              </template>
            </van-swipe>
          </div>
        </client-only>
        <template v-if="isMobile">
          <div class="page-title mobile bold mobile-section">
            {{ detail.title }}
          </div>
          <div class="mobile-subtitle-part mobile-section flex justify-between grey">
            <span class="inline-block">{{ detail.zip_code }} / {{ detail.city }}</span>
            <div class="whatsapp-btn pointer flex align-center" @click="startContactPopup()">
              <img src="/whatsapp.svg" />
              <span class="inline-block txt white bold">{{ $t('message.global.CONTACT_US') }}</span>
            </div>
          </div>
        </template>
        <div class="info-part" :class="{ desktop: isDesktop, mobile: isMobile }">
          <div class="content-package">
            <p class="info-row">
              <span class="pricing bold" v-if="isSharingMultipleRooms">
                {{ fmoney(detail.pureRentRange[0]) || 0 }}€ - {{ fmoney(detail.pureRentRange[1]) || 0 }}€
              </span>
              <span class="pricing bold" v-else-if="detail.pureRentRange">{{ fmoney(detail.pureRentRange[0]) }}€</span>
              <span class="pricing bold" v-else>{{ fmoney(detail.pureRent) }}€</span>
              <span>{{ detail.hasFurniture ? $t('message.PAGE_RENT.HAS_FURNITURE') : $t('message.PAGE_RENT.NO_FURNITURE') }}</span>
            </p>
            <p class="info-row">
              {{ $t("message.PAGE_QUESTINNAIRE.CHARGE") }}：
              <span v-if="isSharingMultipleRooms">{{ detail.chargeRange[0] || 0 }}€ - {{ detail.chargeRange[1] || 0 }}€</span>
              <span v-else-if="detail.chargeRange">{{ detail.chargeRange[0] }}€</span>
              <span v-else>{{ detail.charge }}€</span>
            </p>
            <p class="info-row" v-if="detail.deposit || (detail.depositRange && detail.depositRange.length)">
              {{ $t("message.PAGE_QUESTINNAIRE.DEPOSIT") }}：
              <span v-if="isSharingMultipleRooms">{{ detail.depositRange[0] || 0 }}€ - {{ detail.depositRange[1] || 0 }}€</span>
              <span v-else-if="detail.depositRange">{{ fmoney(detail.depositRange[0]) }}€</span>
              <span v-else>{{ fmoney(detail.deposit) }}€</span>
            </p>
            <p class="info-row">
              {{ $t("message.PAGE_QUESTINNAIRE.RENT_TYPE") }}：
              <span>{{ RentTypeConfig[detail.rentType] }}</span>
            </p>
            <p class="info-row">
              {{ $t("message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE") }}：
              <span>{{ ResidenceTypeConfig[detail.residenceType] }}</span>
            </p>
            <p class="info-row">
              {{ $t("message.global.SURFACE") }}：
              <span v-if="isSharingMultipleRooms">{{ detail.surfaceRange[0] || 0 }}m² - {{ detail.surfaceRange[1] || 0 }}m²</span>
              <span v-else-if="detail.surfaceRange">{{ detail.surfaceRange[0] }}m²</span>
              <span v-else>{{ detail.surface }}m²</span>
            </p>
            <p class="info-row">
              {{ $t("message.global.LOCATED_CITY") }}：
              <span>{{ detail.zip_code }} / {{detail.city}}</span>
            </p>
            <p class="info-row">
              {{ $t("message.PAGE_QUESTINNAIRE.AVAILABLE_DATE") }}：
              <span>{{ detail.availableDate && detail.availableDate.substring(0, 10) }}</span>
            </p>
            <p class="info-row">
              {{ $t("message.PAGE_QUESTINNAIRE.DURATION") }}：
              <span>{{ detail.rent_duration }} {{ $t('message.global.MONTHS') }}</span>
            </p>
            <p class="info-row">
              <renting-equipment :display="true" :config="detail.equipmentConfig || {}" />
            </p>
            <div class="whatsapp-btn-row" v-if="isDesktop">
              <div class="whatsapp-btn pointer flex align-center" @click="startContactPopup()">
                <img src="/whatsapp.svg" />
                <span class="inline-block txt white bold">{{ $t('message.global.CONTACT_US') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <hr class="hr" v-if="isMobile" />
    <!-- Description -->
    <div :class="{ 'desktop-placed-center': isDesktop, 'mobile-section': isMobile }">
      <div :class="{ 'desktop-section-title': isDesktop, 'section-title': isMobile }">
        {{ $t("message.global.DESCRIPTION") }}
      </div>
      <div v-html="detail.description" class="rent-description" :class="{ desktop: isDesktop, mobile: isMobile }"></div>
    </div>
    <hr class="hr" v-if="isMobile" />
    <!-- Location & Map -->
    <div :class="{ 'desktop-placed-center': isDesktop, 'mobile-section': isMobile }">
      <div class="location-title" v-if="isDesktop">
        <span class="desktop-section-title">
          {{ $t("message.global.LOCATION") }}：{{ detail.address }}, {{ detail.city }}
        </span>
      </div>
      <template v-if="isMobile">
        <div class="section-title">{{ $t("message.global.LOCATION") }}</div>
        <div class="section-subtitle grey">{{ detail.address }}</div>
      </template>
      <div class="map-section" :class="{ desktop: isDesktop, mobile: isMobile }">
        <jump-map
          v-if="detail.latitude && detail.longitude"
          :latitude="detail.latitude"
          :longitude="detail.longitude"
          :interactive="false"
          :need-circle="true"
          :need-center-logo="true"
        ></jump-map>
      </div>
    </div>
    <hr class="hr" v-if="isMobile" />
    <div :class="{ 'desktop-placed-center': isDesktop, 'mobile-section': isMobile }" v-if="isSharing && detail.rooms">
      <div :class="{ 'desktop-section-title': isDesktop, 'section-title': isMobile }">
        {{ $t("message.PAGE_QUESTINNAIRE.ROOMS") }}
      </div>
      <el-table style="width: 100%;" :data="detail.rooms" @row-click="startContactPopup">
        <el-table-column :label="$t('message.PAGE_RENT.RENT')">
          <template slot-scope="scope"><span>{{ fmoney(scope.row.pureRent) }}€</span></template>
        </el-table-column>
        <el-table-column :label="$t('message.PAGE_QUESTINNAIRE.CHARGE')">
          <template slot-scope="scope"><span>{{ scope.row.charge || 0 }}€</span></template>
        </el-table-column>
        <el-table-column :label="$t('message.PAGE_RENT.DEPOSIT')">
          <template slot-scope="scope"><span>{{ fmoney(scope.row.deposit) }}€</span></template>
        </el-table-column>
        <el-table-column :label="$t('message.global.SURFACE')">
          <template slot-scope="scope"><span>{{ scope.row.surface }}m²</span></template>
        </el-table-column>
      </el-table>
    </div>
    <client-only>
      <gallery
        :images="detail.images"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>
      <loading-dialog v-if="isMobile" :visible="loading" :loading-text="$t('message.global.LOADING')" />
      <contact-dialog
        v-if="isDesktop"
        :visible="contactDialogVisible"
        :titles="contactDialogTitles"
        :confirm-btn-loading="postApplicationLoading"
        @close="contactDialogVisible = false"
        @confirm="contactFormConfirmHandler"
      />
      <contact-popup
        v-if="isMobile"
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
import rem from "~/common/rem.js";
import JumpMap from '~/components/jumpMap.vue';
import ContactDialog from '../components/desktop/ContactDialog.vue';
import ContactPopup from '../components/mobile/contactPopup.vue';
import LoadingDialog from '../components/mobile/loadingDialog.vue';
import { PostApplicationMode } from '../common/config';
import { fmoney, extractTranslatedProperty } from '../utils';
import DetailSkeleton from "../components/desktop/detailSkeleton.vue";
import RentingEquipment from '../components/rentingEquipment.vue';
export default {
  components: {
    JumpMap,
    ContactDialog, ContactPopup,
    DetailSkeleton, LoadingDialog,
    RentingEquipment,
  },
  data () {
    return {
      fromSearchPage: false,
      loading: false,
      swipeIdx: null,
      galleryIndex: null,
      contactDialogVisible: false,
      postApplicationLoading: false,
      contactDialogTitles: [],
      detail: {},
    }
  },
  computed: {
    isDesktop () {
      return this.$device.isDesktop;
    },
    isMobile () {
      return this.$device.isMobile;
    },
    isSharing() {
      return this.detail?.rentType === 'SHARING';
    },
    isSharingMultipleRooms () {
      return this.isSharing && this.detail?.rooms?.length > 1;
    }
  },
  created () {
    this.fmoney = fmoney;
    this.RentTypeConfig = this.$t('message.PAGE_QUESTINNAIRE.RENT_TYPE_OPTS');
    this.ResidenceTypeConfig = this.$t('message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE_OPTS');
  },
  mounted () {
    if (this.isMobile) {
      rem();
    }
    if (process.client) {
      this.queryDetail();
    }
  },
  methods: {
    async queryDetail () {
      const lang = this._i18n.locale;
      const { user_id, id } = this.$route.query;
      this.loading = true;
      try {
        const res = await this.$api.article.getRentDetail({ user_id, id, lang });
        const detail = res.data;
        if (!detail) return;
        let images = [], imageTags = [];
        if (Array.isArray(detail.images)) {
          const PhotoTagConfig = this.$t('message.PAGE_QUESTINNAIRE.PHOTO_TAG_LIST');
          images = detail.images.map(it => it.downloadUrl ?? '');
          imageTags = detail.images.map(it => it.tag ? (PhotoTagConfig[it.tag] ?? it.tag) : '');
        }
        let pureRentRange, chargeRange, depositRange, surfaceRange;
        const rooms = detail.rooms;
        if (detail.rentType === 'SHARING' && Array.isArray(rooms)) {
          const pureRentArr = rooms.map(it => it.pureRent), chargeArr = rooms.map(it => it.charge),
            depositArr = rooms.map(it => it.deposit), surfaceArr = rooms.map(it => it.surface);
          pureRentRange = [Math.min(...pureRentArr), Math.max(...pureRentArr)];
          chargeRange = [Math.min(...chargeArr), Math.max(...chargeArr)];
          depositRange = [Math.min(...depositArr), Math.max(...depositArr)];
          surfaceRange = [Math.min(...surfaceArr), Math.max(...surfaceArr)];
        }
        this.detail = { ...detail, images, imageTags, pureRentRange, chargeRange, depositRange, surfaceRange };
        this.loading = false;
        if (detail.missingTranslation) {
          const res = await this.$api.article.translateRentDetail({ user_id, id, lang })
          const data = res.data;
          if (data) {
            const translated = extractTranslatedProperty(data, ['title', 'description'], lang);
            this.detail = { ...this.detail, ...translated };
          }
        }
      } catch (e) {
        console.error('query detail: ', e);
      }
    },
    startContactPopup (room) {
      this.contactDialogVisible = true;
      this.contactDialogTitles = room ? exractRoomProps.call(this, room) : [];
    },
    contactFormConfirmHandler() {},
  },
  beforeRouteEnter (to, from, next) {
    let fromSearchPage = undefined;
    if (from.path.includes('search')) {
      fromSearchPage = true;
    }
    next(vm => vm.fromSearchPage = fromSearchPage);
  }
}

function exractRoomProps (room) {
  const { pureRent, surface, charge, deposit } = room;
  return [
    {
      label: this.$t('message.global.PRICE'),
      text: fmoney(pureRent) + '€',
    },
    {
      label: this.$t('message.global.SURFACE'),
      text: surface + 'm²'
    },
    {
      label: this.$t('message.PAGE_QUESTINNAIRE.CHARGE'),
      text: charge + '€'
    },
    {
      label: this.$t('message.PAGE_QUESTINNAIRE.DEPOSIT'),
      text: fmoney(deposit) + '€'
    }
  ];
}
</script>

<style lang="scss" scoped>
.page-title {
  &.desktop {
    font-size: 32px;
    line-height: 42px;
    margin: 16px 0 30px;
  }
  &.mobile {
    font-size: 0.2rem;
    margin: 0.07rem 0 0.03rem 0.12rem;;
  }
}
.mobile-section {
  margin-left: .12rem;
  margin-right: .12rem;
  .section-title {
    font-size: 0.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.755);
  }
  .section-subtitle {
    font-size: 0.12rem;
    line-height: 0.17rem;
  }
}
// 左侧主题
.carousel-part {
  width: 710px;
  // 轮播图
  .slideshow {
    text-align: center;
    .carousel {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
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
.mobile-carousel {
  height: 2.14rem;
  position: relative;
  img {
    height: 2.14rem;
    width: 100%;
    object-fit: cover;
  }
}
.top-section {
  padding-bottom: 12px;
  .breadcrumb {
    padding-top: 10px;
  }
}
.mobile-subtitle-part {
  font-size: 0.12rem;
}
.info-part {
  &.desktop {
    width: 488px;
    height: 404px;
    .content-package {
      box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
      padding: 9px 20px;
      height: inherit;
      box-sizing: border-box;
      .pricing {
        font-size: 26px;
        font-weight: 600;
        color: #ff5e5e;
      }
    }
    .info-row {
      // margin-top: 6px;
      color: #2746d1;
      font-weight: 600;
      font-size: 16px;
      span {
        color: #000000;
      }
    }
    .whatsapp-btn-row {
      margin-top: 7px;
    }
  }
  &.mobile {
    margin: 0 .12rem 0;
    .info-row {
      font-size: 0.14rem;
      font-weight: 600;
      line-height: 1.6;
      color: #b1b1b1;
      span {
        font-size: .16rem;
        color: initial;
      }
      .pricing {
        font-size: 0.2rem;
        color: rgba(255, 94, 94, 1);
        padding: 0.13rem 0 0.1rem;
      }
    }
  }
}
.desktop-section-title {
  font-size: 32px;
  margin-right: 10px;
  font-weight: 600;
}
.rent-detail-page {
  margin-bottom: 36px;
  .return-to-list {
    margin: .06rem 0;
  }
  .desktop-placed-center {
    margin-top: 32px;
  }
  .location-title {
  }
  .map-section {
    &.desktop {
      border: 1px solid #ccc;
      height: 500px;
    }
    &.mobile {
      height: 3rem;
      width: 100%;
      margin-top: 0.05rem;
    }
  }
  .rent-description {
    &.desktop {
      margin-top: 10px;
      white-space: pre-line;
    }
    &.mobile {
      font-size: 0.13rem;
      margin: 0.1rem 0;
      color: rgb(70, 70, 70);
      line-height: 0.18rem;
      white-space: pre-line;
    }
  }
}

</style>
