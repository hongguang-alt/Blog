const { User } = require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports = async (req,res)=>{
    const { email, password } = req.body
    if(email.trim().length ==0 || password.trim().length ==0){
        return res.status(400).render('admin/error',{msg:'邮箱或者密码错误'})
    }
    let result = await User.findOne({email})
    if(result){
        let isValid = await bcrypt.compare(password,result.password)
        if(isValid){
            req.session.username = result.username
            req.session.role = result.role
            req.app.locals.userInfo = result
            if(result.role=='admin'){
                res.redirect('/admin/user')
            }else{
                res.redirect('/home/')
            }
            
        }else{
            res.status(400).render('admin/error',{msg:'邮箱或者密码错误'})
        }
    }else{
        res.status(400).render('admin/error',{msg:'邮箱或者密码错误'})
    }
}