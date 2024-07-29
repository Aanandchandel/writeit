const Comment = require('../model/comment');

async function chackBelong(req, res, next) {
    try{
        const { id } = req.params;
        const author_id=req.user.user.id;
        const comment=await Comment.findById(id);
        if(!comment){
            return res.status(404).send({message:"comment note ffound"})
        }
        comment.author_id==author_id?next():res.status(401).send({message:"you are not auther"})
    }catch(err){
        res.status(500).send({message:err})
    }
}
        
    
        
    
    module.exports=chackBelong
    