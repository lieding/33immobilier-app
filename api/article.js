import axios from "~/common/http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块
const article = {
  // 查询所有走势图的地区

  trendRegion() {
    return axios.get('/homePage/trendRegion');
  },
  getRegionalNew() {
    return axios.get('/regional/getRegionalNew');
  },
  //根据地区名查询走势
  getTrendByRegion(params) {
    return axios.get(
      '/homePage/getTrendByRegion',
      { params }
    );
  },
  //获取城市 大省+小省
  getAddress() {
    return axios.get('/share/getAddress');
  },
  // 还贷能力计算
  loanCapability(params) {
    return axios.post(
      '/calculator/loanCapability',
      qs.stringify(params)
    );
  },
  // 还贷计算
  repayALoan(params) {
    return axios.get('/calculator/repayALoan', { params });
  },
  // 获取首页数据
  getHomePageInfo() {
    return axios.get('/homePage/shouye', {
      // params: params
    });
  },
  // 获取新房搜索
  NewgetSearch(params) {
    return axios.get('/newHousing/getSearch', { params });
  },
  // 获取新房列表
  getList(params) {
    return axios.get('/newHousing/getList', { params });
  },
  // 获取新房详情页面
  getInfo(params) {
    return axios.get('/newHousing/getInfo', { params });
  },

  OrdSearch(params) {
    return axios.get('/home/getSearch', { params });
  },
  // 获取二手房列表
  OrdList(params) {
    return axios.get('/home/getList', { params });
  },
  // 获取二手房详情页面
  OrdInfo(params) {
    return axios.post(
      '/home/getPostListingData',
      qs.stringify(params)
    );
  },
  // 获取租房列表
  getRentingList(params) {
    return axios.post(
      '/renting/getRentingList',
      qs.stringify(params)
    );
  },
  //获取搜索数据
  getSearch(params) {
    return axios.post('/renting/getSearch', qs.stringify(params));
  },
  // 获取二手房详情页面
  OrdInfo(params) {
    return axios.post(
      '/home/getPostListingData',
      qs.stringify(params)
    );
  },
  //获取文章集合
  WikigetList(params) {
    return axios.get('/wiki/getList', { params });
  },
  // 获取文章标题
  WikigetRigth(params) {
    return axios.get('/wiki/getRigth', { params });
  },
  // 获取文章详细信息
  WikigetInfo(params) {
    return axios.get('/wiki/getInfo', { params });
  },
  // 经纪人
  getAgentList(params) {
    return axios.get('/agent/getAgentList', { params });
  },
  // 联系我们  /contact/contactUs
  contactUs(params) {
    return axios.post('/contact/contactUs', qs.stringify(params));
  },
  // 服务列表展示
  getFacilitatorList(params) {
    return axios.post(
      '/facilitator/getFacilitatorList',
      qs.stringify(params)
    );
  },
  // 二手房发布
  homeSave(params) {
    return axios.post('/issued/homeSave', qs.stringify(params));
  },
  // 租房发布
  rentingSave(params) {
    return axios.post('/issued/rentingSave', qs.stringify(params));
  },
  //多张上传、
  addPhotoList(params) {
    return axios.post('/file/addPhotoList', qs.stringify(params));
  },
  //单张上传
  addPhoto(params) {
    return axios.post('/file/addPhoto', qs.stringify(params));
  },
  // post提交
  login(params) {
    return axios.post('/accesstoken', qs.stringify(params));
  },
  // 其他接口…………
  //szg  getPostListingData
  getPostListingData(params) {
    return axios.post(
      '/home/getPostListingData',
      qs.stringify(params)
    );
  },
  getInFo(params) {
    return axios.get('/renting/getInFo', { params });
  },
  // getProvinAll(params) {
  //   return axios.post('/share/getAddress', qs.stringify(params));
  // },
  loanCapability(params) {
    return axios.get('/calculator/loanCapability', { params });
  },
  getListWz(params) {
    return axios.get('/wiki/getList', { params });
  },
  getRigthLit(params) {
    return axios.post('/wiki/getRigth', qs.stringify(params));
  },
  // wiki/getInfo
  getInfoLis(params) {
    return axios.get('/wiki/getInfo', { params });
  },
  // 新房192.168.3.94/latest/newHousing/getSearch
  getSearchNew() {
    return axios.get('/newHousing/getSearch');
  },
  // 新房/newHousing/getList
  getListnew(params) {
    return axios.get('/newHousing/getList', { params });
  },
  // 新newHousing/getInfo
  getInfoNewHous(params) {
    return axios.get('/newHousing/getInfo', { params });
  },
  // ji 192.168.3.94/latest/calculator/repayALoan
  repayALoanJs(params) {
    return axios.get('/calculator/repayALoan', { params });
  },
  // 192.168.3.94/latest//issued/homeSave  二手
  homeSaveS(params) {
    return axios.post('/issued/homeSave', qs.stringify(params));
  },
  // 租房192.168.3.94/latest//issued/rentingSave
  rentingSave(params) {
    return axios.post('/issued/rentingSave', qs.stringify(params));
  },
  //192.168.3.94/latest/renting/getSearch
  getSearchEs() {
    return axios.get('/renting/getSearch');
  },
  // 192.168.3.94/latest//renting/getRentingList 租房详情
  getRentingList(params) {
    return axios.get('/renting/getRentingList', { params });
  },
  // 192.168.3.94/latest/agent/getAgentList 经纪人
  getAgentListJJR(params) {
    return axios.get('/agent/getAgentList', { params });
  },
  // 192.168.3.94/latest/home/getSearch 搜索二手
  getSearchESF(params) {
    return axios.post('/home/getSearch', qs.stringify(params));
  },
  // 192.168.3.94/latest/home/getList  ershou列表
  getListERSLB(params) {
    return axios.post('/home/getList', qs.stringify(params));
  },
  // 192.168.3.94/latest/regional/getRegional
  getRegional() {
    return axios.get('/regional/getRegional');
  },
  // 发送文件  192.168.3.94/latest//contact/SendEmail
  SendEmaila(params) {
    return axios.post('/contact/SendEmail', qs.stringify(params));
  },
  // 192.168.3.94/latest/latest/calculator/getRate  获取所有利率
  getRate() {
    return axios.get('/calculator/getRate');
  }
};

export default article;
