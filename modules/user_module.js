var mongoose = require('mongoose');
var db=mongoose.connect('mongodb://localhost/test'); //连接test数据库
var Schema=mongoose.Schema; //创建模型

var userSchma = new mongoose.Schema({
	username: String,
	pwd: String,
	publishTime:Date
});

 
 var user = mongoose.model('user',userSchma, 'user');
 

module.exports = user;