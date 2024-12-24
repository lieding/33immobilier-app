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

export function login (params) {
  return axios.get("/user-login", { params }).then(res => res.data);
}

export function verifyToken (accessToken) {
  return axios.get(
    "/verify-token",
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
}
