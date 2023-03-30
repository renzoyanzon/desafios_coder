const app = require('./app');

const appLogger = require('pino')(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        },
    }
);


const cluster= require('cluster');
const numCPUs = require('os').cpus().length

const argv = process.argv.slice(2);
const PORT = argv.length >0 ? argv[0] : 8080;
const mode = argv.length ? argv[1] : 'FORK'


if(mode=='CLUSTER'){
    if(cluster.isMaster){
        for(let i=0; i< numCPUs-1; i++){
            cluster.fork()
        }
    
        cluster.on("exit",()=>{
            appLogger.warn(`Process ${process.pid} died`)
        })
    }else{
        app.listen(PORT,()=> appLogger.info(`Server up and runnin on port ${PORT} and port running on process ${process.pid}`))
    
    }
} else{
    app.listen(PORT,()=> appLogger.info(`Server up and runnin on port ${PORT} and port running on process ${process.pid}`))
}
