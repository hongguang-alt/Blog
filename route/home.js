const express = require('express')
const home = express.Router()

home.get('/',require('./home/index'))

home.get('/article',require('./home/article'))

//增加评论的路由
home.post('/common',require('./home/comment'))
//导出路由模块
module.exports = home