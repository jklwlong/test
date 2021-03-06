let http =require('http');
let fs = require('fs');
var Promise = require('bluebird');
var async = require('async');
let request = require('request');
let cheerio = require('cheerio');
let urlLists = [];
let i = 0;
let concurrencyCount = 0;
let text = 0;

async function crawl() {
    console.log('开始采集新闻地址...')
    for(let i = 1;i <= 10;i++){
        console.log('开始采集新闻第'+i+'页')
        let url = 'http://www.cjlu.edu.cn/do.jsp?dotype=newsmm&columnsid=13&currentPage='+i;
        let urlList = await getArticle(url);
        urlLists = urlLists.concat(urlList);
    }

    async.mapLimit(urlLists, 5, function (url, callback) {
        fetchPage(url, callback);
    }, function (err,result) {
        console.log('final:');
        //   console.log(result);
    });

    console.log(urlLists);
};

crawl();

function getArticle(url){
    return new Promise((resolve,reject) =>{
        http.get(url,res =>{
            let html = '';
            res.on('data',chunk =>{
                html += chunk;
            })
            res.on('end',() =>{
                let $ = cheerio.load(html);
                let urlList = [];
                let length = $('.new-main-list li').length;
                $('.new-main-list li').each((index) =>{
                    let link = 'http://www.cjlu.edu.cn'+$('.new-main-list li a').eq(index).attr('href');
                    urlList.push(link);
                })
                resolve(urlList);
            })
        })
    })
}

function fetchPage(url,callback){
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
    http.get(url,res =>{
        let html = '';
        res.setEncoding('utf-8');

        res.on('data',chunk =>{
            html+=chunk;
        })

        res.on('end',() => {
            let $ = cheerio.load(html);

            let news_item = {
                title: $('.new-mian-right h4').text(),
                time: $('.main_box_ner span').eq(2).text().substring(5),
                link: url,
                author: $('.main_box_ner span').eq(0).text().substring(3).trim(),
                i: i = i+1
            }

            // console.log(news_item);

            savedContent($,news_item.title);

            savedImg($,news_item.title);
            concurrencyCount--;
            callback(null, url + ' html content');

            // if(i < 5){
            //     fetchPage(str);
            // }
        })
    }).on('error',function(err){
        console.log('获取数据出错')
    })
}

function savedContent($, news_title) {
    text++;
    let fileName = `data/${news_title}.txt`;
    fs.createWriteStream(fileName);
    console.log('写入第'+text+'篇文章');
    $('.main_box').next().find('p').each(function (index, item) {
        var x = $(this).text(); 
    
        if (x != '') {
            x = x + '\n';   
    //将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
            fs.appendFileSync(fileName, x, { encoding: 'utf8'});
        }
    })
}

function savedImg($, news_title){
    $('.main_box').next().find('img').each(function (index, item) {
        let img_url = $(this).prop('src');
        console.log('图片原地址：'+img_url);
        let url = '';
        if(img_url.indexOf('://') > -1){
            url = img_url;
        }else{
            url = 'http://www.cjlu.edu.cn'+img_url;
        }
        console.log('图片地址：'+url);
        let img_title = news_title+index+'.png';
        request.head(url,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(url).pipe(fs.createWriteStream('image/'+img_title)).on('error', (err) => console.error(err));
    })
}


