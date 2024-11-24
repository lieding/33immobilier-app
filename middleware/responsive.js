export default function({ route, isDesktop, redirect }) {
  const path = route.path;

  if (path == "/") {
    return redirect(isDesktop ? "/pc_index" : "/m_index");
  }

  if (isDesktop) {
    switch (path) {
      case "/m_index":
        return redirect("/pc_index");
      case "/loginOrRegister":
        return redirect("/loginOrRegister");
      case "/m_search":
        return redirect("/search", route.query);
      case "/m_new_detail":
        return redirect("/new_detail", route.query);
      case "/m_second_hand_detail":
        return redirect("/second_hand_detail", route.query);
    }
  } else {
    switch (path) {
      case "/pc_index":
        return redirect("/m_index");
      case "/loginOrRegister":
        return redirect("/m_loginOrRegister");
      case "/search":
        return redirect("/m_search", route.query);
      case "/new_detail":
        return redirect("/m_new_detail", route.query);
      case "/second_hand_detail":
        return redirect("/m_second_hand_detail", route.query);
    }
  }
}
