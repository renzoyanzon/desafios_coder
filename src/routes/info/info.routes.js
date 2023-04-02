const router = require('express').Router();

const DataInfo = require('../../services/info/info.services')
const dataInfo = new DataInfo();

router.get('/',async (_req,res)=>{
    //console.log( await dataInfo.getInfoProcess())
    res.status(200).json({
        success: true,
        data: await dataInfo.getInfoProcess()
    })
})

module.exports= router;