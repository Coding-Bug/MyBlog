const express = require('express');
const router = express.Router();
const about = require('../controller/about')


router.get('/getBloginfo',about.getBloginfo)
module.exports=router