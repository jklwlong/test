var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var file = "./data/test.txt";
var baseUrl = "http://xs.sogou.com/book/";
var booksId = [2604126841,6111767646];


var htmlArray = [];
booksId.forEach(function(id){
    htmlArray.push(getPageAsync(baseUrl + id));
})

function getPageAsync(url) {
    return new Promise(function(resolve, reject){
        console.log('正在进行。。。');

        http.get(url, function (res) {
        var html = '';
        //防止中文乱码
        res.setEncoding('utf-8');
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            console.log(htmlArray.length);
            resolve(html);
        });

    }).on('error', function (e) {
        reject(e);
    });
    })
}

function filterChapters(html) {
    var $ = cheerio.load(html); 
    $('#allChapter .forwards li').each(function(){
        var zj = $(this).find('span').text();
        zj =zj + '\r\n';
        fs.appendFile(file, zj,"utf-8", function(err){
            if(err)
                console.log("fail " + err);
            else
                console.log("写入文件ok");
            });
    })
}


Promise
    .all(htmlArray)
    .then(function(pages){
        pages.forEach(function(html){
            filterChapters(html);
        })
    })