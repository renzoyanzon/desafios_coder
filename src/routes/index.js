const express = require('express');
const router = express.Router();

const pagesRouter = require('./pages/pages.routes');
const sessionRouter= require('./session/session.routes');
const infoRouter= require('./info/info.routes');
const childProcessRouter = require('./childProcess/childProcess.routes')

router.get('/health',(_req,res)=>{
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: '!Up'
    })
})
.use(pagesRouter)
.use('/api', sessionRouter)
.use('/info',infoRouter)
.use('/random',childProcessRouter)



module.exports = router;