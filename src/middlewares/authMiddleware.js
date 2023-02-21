const authMiddleware = (req,res,next)=>{
    if(req.session.username && req.session.isAuth){

        return next();
    } 
    
    res.redirect('/signin');
}

module.exports = authMiddleware;