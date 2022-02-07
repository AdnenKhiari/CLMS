const winston = require("winston")
const customFormat = winston.format.printf((info)=>{
    return `[${info.level}]:${info.timestamp}:${info.message}`
})
const devlogger = winston.createLogger({
    format : winston.format.combine(
        winston.format.timestamp({format : "DD-MM/HH:mm:ss"}),
        winston.format.padLevels(),
        customFormat
    ),
    transports :[
        new winston.transports.Console(),
        new winston.transports.File({dirname : __dirname,filename:"All.log",level: "debug"})
    ]
})

module.exports = devlogger