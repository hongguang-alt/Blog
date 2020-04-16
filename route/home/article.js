const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
module.exports =async (req,res)=>{
    let id = req.query.id
    let result = await Article.findOne({_id:id}).populate('author')
    let comment = await Comment.find({aid:id}).populate('uid')
    // res.send(comment)
    // return
    res.render('home/article',{
        result,
        comment
    })
}