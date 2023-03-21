const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const numCPUs = require('os').cpus().length;

class DataInfo {

    constructor(){}

    async getInfoProcess (){
        const data ={
            args: argv,
            platform: process.platform,
            version: process.version,
            memory: process.memoryUsage().rss,
            path: process.execPath,
            pid: process.pid,
            cwd: process.cwd(),
            numCPUs: numCPUs
        }

        return await data
    }

}

module.exports = DataInfo