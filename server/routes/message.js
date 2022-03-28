const express = require('express');
const router = express.Router();
const message  =require('../controller/messageController')


router.post('/likeMessage',message.likeMessage)

module.exports=router