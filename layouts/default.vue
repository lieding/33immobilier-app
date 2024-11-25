<template>
  <div>
    <template v-if="isDesktop">
      <top-header></top-header>
    </template>
    <template v-else-if="isMobile">
      <mobile-header></mobile-header>
    </template>
    <nuxt />
    <template v-if="isDesktop && desktopFooterVis">
      <Footer />
    </template>
  </div>
</template>

<script>
import TopHeader from '../components/PcIndex/header.vue';
import Footer from '../components/PcIndex/footer.vue';
import MobileHeader from '../components/Mindex/header.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('auth');

export default {
  components: { TopHeader, Footer, MobileHeader },
  computed: {
    isDesktop () {
      return this.$device.isDesktop;
    },
    isMobile () {
      return this.$device.isMobile;
    },
    desktopFooterVis () {
      return this.$route.path !== '/search';
    }
  },
  mounted () {
    this.verifyToken();
  },
  methods: {
    ...mapActions(['verifyToken'])
  }
}
</script>

<style lang="scss">
body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
dd,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  font-family: "Microsoft Yahei", sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  &:focus {
    outline: none;
  }
  font-size: 16px;
}

:root {
  --main-blue: #2746D1;
  --white-color: #fff;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

input[type="button"],
input[type="submit"],
input[type="search"],
input[type="reset"] {
  -webkit-appearance: none;
}

textarea {
  -webkit-appearance: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}

html,
body {
  height: 100%;
  width: 100%;
}

.fillcontain {
  height: 100%;
  width: 100%;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}

.desktop-placed-center {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.clear {
  zoom: 1;
}

.back_img {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.margin {
  margin: 0 auto;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inline-block {
  display: inline-block;
}

.left {
  float: left;
}

.right {
  float: right;
}

.hide {
  display: none;
}

.show {
  display: block;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flex {
  display: flex;
}

.wrap {
  flex-wrap: wrap;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.pointer {
  cursor: pointer;
}

.text-center {
  text-align: center;
}

.bold {
  font-weight: bold;
}

.full-w {
  width: 100%;
}

.full-h {
  height: 100%;
}

.border-box {
  box-sizing: border-box;
}

.white {
  color: var(--white-color);
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.micco-select {
  border: unset;
  .el-input__inner {
    text-align: center;
    font-size: 12px;
    border: 0px;
    background-color: #e9e9e9;
    vertical-align: bottom;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #2a2a2a !important;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #2a2a2a !important;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #2a2a2a !important;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #2a2a2a !important;
  }
  &.customized {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #e9e9e9;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 8px 0 32px;
    .label {
      font-size: 12px;
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    i {
      color: #C0C4CC;
    }
  }
}

</style>
