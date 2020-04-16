const express = require('express')
const admin = express.Router()

//返回西显示登陆页面
admin.get('/login',require('./admin/loginPage'))

//返回显示列表页面
admin.get('/user',require('./admin/userPage'))

//登陆之后提交验证
admin.post('/login', require('./admin/login'))

//退出功能
admin.get('/logout',require('./admin/logout'))

//显示新增用户界面
admin.get('/user-edit',require('./admin/user-edit'))

//获取提交的数据
admin.post('/user-edit',require('./admin/user-edit-fn'))

//进行修改操作
admin.post('/user-modify',require('./admin/user-modify'))

//进行删除操作
admin.get('/user-delete',require('./admin/user-delete'))

//用户文章管理界面
admin.get('/article',require('./admin/article'))

//用户文章编辑界面
admin.get('/article-edit',require('./admin/article-edit'))

//用于添加用户文章
admin.post('/article-add',require('./admin/article-add'))

//用于修改用户文章
admin.post('/article-modify',require('./admin/article-modify'))

//用于删除用户文章
admin.post('/article-delete',require('./admin/article-delete'))

// 导出路由模块
module.exports = admin