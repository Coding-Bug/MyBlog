var express = require('express');
var router = express.Router();
let users = require('../controller/usersController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',users.userLogin)
router.post('/sendEmail',users.sendEmail)
router.post('/register',users.userRgester)
router.post('/resetPassword',users.resetPassword)
router.post('/changeInfo',users.changeUserInfo)
router.get('/getInfo',users.getUserInfo)

module.exports = router;
