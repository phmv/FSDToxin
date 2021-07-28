import "./carousel.scss";

(function () {
  $(".carousel").each(function () {
    const $this = $(this);
    const gallery = $this.children(".carousel__gallery");
    const images = gallery.children(".carousel__image");
    const firstImage = images.eq(0);
    const lastImage = images.eq(images.length - 1);
    const transitionEvent = "transitionend webkitTransitionEnd oTransitionEnd";
    let currentIndex = 0;
    let nextIndex = null;

    if (images.length === 1) return;

    $this
      .prepend(
        '<a href="#" class="carousel__arrow carousel__arrow--right"></a>'
      )
      .append('<div class="carousel__dots"></div>')
      .append('<a href="#" class="carousel__arrow carousel__arrow--left"></a>');

    let dots = $this.children(".carousel__dots");

    images.each((i, img) => {
      $(img).css("left", `${i * 100}%`);
      if (!i) {
        dots.append('<div class="carousel__dot carousel__dot--active"></div>');
      } else {
        dots.append('<div class="carousel__dot"></div>');
      }
    });

    $this.on("click", ".carousel__arrow", function (e) {
      e.preventDefault();
    });
    $this.on("click", ".carousel__arrow", arrowClick);

    function arrowClick() {
      let arrow = $(this);
      let left = false;
      currentIndex = nextIndex !== null ? nextIndex : currentIndex;
      gallery.css("transition", "");

      if (arrow.hasClass("carousel__arrow--left")) {
        nextIndex =
          currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1;
        left = true;
      } else {
        nextIndex = (currentIndex + 1) % images.length;
      }

      if (isCycle()) {
        $this.off("click", ".carousel__arrow", arrowClick);
        gallery.on(transitionEvent, setInitialState);
        if (left) {
          lastImage.css("left", "-100%");
          gallery.css("transform", "translate3d(100%, 0, 0)");
        } else {
          firstImage.css("left", `${images.length * 100}%`);
          gallery.css(
            "transform",
            `translate3d(-${images.length * 100}%, 0, 0)`
          );
        }
      } else {
        gallery.css("transform", `translate3d(-${nextIndex * 100}%, 0, 0)`);
      }

      dots.find(".carousel__dot--active").removeClass("carousel__dot--active");
      dots
        .children(".carousel__dot")
        .eq(nextIndex)
        .addClass("carousel__dot--active");

      function isCycle() {
        return (
          (currentIndex === 0 && nextIndex !== 1) ||
          (currentIndex === images.length - 1 && nextIndex === 0)
        );
      }

      function setInitialState() {
        gallery.css("transition", "none");
        gallery.css(
          "transform",
          `translate3d(${left ? -(images.length - 1) * 100 : 0}%, 0, 0)`
        );
        firstImage.css("left", `0%`);
        lastImage.css("left", `${(images.length - 1) * 100}%`);
        gallery.off(transitionEvent, setInitialState);
        $this.on("click", ".carousel__arrow", arrowClick);
      }
    }
  });
})();
