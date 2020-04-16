require('./model/connect')
const { User } = require('./model/user')

User.create({
    username:'hongguang',
    email:'hongguang@qq.com',
    password:'123456',
    role:'admin',
    state:0
})