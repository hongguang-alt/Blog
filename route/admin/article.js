const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports =async (req,res)=>{
    req.app.locals.currentlink = 'article'
    let page = req.query.page || 1
    let articles =  await pagination(Article).find().page(page).size(5).display(3).populate('author').sort('publishDate').exec()
    // res.send(articles)
    // return
    res.render('admin/article',{
        articles
    })
}