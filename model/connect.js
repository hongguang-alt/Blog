const config = require('config')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.url')}/blog`,{ useNewUrlParser: true ,useUnifiedTopology: true})
        .then(()=>{
            console.log('数据库连接成功')
        })
        .catch(()=>{
            console.log('数据库创建失败')
        })