/**
 * Created by Brians Desktop on 1/5/2017.
 */
var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Main' });
});

module.exports = router;