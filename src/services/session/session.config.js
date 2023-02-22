const getMongoConfig = ()=>{
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

const getStoreConfig = ()=>{
    const MONGO_URI = process.env.MONGO_URI || ' mongodb://localhost:27017/clase25';
    return{
        mongoUrl: MONGO_URI,
        ttl: 600,
        mongoOptions: getMongoConfig()
    }
}

module.exports = {
    getMongoConfig,
    getStoreConfig
}