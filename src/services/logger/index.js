const {createLogger, format, transports} = require('winston');

const loggerDev = createLogger({
    
    format: format.combine(format.simple()),
    transports: [
        new transports.Console({
            level: "info"
        })
    ]
});


const loggerProd = createLogger({
  
    format: format.combine(format.simple()),
    transports: [
        new transports.File({
            filename: "debug.log",
            level: "debug"
        }),
        new transports.File({
            filename: "error.log",
            level: "error"
        })
    ]
}); 


module.exports = {
  loggerDev,
  loggerProd
}