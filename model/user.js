const mongose = require('mongoose')
const userSchema = mongose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //admin normal
    role: {
        type: String,
        required: true
    },
    //0 是启用状态 1是禁用状态
    state: {
        type: Number,
        default: 0
    }
})
const Joi = require('joi')
const User = mongose.model('User', userSchema, 'User')
const bcrypt = require('bcryptjs')

async function run() {
    let salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash('123456', salt)
    //作为测试的用户代码
    User.create({
        username:'hongguang',
        email:'hongguang@qq.com',
        password:pass,
        role:'admin',
        state:0
    }).then(()=>{
        console.log('用户创建成功')
    })
}
// run()

const  vilidateUser = user =>{
    const schema = {
        username:Joi.string().required().min(2).max(12).error(new Error('用户名验证失败')),
        email:Joi.string().required().email().error(new Error('邮箱验证失败')),
        password:Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码验证失败')),
        role:Joi.string().required().valid('admin','normal').error(new Error('角色验证失败')),
        state:Joi.number().required().valid(0,1).error(new Error('状态验证失败'))
    }

    return Joi.validate(user,schema)
}

module.exports = {
    User,
    vilidateUser
}