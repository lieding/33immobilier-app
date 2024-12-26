<template>
  <div class="search-renting-list" id="scroll-wrapper">
    <div
      v-for="(item) in list"
      :key="item.id"
      :id="'item-' + item.id"
      class="list-item"
      :class="{ active: item.id === activePointId }"
      @click="selectItem(item)"
    >
      <el-image :src="item.image" :lazy="true" :class="{ desktop: isDesktop, mobile: isMobile }">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div class="info-part">
        <div class="info-row" :class="{ desktop: isDesktop, mobile: isMobile }">
          <span class="pricing bold">
            <template v-if="checkArrLenGreaterThan1(item.pureRentRange)">
              {{ fmoney(item.pureRentRange[0]) }}€ - {{ fmoney(item.pureRentRange[1]) }}€
            </template>
            <template v-else-if="item.pureRentRange">
              {{ fmoney(item.pureRentRange[0]) }}€
            </template>
            <template v-else>
              {{ fmoney(item.pureRent) }}€
            </template>
          </span>
          <span class="info">
            <template v-if="checkArrLenGreaterThan1(item.surfaceRange)">
              {{ item.surfaceRange[0] }}m² - {{ item.surfaceRange[1] }}m²
            </template>
            <template v-else-if="item.surfaceRange">
              {{ item.surfaceRange[0] }}m²
            </template>
            <template v-else>
              {{ item.surface }}m²
            </template>
          </span>
        </div>
        <div class="info-row" :class="{ desktop: isDesktop, mobile: isMobile }">
          <i class="el-icon-location-outline" />
          <span class="info">
            <template v-if="isDesktop">{{ item.address }} / {{ item.city }}({{ item.zip_code }})</template>
            <template v-else>{{ item.zip_code }} / {{ item.city }}</template>
          </span>
        </div>
        <div class="info-row" :class="{ desktop: isDesktop, mobile: isMobile }">
          <i class="el-icon-house" />
          <span class="info">{{ RentTypeConfig[item.rentType] }} / {{ ResidenceTypeConfig[item.residenceType] }}</span>
        </div>
        <div class="info-row" :class="{ desktop: isDesktop, mobile: isMobile }">
          <i class="el-icon-date" />
          <span class="info">
            {{ $t('message.PAGE_RENT.AVAILABLE_FROM') + item.availableDate }} / {{ $t('message.PAGE_RENT.LEAST_DURATION_MONTHS').replace('{value}', item.rent_duration) }}
          </span>
        </div>
        <div class="link-btn" v-if="isDesktop">
          <el-button icon="el-icon-right" circle @click="listItemClickhandler(item)"></el-button>
        </div>
      </div>
    </div>
    <el-alert v-show="finished" :title="$t('message.global.NO_MORE')" type="info" center show-icon :closable="false" />
  </div>
</template>

<script>
import { fmoney, aLink, createPath, checkArrLenGreaterThan1 } from '../../utils';
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    activePointId: {
      type: String,
      required: true
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.fmoney = fmoney;
    this.checkArrLenGreaterThan1 = checkArrLenGreaterThan1;
    this.RentTypeConfig = this.$t('message.PAGE_QUESTINNAIRE.RENT_TYPE_OPTS');
    this.ResidenceTypeConfig = this.$t('message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE_OPTS');
  },
  updated (){
    console.log(this.activePointId)
  },
  computed: {
    isDesktop () {
      return this.$device.isDesktop;
    },
    isMobile () {
      return this.$device.isMobile;
    },
  },
  methods: {
    selectItem (item) {
      if (this.isDesktop) {
        this.$emit('selectRow', item);
      } else {
        this.listItemClickhandler(item);
      }
    },
    listItemClickhandler ({ user_id, id, title }) {
      const path = createPath('/rent_detail');
      if (this.isDesktop) {
        const urlParams = new URLSearchParams();
        urlParams.set('user_id', user_id);
        urlParams.set('id', id);
        urlParams.set('title', title);
        aLink(path + '?' + urlParams.toString());
      } else {
        this.$router.push({ path, query: { user_id, id, title } })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.search-renting-list {
  flex: 1;
  overflow-y: auto;
  .list-item {
    display: flex;
    align-items: center;
    margin: 5px 0;
    border-bottom: 1px solid #ccc;
    &.active {
      border: 3px solid var(--main-blue);
    }
    .el-image {
      flex: unset;
      &.desktop {
        width: 221px;
        height: 137px;
      }
      &.mobile {
        width: 1.44rem;
        height: 0.98rem;
      }
    }
    .info-part {
      flex: 1;
      margin-left: 5px;
      position: relative;
      .info-row {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        .info {
          display: inline-block;
          padding: 1px 0 0 4px;
          font-size: 14px;
        }
        > span {
          display: inline-block;
        }
        &.mobile {
          font-size: .13rem;
          margin-bottom: 3px;
          .info {
            font-size: .13rem;
            padding: unset;
            margin-left: .03rem;
          }
          .pricing {
            font-size: .16rem;
            margin-right: .02rem;
          }
        }
      }
      .title {
        color: #000;
        font-size: 16px;
        font-weight: 600;
      }
      .link-btn {
        position: absolute;
        z-index: 10;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        visibility: hidden;
      }
      .pricing {
        font-size: 16px;
        color: #ff5e5e;
        margin-right: 6px;
      }
      &:hover {
        .link-btn {
          visibility: visible;
        }
      }
    }
  }
}
</style>
