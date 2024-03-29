import "../link-button/link-button";
import "./nav-menu.scss";
import * as transition from "../../utils/transition-block/transition-blocker.js";

document.querySelectorAll(".nav-menu").forEach((navMenu) => {
  let list = navMenu.querySelector(".nav-menu__list");
  let authBlock = navMenu.querySelector(".nav-menu__authorization");
  let contentCover = navMenu.querySelector(".nav-menu__content-cover");
  let dropdowns = navMenu.querySelectorAll(".nav-menu__dropdown");
  let authButton = navMenu.querySelector(".nav-menu__auth-btn");
  let burgerButton = navMenu.querySelector(".nav-menu__burger");
  let isAuthBlockOpened = false;
  let isNavMenuOpened = false;

  authButton.addEventListener("click", authButtonClickHandler);
  burgerButton.addEventListener("click", burgerButtonClickHandler);
  document.addEventListener("click", outOfNavMenuClickHandler);
  document.addEventListener("click", outOfAuthBlockClickHandler);

  window.addEventListener("blur", function () {
    isNavMenuOpened = false;
    navMenu.dataset.navopened = false;
    isAuthBlockOpened = false;
    authBlock.dataset.active = false;
  });

  transition.block(list);
  transition.block(authBlock);
  transition.block(contentCover);

  function burgerButtonClickHandler(e) {
    transition.once(contentCover);
    transition.once(list);
    isNavMenuOpened = !isNavMenuOpened;
    navMenu.dataset.navopened = isNavMenuOpened;
  }

  function outOfNavMenuClickHandler(e) {
    if (!list.contains(e.target) && !burgerButton.contains(e.target) && isNavMenuOpened) {
      transition.once(contentCover);
      transition.once(list);
      isNavMenuOpened = false;
      navMenu.dataset.navopened = isNavMenuOpened;
    }
  }

  function authButtonClickHandler(e) {
    transition.once(authBlock);
    isAuthBlockOpened = !isAuthBlockOpened;
    navMenu.dataset.authopened = isAuthBlockOpened;
  }

  function outOfAuthBlockClickHandler(e) {
    if (!authBlock.contains(e.target) && !authButton.contains(e.target) && isAuthBlockOpened) {
      transition.once(authBlock);
      isAuthBlockOpened = false;
      navMenu.dataset.authopened = isAuthBlockOpened;
    }
  }

  dropdowns.forEach((dropdown) => {
    let dropdownList = dropdown.querySelector(".nav-menu__dropdown-list");
    let navMenuDropdownOpenedClass = "nav-menu__dropdown--opened";
    dropdown.addEventListener("click", dropdownClickEventHandler);
    document.addEventListener("click", outOfNavMenuDropdownClickHandler);

    function dropdownClickEventHandler(e) {
      dropdown.classList.toggle(navMenuDropdownOpenedClass);
      if (dropdownList.style.maxHeight) {
        dropdownList.style.maxHeight = null;
      } else {
        dropdownList.style.maxHeight = dropdownList.scrollHeight + "px";
      }
    }

    function outOfNavMenuDropdownClickHandler(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove(navMenuDropdownOpenedClass);
        dropdownList.style.maxHeight = null;
      }
    }
  });
});
