const { User, vilidateUser } = require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports =async (req,res,next)=>{
    const id = req.query.id
    const { password, username,email,state, role } = req.body
    let user = await User.findOne({_id:id})
    let istrue = await bcrypt.compare( password , user.password)
    if(istrue){  
        //进行表单验证
        try{
             await  vilidateUser(req.body)
        }catch(err){
            return next(JSON.stringify({path:'/admin/user-edit', message:err.message,id:id}))
        }

       await User.updateOne({_id:id},{
            username,
            email,
            state,
            role
        })
        res.redirect('/admin/user')
    }else{
        return next(JSON.stringify({path:'/admin/user-edit',message:'密码比对失败，不能进行修改',id:id}))
    }
}