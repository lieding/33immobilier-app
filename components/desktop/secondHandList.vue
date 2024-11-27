<template>
  <div class="new-programe-list" id="scroll-wrapper">
    <div
      v-for="(itemss) in list"
      :key="itemss.id"
      :id="'item-' + itemss.id"
      class="list-item"
    >
      <el-image :src="itemss.image" :lazy="true">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div class="right-list-item">
        <div class="title">{{ itemss.title }}</div>
        <div class="info-row">
          <i class="el-icon-location-outline" />
          <span class="info">{{ itemss.zip_code }} / {{ itemss.city }}</span>
        </div>
        <div class="info-row">
          <i class="el-icon-house" />
          <span class="info">
            {{ itemss.surface }}m² / {{ itemss.piece }}{{ $t('message.PAGE_SECOND_HAND.PIECE_CNT') }}
          </span>
        </div>
        <div class="price-range">
          {{ fmoney(itemss.price) }}€
        </div>
        <div class="link-btn">
          <el-button icon="el-icon-position" circle @click="listItemClickhandler(itemss)"></el-button>
        </div>
      </div>
    </div>
    <el-alert v-show="true" :title="$t('message.global.NO_MORE')" type="info" center show-icon :closable="false" />
  </div>
</template>

<script>
import { fmoney, aLink } from '../../utils'
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  created () {
    this.fmoney = fmoney;
  },
  methods: {
    listItemClickhandler ({ zip_code, id, city, title }) {
      const urlParams = new URLSearchParams();
      urlParams.set('zip_code', zip_code);
      urlParams.set('id', id);
      urlParams.set('city', city);
      urlParams.set('title', title);
      aLink('/second_hand_detail?' + urlParams.toString());
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
