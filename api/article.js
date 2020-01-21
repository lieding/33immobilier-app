import base from './base'; // 导入接口域名列表
import axios from '../commen/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const article = {    
    // 查询所有走势图的地区   
    
    trendRegion () {        
        return axios.get(`${base.sq}/homePage/trendRegion`);    
    },  
    getRegionalNew(params) {
        return axios.post(`${base.sq}/regional/getRegionalNew`, qs.stringify(params))
    },
    //根据地区名查询走势
    getTrendByRegion (params) {        
        return axios.post(`${base.sq}/homePage/getTrendByRegion`, qs.stringify(params));    
    }, 
    //获取城市 大省+小省
    getAddress (params) {        
        return axios.post(`${base.sq}/share/getAddress`, qs.stringify(params));    
    }, 
    // 还贷能力计算
    loanCapability (params) {        
        return axios.post(`${base.sq}/calculator/loanCapability`, qs.stringify(params)); 
    },
    // 还贷计算
    repayALoan (params) {        
        return axios.post(`${base.sq}/calculator/repayALoan`, qs.stringify(params)); 
    },
    // 获取首页数据
    getHomePageInfo () {        
        return axios.get(`${base.sq}/homePage/shouye`,   {            
            // params: params        
        });    
    },
    // 获取新房搜索
    NewgetSearch (params) {        
        return axios.post(`${base.sq}/newHousing/getSearch`, qs.stringify(params)); 
    },
    // 获取新房列表  
    getList (params) {        
        return axios.post(`${base.sq}/newHousing/getList`, qs.stringify(params)); 
    },
    // 获取新房详情页面
    getInfo (params) {        
        return axios.post(`${base.sq}/newHousing/getInfo`, qs.stringify(params)); 
    },
  
    OrdSearch (params) {        
        return axios.post(`${base.sq}/home/getSearch`, qs.stringify(params)); 
    },
      // 获取二手房列表  
    OrdList (params) {        
        return axios.post(`${base.sq}/home/getList`, qs.stringify(params)); 
    },
    // 获取二手房详情页面
    OrdInfo (params) {        
        return axios.post(`${base.sq}/home/getPostListingData`, qs.stringify(params)); 
    },
    // 获取租房列表  
    getRentingList (params) {        
        return axios.post(`${base.sq}/renting/getRentingList`, qs.stringify(params)); 
    },
    // 获取租房详情 
    getInFo (params) {        
        return axios.post(`${base.sq}/renting/getInFo`, qs.stringify(params)); 
    },
    //获取搜索数据  
    getSearch (params) {        
        return axios.post(`${base.sq}/renting/getSearch`, qs.stringify(params)); 
    },
    // 获取二手房详情页面
    OrdInfo (params) {        
        return axios.post(`${base.sq}/home/getPostListingData`, qs.stringify(params)); 
    },
    //获取文章集合 
    WikigetList (params) {        
        return axios.post(`${base.sq}/wiki/getList`, qs.stringify(params)); 
    },
    // 获取文章标题
    WikigetRigth (params) {        
        return axios.post(`${base.sq}/wiki/getRigth`, qs.stringify(params)); 
    },
    // 获取文章详细信息
    WikigetInfo (params) {        
        return axios.post(`${base.sq}/wiki/getInfo`, qs.stringify(params)); 
    },
    // 经纪人
    getAgentList (params) {        
        return axios.post(`${base.sq}/agent/getAgentList`, qs.stringify(params)); 
    },
    // 联系我们  /contact/contactUs
    contactUs (params) {        
        return axios.post(`${base.sq}/contact/contactUs`, qs.stringify(params)); 
    },
    // 服务列表展示  
    getFacilitatorList (params) {        
        return axios.post(`${base.sq}/facilitator/getFacilitatorList`, qs.stringify(params)); 
    },
    // 二手房发布
    homeSave(params){
        return axios.post(`${base.sq}/issued/homeSave`, qs.stringify(params)); 
    },
      // 租房发布
    rentingSave(params){
        return axios.post(`${base.sq}/issued/rentingSave`, qs.stringify(params)); 
    },
   //多张上传、
   addPhotoList(params){
      return axios.post(`${base.sq}/file/addPhotoList`, qs.stringify(params)); 
   },
  //单张上传
    addPhoto(params){
        return axios.post(`${base.sq}/file/addPhoto`, qs.stringify(params)); 
    },  
      // post提交    
    login (params) {        
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));    
    },
    // 其他接口…………
    //szg  getPostListingData
    getPostListingData(params) {
        return axios.post(`${base.sq}/home/getPostListingData`, qs.stringify(params)
        )
    },
    getInFo(params) {
        return axios.post(`${base.sq}/renting/getInFo`, qs.stringify(params)
        )
    },
    getProvinAll(params) {
        return axios.post(`${base.sq}/share/getAddress`, qs.stringify(params))
    },
    getAddress(params) {
        return axios.post(`${base.sq}/share/getAddress`, qs.stringify(params))
    },
    loanCapability(params) {
        return axios.post(`${base.sq}/calculator/loanCapability`, qs.stringify(params))
    },
    getListWz(params) {
        return axios.post(`${base.sq}/wiki/getList`, qs.stringify(params))
    },
    getRigthLit(params) {
        return axios.post(`${base.sq}/wiki/getRigth`, qs.stringify(params))
    },
    // wiki/getInfo
    getInfoLis(params) {
        return axios.post(`${base.sq}/wiki/getInfo`, qs.stringify(params))
    },
    // 新房192.168.3.94/latest/newHousing/getSearch
    getSearchNew(params) {
        return axios.post(`${base.sq}/newHousing/getSearch`, qs.stringify(params))
    },
    // 新房/newHousing/getList
    getListnew(params) {
        return axios.post(`${base.sq}/newHousing/getList`, qs.stringify(params))
    },
    // 新newHousing/getInfo
    getInfoNewHous(params) {
        return axios.post(`${base.sq}/newHousing/getInfo`, qs.stringify(params))
    },
    // ji 192.168.3.94/latest/calculator/repayALoan
    repayALoanJs(params) {
        return axios.post(`${base.sq}/calculator/repayALoan`, qs.stringify(params))
    },
    // 192.168.3.94/latest//issued/homeSave  二手
    homeSaveS(params) {
        return axios.post(`${base.sq}/issued/homeSave`, qs.stringify(params))
    },
    // 租房192.168.3.94/latest//issued/rentingSave
    rentingSave(params) {
        return axios.post(`${base.sq}/issued/rentingSave`, qs.stringify(params))
    },
    //192.168.3.94/latest/renting/getSearch 
    getSearchEs(params) {
        return axios.post(`${base.sq}/renting/getSearch`, qs.stringify(params))
    },
    // 192.168.3.94/latest//renting/getRentingList 租房详情
    getRentingList(params) {
        return axios.post(`${base.sq}/renting/getRentingList`, qs.stringify(params))
    },
    // 192.168.3.94/latest/agent/getAgentList 经纪人
    getAgentListJJR(params) {
        return axios.post(`${base.sq}/agent/getAgentList`, qs.stringify(params))
    },
    // 192.168.3.94/latest/home/getSearch 搜索二手
    getSearchESF(params) {
        return axios.post(`${base.sq}/home/getSearch`, qs.stringify(params))
    },
    // 192.168.3.94/latest/home/getList  ershou列表
    getListERSLB(params) {
        return axios.post(`${base.sq}/home/getList`, qs.stringify(params))
    },
    // 192.168.3.94/latest/regional/getRegional
    getRegional(params) {
        return axios.post(`${base.sq}/regional/getRegional`, qs.stringify(params))
    },
    // 发送文件  192.168.3.94/latest//contact/SendEmail
    SendEmaila(params) {
        return axios.post(`${base.sq}/contact/SendEmail`, qs.stringify(params))
    },
    // 192.168.3.94/latest/latest/calculator/getRate  获取所有利率
    getRate(params) {
        return axios.post(`${base.sq}/calculator/getRate`, qs.stringify(params))
    },

   


}

export default article;