const router = require('express').Router();
const passport = require('passport');

const logger = require('pino')(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        },
    }
);



router.post('/signup', passport.authenticate('signup',{failureRedirect:'/error'}) ,async (req,res)=>{
    logger.info(req.user);
    res.redirect('/home');
});

router.post('/signin',passport.authenticate('login',{failureRedirect:'/error'}) ,async (req,res)=>{
    logger.info(req.user);
    res.redirect('/home');
})

router.get('/signout',(req,res)=>{
    logger.info(req.user);
    req.logout(()=>{
        res.redirect('/signin');
    })
    
});



module.exports = router;