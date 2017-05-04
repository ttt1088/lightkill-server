var express = require('express');
var router = express.Router();
var messageCenter = require('../handlers/messageCenter')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var mCenter = new messageCenter();
  var io = mCenter.getConnection();
  io.sockets.emit('welcome', 'test test');
  
  res.send('respond with a resource');
});

module.exports = router;
