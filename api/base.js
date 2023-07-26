const LOCAL_DEV_BASE_URL = 'http://localhost:8080/milliome/latest';
const LOCAL_DEV_JSP_URL = 'http://localhost:8080/milliome'; 
const BASE_URL = process.env.BASE_URL || LOCAL_DEV_BASE_URL;
const JSP_URL = process.env.JSP_URL || LOCAL_DEV_JSP_URL;
const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * 接口域名的管理
 */
const base = {    
    // sq: 'http://117.50.47.136:8090/milliome/latest',
    // sq: 'http://47.254.149.82/milliome/latest',
    // sq: 'http://192.168.3.84/milliome/latest',
    sq: IS_DEV ? LOCAL_DEV_BASE_URL : BASE_URL,
    jsp: IS_DEV ? LOCAL_DEV_JSP_URL : JSP_URL,
    bd: 'http://xxxxx22222.com/api'
}
export default base;