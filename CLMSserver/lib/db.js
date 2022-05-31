//import the winston logger
const logger = require("../log/logger")
const {HandleDbConnectionError } = require("../errors/ErrorHandler")
//Connecting redis (for sessions storage)
const redisClient = require("redis").createClient({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT
})
redisClient.on("error",(err)=>HandleDbConnectionError(err))
redisClient.on("connect",(cnt)=>"Cconnected to Redis ")

//Connecting MYSQL 
const mysql= require("mysql2")
const dbconnection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME
})
dbconnection.on("error",(err)=>HandleDbConnectionError(err))
dbconnection.on("connect",(cnt)=>console.log("Connected to mysql"))

module.exports = {
    mysqlClient : dbconnection,
    redisClient : redisClient
}