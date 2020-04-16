const { Article } = require('../../model/article')
const formidable =require('formidable')
const path = require('path')
module.exports = (req,res)=>{
    let id = req.query.id
    const form = formidable.IncomingForm()
    form.uploadDir = path.join(__dirname,'../','../','public','upload')
    //是否保存后缀
    form.keepExtensions = true
    //对表单进行解析
    form.parse(req,async (err, fields,files)=>{
       const { title, author, publishDate, content} = fields
       if(files.size!=0){
            await Article.updateOne({_id:id},{
            title,
            author,
            publishDate,
            content,
            cover:files.cover.path.split('public')[1]
        })
       }else{
        await Article.updateOne({_id:id},{
            title,
            author,
            publishDate,
            content
        })
       }
        res.redirect('/admin/article')
    })
}