(function (jQuery) {
  "use strict";

  jQuery.fn.pt_one_page_horizontal_scroll = function () {
    return this.each(function () {
      var $area = jQuery(this),
        $wrap = $area.find('.ophs-wrap'),
        $screen_item = $area.find('.ophs-screen'),
        $nav = $area.find('.ophs-nav .container'),
        lastAnimation = 0,
        animationTime = 500,
        height = 0,
        width = 0,
        current_screen = 0,
        count_screen = $screen_item.length,
        pos = 0;

      $screen_item.each(function () {
        $nav.append('<div></div>');
      });

      $screen_item.eq(0).addClass('current').siblings().removeClass('current');
      $nav.find('div').eq(0).addClass('current').siblings().removeClass('current');

      jQuery(window).on('load resize', function () {
        height = jQuery(window).height() - jQuery('.header-space').height();
        width = jQuery(window).width() - jQuery('.header-space').width();

        $area.css('height', height);

        $screen_item.css({
          'width': width,
          'height': height,
        });

        update(current_screen);
      });

      function scroll(type, delta) {
        if (!type) {
          var timeNow = new Date().getTime(),
            timeout = 500;

          if (timeNow - lastAnimation < timeout + animationTime) {
            event.preventDefault();
            return false;
          }

          if ((current_screen == 0 && delta > 0) || (current_screen == count_screen - 1 && delta < 0)) {
            return false;
          }

          if (delta < 0) {
            current_screen++;
          } else {
            current_screen--;
          }
        } else {
          current_screen = delta;
        }

        pos = -width * current_screen;

        if(pos > 0) {
          return false;
        }

        $wrap.css({
          "-webkit-transform": "translate3d(" + pos + "px, 0, 0)",
          "-moz-transform": "translate3d(" + pos + "px, 0, 0)",
          "-ms-transform": "translate3d(" + pos + "px, 0, 0)",
          "transform": "translate3d(" + pos + "px, 0, 0)",
        });

        $screen_item.eq(current_screen).addClass('current').siblings().removeClass('current');
        $nav.find('div').eq(current_screen).addClass('current').siblings().removeClass('current');

        lastAnimation = timeNow;
      }

      function update(current_screen) {
        pos = -width * current_screen;

        $wrap.css({
          "-webkit-transform": "translate3d(" + pos + "px, 0, 0)",
          "-moz-transform": "translate3d(" + pos + "px, 0, 0)",
          "-ms-transform": "translate3d(" + pos + "px, 0, 0)",
          "transform": "translate3d(" + pos + "px, 0, 0)",
        });
      }

      $area.on('mousewheel DOMMouseScroll', function (event) {
        var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        scroll('', delta);
      }).on('click', '.ophs-nav > div > div:not(.current)', function () {
        scroll('dots', jQuery(this).index());
      }).swipe({
        swipeLeft: function() {
          scroll('', -100);
        },
        swipeRight: function() {
          scroll('', 100);
        },
        threshold: 20,
        preventDefaultEvents: false
      });

    });
  };

})(jQuery);