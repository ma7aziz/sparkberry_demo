(function (jQuery) {
  "use strict";
  jQuery.fn.pt_categories = function () {
    return this.each(function () {
      var $area = jQuery(this),
          $links = $area.find('.links'),
          $images = $area.find('.images'),
          timer = '';
      
      function build() {
        $links.find('.item').each(function() {
          var $item = jQuery(this),
              img = $item.attr('data-img'),
              img2 = $item.attr('data-img2'),
              img2_w = $item.attr('data-img2-w'),
              pos = $item.attr('data-pos'),
              h = $item.find('.h').text();

          $images.append(
            '<div class="item">'+
            ' <div class="img" style="background-image: url('+img+')"></div>'+
            ' <div class="additional-img '+pos+'"><img src="'+img2+'" alt="'+h+'" style="max-width: '+img2_w+';"></div>'+
            '</div>'
          );
        }).queue(function() {
          $links.find('.item:first').addClass('current');
          $images.find('.item:first').addClass('current');
        });

        
      }

      function hover($el) {
        if($el.hasClass('current')) return false;

        var eq = $el.index();

        clearTimeout(timer);

        timer = setTimeout(function() {
          $el.addClass('current').siblings().removeClass('current');
          //$images.find('.item.current').addClass('prev').siblings().removeClass('prev');
          $images.find('.item:eq('+eq+')').addClass('current').siblings().removeClass('current');
        }, 200);
        
      }

      build();

      $links.on('mouseenter', '.item', function() {
        hover(jQuery(this));
      });
    });
  };

})(jQuery);