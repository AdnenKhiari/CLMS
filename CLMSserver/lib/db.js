//import the winston logger
const logger = require("../log/logger")
//Connecting redis (for sessions storage)
const redisClient = require("redis").createClient({
    host : "localhost",
    port : 6379
})
redisClient.on("error",(err)=>logger.error(err))
redisClient.on("connect",(cnt)=>logger.info("Redis Connected "))

//Connecting MYSQL 
const mysql= require("mysql2")
const dbconnection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME
})
dbconnection.on("error",(err)=>logger.error(err))
dbconnection.on("connect",(cnt)=>logger.info("MYSQL Connected "))
module.exports = {
    mysqlClient : dbconnection,
    redisClient : redisClient
}