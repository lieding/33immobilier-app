<template functional>
  <van-dialog :value="props.visible" :show-confirm-button="false" :close-on-click-overlay="false">
    <div class="loading-dialog-content">
      <van-loading type="spinner" />
      <p class="text">{{ props.loadingText }}</p>
    </div>
  </van-dialog>
</template>

<style lang="scss" scoped>
.loading-dialog-content {
  margin: .4rem 0 .3rem;
  text-align: center;
  .text {
    margin-top: .2rem;
  }
}
</style>
