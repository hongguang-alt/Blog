const { User } = require('../../model/user')
module.exports =async (req,res)=>{
    req.app.locals.currentlink = 'user'
    let total = await User.countDocuments({})
    let pagesize = 5;
    let currentpage = req.query.page || 1 
    let jumpnumber = (currentpage-1) * pagesize
    let totalpage = Math.ceil( total / pagesize)
    let users = await User.find().sort('role').sort('username').limit(pagesize).skip(jumpnumber)
    res.render('admin/user',{
        users,
        currentpage,
        totalpage,
        total
    })
}