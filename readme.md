# gifotrope

take control of your gifs. [demo](http://owise1.github.com/gifotrope)

#### gifotrope has two parts:

  1. a node module that helps you create a single multi-frame png from an animated gif
  2. a jQuery pluggin that animates your png as a visitor scrolls the page

## npm gifotrope

depends on [imagemagick](http://www.imagemagick.org/)

````
npm install gifotrope
node node_modules/gifotrope/cli.js [path to gif or directory containing gifs]
````
## jQuery pluggin

  1. include jquery and gifotrope.js on your page
  2. `$(selector).gifotrope()`

The crucial thing that gifotrope needs to know is how many frames your original gif had.  If you used the included node module to create the image it will 
use a naming convention like image-{# of frames}.png.  gifotrope.js will look for the dash and digits at the end of the file name to determine the # of frames.  If you don't want to use this naming convention you can also pass `{ frames : ??? }` into the pluggin when you call it.  Additionally you can include a data attribute `data-frames="??"` in the first DOM element that you'll be gifotropofying

see examples in [site/index.html](site/index.html)



