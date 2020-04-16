const { User } = require('../../model/user')
module.exports =async (req,res)=>{
    req.app.locals.currentlink = 'user'
    const { message,id } = req.query
    user = await User.findOne({_id:id})
    if(user){
        return res.render('admin/user-edit',{
            message,
            user,
            button:'修改',
            link:'/admin/user-modify?id='+id
        })
    }else{
        res.render('admin/user-edit',{
            message,
            button:'提交',
            link:'/admin/user-edit'
        })
    }
}