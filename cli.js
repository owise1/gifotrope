#!/usr/bin/env node

var path      = require('path');
var fs        = require('fs');
var gifotrope = require('./index.js');

var imagePath = process.argv[2];
console.log("processing: " + imagePath + "...");

function doGif(f){
  gifotrope(f, function(file){
    console.log("created: " + file);
  });
}

fs.stat(imagePath, function(err, stat){
  if(stat.isDirectory()){
    fs.readdir(imagePath, function(err, files){
      files = files
               .filter(function(f){ return /\.gif/i.test(f); })
               .map(function(f){  doGif(imagePath + f); });
    });
  } else {
    doGif(__dirname + '/' + imagePath);
  }
});

