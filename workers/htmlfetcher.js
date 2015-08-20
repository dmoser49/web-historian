// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.


// var options = {
//           host: data.slice(4),
//           port: 80,
//           path: '/upload',
//           method: 'POST'
//         };

//         var httpReq = http.request(options, function(res) {

//           var result = '';
//           res.setEncoding('utf8');
//           res.on('data', function (chunk) {
//             console.log('chunk: ' + chunk)
//             result += chunk;

//           });
//             console.log('result: ', result)

//           res.on('end', function(){
//             console.log('result' + result)
//             archive.downloadUrls([data.slice(4)], result);
//             res.end()
//           });
//         });
//           httpReq.end();
