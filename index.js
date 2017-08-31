var express = require('express');
var router = express.Router();

var conn = require('../conn');
// var conn1 = conn.conn1;
// var find1 = conn.find1;
// /* GET home page. */

// var deal = {
// 	funs: [{
// 		name: 'find',
// 		query: {},
// 		limit: 5,
// 		skip: 0
// 	},{
// 		name: 'count',
// 		query: {}
// 	}],
// 	colName: 'ulist',	
// }

// router.get('/', function(req, res, next) {
	
// 		if(req.query.page){
// 		deal.funs[0].skip = (req.query.page - 1) * 5;
// 	}
// 	conn1(deal, function(data){
// 		var len = Math.ceil((data.count - 0)/(data.find.length));
// 		var pageArr = [];
// 		for(var i = 0; i < len; i++){
// 			pageArr.push(i + 1);
// 		}
// 		pageArr.splice(3, (len - 6))
// 		pageArr.splice(3, 0, '···')

// 		res.render('index', {list: data.find, pages: pageArr});
// 	})
// 	// find1('ulist',function(data){
// 	//   res.render('index', { title: 'Express',vals:data});
		
// 	// })
//   });

//   router.post('/', function(req, res, next) {
// 	  remove('udata', function(data){
// 		   res.send(data);
// 	  }, {'id': req.body.id }); 
// 	});


var find2 = conn.find2;
/* GET home page. */
router.get('/', function(req, res, next) {
    // query
    // body
    // params  传递的参数组

    // console.log(req.params.id);
    // console.log(req.query);
   var getPage = 0 || req.query.page;
   

    find2('ulist', function(datas, len){
        var num = Math.ceil(len/10);
        var nums = [];
        for(var i = 0; i < num; i++){
			nums.push(i + 1);
			
		}
		nums.splice(3, (num - 6));
		nums.splice(3, 0, '···');
        res.render('index', {pages: nums, list: datas});
    }, (req.query.page - 1)*10);    
    
    
});

router.post('/', function(req, res){
    console.log(req.body);
})


module.exports = router;


