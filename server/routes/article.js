const express = require('express');
const router = express.Router();
let article = require('../controller/articleController')


router.get('/getArticle',article.getArticle)
router.get('/getArticleByid',article.getArticleByid)
router.get('/getMessage',article.getArticleMessage)
module.exports=router