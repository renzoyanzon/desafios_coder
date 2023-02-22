const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/signin',(req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/home')
    }
    res.render('signin');
});

router.get('/signup',(req,res)=>{
    if(req.isAuthenticated()){
        return  res.redirect('/home')
    }
    res.render('signup');
});

router.get('/',(_req,res)=>{
    res.render('signin');
});

router.get('/error',(_req,res)=>{
    res.render('error');
});



router.get('/home',authMiddleware, (req,res)=>{
    if(!req.session.contador){
        req.session.contador= 0
    }
    req.session.contador = req.session.contador + 1;
    const message = {
        user: req.user.username,
        contador: req.session.contador
    }
   
    res.render('home',{message});
});






module.exports = router;
