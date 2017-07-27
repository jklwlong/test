var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/test'); //连接test数据库
var Schema=mongoose.Schema; //创建模型

var bookSchma = new mongoose.Schema({
	name: String,
	src: String,
	publishTime:Date
});

 
// bookSchma.save=function(imgname,imgurl,callback){
// 	var book = new book({
// 		name: imgname,
// 		src: imgurl,
// 		publishTime: new Date()
// 	});
// 	book.save(function (err) {
//     	console.log('保存',err ? 'failed' : '成功');
// 	});
// }

// bookSchma.query=function(callback){
// 	bookSchma.find(function(error,result){
// 		console.log(result);
// 		return result;
// 	})
// }
 var book = mongoose.model('books',bookSchma);
 

//exports.student=student;
module.exports = book;