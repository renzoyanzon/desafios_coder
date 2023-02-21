const express = require('express');
const router = express.Router();

const statusCode = require('http-status');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/signin',(req,res)=>{
    if(req.session.isAuth){
        res.redirect('/home')
    }
    res.render('signin');
});

router.get('/signup',(req,res)=>{
    if(req.session.isAuth){
        res.redirect('/home')
    }
    res.render('signup');
});

router.get('/',(_req,res)=>{
    res.render('signin');
});

router.get('/error403',(_req,res)=>{
    res.render('error',{message: `${statusCode[403]} ,bad username or password`});
});

router.get('/error400',(_req,res)=>{
    res.render('error',{message: `${statusCode[400]} ,username or password missing`});
});

router.get('/home',authMiddleware, (req,res)=>{
    if(!req.session.contador){
        req.session.contador= 0
    }
    req.session.contador = req.session.contador + 1;
    const message = {
        username: req.session.username,
        contador: req.session.contador
    }
   
    res.render('home',{message});
});






module.exports = router;
