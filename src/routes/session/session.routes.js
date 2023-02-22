const router = require('express').Router();
const passport = require('passport');


router.post('/signup', passport.authenticate('signup',{failureRedirect:'/error'}) ,async (req,res)=>{
    console.log(req.user);
    res.redirect('/home');
});

router.post('/signin',passport.authenticate('login',{failureRedirect:'/error'}) ,async (req,res)=>{
    console.log(req.user);
    res.redirect('/home');
})

router.get('/signout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/signin');
    })
    
});



module.exports = router;