import "../checkbox/checkbox";
import "../toggle-button/toggle-button";
import { transitionEndEvent } from "../../utils/transition-block/transition-blocker";
import "./checkbox-list.scss";

$(document).ready(function () {
  let $this = $(".checkbox-list--expandable");
  let title = $this.find(".checkbox-list__title");
  let container = $this.find(".checkbox-list__container");

  title.on("click", titleClickEventHandler);

  function titleClickEventHandler(e) {
    if (container.css("max-height") !== "0px") {
      container.css("max-height", "");
    } else {
      container.css("max-height", `${container.prop("scrollHeight")}px`);
    }
    $this.toggleClass("checkbox-list--active");
  }
});
