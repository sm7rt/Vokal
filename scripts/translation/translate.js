var fs = require('fs');
var async = require('async');
var traverse = require('traverse');
const AWS = require('aws-sdk');

const translateAWS = new AWS.Translate({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-1'
});

var TRANSERR = {
  NOT_TRANSLATED: 1,
  IS_URL: 2
};

// RUN
var run = function(dir, sourceLanguage, languages, finish) {
  // TRANSLATE
  var translate = function(text, language, callback) {
    // passthrough if contains HTML
    // if (/<[a-z][\s\S]*>/i.test(text) == true) {
    //   return callback(TRANSERR.NOT_TRANSLATED, text, language);
    // }

    // it is just a url
    if (text.indexOf('http://') == 0 && text.indexOf(' ') < 0) {
      return callback(TRANSERR.IS_URL, text, language);
    }
    if (translate) {
      const params = {
        SourceLanguageCode: sourceLanguage,
        TargetLanguageCode: language,
        Text: text
      };

      // fire the aws translation
      translateAWS.translateText(params, (err, translation) => {
        if (err) {
          return callback(TRANSERR.NOT_TRANSLATED, text, language);
        }

        // return the translated text
        return callback(null, translation.TranslatedText, language);
      });
    } else {
      // bypass translation
      return callback(null, text, language);
    }
  };

  // PROCESS FILE
  var processFile = function(file, callback) {
    // open file
    fs.readFile(dir + file, function(err, data) {
      // bubble up error
      if (err) {
        return callback(
          {
            file: file,
            error: err
          },
          null
        );
      }

      data = data.toString();

      var parsed;
      try {
        parsed = JSON.parse(data);
      } catch (e) {
        return callback(
          {
            file: file,
            error: e
          },
          null
        );
      }

      var targets = [{}];
      // create targets for every language
      languages.forEach(lang => {
        targets.push({
          language: lang,
          values: Object.assign({}, parsed)
        });
      });

      // find all paths of the object keys recursively
      var paths = Object.keys(parsed);

      // translate each path
      async.map(
        paths,
        function(path, done) {
          var text = parsed[path];

          // only continue for strings
          if (typeof text !== 'string') {
            return done(null);
          }

          // translate every language for this path
          async.map(
            languages,
            function(language, translated) {
              // translate the text
              translate(text, language, function(err, translation, lang) {
                // add new value to path
                const target = targets.find(t => t.language === lang);

                if (target) {
                  target.values[path] = translation;
                }

                var e = null;
                if (err === TRANSERR.NOT_TRANSLATED) {
                  e = {
                    file: file,
                    path: path,
                    text: text,
                    source: sourceLanguage,
                    target: language
                  };
                }
                return translated(null, e);
              });
              // all languages have been translated for this path,
              // so call the done callback of the map through all paths
            },
            done
          );
        },

        // all are translated
        function(err, results) {
          // write translated targets to files
          targets.forEach(tar => {
            if (tar.language) {
              var transStr = JSON.stringify(tar.values, null, '\t');

              var p = dir + tar.language + '/translation.json';
              fs.mkdir(dir + tar.language, { recursive: true }, err => {
                if (err) throw err;
              });
              fs.writeFileSync(p, transStr);

              // add language to source file
              // parsed[t] = true;
              // Add Langage in i18nFile
            }
          });

          // filter out null results, to just return the not translated ones
          notTranslated = results.filter(function(item) {
            // check if array only contains nulls
            for (var i in item) {
              if (item[i] != null) {
                return true;
              }
            }

            return false;
          });

          // spice up error message
          if (err) {
            err = {
              file: file,
              error: err
            };
          }

          return callback(err, notTranslated);
        }
      );
    });
  };

  // process the source file
  processFile(sourceLanguage + '/translation.json', finish);
};

// EXPORTS
module.exports = {
  run: run
};
