//Error handlers
const {HandlePromiseError,HandleApiError,HandleGenericError} = require("./errors/ErrorHandler")

//import the winston logger
const logger = require("./log/logger")

//mailer
const mailer = require("./lib/mailtransporter")

//.env loded into process.env
if(process.env.NODE_ENV === undefined || process.env.NODE_ENV === "development"){
    //for dev just load everything from .env
    const env = require("dotenv")
    env.config()
}

//Init express app
const express = require('express')
const app = express()

//configuring cors to allow all
if(process.env.NODE_ENV === undefined || process.env.NODE_ENV === "development"){
    app.use(require("cors")({
        origin: 'http://localhost:3000',
        credentials: true
    }))
}else{
    app.use(require("cors")())   
}
//Configuring Body parsers for json
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

// add the cookie object to request
const cookieParser = require("cookie-parser")
app.use(cookieParser(process.env.COOKIE_SECRET))

//List of routes uses
const ROUTES = require("./lib/routes")
const BooksController = require("./controller/Books/Books")
const StudentsController = require("./controller/Students/Students")
const UsersController = require("./controller/Users/Users")
const BorrowsController = require("./controller/Borrows/Borrows")
const TransactionsController = require("./controller/Transaction/Transactions")
const AuthController = require("./controller/Auth/Auth")

//Should export the routers to an another folder
//Routes
app.use((req,res,next)=>{
    console.log(req.cookies)
    return next()
})

app.get(ROUTES.PING,(req,res)=>{
  return res.status(200).send("Hi the server is running and waiting for requests")
})

app.get("/mailer",async (req,res,next)=>{
    mailer.sendMail({
        from: `<test2lel.@dbztestingsmtp.lel>`,
        to: `test1lel.@dbztestingsmtp.lel`,
        text: `Hiii from the server`
    },(error,info)=>{
        if(error)
            return next(error);
        else
            return res.send(JSON.stringify(info))
    })
})

//Books Route
app.use(ROUTES.BOOKS,BooksController)
app.use(ROUTES.STUDENTS,StudentsController)
app.use(ROUTES.USERS,UsersController)
app.use(ROUTES.BORROWS,BorrowsController)
app.use(ROUTES.TRANSACTIONS,TransactionsController)
app.use(ROUTES.AUTH,AuthController)


//Error Handling
app.use((err,req,res,next)=>{
    return HandleApiError(err,req,res,next)
})

process.on("unhandledRejection",(err,promise)=>{
    HandlePromiseError(err,promise)
})

process.on("uncaughtException",(reason)=>{
    HandleGenericError(reason)
})

//Server listen to port specified env
app.listen(process.env.SERVER_PORT,(err)=>{
    if(err){
        HandleGenericError(err)
    }else{
        logger.info(`Im listening at port ${process.env.SERVER_PORT}`)
    }
})