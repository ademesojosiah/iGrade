const isAuthorized = (req,res,next)=>{
    if(req.session.isAuthorized){
        next();
    }else{
        res.status(401).json({message:"Un-authorized"})
    }
}

module.exports = {isAuthorized};