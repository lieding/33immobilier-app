<template>
  <el-row type="flex" :gutter="8" class="wrap row">
    <!-- region/city selection -->
    <el-col :span="6"  :sm="8" :xs="8">
      <div class=" full-w pointer micco-select customized" @click="startLocationSearch">
        <span class="label">{{ locationSearchText || $t("message.global.REGION_CITY_SEARCHPLACEHOLDER") }}</span>
        <i class="el-icon-place" />
      </div>
    </el-col>
    <!-- RentType select -->
    <el-col :span="6"  :sm="8" :xs="8">
      <el-select
        v-model="selectedRentType"
        clearable
        class="micco-select full-w"
        :placeholder="$t('message.PAGE_QUESTINNAIRE.RENT_TYPE')"
      >
        <el-option v-for="it in RentTypeConfig" :key="it.value" :label="it.label" :value="it.value"></el-option>
      </el-select>
    </el-col>
    <!-- Price range slider -->
    <el-col :span="6"  :sm="8" :xs="8">
      <div class=" full-w pointer micco-select customized" @click="priceSlideVis = true" v-popover:popover>
        <span class="label">{{ $t("message.PAGE_RENT.RENT") }}</span>
        <i class="el-icon-arrow-down" />
      </div>
    </el-col>
    <el-popover ref="popover" width="220" trigger="click">
      <el-slider v-model="priceRange" :max="maxPrice" :min="minPrice" range @input="priceSlideChangeHandler"></el-slider>
      <p style="overflow:hidden">
        <span style="float:left;"> {{ fmoney(priceRange[0]) }}€</span>
        <span style="float:right;">{{ fmoney(priceRange[1]) }}€</span>
      </p>
      <div>
        <el-button type="text" @click="priceSlideChangeHandler([minPrice, maxPrice])">{{ $t('message.global.RESET') }}</el-button>
      </div>
    </el-popover>
    <!-- Surface slide range -->
    <el-col :span="6"  :sm="8" :xs="8">
      <div class=" full-w pointer micco-select customized" @click="surfaceSlideVis = true" v-popover:surfacePopover>
        <span class="label">{{ $t("message.global.SURFACE") }}</span>
        <i class="el-icon-arrow-down" />
      </div>
      <el-popover ref="surfacePopover" width="220" trigger="click">
        <el-slider v-model="surfaceRange" :min="minSurface" :max="maxSurface" range @input="surfaceSlideChangeHandler"></el-slider>
        <p style="overflow:hidden">
          <span style="float:left;"> {{ surfaceRange[0] }}m²</span>
          <span style="float:right;">{{ surfaceRange[1] }}m²</span>
        </p>
        <div>
          <el-button type="text" @click="surfaceSlideChangeHandler([minSurface, maxSurface])">{{ $t('message.global.RESET') }}</el-button>
        </div>
      </el-popover>
    </el-col>
    <!-- Rent duration -->
    <el-col :span="6"  :sm="8" :xs="8">
      <el-select
        v-model="selectedRentDuration"
        clearable
        class="micco-select full-w"
        :placeholder="$t('message.PAGE_QUESTINNAIRE.DURATION')"
      >
        <el-option v-for="it in durationOptions" :key="it.value" :label="it.label" :value="it.value"></el-option>
      </el-select>
    </el-col>
    <!-- Available date -->
    <el-col :span="6"  :sm="8" :xs="8">
      <el-select
        v-model="selectedAvailableDateOpt"
        clearable
        class="micco-select full-w"
        :placeholder="$t('message.PAGE_QUESTINNAIRE.AVAILABLE_DATE')"
      >
        <el-option v-for="it in availableDateOptions" :key="it.value" :label="it.label" :value="it.value"></el-option>
      </el-select>
    </el-col>
    <client-only>
      <!-- Department / city / zipcode searach dialog -->
      <el-dialog :visible.sync="locationSearchDialogVis" :close-on-click-modal="false" :title="$t('message.global.Where')" width="80%">
        <el-input
          v-model="locationSearch"
          :placeholder="$t('message.global.REGION_CITY_SEARCHPLACEHOLDER')"
          prefix-icon="el-icon-search"
          @input="locationSearchInputHandler"
        ></el-input>
        <div v-if="locationOptions" class="location-options flex">
          <div
            v-for="it in locationOptions" :key="it.searchKey"
            class="location-option-item pointer"
            @click="locationSearchSelectHandler(it)"
          >{{ it.label }}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="locationSearchDialogVis = false">{{ $t('message.global.CANCEL') }}</el-button>
        </span>
      </el-dialog>
    </client-only>
  </el-row>
