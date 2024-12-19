<template>
  <van-list
    :finished="true"
    :loading-text="$t('message.global.LOADING')"
  >
    <template v-if="isNew">
      <li
        v-for="(item) in list"
        :key="item.id"
        class="list-li" :id="'item-' + item.id" :class="{ active: activePointId === item.id }"
        @click="routerChange('/m_new_detail', { zip_code: item.zip_code, name_id: item.name_id, estate_name: item.estate_name, city: item.city })"
      >
        <div class="flex">
          <div class="image-wrapper">
            <van-image :src="getImage(item)" class="cover-image" />
            <span class="floating bold white" v-if="item.deliveryQuarter">{{ item.deliveryQuarter }}</span>
          </div>
          <div class="text">
            <div class="info-row item-title">{{ item.estate_name }}</div>
            <div class="info-row ">{{ item.zip_code }} / {{ item.city }}</div>
            <div class="info-row ">
              <van-tag v-for="it in item.translatedTypologies" :key="it" type="primary" size=""medium>{{ it }}</van-tag>
            </div>
            <div class="info-row price">
              {{ fmoney(item.availablePropertiesMinPrice) }}€ - {{ fmoney(item.availablePropertiesMaxPrice) }}€
            </div>
          </div>
        </div>
      </li>
    </template>
    <template v-else-if="isSecondHand">
      <li
        v-for="(item) in list"
        :key="item.id"
        class="list-li"
        @click="routerChange('/m_second_hand_detail', { id: item.id, zip_code: item.zip_code, title: item.title, city: item.city })"
      >
        <div class="flex">
          <div class="image-wrapper">
            <van-image :src="item.image" class="cover-image" />
          </div>
          <div class="text">
            <div class="info-row item-title">{{ item.title }}</div>
            <div class="info-row ">{{ item.zip_code }} / {{ item.city }}</div>
            <div class="info-row">
              {{ item.surface }}m² / <span class="price">{{ fmoney(item.price) }}€</span>
            </div>
            <div class="info-row">
              {{ item.piece }}{{ $t('message.PAGE_SECOND_HAND.PIECE_CNT') }} / {{ item.chambre }}{{ $t('message.PAGE_SECOND_HAND.CHAMBRE_CNT') }}
            </div>
          </div>
        </div>
      </li>
    </template>
    <template v-else-if="isStore">
      <li
        v-for="(item) in list"
        :key="item.id"
        class="list-li"
        @click="routerChange('/m_store_detail', { id: item.id, department_id: departmentId, title: item.title })"
      >
        <div class="flex">
          <div class="image-wrapper">
            <van-image :src="getCategoryImg(item)" class="cover-image" />
          </div>
          <div class="text">
            <div class="info-row mt-4">{{ item.category }}</div>
            <div class="info-row price mt-4"><span>{{ fmoney(item.price) }}€</span></div>
            <div class="info-row mt-4">
              {{ item.surface }}m²{{ item.zip_code ? ` / ${item.zip_code}`: '' }}
            </div>
            <div class="info-row mt-4" v-if="item.rent">
              {{ $t('message.global.ESTIMATED_MONTHLY_RENT') }} {{ item.rent }}€
            </div>
          </div>
        </div>
      </li>
    </template>
    <template v-if="!dataLoading && !list.length">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        :description="$t('message.global.EMPTY')"
      />
    </template>
  </van-list>
</template>

<script>
import { fmoney, createPath } from '../../utils/index';
import { SearchMode } from '../../common/config';
export default {
  props: {
    dataLoading: {
      type: Boolean,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    searchMode: {
      type: String,
      required: true,
    },
    activePointId: {
      type: String,
    },
    departmentId: {
      type: String,
    }
  },
  computed: {
    isNew () {
      return this.searchMode === SearchMode.NewPrograme;
    },
    isSecondHand () {
      return this.searchMode === SearchMode.SecondHand;
    },
    isStore () {
      return this.searchMode === SearchMode.Store;
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
    routerChange (path, query) {
      path = createPath(path);
      this.$router.push({ path, query });
    },
    getCategoryImg (row) {
      const category = row.category?.replaceAll(' ', '');
      if (!category) return '';
      return `/${category}.png`;
    }
  }
}
</script>

<style lang="scss" scoped>
.list-li {
  padding: 0 0 6px 0.1rem;
  &.active {
    border: 2px solid var(--main-blue);
  }
  .text {
    .info-row {
      font-size: 0.13rem;
      font-weight: 600;
      color: rgba(168, 168, 168, 1);
      // padding-bottom: 0.04rem;
      &.price {
        color: rgba(255, 94, 94, 1);
      }
      &.item-title {
        font-size: 0.16rem;
        color: rgba(80, 80, 80, 1);
        text-shadow: 0 0.02rem 0.03rem rgba(255, 255, 255, 0.5);
      }
      &.mt-4 {
        margin-top: 4px;
      }
    }
  }
  .image-wrapper {
    position: relative;
    margin-right: 0.11rem;
    .cover-image {
      width: 1.44rem;
      height: 0.98rem;
    }
    .floating {
      position: absolute;
      top: 0;
      right: 0;
      padding: .02rem .1rem;
      background: var(--main-blue);
      border-radius: 0 0 0 .13rem;
      font-size: 0.12rem;
    }
  }
}
</style>
<style>
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
