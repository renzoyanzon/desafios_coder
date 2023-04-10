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
app.set('views','./views/pages');

const passportService= require('./src/services/passport/passport.services')

app.use(passportService.initialize());
app.use(passportService.session());

app.use(indexRouter);


module.exports= app;