</template>

<script lang="js">
import { fmoney } from '../../utils';
import { RentDurationOption } from '../../utils/rent';
import { loadCityZipcodeConfig } from './helper';

export default {
  name: 'RentingSearchBar',
  props: {
    locationSearchText: {
      type: String
    },
  },
  data () {
    return {
      selectedRentType: '',
      selectedRentDuration: [],
      minPrice: 0, maxPrice: 0, priceRange: [0, 0],
      minSurface: 0, maxSurface: 0, surfaceRange: [0, 0],
      selectedAvailableDateOpt: '',
      priceSlideVis: false,
      surfaceSlideVis: false,
      locationSearchDialogVis: false,
      locationSearch: '',
      locationOptions: [],
    };
  },
  created () {
    this.fmoney = fmoney;
    this.RentTypeConfig = Object.entries(this.$t('message.PAGE_QUESTINNAIRE.RENT_TYPE_OPTS'))
      .map(([value, label]) => ({ label, value }));
    this.durationOptions = RentDurationOption.map(value => ({
      value, label: this.$t('message.PAGE_RENT.LEAST_DURATION_MONTHS').replace('{value}', value) }));
    const avalilableDateOpt = this.$t('message.PAGE_RENT.AVAILABLE_DATE_FILTER_LABEL');
    this.availableDateOptions = [1, 2, 3, 6].map(value => (
      {
        value,
        label: avalilableDateOpt.replace('{value}', value)
      }
    ));
  },
  watch: {
    selectedRentType (rentType) {
      this.$emit('rentType', rentType);
    },
    selectedRentDuration (duration) {
      this.$emit('rentDuration', duration);
    },
    selectedAvailableDateOpt (opt) {
      const delta = opt * 30 * 24 * 3600 * 1000;
      const date = new Date(Date.now() + delta).toISOString().substring(0, 10);
      this.$emit('availableDate', date);
    }
  },
  methods: {
    startLocationSearch () {
      loadCityZipcodeConfig()
        .then(res => this.__locationOptions = res)
        .finally(() => this.locationSearchDialogVis = true);
    },
    priceSlideChangeHandler (arr) {
      this.$emit('priceRange', arr);
    },
    surfaceSlideChangeHandler (arr) {
      this.$emit('surfaceRange', arr);
    },
    setRanges({ surfaceRange, priceRange }) {
      this.minPrice = priceRange[0], this.maxPrice = priceRange[1];
      this.minSurface = surfaceRange[0], this.maxSurface = surfaceRange[1];
      this.priceRange = priceRange.slice();
      this.surfaceRange = surfaceRange.slice();
    },
    locationSearchInputHandler (input) {
      if (!this.__locationOptions) return this.locationOptions = [];
      if (input.length < 3) return this.locationOptions = this.__locationOptions.slice(0, 27);
      const searchNormalTxt = isNaN(input);
      if (searchNormalTxt) {
        input = input.toLowerCase();
        this.locationOptions = this.__locationOptions.filter(it => it.searchKey.includes(input)).slice(0, 27);
      } else {
        this.locationOptions = this.__locationOptions.filter(it => it.searchKey.startsWith(input)).slice(0, 27);
      }
    },
    locationSearchSelectHandler (it) {
      this.$emit('location', it);
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  row-gap: 6px;
}
.location-options {
  flex-wrap: wrap;
  justify-content: flex-start;
  row-gap: 12px;
  column-gap: 4px;
  margin-top: 24px;
  .location-option-item {
    width: 32%;
    text-align: center;
    box-sizing: border-box;
    padding: 5px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    &:hover {
      border-color: var(--main-blue);
      color: var(--main-blue);
    }
  }
}
</style>
