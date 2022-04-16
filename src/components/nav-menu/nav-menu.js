import "./nav-menu.scss";
import * as transition from "../../utils/transition-block/transition-blocker.js";

document.querySelectorAll(".nav-menu").forEach((navMenu) => {
  let navMenuList = navMenu.querySelector(".nav-menu__list");
  let navMenuButton = navMenu.querySelector(".nav-menu__burger");
  let navMenuDropdowns = navMenu.querySelectorAll(".nav-menu__dropdown");
  let burgerOpenedClass = "nav-menu__burger--opened";
  let navMenuListOpenedClass = "nav-menu__list--opened";
  navMenuButton.addEventListener("click", navMenuButtonClickHandler);
  document.addEventListener("click", outOfNavMenuClickHandler);

  let isNavMenuOpened = false;

  transition.block(navMenuList);

  function navMenuButtonClickHandler(e) {
    transition.once(navMenuList);
    navMenuList.classList.toggle(navMenuListOpenedClass);
    navMenuButton.classList.toggle(burgerOpenedClass);
  }

  function outOfNavMenuClickHandler(e) {
    if (!navMenuList.contains(e.target) && !navMenuButton.contains(e.target) && isNavMenuOpened) {
      transition.once(navMenuList);
      navMenuList.classList.remove(navMenuListOpenedClass);
      navMenuButton.classList.remove(burgerOpenedClass);
      isNavMenuOpened = false;
    }
  }

  navMenuDropdowns.forEach((dropdown) => {
    let navMenuDropdownList = dropdown.querySelector(".nav-menu__dropdown-list");

    let navMenuDropdownListOpenedClass = "nav-menu__dropdown-list--opened";

    dropdown.addEventListener("click", dropdownClickEventHandler);
    document.addEventListener("click", outOfNavMenuDropdownClickHandler);

    function dropdownClickEventHandler(e) {
      navMenuDropdownList.classList.toggle(navMenuDropdownListOpenedClass);
    }

    function outOfNavMenuDropdownClickHandler(e) {
      if (!dropdown.contains(e.target)) {
        navMenuDropdownList.classList.remove(navMenuDropdownListOpenedClass);
      }
    }
  });
});
