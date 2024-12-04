<template>
  <div class="new-programe-list" id="scroll-wrapper">
    <div
      v-for="(itemss) in list"
      :key="itemss.id"
      :id="'item-' + itemss.id"
      class="list-item"
      :class="{ active: itemss.id === activePointId }"
      @click="selectItem(itemss)"
    >
      <el-image :src="getImage(itemss)" :lazy="true">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div class="right-list-item">
        <div v-if="itemss.deliveryQuarter">
          <el-tag size="small" effect="dark">{{ itemss.deliveryQuarter }}</el-tag>
        </div>
        <div class="title">{{ itemss.estate_name }}</div>
        <div class="info-row">
          <i class="el-icon-location-outline" />
          <span class="info">{{ itemss.zip_code }} / {{ itemss.city }}</span>
        </div>
        <div class="info-row">
          <i class="el-icon-house" />
          <span class="info">
            {{ itemss.translatedTypologies.join(',') }}
          </span>
        </div>
        <div class="price-range">
          {{ fmoney(itemss.availablePropertiesMinPrice) }}€ - {{ fmoney(itemss.availablePropertiesMaxPrice) }}€
        </div>
        <div class="link-btn">
          <el-button icon="el-icon-right" circle @click="listItemClickhandler(itemss)"></el-button>
        </div>
      </div>
    </div>
    <el-alert v-show="finished" :title="$t('message.global.NO_MORE')" type="info" center show-icon :closable="false" />
  </div>
</template>

<script>
import { fmoney, aLink, createPath } from '../../utils'
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
  },
  methods: {
    getImage (item) {
      if (item.image) return item.image;
      if (Array.isArray(item.images) && item.images.length) return item.images[0];
      return null;
    },
    selectItem (item) {
      this.$emit('selectPoint', item);
    },
    listItemClickhandler ({ zip_code, name_id, city, estate_name }) {
      const urlParams = new URLSearchParams();
      urlParams.set('zip_code', zip_code);
      urlParams.set('name_id', name_id);
      urlParams.set('city', city);
      urlParams.set('estate_name', estate_name);
      const path = createPath('/new_detail?');
      aLink(path + urlParams.toString());
    },
  }
}
</script>

<style lang="scss" scoped>
.new-programe-list {
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
      width: 221px;
      height: 137px;
    }
    .right-list-item {
      flex: 1;
      margin-left: 5px;
      position: relative;
      div {
        margin-bottom: 6px;
      }
      .info-row {
        display: flex;
        align-items: center;
        .info {
          display: inline-block;
          padding: 1px 0 0 4px;
          font-size: 14px;
          color: #373737;
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
      .price-range {
        display: block;
        font-size: 16px;
        color: #ff5e5e;
        font-weight: bold;
      }
      &:hover {
        .link-btn {
          visibility: visible;
        }
      }
    }
    .rightImg {
      flex: unset;
      max-height: 74px;
    }
  }
}
</style>
