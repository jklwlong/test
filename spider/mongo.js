// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');//；连接数据库
// var BookSchma = new mongoose.Schema({
// 		name: String,
// 		src: String,
// 		publishTime:Date
// 	});
// 	mongoose.model('Book',BookSchma);
// 	var Book = mongoose.model('Book');//Book为model name

// function insert(imgname,imgsrc){
// 	var book = new Book({
// 		name: imgname,
// 		src: imgsrc,
// 		publishTime: new Date()
// 	});
// 	book.save(function (err) {
//     console.log('保存',err ? 'failed' : '成功');
// 	});
// }

// function query(){
// 	Book.find(function(error,result){
// 		console.log(result);
// 		return result;
// 	})
// }

// exports.user = db.model('c1',userScheMa); //  与users集合关联

// exports.insert = insert;