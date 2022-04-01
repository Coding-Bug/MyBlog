const express = require('express');
const router = express.Router();
const article = require('../controller/articleController.js')


router.post('/publishArticle',article.publishArticle)  // 发布文章
module.exports = router