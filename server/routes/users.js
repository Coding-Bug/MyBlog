var express = require('express');
var router = express.Router();
let users = require('../controller/usersController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',users.userLogin)
module.exports = router;
