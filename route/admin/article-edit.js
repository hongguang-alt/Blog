const { Article } = require('../../model/article')
module.exports =async (req,res)=>{
    req.app.locals.currentlink = 'article'
    const id = req.query.id
    //通过id是否存在来判断是进行修改还是编辑提交
    if(id){
       var article = await Article.findOne({_id:id})
       res.render('admin/article-edit',{
           article,
           button:'修改',
           link:'/admin/article-modify'
       })
    }else{
        res.render('admin/article-edit',{
            link:'/admin/article-add',
            button:'提交'
        })
    }

}