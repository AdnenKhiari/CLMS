const {HandlePromiseError,HandleApiError,HandleGenericError} = require("./errors/errorHandler")
const {StatusCodes: http_status_codes } = require("http-status-codes")

//import the winston logger
const logger = require("./log/logger")
//.env loded into process.env
const env = require("dotenv")
env.config()

//Init express app
const express = require('express')
const app = express()

//configuring cors to allow all
app.use(require("cors")())

//Configuring Body parsers for json
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

// add the cookie object to request
const cookieParser = require("cookie-parser")
app.use(cookieParser())

//List of routes uses
const ROUTES = require("./lib/routes")
const BooksController = require("./controller/Books/Books")
const StudentsController = require("./controller/Students/Students")

//Passport for authentication
const passport = require("./lib/passportAuth")

//Init sessions
const sessions = require("./lib/sessions.js")
const ApiError = require( "./errors/ApiError" )
app.use(sessions)

//Enable sessions managment for passport 
app.use(passport.authenticate('session'))

//Should export the routers to an another folder
//Routes
app.get(ROUTES.PING,(req,res)=>{
  return res.status(200).send("Hi the server is running and waiting for requests")
})
app.post(ROUTES.LOGIN,passport.authenticate('local',{failureRedirect: '/api',failureMessage: "Error , dbz adnen did not authorize you"}),(req,res)=>{
   return res.send("Hii :=)")
});
app.post("/protected",(req,res)=>{
    logger.debug(req.cookies)
    if(req.user == null)
       return res.status(400).send("Unauthorised !!!")
    res.status(200).send(`Welcome dude ${JSON.stringify(req.user)}`)
})

//Books Route
app.use(ROUTES.BOOKS,BooksController)
app.use(ROUTES.STUDENTS,StudentsController)

app.use((err,req,res,next)=>{
    return HandleApiError(err,req,res,next)
})

process.on("unhandledRejection",(err,promise)=>{
    HandlePromiseError(err,promise)
})

process.on("uncaughtException",(reason)=>{
    HandleGenericError(reason)
})

//Server listen to port specified in .env file
app.listen(process.env.SERVER_PORT,(err)=>{
    if(err){
        HandleGenericError(err)
    }else{
        logger.info(`Im listening at port ${process.env.SERVER_PORT}`)
    }
})