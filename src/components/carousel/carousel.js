import './carousel.scss'

(function() {
    $('.carousel').each(function() {
    let $this = $(this)
    let gallery = $this.children('.carousel__gallery')
    let images = gallery.children('.carousel__image')
    let currentIndex = 0;
    let nextIndex = null;

    if (images.length > 1) {
      $this
        .prepend('<a href="#" class="carousel__arrow carousel__arrow--right"></a>')
        .append('<div class="carousel__dots"></div>')
        .append('<a href="#" class="carousel__arrow carousel__arrow--left"></a>')

      let dots = $this.children('.carousel__dots')

      images.each(i => {
        if (!i) {
          dots.append('<div class="carousel__dot carousel__dot--active"></div>')
        }
        else {
          dots.append('<div class="carousel__dot"></div>')
        }
      })


      $this.on('click', '.carousel__arrow', function(e) {
        e.preventDefault()
        let arrow = $(this)
        let left = false;
        let cycle = false;
        currentIndex = nextIndex !==null ? nextIndex : currentIndex;

        if (arrow.hasClass('carousel__arrow--left')) {
          nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1;
          left = true;
          cycle = currentIndex === 0
        } else {
          nextIndex = (currentIndex + 1) % images.length
          cycle = currentIndex === images.length - 1
        }

        if (cycle) {
          gallery.css('transition' , 'none')

          let clonedItem = images.eq(nextIndex).clone()

          if (left) {

            gallery.prepend(clonedItem)
            gallery.css('transform', `translateX(-100%)`)
            setTimeout(() => {
              gallery.css('transition' , '')
              gallery.css('transform', ``)
            }, 0)
          } else {
            gallery.append(clonedItem)
            gallery.css('transform', `translateX(-100%)`)
            gallery.css('transition' , '')
            gallery.css('transform', ``)
          }
        }

        // gallery.css('transform', `translateX(-${nextIndex * 100}%)`)



        dots.find('.carousel__dot--active').removeClass('carousel__dot--active')
        dots.children('.carousel__dot')
          .eq(nextIndex)
          .addClass('carousel__dot--active')

      })
    }
  })
})();
