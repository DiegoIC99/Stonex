const EMPLOYEES_LINK = "templates/employees.html";
const COMMISSIONS_LINK = "templates/commissions.html";

function navigationLinks() {
  const $onPressEmployeesLink = $(".link--employees");
  const $onPressCommissionsLink = $(".link--commissions");
  const $menuPressable = $(".js--menu-pressable");
  const $subNav = $(".subnav-items");
  const $contentManagement = $(".contentManagement");

  $menuPressable.on("click", () => {
    $(".nav-bar.nav-sidebar").toggleClass(
      "nav-bar--is-open nav-bar--is-closed"
    );
    $(".page-navbar").toggleClass("nav-bar--is-open nav-bar--is-closed");
    $subNav.removeClass("is-subnav-open");
    $(".navigation-icon").removeClass("subnav-icon-open");
  });

  $onPressEmployeesLink.on("click touchend", (e) =>
    navigateBetweenScreens(EMPLOYEES_LINK, e, "employees")
  );
  $onPressCommissionsLink.on("click touchend", (e) =>
    navigateBetweenScreens(COMMISSIONS_LINK, e, "commissions")
  );

  // set the default navigation value
  if (!localStorage.getItem("navigationRoute")) {
    localStorage.setItem("navigationRoute", "home");
  } else {
    const getRoute = localStorage.getItem("navigationRoute");
    $(`.link--${getRoute}`).not(".sub-nav").addClass("is-active");
    $(`.link--${getRoute} .navigation-icon`).addClass("subnav-icon-open");
    $(`.container--subnav-${getRoute}`).addClass("is-subnav-open");

    if ($(".subnav-items").hasClass("is-subnav-open")) {
      $(".page-navbar, .nav-bar.nav-sidebar").addClass("nav-bar--is-open");
    }
    $contentManagement.load(`templates/${getRoute}.html`);
  }
}

function navigateBetweenScreens(link, e, route) {
  const $contentManagement = $(".contentManagement");
  const $this = $(e.currentTarget);

  if ($this.hasClass("sub-nav")) {
    const $arrowIconOnNavigation = $($this).find(".navigation-icon");
    const $subnavToOpen = $($this).next(".subnav-items");

    $(".page-navbar, .nav-bar.nav-sidebar").addClass("nav-bar--is-open");
    $arrowIconOnNavigation.toggleClass("subnav-icon-open");
    $subnavToOpen.toggleClass("is-subnav-open");
  } else {
    $(".subnav-link").removeClass("is-active");
    $(".nav-bar--link").removeClass("is-active");

    $contentManagement.load(link);
    $($this).addClass("is-active");

    localStorage.setItem("navigationRoute", route);
  }
}

navigationLinks();
