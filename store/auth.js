import {
  setLocalAuthInfo,
  clearLocalAuthInfo,
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearAccessToken,
  clearRefreshToken,
  getLocalAuthInfo,
  checkCachedAccessTokenValid
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
      setAccessToken(authInfo.token);
      // setRefreshToken(authInfo.RefreshToken);
      setLocalAuthInfo(authInfo.user);
      state.authInfo = authInfo.user;
    } else {
      clearLocalAuthInfo();
    }
  },
  logout (state) {
    state.authInfo = null;
    state.authorized = false;
    clearLocalAuthInfo();
  }
}

export const actions = {
  verifyToken({ commit, state }) {
    if (state.authorized) return;
    const accessToken = getAccessToken();
    if (!accessToken) return;
    const cachedTokenVerificationValid = checkCachedAccessTokenValid();
    const userInfo = getLocalAuthInfo();
    if (cachedTokenVerificationValid)
      return commit('setAuth', {
        authorized: true,
        authInfo: { user: userInfo }
      });
    verifyToken(accessToken)
      .then(res => {
        const data = res || {};
        setAccessToken(accessToken);
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
  },
  logout ({ commit }) {
    commit('logout')
  },
}
