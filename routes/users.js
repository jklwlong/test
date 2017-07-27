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
		res.render('users',{books: books});
	});
});

module.exports = router;
