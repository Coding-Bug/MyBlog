const express = require('express');
const router = express.Router();
let article = require('../controller/articleController')


router.get('/getArticle',article.getArticle)


module.exports=router