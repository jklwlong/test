var express = require('express');
var router = express.Router();
var urllib = require('url');
var book = require('../modules/book_module');
/* GET users listing. */
router.get('/', function(req, res, next) {
	// var params = urllib.parse(req.url, true);
	//  var query = params.query;
	// var result = mongo.query();

	book.find({}, function (err, books) {
		if(err) {
			return res.send(err);
		}
		console.log(books)
		// res.render('users',{books: books});
		res.json({"books": books});
	});
});

router.post('/findById', function(req, res, next) {
	var params = req.body.id;
	book.findById(params, function (err, book) {
		if(err) {
			return res.send(err);
		}
		res.json({"book": book});
	});
});

router.post('/updateById', function(req, res, next) {
	var params = req.body;
	book.update({_id:params.id}, params, function (err) {
		if(err) {
			return res.send(err);
		}
		res.json({"success": "success"});
	});
});

router.post('/delById', function(req, res, next) {
	var params = req.body;
	book.remove({_id:params.id}, err => {
		if(err) {
			return res.send(err);
		}
		res.json({"success": "success"});
	});
});

router.post('/batchDel', function(req, res, next) {
	var params = req.body;
	book.remove({ _id: { $in: params.idArr } }, err => {
		if(err) {
			return res.send(err);
		}
		res.json({"success": "success"});
	});
});

module.exports = router;
