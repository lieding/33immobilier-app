<template>
  <div class="city-bar-wrapper" :class="{ mobile: mobile }">
    <div class="col">
      <div v-for="row, idx in Col" :key="idx" class="row" :style="{ height: row.height, 'max-height': mobile ? row.mobileMaxHeight : 'unset' }">
        <div v-for="item, idxx in row.items" :key="idxx" class="item pointer" @click="select(item)">
          <img :src="item.img" />
          <span class="label white bold">{{ item.city }}</span>
        </div>
      </div>
    </div>
    <div class="col">
      <div v-for="row, idx in Col1" :key="idx" class="row" :style="{ height: row.height, 'max-height': mobile ? row.mobileMaxHeight : 'unset' }">
        <div v-for="item, idxx in row.items" :key="idxx" class="item pointer" @click="select(item)">
          <img :src="item.img" />
          <span class="label white bold">{{ item.city }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { LocationType } from '../common/config';

const Col = [
  {
    height: '266px', mobileMaxHeight: '32vh',
    items: [{ city: 'Île-de-France', img: '/city-images/ile-de-france.jpeg', location_type: LocationType.L1_AREA }]
  },
  
  {
    height: '190px', mobileMaxHeight: '20vh',
    items: [
      { city: 'Rueil-Malmaison', img: '/city-images/rueil-malmaison.jpeg' },
      { city: 'Le Blanc-Mesnil', img: '/city-images/blanc-mesnil.jpeg' }
    ]
  },
  { height: '266px', mobileMaxHeight: '26vh', items: [{ city: 'Paris', img: '/city-images/paris.jpeg' }] },
  
];
const Col1 = [
  {
    height: '228px', mobileMaxHeight: '20vh',
    items: [{ city: 'Saint-Denis', img: '/city-images/saint-denis.jpeg' }, { city: 'Clichy', img: '/city-images/clichy.jpeg' }]
  },
  {
    height: '266px', mobileMaxHeight: '26vh',
    items: [{ city: 'Nice', img: '/city-images/nice.jpeg' }]
  },
  {
    height: '228px', mobileMaxHeight: '20vh',
    items: [{ city: 'Marseille', img: '/city-images/marseille.jpeg' }, { city: 'Strasbourg', img: '/city-images/strasbourg.jpeg' }]
  }
]
export default {
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.Col = Col;
    this.Col1 = Col1;
  },
  methods: {
    select (item) {
      const { city: city_name, location_type = '' } = item;
      this.$emit('select', { city_name, location_type });
    }
  }
}
</script>

<style lang="scss" scoped>
.city-bar-wrapper {
  display: flex;
  column-gap: 16px;
  .col {
    flex: 1;
  }
  .row {
    display: flex;
    margin-bottom: 8px;
    column-gap: 12px;
    .item {
      flex: 1;
      position: relative;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
      .label {
        position: absolute;
        left: 16px;
        bottom: 16px;
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.80);
      }
    }
  }
  &.mobile {
    display: initial;
    .row {
      .item {
        .label {
          left: .06rem;
          bottom: .06rem;
        }
      }
    }
  }
}
</style>
