const express = require('express');
const router = express.Router();
let article = require('../controller/articleController')


router.get('/getArticle',article.getArticle)
router.get('/getArticleByid',article.getArticleByid)
router.post('/likeArticle',article.likeArticle)
router.get('/getArchive',article.getArchive)
router.get('/getCategory',article.getCategory)
module.exports=router