<template>
  <div>
    <nuxt />
  </div>
</template>

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
  //  border: none;
  font-family: "Microsoft Yahei", sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  &:focus {
    outline: none;
  }
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

html,
body {
  height: 100%;
  width: 100%;
  // background-color: #F5F5F5;
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
//内容盒子
.contentBox {
  padding: 17px 40px 0 0;
}
.contentBox1 {
  padding: 21px 40px 0 0;
}
//
.contentTop {
  margin-bottom: 20px;
}
/*-----------弹窗---------*/
.el-message-box__btns ::v-deep .el-button--primary {
  color: #fff;
  background-color: #4984fc !important;
  border-color: #4984fc !important;
}
/*-----------------各种按钮样式--------------------------*/
//查询按钮
.search {
  width: 109px;
  height: 36px;
  background: rgba(73, 132, 252, 1);
  border: 0;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  line-height: 36px;
  padding: 0;
}

//导出按钮--创建短信-------添加用户
.export {
  color: rgba(73, 132, 252, 1);
  border: 2px solid rgba(73, 132, 252, 1);
  background: #fff;
  line-height: 34px !important;
  width: 109px;
  height: 36px;
  padding: 0;
  font-size: 16px;
}

//取消按钮   确定按钮 样式
.cancel,
.sure {
  width: 130px !important;
  height: 40px !important;
  border: 0 !important;
  font-weight: 400;
  padding-top: 0 !important;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
  margin-top: 20px;
}
//取消
.cancel {
  background: rgba(229, 229, 229, 1);
  color: rgba(102, 102, 102, 1);
  margin-left: 30px !important;
  border-radius: 4px;
}
//确认按钮
.sure {
  background: rgba(73, 133, 255, 1);
  border-radius: 6px;
  //  margin-left:77px!important;
  color: #fff;
}
//弹窗 按钮
.popUps {
  width: 130px;
  height: 40px;
  border-radius: 6px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
}
.el-dialog__headerbtn .el-dialog__close {
  display: none !important;
}

/*-------------------------表格-------------样式------------------*/
//文本域  禁止拉伸
textarea {
  resize: none !important;
  height: 100%;
}
//表格阴影
.el-table {
  box-shadow: 0px 1px 18px 0px rgba(73, 133, 255, 0.2);
}
.table {
  border-radius: 6px;
  width: 99%;
}
/*表格--操作样式*/
.operate {
  cursor: pointer;
}
//表格边框
// td,th{
// border-right:1px solid #E6E5E5!important;
//  border-bottom:0!important;

// }
//按钮高度
//.el-button{
//  height:36px;
//  line-height:36px;
//  padding:0!important;
//  width: 155px;
//  text-align: center;
//  font-size:18px;
//  font-weight:400;
//}
//th 字体样式
.el-table thead {
  color: #000;
  font-size: 18px;
  font-weight: 400;
}
//tr 字体样式
.el-table {
  font-size: 16px;
  font-weight: 400;
  color: #333333;
}
//表格 行 高度
.el-table th,
.el-table tr {
  height: 60px !important;
}
//form  label字体样式
.el-form-item__label {
  color: #333;
  font-size: 16px;
  font-weight: 400;
}
//form  label间距
.el-form-item {
  margin-bottom: 20px;
}
//form  input 样式
.el-input__inner {
  color: #333;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 6px;
  line-height: 36px;
}

/*-------------弹窗--------样式---------*/
.el-dialog {
  //弹窗圆角
  border-radius: 10px;
  //form  input  textarea 样式
  .el-input__inner,
  .el-textarea__inner {
    border: 1px solid rgba(237, 237, 237, 1);
    color: #333;
    background: #f7f7f7;
  }
}
//弹窗标题
.el-dialog__title {
  font-size: 20px;
  font-weight: 400;
  color: #000;
  line-height: 0;
}
//弹窗内容
.el-dialog--center .el-dialog__body {
  padding: 20px 53px 30px 48px;
  color: #333333;
}
.el-textarea__inner {
  height: 110px;
}
input[type="number"] {
  -moz-appearance: textfield !important;
}
/*---------------分页样式------------------------------*/
//分页
.pageManage {
  //  height:40px;

  overflow: auto;
  margin: 40px 0 !important;
  > .left:nth-of-type(1) {
    padding: 0 !important;
    margin-left: 40% !important;
  }
  > .left:nth-of-type(2) {
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    padding-top: 5px;
    //输入页码 样式
    .pageInput {
      width: auto;
      input {
        width: 50px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        margin: 0 4px;
        border-radius: 0;
      }
    }
    //页码  确定按钮 样式
    .el-button {
      padding: 0;
      width: 50px;
      height: 30px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(255, 255, 255, 1);
      line-height: 30px;
      margin-left: 4px;
      border-radius: 0;
      font-weight: 400;
      color: #333;
    }
  }
  .el-icon {
    display: inline-block !important;
  }
  //分页li 样式
  .el-pagination.is-background .el-pager li {
    background: #fff;
    color: #555;
    font-size: 16px;
    font-weight: 400;
    margin-left: 0;
    margin-right: 1px;
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  //分页li选中 样式
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #689afd;
    color: #fff;
  }
  //上一页 样式
  .el-pagination.is-background .btn-prev {
    margin: 0;
    margin-right: 30px;
    height: 40px;
  }
  //下一页 样式
  .el-pagination.is-background .btn-next {
    margin: 0 27px 0 30px;
    height: 40px;
  }
}

// element-ui
.centerS {
  margin: 0 auto !important;
  width: 1200px;
}
.centerSs {
  margin: 0 auto;
  width: 1100px;
}
.centerSss {
  margin: 0 auto;
  width: 1300px;
}
.el-input__inner {
  border-radius: 0;
  height: 62px;
}
.el-carousel__arrow {
  height: 84px !important;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.42);
}
.el-icon-arrow-right:before,
.el-icon-arrow-left:before {
  font-size: 20px;
}
.inputs {
  .el-input__inner {
    border-radius: 0;
    height: 30px;
    background-color: rgba(233, 233, 233, 1);
  }
}
.couters {
  .el-input__inner {
    border-radius: 0;
    height: 37px;
    background-color: rgba(233, 233, 233, 1);
  }
}
.broker {
  .el-input__inner {
    border-radius: 0;
    height: 54px;
    background-color: rgba(233, 233, 233, 1);
    font-size: 18px;
  }
  .el-textarea__inner {
    background-color: rgba(233, 233, 233, 1);
  }
  .el-icon-s-custom:before,
  .el-icon-message:before,
  .el-icon-phone:before {
    color: blue;
  }
  .el-textarea__inner {
    height: 180px !important;
    font-size: 18px;
  }
}
.selectSm {
  .el-input__inner {
    height: 36px !important;
    width: 180px;
    font-size: 18px;
    background-color: #fff;
  }
  .el-input {
    width: 180px;
  }
  .el-checkbox-group {
    display: inline-block;
    vertical-align: top;
    width: 85%;
  }
}
.inputSo {
  .el-input__inner {
    height: 36px !important;
    width: 800px;
    font-size: 18px;
    background-color: #fff;
  }
  .el-input {
    margin-left: 10%;
    width: 800px;
    display: inline-block;
  }
  .el-checkbox-group {
    display: inline-block;
    vertical-align: top;
    width: 800px;
  }
}
.areaLis {
  .el-slider {
    width: 50%;
    display: inline-block;
    vertical-align: middle;
  }
}
.el-input__icon {
  line-height: 100%;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.rightSs {
  .el-table thead {
    font-size: 12px;
    color: #292929;
  }
}</style
>>
