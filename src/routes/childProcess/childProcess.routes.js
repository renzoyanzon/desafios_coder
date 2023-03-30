const router = require('express').Router();
const { fork } =require('child_process');
const { isNil } =require('lodash')

router.get('/', async (req,res)=>{
    
    let {params} = req.query

 
    if(isNil(params)){
        params = 100000000
    }
    

    const comp = fork('./src/services/childProcess/childProcess.services.js');
    comp.send({action: "start", valor: params});
    comp.on('message',(data)=>{
        res.send({
            success: true,
            data: data
        })
    })
})

module.exports= router;