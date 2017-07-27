var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
	'content':'1223331',
	'toSiteUrl':'',
	'toId':'',
	'syncDouban':false,
	'syncSina':false,
	'syncWangyi':false,
	'sync':false,
	'type':'html_new_home',
	'_rtk':'64cc16a9'
})

var option ={
	hostname:'zhan.renren.com',
	port:'80',
	path:'/rongxing880211/3674946092104737322/comment',
	method:'POST',
	headers:{
	'Accept':'application/json, text/javascript, */*; q=0.01',
	'Accept-Encoding':'gzip, deflate',
	'Accept-Language':'zh-CN,zh;q=0.8',
	'Connection':'keep-alive',
	'Content-Length':postData.length,
	'Content-Type':'application/x-www-form-urlencoded',
	'Cookie':'anonymid=j2k49i0cd6taw0; __utma=151146938.1829559000.1494489166.1494489166.1494489166.1; __utmz=151146938.1494489167.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; BAIDU_SSP_lcr=http://www.hao123.com/shequ/; BDTUJIAID=82b6d774088859cd9df1949b110c0029; fingerprint=QNHjdHtz2BQOyptYC4Fn1499419433377; ick=b6b71f86-bcc2-4236-95bd-ea06e8e36bb5; AJSTAT_ok_times=2; ick_login=80ef17a9-04c3-4cc9-b408-410cb831a9ce; _de=BF82A8C4DBF79E0B9FD0C07D80044F7C; p=89f91a48e8cb3d0340a45af9924ca2a33; first_login_flag=1; ln_uact=lwlyx@2980.com; ln_hurl=http://hdn.xnimg.cn/photos/hdn421/20170707/1725/h_main_wMjB_a69a00050150195a.jpg; t=264bf3a08d69d7559b92deda0db740e43; societyguester=264bf3a08d69d7559b92deda0db740e43; id=945212903; xnsid=d55826a6; loginfrom=syshome; jebe_key=57d1dd2e-37bd-4475-9acd-40315fe273a5%7Cf9e53c4cfd82b65d1d479a95f8bca5ea%7C1499419848601%7C1',
	'Host':'zhan.renren.com',
	'Origin':'http://zhan.renren.com',
	'Referer':'http://zhan.renren.com/home?from=loginwindow',
	'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.3103.400 QQBrowser/9.6.11372.400',
	'X-Requested-With':'XMLHttpRequest'
	}

}

var req = http.request(option,function(res){
	console.log(res.statusCode);
	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk));
	})

	res.on('end',function(){
		console.log('完毕');
	})

}).on('error',function(e){
	console.log(e);
});

req.write(postData);
req.end();