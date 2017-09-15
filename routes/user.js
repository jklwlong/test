var express = require('express');
var router = express.Router();
var user = require('../modules/user_module');

router.post('/', function(req, res, next) {
	var params = req.body;
	console.log(params)
	user.findOne(params, function (err, user) {
		console.log(user)
		if(err) {
			return res.send(err);
		}
		res.json({"userInfo": user});
	});
});

router.post('/register', function(req, res, next) {
	var params = req.body;
	console.log(params)
	user.create(params,function(err,foo){
        if(err){
            console.log(err)
        }else{
            res.json({"success": "success"});
        }
    });
});



module.exports = router;