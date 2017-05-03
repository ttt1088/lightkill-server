var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function (req, res, next) {
  //res.send('about');
  next();
}, function (req, res) {
  res.send('hello from b');
});

module.exports = router;
