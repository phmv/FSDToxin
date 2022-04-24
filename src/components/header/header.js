import "../toxin-logo/toxin-logo";
import "../nav-menu/nav-menu";
import "../link-button/link-button";

import "./header.scss";

import * as transition from "../../utils/transition-block/transition-blocker.js";

document.querySelectorAll(".header").forEach((header) => {
  let authorizationBlock = header.querySelector(".header__authorization");
  let profileButton = header.querySelector(".header__profile-button");
  let authorizationBlockIsOpened = false;
  let authorizationBlockOpenedClass = "header__authorization--opened";
  profileButton.addEventListener("click", profileButtonClickHandler);
  document.addEventListener("click", outOfAuthorizationBlockClickHandler);

  transition.block(authorizationBlock);

  function profileButtonClickHandler(e) {
    transition.once(authorizationBlock);
    authorizationBlock.classList.toggle(authorizationBlockOpenedClass);
    authorizationBlockIsOpened = !authorizationBlockIsOpened;
  }

  function outOfAuthorizationBlockClickHandler(e) {
    if (authorizationBlockIsOpened && !profileButton.contains(e.target) && !authorizationBlock.contains(e.target)) {
      transition.once(authorizationBlock);
      authorizationBlock.classList.remove(authorizationBlockOpenedClass);
      authorizationBlockIsOpened = false;
    }
  }
});
