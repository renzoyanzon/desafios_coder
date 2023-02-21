const authMiddleware = (req,res,next)=>{
    if(req.session.username && req.session.isAuth){
        console.log(req.session.username)
        next();
    } 
    
    res.redirect('/signin');
}

module.exports = authMiddleware;