const mongoose = require('mongoose');
const {getMongoConfig} = require('../session/session.config');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/desafioCoder';

const mongooseConnect = ()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(()=>{
        console.info('Mongoose connected');
    }).catch(err=>{
        console.error(err);
        process.exit();
    })
}

module.exports = mongooseConnect;