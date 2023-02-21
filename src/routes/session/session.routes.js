const router = require('express').Router();
const UserModel = require('../../services/mongo/user.model');
const md5 = require('md5')

router.post('/signup',async (req,res)=>{
    const {fullname,username,password}= req.body;
    const findUser = await UserModel.findOne({username});
    if(findUser){
        return res.redirect('/error')
    }
    const newUser = new UserModel({
        username,
        fullname,
        password: md5(password)
    })
    const createUser = await newUser.save();
    if(!createUser){
        return res.redirect('/error')
    }
    res.redirect('/signin')
});

router.post('/signin',async (req,res)=>{
    let {username,password}= req.body;
    password = md5(password)
    const user = await UserModel.findOne({username,password});
    if(!username || !password){
        return res.redirect('/error400')
    }
    if(!user){
       return res.redirect('/error403')
    }
    
    req.session.username = username;
    req.session.isAuth = true;

    res.redirect('/home')
    
})

router.get('/signout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            process.exit();
        }
        res.redirect('/signin');
    })
    
});



module.exports = router;