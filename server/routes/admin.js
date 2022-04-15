const express = require('express');
const router = express.Router();
const article = require('../controller/articleController.js')


router.post('/publishArticle',article.publishArticle)  // 发布文章
router.get('/getAdminArticle',article.getAdminArticle)
module.exports = router