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

see examples in [site/index.html](site/index.html)

