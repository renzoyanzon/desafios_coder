const app = require('./app');
const minimist= require('minimist');

const argv = process.argv.slice(2);
const options = {default:{puerto:8080},alias: {p:"puerto"}};
const puerto = minimist(argv,options);
delete puerto.p;
delete puerto._

const cluster= require('cluster');
const numCPUs = require('os').cpus().length

const PORT = puerto.puerto

if(cluster.isMaster){
    for(let i=0; i< numCPUs-1; i++){
        cluster.fork()
    }

    cluster.on("exit",()=>{
        console.log(`Process ${process.pid} died`)
    })
}else{

    app.get('/',(_req,res)=>{
        res.send(`Este proceso es el ${process.pid}`)
    })

    app.listen(PORT,()=> console.info(`Server up and runnin on port ${PORT} and port running on process ${process.pid}`))

}
