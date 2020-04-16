
const { User, vilidateUser } =require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports =async (req,res,next)=>{
    //进行表单验证
    try{
        await  vilidateUser(req.body)
    }catch(err){
        // return   res.redirect(`/admin/user-edit?message=${err.message}`)
        return next(JSON.stringify({path:'/admin/user-edit', message:err.message}))
    }
    //进行内容验证，邮箱是否存在
    let user = await User.findOne({email:req.body.email})
    if(user){
        // return res.redirect('/admin/user-edit?message=邮箱已经存在')
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱已经存在'}))
    }
    //对密码进行加密然后存储到数据库中
    let salt = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(req.body.password,salt)
    req.body.password = password
    User.create(req.body)
    res.redirect('/admin/user')
}