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
      case "/newhouse":
        if (route.query.house === "new") return redirect("/newList");
        if (route.query.house === "second_hand") return redirect("/anyEs");
      case "/rentHouse":
        return redirect("/renthouseList");
      case "/agentList":
        return redirect("/broker");
      case "/blogs":
        return redirect("/encrolopedia");
      case "/instrument":
        return redirect("/promoteLists");
      case "/service":
        return redirect("/serve");
      case "/InRegardTo":
        return redirect("/aboutUS");
      case "/ordIssue":
        return redirect("/sellers");
      case "/Details":
        return redirect("/newDetails", { flag: route.query.id });
      case "/ordDetails":
        return redirect("/seconHandHous", { flag: route.query.id });
      case "/rentDetails":
        return redirect("/renting", { flag: route.query.id });
      case "/article":
        return redirect("/essaydetails", { flag: route.query.id });
    }
  } else {
    switch (path) {
      case "/pc_index":
        return redirect("/m_index");
      case "/loginOrRegister":
        return redirect("/m_loginOrRegister");
      case "/newList":
        return redirect("/newhouse", { house: "new" });
      case "/anyEs":
        return redirect("/newhouse", { house: "second_hand" });
      case "/renthouseList":
        return redirect("/rentHouse");
      case "/broker":
        return redirect("/agentList");
      case "/encrolopedia":
        return redirect("/blogs");
      case "/promoteLists":
        return redirect("/instrument");
      case "/serve":
        return redirect("/service");
      case "/aboutUS":
        return redirect("/InRegardTo");
      case "/sellers":
        return redirect("/ordIssue");
      case "/newDetails":
        return redirect("/Details", { id: route.query.flag });
      case "/seconHandHous":
        return redirect("/ordDetails", { id: route.query.flag });
      case "/renting":
        return redirect("/rentDetails", { id: route.query.flag });
      case "/essaydetails":
        return redirect("/article", { id: route.query.flag });
    }
  }
}
