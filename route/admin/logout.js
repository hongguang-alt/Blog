module.exports=(req,res)=>{
    //删除session
    req.session.destroy(function(){
        //删除cookie
        res.clearCookie('connection.sid')
        //重定向到用户登陆界面
        res.redirect('/admin/login')
        req.app.locals.userInfo = null
    })
}