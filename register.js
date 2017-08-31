var express = require('express');
var router = express.Router();
var conn = require('../conn');
var insert = conn.insert;

router.get('/', function(req, res, next) {
  res.render('register', { title: 'This is Test' , text:'haahha'});
});

router.post('/',function(req,res,next){
  insert('user',function(data){
    res.send(data);
  },{'uname':req.body.uname,'upwd':req.body.upwd})
})


module.exports = router;
