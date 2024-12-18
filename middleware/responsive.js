import { locales } from '../i18n/index';

const I18N_CODES = locales.map(it => it.code);

/**
 * @param {Object} params
 * @param {{ path: String }} params.route
 * @param {Boolean} params.isDesktop
 * @param {Function} params.redirect
*/
export default function({ route, isDesktop, redirect }) {
  let path = route.path;

  if (path == "/") {
    return redirect(isDesktop ? "/pc_index" : "/m_index");
  }

  if (I18N_CODES.some(prefix => path.replace(prefix, '') === '/')) {
    const redirectPath = path + (isDesktop ? "/pc_index" : "/m_index");
    return redirect(redirectPath);
  }

  const lastIdx = path.lastIndexOf('/');
  const prefix = path.substring(0, lastIdx);
  path = path.substring(lastIdx);

  if (isDesktop) {
    switch (path) {
      case "/m_index":
        return redirect(prefix + "/pc_index");
      case "/loginOrRegister":
        return redirect(prefix + "/loginOrRegister");
      case "/m_search":
        return redirect(prefix + "/search", route.query);
      case "/m_new_detail":
        return redirect(prefix + "/new_detail", route.query);
      case "/m_second_hand_detail":
        return redirect(prefix + "/second_hand_detail", route.query);
      case "/m_search_store":
        return redirect(prefix + "/search_store", route.query);
    }
  } else {
    switch (path) {
      case "/pc_index":
        return redirect(prefix + "/m_index");
      case "/loginOrRegister":
        return redirect(prefix + "/m_loginOrRegister");
      case "/search":
        return redirect(prefix + "/m_search", route.query);
      case "/new_detail":
        return redirect(prefix + "/m_new_detail", route.query);
      case "/second_hand_detail":
        return redirect(prefix + "/m_second_hand_detail", route.query);
      case "/search_store":
        return redirect(prefix + "/m_search_store", route.query);
    }
  }
}
