<template>
  <div class="flex wrap wrapper" :class="{ 'justify-between': !display }">
    <span v-for="key in equipmentConfig" :key="key" class="item" :class="{ display: display }" @click.stop="switchStatus(key)">
      <img :src="getEquipmentPic(key, display ? false : !status[key])" />
    </span>
  </div>
</template>

<script>
import { EquipmentConfig, getEquipmentPic } from '../utils/rent';
export default {
  props: {
    display: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    const status = {};
    for (const key in EquipmentConfig)
      status[key] = false;
    return { status };
  },
  created () {
    this.equipmentConfig = Object.keys(EquipmentConfig);
    this.getEquipmentPic = getEquipmentPic;
    if (this.display) {
      this.equipmentConfig = Object.keys(this.config);
    }
  },
  methods: {
    switchStatus (key) {
      if (this.display) return;
      this.status[key] = !this.status[key];
      this.status = { ...this.status };
    },
    getStatus () {
      const ret = {};
      for (const [k, v] of Object.entries(this.status))
        if (v) ret[k] = true;
      return ret;
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  row-gap: 16px;
  .item {
    display: inline-flex;
    width: 25%;
    align-items: center;
    &.display {
      width: min-content;
      margin-right: 16px;
    }
    img {
      height: 24px;
      max-width: 28px;
      object-fit: contain;
    }
  }
}
</style>
