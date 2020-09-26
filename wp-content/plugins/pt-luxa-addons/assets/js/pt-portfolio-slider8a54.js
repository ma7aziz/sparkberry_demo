(function (jQuery) {
  "use strict";
  jQuery.fn.pt_portfolio_slider = function (options) {
    return this.each(function () {
      var settings = jQuery.extend({
        loop: "300",
        autoplay: "on",
        autoplayTimeout: "5000",
      }, options);

      if (jQuery(this).find('.portfolio-slider .portfolio-slider-item').length > 1) {
        var $this = jQuery(this),
            $slider = $this.find('.portfolio-slider');

        function set_count($el, index = 0, count = 0) {
          if($el == 'load') {
            $slider.find('.portfolio-slider-item').each(function(index) {
              jQuery(this).find('.count .c').text(leadZero(index+1));
              jQuery(this).find('.count .t').text(leadZero($slider.find('.portfolio-slider-item').length));
            });
          } else {
            $el.find('.count .c').text(leadZero(index+1));
            $el.find('.count .t').text(leadZero(count));
          }
        }

        set_count('load');

        $slider.addClass('owl-carousel').owlCarousel({
          loop: settings['loop'],
          items: 1,
          nav: false,
          dots: false,
          autoplay: settings['autoplay'],
          autoplayTimeout: settings['autoplayTimeout'],
          smartSpeed: 800,
          autoplayHoverPause: true,
          navText: false,
          margin: 30,
        });

        $slider.on('click', '.owl-prev', function () {
          $slider.trigger('prev.owl.carousel');
        }).on('click', '.owl-next', function () {
          $slider.trigger('next.owl.carousel');
        }).on('click', '.nav-dots div:not(.current)', function () {
          $slider.trigger('to.owl.carousel', [jQuery(this).index(), 800]);
        });

        if($this.find('.filter-buttons').length != 0) {
          if ($this.find('.cache-items .owl-item').length == 0) {
            $slider.find('.owl-item:not(.cloned)').each(function () {
              $this.find('.cache-items').append(jQuery(this).clone().html());
            });
          }

          function showProjectsbyCat(cat) {
            $slider.addClass('loading');
            setTimeout(function () {
              if (cat == '*') {
                $this.find('.cache-items .portfolio-slider-item').each(function (index) {
                  set_count(jQuery(this), index, $this.find('.cache-items .portfolio-slider-item').length);

                  var $elem = jQuery(this).clone();
                  $elem.find('[data-id]').attr('data-id', index);
                  $slider.trigger('add.owl.carousel', [$elem, index]);
                  $slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
                })
              } else {
                $slider.find('.portfolio-slider-item:not(' + cat + ')').each(function () {
                  var targetPos = jQuery(this).parent().index(),
                    $elem = jQuery(this).parent();
                  $slider.trigger('remove.owl.carousel', [targetPos]);
                  $slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
                });
                $this.find('.cache-items .portfolio-slider-item' + cat).each(function (index) {
                  set_count(jQuery(this), index, $this.find('.cache-items .portfolio-slider-item' + cat).length);

                  var $elem = jQuery(this).clone();
                  $elem.find('[data-id]').attr('data-id', index);
                  $slider.trigger('add.owl.carousel', [$elem, index]);
                  $slider.trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0]);
                });
              }
            }, 500);
          }

          $this.on('click', '.filter-buttons button', function (e) {
            e.preventDefault();
            jQuery(this).addClass('current').siblings().removeClass('current');

            var cat = jQuery(this).data('filter');
            showProjectsbyCat(cat);
          });

          $slider.on('refreshed.owl.carousel', function () {
            setTimeout(function () {
              $slider.removeClass('loading');
            }, 500);
          });
        }
      }
    });
  }
})(jQuery);