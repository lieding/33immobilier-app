import axios from "~/common/http"; // 导入http中创建的axios实例

export function createUserByGoogle (data) {
  return axios.post(
    "/user/createUserByGoogle",
    data,
    { headers: { 'Content-Type': 'application/json' } },
  ).then(res => res.data.data); 
}

export function createUser (data) {
  return axios.post(
    "/user/createUser",
    data,
    { headers: { 'Content-Type': 'application/json' } },
  ).then(res => res.data.data);
}

export function login (loginName, password) {
  return axios.get(
    "/user/login",
    { params: { loginName, password } },
  ).then(res => res.data.data);
}

export function verifyToken (accessToken, refreshToken) {
  return axios.get(
    "/user/verify-refresh-token",
    { params: { accessToken, refreshToken } },
  ).then(res => res.data.data);
}