const AuthLocalStorageKey = 'AUTH_INFO';

export function setLocalAuthInfo (info) {
  localStorage.setItem(AuthLocalStorageKey, JSON.stringify(info));
}

export function clearLocalAuthInfo () {
  localStorage.removeItem(AuthLocalStorageKey);
}

const AccessTokenKey = 'ACCESS_TOKEN';

const RefreshTokenKey = 'REFRESH_TOKEN';

export function setAccessToken (token) {
  if (token) localStorage.setItem(AccessTokenKey, token);
}

export function clearAccessToken () {
  localStorage.removeItem(AccessTokenKey);
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