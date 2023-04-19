#!/usr/bin/env node

var translate = require('./translate');
var path = require('path');
var getJSON = require('get-json');

var args = process.argv;

if (args.length < 4) {
  throw 'not enough arguments: i18n-translate startDir sourceLang (targetLang1,targetLang2,..) (file1,file2,..)';
}

// get the start directory from parameters
var sourceLang = args[3];
var targetLang = args[4];
var translatePath = args[2];

// var i18nFileName = '../../src/i18n.ts';

// var file = require(i18nFileName);

// run translation
var run = function() {
  let cpt = 0;
  translatePath.forEach(startDir => {
    cpt = cpt + 1;
    // append / at the end of directory
    if (startDir[startDir.length - 1] != '/') {
      startDir += '/';
    }
    path.resolve(__dirname, startDir);

    console.log('Translate :', startDir);
    translate.run(startDir, sourceLang, targetLang, function(err, result) {
      if (err) {
        console.log('ERROR:');
        console.log(err);
        process.exit(0);
      }
      cpt = cpt - 1;
    });
    if (cpt === 0) {
      process.exit(0);
      // console.log(file);
    }
  });
};

// if target languages are not provided, get all languages supported by Google Translate
if (!targetLang) {
  targetLang = [];
  console.log('Target Lang Missing');
} else {
  targetLang = targetLang.split(',');
  // trim whitespaces for targetlangs
  for (var i = 0; i < targetLang.length; i++) {
    targetLang[i] = targetLang[i].trim();
  }

  if (!translatePath) {
    translatePath = [];
    console.log('Translate Path Missing');
  } else {
    translatePath = translatePath.split(',');
    // trim whitespaces for targetlangs
    for (var i = 0; i < translatePath.length; i++) {
      translatePath[i] = translatePath[i].trim();
    }
  }
  run();
}
