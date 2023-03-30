const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

const {loggerDev, loggerProd}= require('../../services/logger/index');

const logger = process.env.ENVIRONMENT == "development" 
    ? loggerDev
    : loggerProd

router.post('/signup', passport.authenticate('signup',{failureRedirect:'/error'}) ,async (req,res)=>{
    logger.log("info",`El usuario ${req.user.fullname} se ha registrado correctamente`);
    res.redirect('/home');
});

router.post('/signin',passport.authenticate('login',{failureRedirect:'/error'}) ,async (req,res)=>{
    logger.log("info",`El usuario ${req.user.fullname} ha ingresado session`);
    res.redirect('/home');
})

router.get('/signout',(req,res)=>{
    logger.log("info",`El usuario ${req.user.fullname} ha salido de la session`);
    req.logout(()=>{
        res.redirect('/signin');
    })
    
});



module.exports = router;