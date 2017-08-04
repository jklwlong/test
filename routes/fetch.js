var express = require('express');
var router = express.Router();
var fetch = require('../spider/asy');
router.post('/', function(req, res, next) {
	// var param = req.body;
 //     res.json({"errorCode": 0,"errorMessage": 'save'});
 	fetch.fetch();
});

module.exports = router;
