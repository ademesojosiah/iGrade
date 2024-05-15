const isAuthorized = (req,res,next)=>{
    if(req.session.isAuthorized){
        next();
    }else{
        res.redirect("/home")
    }
}

module.exports = {isAuthorized};