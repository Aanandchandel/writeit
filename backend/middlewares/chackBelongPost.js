const Post = require('../model/post');

async function chackBelongPost(req, res, next) {
    try{
        const { id } = req.params;
        const author_id=req.user.user.id;
        const comment=await Post.findById(id);
        if(!comment){
            return res.status(404).send({message:"comment note found"})
        }
        comment.author_id==author_id?next():res.status(401).send({message:"you are not auther"})
    }catch(err){
        res.status(500).send({message:err})
    }
}
        module.exports=chackBelongPost
    