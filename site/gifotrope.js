/**
 * gifotrope
 *
 * we need to know the number of frames in the gif, the naming convention
 * we'll use is imagename-{number of frames}.png.  Otherwise you can create a data property 
 * called frames. Or pass it in in the options.
 */
(function( $ ) {
  $.fn.gifotrope = function(o) {
    var opts = $.extend( {
      slowDown : 10
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

    // frames
    var frames  = opts.frames || $(this).data('frames');
    matches = $(this).css('background-image').match(/url\(.*-(\d+)\.(png|jpg|jpeg|gif)["']*\)/i);
    if(matches && !frames){
      frames = matches[1];
    }
    frames = parseInt(frames, 10);
    
    if(image && frames){
      var i    = new Image;
      i.src    = image;
      i.onload = function(){
        width  = this.width / frames;

        $(window).scroll(function(){
          $(that).css('background-position-x', width * Math.floor(($(window).scrollTop() % width) / opts.slowDown));
        });
      }
    }
			
			
		var methods = {
		}
		
		
			
		
	});

  };
})( jQuery );
