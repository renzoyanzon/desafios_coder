const express =  require('express');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const { getStoreConfig }= require('./src/services/session/session.config');
const indexRouter = require('./src/routes/index');

const mongooseConnect = require('./src/services/mongo/connect')
const endPointLogger = require('morgan');

require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./src/services/mongo/user.model');
const md5 =require('md5');

const app = express();


app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(endPointLogger('tiny'))

mongooseConnect();

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'undefined';

app.use(cookieParser(COOKIE_SECRET));
app.use(session({
    store:  MongoStore.create(getStoreConfig()),
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.set('view engine','ejs');
app.set('views','./views');

//seteamos la configuracion de passport
passport.use('login', new LocalStrategy(async (username,password,done)=>{
    const userData = await UserModel.findOne({username,password:md5(password)});
    if(!userData){
        return done(null,false);
    }
    done(null, userData)
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req,username,password,done)=>{
    const userData = await UserModel.findOne({username,password:md5(password)});
    if(userData){
        return done(null,false)
    }
    const stageUser = new UserModel({
        username,
        password: md5(password),
        fullname: req.body.fullname
    });
    const newUser = await stageUser.save();
    done(null,newUser)
}
));

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser(async (id,done)=>{
    const userData = await UserModel.findById(id);
    done(null,userData);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(indexRouter);


module.exports= app;