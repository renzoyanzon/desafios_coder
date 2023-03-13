const app = require('./app');
const minimist= require('minimist');

const argv = process.argv.slice(2);
const options = {default:{puerto:8080},alias: {p:"puerto"}};
const puerto = minimist(argv,options);
delete puerto.p;
delete puerto._


const PORT = puerto.puerto

app.listen(PORT,()=> console.info(`Server up and running on port ${PORT}`))
