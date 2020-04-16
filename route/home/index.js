const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async (req,res)=>{
    let page = req.query.page
    let result =await pagination(Article).find().size(4).page(page).display(3).populate("author").exec()
    res.render('home/index',{
        result
    })
}