import {
  setLocalAuthInfo,
  clearLocalAuthInfo,
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearAccessToken,
  clearRefreshToken,
  getLocalAuthInfo
} from '../utils/auth';
import { verifyToken } from '../api/account';

export const state = () => ({
  authorized: false,
  authInfo: null,
})

export const getters = {
  curAuthInfo(state) {
    return state.authorized && state.authInfo;
  }
}

export const mutations = {
  setAuth(state, payload) {
    let { authorized = false, authInfo = null } = payload;
    if (authorized && authInfo?.user) {
      state.authorized = true;
      setAccessToken(authInfo.AccessToken);
      setRefreshToken(authInfo.RefreshToken);
      setLocalAuthInfo(authInfo.user);
      state.authInfo = authInfo.user;
    } else {
      clearLocalAuthInfo();
    }
  }
}

export const actions = {
  verifyToken({ commit, state }) {
    if (state.authorized) return;
    const accessToken = getAccessToken(),
      refreshToken = getRefreshToken();
    if (!accessToken || !refreshToken) return;
    verifyToken(accessToken, refreshToken)
      .then(res => {
        const data = res || {};
        const userInfo = getLocalAuthInfo();
        if (userInfo)
          commit('setAuth', {
            authorized: true,
            authInfo: { ...data, user: userInfo }
          });
      })
      .catch((err) => {
        console.error(err);
        clearAccessToken();
        clearRefreshToken();
      });
  },
  setAuth ({ commit }, params) {
    commit('setAuth', { ...params })
  }
}