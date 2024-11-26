<template>
  <van-slider range :value="value" active-color="#ee0a24" :min="minValue" :max="maxValue" @change="handler">
    <template #left-button>
      <div class="custom-button">{{ fmoney(value[0]) }}</div>
    </template>
    <template #right-button>
      <div class="custom-button">{{ fmoney(value[1]) }}</div>
    </template>
  </van-slider>
</template>

<script>
import { fmoney } from '../../utils';

export default {
  props: {
    modelValue: {
      required: true,
      type: Array,
      default: () => ([])
    },
    minValue: {
      required: true,
      type: Number,
    },
    maxValue: {
      required: true,
      type: Number
    }
  },
  data () {
    return { value: [] };
  },
  watch: {
    modelValue: {
      handler (val) {
        this.value = val;
      },
      immediate: true,
      deep: true,
    },
  },
  created () {
    this.fmoney = fmoney;
  },
  methods: {
    handler(data) {
      this.$emit('update:modelValue', data);
      this.$emit('change', data);
    },
  }
}
</script>

<style lang="css" scoped>
.van-slider {
  box-sizing: border-box;
  padding: 0 .4rem;
}
.custom-button {
  width: max-content;
  padding: 0 6px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>
