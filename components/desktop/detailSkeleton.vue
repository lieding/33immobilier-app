<template>
  <el-skeleton animated class="skeleton-container full-w">
    <template slot="template">
      <div>
        <div class="flex first-line">
          <el-skeleton-item variant="image" class="full-h" style="width: 50%" />
          <div class="content">
            <div v-for="it in [0, 1, 2, 3, 4]" :key="it" class="flex justify-between align-center line">
              <el-skeleton-item variant="text" style="margin-right: 16px;" />
              <el-skeleton-item variant="text" style="width: 30%;" />
            </div>
          </div>
        </div>
        <el-skeleton-item variant="h3" style="width: 30%;margin-top: 24px;" class="row" />
        <el-skeleton-item variant="h3" style="width: 40%;" class="row" />
        <el-skeleton-item variant="h3" style="width: 30%;" class="row" />
        <el-skeleton-item variant="h3" style="width: 40%;" class="row" />
        <el-skeleton-item variant="h3" style="width: 50%;" class="row" />
      </div>
    </template>
  </el-skeleton>
</template>

<style lang="scss" scoped>
.skeleton-container {
  margin-bottom: 24px;
  .first-line {
    height: 360px;
    .content {
      flex: 1;
      margin-left: 24px;
      .line {
        height: 20px;
        margin-bottom: 16px;
        > div {
          height: 100%;
        }
      }
    }
  }
  .row {
    margin-bottom: 16px;
    display: block;
  }
}
</style>
