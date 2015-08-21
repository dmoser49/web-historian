var http = require("http");
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js')
var htmlFetcher = require('../workers/htmlfetcher.js')
var request = require('request');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, './public/index.html');
  }

  else if (req.method === "POST"){

    var data = '';
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      archive.addUrlToList(data.slice(4));
      archive.readListOfUrls(function(urls) {
        archive.downloadUrls(urls);
      });
      httpHelpers.serveAssets(res, '../archives/sites/' + data.slice(4));
    });
  }
};
