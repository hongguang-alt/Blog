const formidable =require('formidable')
const path = require('path')
const { Article } =require('../../model/article')
module.exports = (req,res)=>{
    const form = formidable.IncomingForm()
    form.uploadDir = path.join(__dirname,'../','../','public','upload')
    //是否保存后缀
    form.keepExtensions = true
    //对表单进行解析
    form.parse(req,async (err, fields,files)=>{
        // res.send(files)
       const { title, author, publishDate, content} = fields
       await Article.create({
            title,
            author,
            publishDate,
            content,
            cover:files.cover.path.split('public')[1]
        })
        res.redirect('/admin/article')
    })
}