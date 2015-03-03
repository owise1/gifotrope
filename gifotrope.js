/**
 * gifotrope
 *
 * We need to know the number of frames in the gif.
 * The naming convention we'll use is imagename-{number of frames}.png.  
 * Otherwise you can create a data property called frames.
 * Or pass it in in the options.
 */
(function( $ ) {
  var imagesWithStyles = [];

  // set up stylesheet
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);

  function addRule(selector, rules, index) {
    if("insertRule" in style.sheet) {
      style.sheet.insertRule(selector + "{" + rules + "}", index);
    } else if("addRule" in style.sheet) {
      style.sheet.addRule(selector, rules, index);
    }
  }

  $.fn.gifotrope = function(o) {
    var opts = $.extend( {
      slow : 100
    }, o);

	
    return this.each(function(){
      var that = this;
      var image, matches, width;

      // images bg
      if(opts.image){
        $(this).css('background', 'url('+opts.image+')');
        image = opts.image;
      } else {
        matches = $(this).css('background-image').match(/url\(([^)]+)\)/i);
        if(matches){
          image = matches[1].replace(/["']/g, '');
        }
      }
      if(!image) return;

      var imageIndex = imagesWithStyles.indexOf(image);
      if(imageIndex < 0){
        
          // how many frames?
          var frames  = opts.frames || $(this).data('frames');
          matches = $(this).css('background-image').match(/url\(.*-(\d+)\.(png|jpg|jpeg|gif)["']*\)/i);
          if(matches && !frames){
            frames = matches[1];
          }
          frames = parseInt(frames, 10);
          if(!frames) return;

          var frameRange = [];
          var z = 0;
          while(frameRange.push(z++)<frames);

          imagesWithStyles.push({
            image : image,
            frames : frames
          });
          imageIndex = imagesWithStyles.length - 1;

          // create styles
          var myClass = 'gifotrope-' + imageIndex;
          addRule('.' + myClass, "background-image: url("+image+")");
          
          var i    = new Image;
          i.src    = image;
          i.onload = function(){
            width  = this.width / frames;

            frameRange.forEach(function(z){
              addRule('.' + myClass + '.f-' + z, "background-position-x: "+width*z+"px");
            });
          }

          // on scroll update class
          var _tout;
          $(window).scroll(function(){
            var f = Math.floor($(window).scrollTop() / opts.slow) % frames;
            if(_tout) clearTimeout(_tout);
            if(f < 0) return;
            $('.' + myClass)
              .addClass('gifotrope-moving')
              .removeClass(frameRange.map(function(z){ return 'f-' + z; }).join(' '))
              .addClass('f-' + f);
            _tout = setTimeout(function(){
              $('.' + myClass).removeClass('gifotrope-moving');
            }, 100);
          });
      }
      
      // add the classes
      $(this).addClass('gifotrope-' + imageIndex);

    });
  };
})( jQuery );
