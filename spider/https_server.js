var https = require('https');
var url = require("url");
var express = require('express');
var fs = require('fs');
var common = require('./common');
var app = express();

var options = {
	key: fs.readFileSync('./zs/privatekey.pem'),
	cert: fs.readFileSync('./zs/certificate.pem')
}


// https.createServer(options,function(req,res){
// 	var pathName = url.parse(req.url).pathname;
// 	console.log(pathName);
// 	res.writeHead(200);
// 	fs.readFile('./html/login.html','utf-8',function(err,data){  
//         if(err){  
//             console.error(err);  
//         }  
//         else{  
//             res.end(data);
//         }  
//     });
	
// }).listen(8888);


https.createServer(options, app).listen(8888, function () {
    console.log('Https server listening on port ' + 8888);
});