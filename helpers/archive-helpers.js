var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var urls = '';
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    urls += data;
    if (callback) {
      callback(urls.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urls) {
    if (callback) {
      callback(urls.indexOf(url) > -1);
    }
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, JSON.stringify(url) + '\n', 'utf8', {'flags': 'a+'}, function (err, data) {
    if (err) {
      throw err;
    }
    if (callback) {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback){
  var urls = '';
  fs.stat(exports.paths.archivedSites + '/' + url, function (err, stat) {
    var exist = false;
    if (err === null) {
      exist = true;
    } else if (err.code === 'ENOENT') {
      console.log(err.code);
    }
    if (callback) {
      callback(exist);
    }
  });
};

exports.downloadUrls = function(urlArray, html){
  html = html || "";
  urlArray.forEach(function(url) {
    fs.writeFile(exports.paths.archivedSites + '/' + url, html, function(err) {
      if (err) {
        throw err;
      }
    });
  });
};
