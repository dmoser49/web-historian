var http = require("http");
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    // if (req.url === "/") {
      httpHelpers.serveAssets(res, './public/index.html');
   // }
  }

  else if (req.method === "POST"){

  var data = '';
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
    //console.log('data:' + data)

      statusCode = 201;
      //response.writeHead(statusCode, headers);
      res.end();

      archive.isUrlInList(data.slice(4), function(isInList) {
        if (!isInList) {
          archive.addUrlToList(data.slice(4));
          archive.downloadUrls([data.slice(4)]);
        }
      });
    });
  }
};
