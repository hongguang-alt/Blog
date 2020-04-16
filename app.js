const express = require('express')
const app = express()
const path = require('path')
//导入路由模块
const home = require('./route/home')
const admin = require('./route/admin')
const bodyParser = require('body-parser')
require('./model/connect')
// require('./model/user')

//导入转换时间的模块
const dateformat = require('dateformat')
const template = require('art-template')
template.defaults.imports.dateformat = dateformat

//导入config模块
const config = require('config')



//导入session模块
const session = require('express-session')

app.use(session({ secret:'secret key',saveUninitialized:false }))
app.use(bodyParser.urlencoded({extended:false}))

//设置访问静态资源
app.use(express.static(path.join(__dirname,'public')))
//设置模板引擎的配置
app.engine('art',require('express-art-template'))
//告诉express框架模板存放的位置是什么
app.set('views',path.join(__dirname,'views'))
//告诉epress框架模板的默认后缀是什么
app.set('view engine','art')

//登陆拦截功能
app.use('/admin',require('./middleware/loginGuard'))
app.use('/home',require('./middleware/homeLogin'))

app.use('/',home)
app.use('/home',home)
app.use('/admin',admin)

app.use((err,req,res,next)=>{ 
    if(err.message){
        console.log(err.message)
        res.send(err.message)
        let user = JSON.parse(err)
        let arry = []
        for(var item in user ){
            if(item!='path'){
                arry.push(item + `=${user[item]}`)
            }
        }
        res.redirect(`${ user.path }?${arry.join('&')}`)
    }else{
        res.redirect('admin/error',{
            msg:'未知错误'
        })
    }
})

//监听服务器端口
app.listen(80)
console.log('服务器启动成功，请访问localhost:8080')