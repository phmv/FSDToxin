import "./nav-menu.scss";

document.querySelectorAll(".nav-menu").forEach((navMenu) => {
  let navMenuList = navMenu.querySelector(".nav-menu__list");
  let navMenuButton = navMenu.querySelector(".nav-menu__burger");
  let navMenuDropdowns = navMenu.querySelectorAll(".nav-menu__dropdown");
  let navMenuListOpenedClass = "nav-menu__list--opened";
  navMenuButton.addEventListener("click", navMenuButtonClickHandler);
  document.addEventListener("click", outOfNavMenuClickHandler);

  function navMenuButtonClickHandler(e) {
    navMenuList.classList.toggle(navMenuListOpenedClass);
  }

  function outOfNavMenuClickHandler(e) {
    if (!navMenuList.contains(e.target) && !navMenuButton.contains(e.target)) {
      navMenuList.classList.remove(navMenuListOpenedClass);
    }
  }

  navMenuDropdowns.forEach((dropdown) => {
    let navMenuDropdownList = dropdown.querySelector(".nav-menu__dropdown-list");

    let navMenuDropdownListOpenedClass = "nav-menu__dropdown-list--opened";

    dropdown.addEventListener("click", dropdownClickEventHandler);
    // document.addEventListener("click", outOfNavMenuDropdownClickHandler);

    function dropdownClickEventHandler(e) {
      navMenuDropdownList.classList.toggle(navMenuDropdownListOpenedClass);
    }
  });
});
