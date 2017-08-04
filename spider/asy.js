var superagent = require('superagent');
var async = require('async');
var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var Promise = require('bluebird');
var book = require('../modules/book_module');
var file = "public/data/test.txt";
var baseUrl = "http://xs.sogou.com";
var booksUrl = [];
var htmlArray = [];
var urls =[];
function fetch (){
    superagent
    .get(baseUrl)
    .end(function(req,res){
        var $ = cheerio.load(res.text);
        $('.detail-list li').each(function(){
            var href = $(this).find('a').attr('href');
            booksUrl.push(baseUrl+href);
        })
        getPageAsync(booksUrl);
    })
}

function getPageAsync(urls) {
    async.mapLimit(urls, 5, function (url, callback) {
        htmlArray.push(getHtml(url, callback));
    }, function (err, result) {
        Promise
        .all(htmlArray)
        .then(function(pages){
            pages.forEach(function(html){
                filterChapters(html);
            })
        })

    });
}

function getHtml(url, callback){
    console.log('正在进行。。。' + url);
    return new Promise((resolve,reject) =>{
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
                callback(null,"success!");
                resolve(html);

            });

        }).on('error', function (e) {
            console.log(e);
            reject(e);
        });
    })
}

function filterChapters(html) {
    var $ = cheerio.load(html);

    var title = $('.infos .text-title a').text();
    var zj = "";
    $('#allChapter .forwards li').each(function(){
        zj += $(this).find('span').text() + '\r\n';
    })
    var text = title + '\r\n' + '\r\n' + zj + '\r\n';
    // saveContent(text);

    var src = "http:" + $('#bookCover img').attr('src');
    savedImg(title, src);
}

function saveContent(text){
    fs.appendFile(file, text,"utf-8", function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}

function savedImg(name, src) {
    console.log("img_download:" + src);
    request.head(src,function(err,res,body){
        if(err){
            console.log(err);
        }
    });
    //此处为将img存在本地
    // request(src).pipe(fs.createWriteStream('public/images/' + name + '.jpg'));
    // var data = {name: name,src: 'images/' + name + '.jpg',publishTime:new Date()}
    //此处为直接存储url至mongodb，图片不做存储
    var data = {name: name,src: src,publishTime:new Date()}
    book.create(data,function(err,foo){
        if(err){
            console.log(err)
        }else{
            console.log("save success!")
        }
    });
}

exports.fetch = fetch;
