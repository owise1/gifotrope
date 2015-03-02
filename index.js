var gm        = require('gm');
var exec      = require('child_process').exec;
var path      = require('path');
var fs        = require('fs');


module.exports = function(imagePath, cb){
  var rand      = Math.ceil(Math.random()*1000000).toString();
  var addRand   = function(f){ return rand + '/' + f; };

  fs.mkdir(rand, function(err, ok){
    exec('cp ' + imagePath + ' ' + __dirname + '/' + rand + '; cd ' + __dirname + '/' + rand + '; gif2anim -c ' + path.basename(imagePath), function(error, stdout, stderr) {
      if (error !== null) {
          return console.log('exec error: ' + error);
      }
      var originalDir = path.dirname(imagePath);

      fs.readdir(rand, function(err, allFiles){
        var files = allFiles.filter(function(f){ return /_/.test(f); }).sort().map(addRand);
        var appending = files.slice(1);
        appending.push(true);
        var strip = gm(files[0]).options({imageMagick: true});
        appending.forEach(function(file){
          strip.append(file);
        });
        var theFile =  originalDir + '/' + path.basename(imagePath, '.gif') + '-' + files.length + '.png';
        strip.write(theFile, function(err){
          allFiles.map(addRand).map(fs.unlink);
          fs.rmdir('./' + rand);
          if(cb) cb(theFile);
        });
        
      });

    });
  });
}

