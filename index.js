var gm        = require('gm');
var exec      = require('child_process').exec;
var path      = require('path');
var fs        = require('fs');
var imagePath = process.argv[2];
var rand      = Math.ceil(Math.random()*1000000).toString();
var addRand   = function(f){ return rand + '/' + f; };

exec('mkdir ' +rand +'; cp ' + imagePath + ' ' + rand + '; cd ' + rand + '; gif2anim -c ' + path.basename(imagePath), function(error, stdout, stderr) {
  if (error !== null) {
      return console.log('exec error: ' + error);
  }
  imagePath = './' + rand + '/' + path.basename(imagePath);


  fs.readdir(rand, function(err, allFiles){
    var files = allFiles.filter(function(f){ return /_/.test(f); }).sort().map(addRand);
    var appending = files.slice(1);
    appending.push(true);
    var strip = gm(files[0]);
    appending.forEach(function(file){
      strip.append(file);
    });
    var theFile =  './' + rand + '/' + rand + '.jpg';
    strip.write(theFile, function(err){
      console.log(theFile);
      allFiles.map(addRand).map(fs.unlink);
    });


    
  });

});
