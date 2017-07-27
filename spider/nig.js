var Nightmare = require('nightmare');   
var nightmare = Nightmare({ show: true,width: 1200, height: 600 });
nightmare
  .goto('https://movie.douban.com/')
  .then(function(){
  	console.log(111);
  })

