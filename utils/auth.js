const AuthLocalStorageKey = 'AUTH_INFO';

export function setLocalAuthInfo (info) {
  localStorage.setItem(AuthLocalStorageKey, JSON.stringify(info));
}

export function clearLocalAuthInfo () {
  localStorage.removeItem(AuthLocalStorageKey);
  clearAccessToken();
  clearRefreshToken();
}

const AccessTokenKey = 'ACCESS_TOKEN';

const RefreshTokenKey = 'REFRESH_TOKEN';

const CACHED_ACCESS_TOKEN_VERIFICATION_KEY= 'ACCESS_TOKEN_VERIFICATION';

export function setAccessToken (token) {
  if (token) {
    localStorage.setItem(AccessTokenKey, token);
    const timestamp = Date.now().toString();
    sessionStorage.setItem(CACHED_ACCESS_TOKEN_VERIFICATION_KEY, timestamp);
  }
}

export function clearAccessToken () {
  localStorage.removeItem(AccessTokenKey);
  sessionStorage.removeItem(CACHED_ACCESS_TOKEN_VERIFICATION_KEY);
}

export function setRefreshToken (token) {
  if (token) localStorage.setItem(RefreshTokenKey, token);
}

export function clearRefreshToken () {
  localStorage.removeItem(RefreshTokenKey);
}

export function getAccessToken () {
  return localStorage.getItem(AccessTokenKey);
}

export function getRefreshToken () {
  return localStorage.getItem(RefreshTokenKey);
}

export function getLocalAuthInfo () {
  try {
    const authRaw = localStorage.getItem(AuthLocalStorageKey);
    if (authRaw)
      return JSON.parse(authRaw);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function checkCachedAccessTokenValid () {
  const timestamp = sessionStorage.getItem(CACHED_ACCESS_TOKEN_VERIFICATION_KEY);
  if (!timestamp) return false;
  return Number(timestamp) +  3 * 24 * 3600 * 1000 > Date.now();
}
