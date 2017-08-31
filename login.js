var express = require('express');
var router = express.Router();
var conn = require('../conn');
var find = conn.find;

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'This is Test' , text:'haahha'});
});

router.post('/',function(req,res,next){
  find('user',function(data){
    res.send(data);
  },{'uname':req.body.uname,'upwd':req.body.upwd})
})


module.exports = router;
