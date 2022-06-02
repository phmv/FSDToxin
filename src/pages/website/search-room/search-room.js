import "../../../templates/website-page/website-page";
import "../../../components/input-container/input-container";
import "../../../components/dropdown/dropdown";
import "../../../components/range-slider/range-slider";
import "../../../components/checkbox-list/checkbox-list";
import "../../../components/submit-button/submit-button";
import "../../../components/room-card/room-card";
import "../../../components/pagination/pagination";
import "./search-room.scss";

window.addEventListener("load", (e) => {
  let filters = document.querySelector(".search-room-page__filters");
  let form = filters.querySelector(".search-room-page__filters-form");
  let filtersButton = filters.querySelector(".search-room-page__filters-button");
  let filtersSubmit = filters.querySelector(".search-room-page__filters-submit");
  let isFiltersActive = false;
  let isSubmitActive = false;
  let isOnChangeEnabled = false; //to prevent form onChange event firing when inputs change on page load

  if (window.innerWidth <= 768) {
    filters.style.maxHeight = `calc(100vh - ${filters.getBoundingClientRect().top}px)`;
  }

  window.addEventListener("resize", (e) => {
    if (window.innerWidth > 768) {
      filters.style.maxHeight = "initial";
    } else {
      filters.style.maxHeight = `calc(100vh - ${filters.getBoundingClientRect().top}px)`;
      hideSubmit();
    }
  });

  window.addEventListener("blur", (e) => {
    if (isFiltersActive) closeFilters();
    if (isSubmitActive) hideSubmit();
  });

  filtersButton.addEventListener("click", filtersButtonClickEventHandler);
  document.addEventListener("click", outOfFiltersClickHandler);
  form.addEventListener("change", formChangeEventHandler);
  form.addEventListener("mousedown", formOnChangeEnable, { once: true });
  document.addEventListener("click", outOfSubmitClickHandler);

  function filtersButtonClickEventHandler() {
    if (isFiltersActive) {
      closeFilters();
    } else {
      openFilters();
    }
  }

  function outOfFiltersClickHandler(e) {
    if (!filters.contains(e.target) && isFiltersActive && !e.target.className.includes("datepicker")) {
      closeFilters();
    }
  }

  function formChangeEventHandler(e) {
    if (window.innerWidth > 768 && isOnChangeEnabled) {
      let target = e.target.className.includes("checkbox") ? e.target.parentElement : e.target;
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(215), 10);
      });

      promise.then((result) => showSubmit(target));
    }
  }

  function formOnChangeEnable(e) {
    isOnChangeEnabled = true;
  }

  function outOfSubmitClickHandler(e) {
    if (!filtersSubmit.contains(e.target)) {
      hideSubmit();
    }
  }

  function openFilters() {
    filters.classList.add("search-room-page__filters--active");
    isFiltersActive = true;
    form.style.maxHeight = form.scrollHeight + "px";
  }

  function closeFilters() {
    filters.classList.remove("search-room-page__filters--active");
    isFiltersActive = false;
    form.style.maxHeight = null;
  }

  function showSubmit(target) {
    let targetRect = target.getBoundingClientRect();
    let filtersRect = filters.getBoundingClientRect();
    filtersSubmit.style.top = targetRect.top - filtersRect.top - (filtersSubmit.getBoundingClientRect().height - targetRect.height) / 2 + "px";
    filtersSubmit.style.left = targetRect.x + targetRect.width + "px";
    filtersSubmit.classList.add("search-room-page__filters-submit--active");
    isSubmitActive = true;
  }

  function hideSubmit() {
    if (isSubmitActive) {
      filtersSubmit.classList.remove("search-room-page__filters-submit--active");
      filtersSubmit.removeAttribute("style");
      isSubmitActive = false;
    }
  }
});
