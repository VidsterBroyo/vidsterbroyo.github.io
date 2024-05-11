

document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState != "visible") {
      document.title = "get back in here"
      document.getElementById("favicon").href = "img/angryFavicon.jpg"
    } else {
        document.title = "vidsterbroyo"
    }
  });