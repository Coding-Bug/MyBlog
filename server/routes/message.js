const express = require('express');
const router = express.Router();
const message  =require('../controller/messageController')


router.post('/likeMessage',message.likeMessage)
router.get('/getMessage',message.getMessage)
router.post('/leaveMessage',message.leaveMessage)
module.exports=router