const ROUTES = require("./lib/routes")

//.env loded into process.env
const env = require("dotenv")
env.config()

//init express app
const express = require('express')
const app = express()

//configuring cors to allow all
app.use(require("cors")())

//Configuring Body parsers for json
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// add the cookie object to request
const cookieParser = require("cookie-parser")
app.use(cookieParser())

//Configuring redis for session storage
const redisClient = require("redis").createClient({
    host : "localhost",
    port : 6379
})
redisClient.on("error",(err)=>console.log("Error",err))
redisClient.on("connect",()=>console.log("red Connected "))

//Configuring sessions for data persistency for express-passport
const sessions = require("express-session")

//Binding the redis client to the sessions middle with redis-connect
const redisStore = require("connect-redis")(sessions)

app.use(sessions({
    store : new redisStore({client : redisClient }),
    resave:false,
    saveUninitialized : true,
    secret: process.env.COOKIE_SECRET,
    cookie : {
        sameSite : "lax",
        maxAge: 1000*10
    }
}))

//Connecting MYSQL 
const mysql= require("mysql2")
const dbconnection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME
})

//Passport for auth
const passport = require("passport")

//Strategy Used : Local email and password
var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy((username,password,done)=>{
        console.log(username,password)
        return done(null,{name : "Dummy name",username,password})
}))

//Enable sessions managment for passport 
app.use(passport.authenticate('session'))

//User Serealisation
passport.serializeUser((user,done)=>{
    process.nextTick(()=>{
        console.log("Seriealised")
        return done(null,0)
    })
})
//User Deserialsation
passport.deserializeUser((id,done)=>{
    process.nextTick(()=>{
        return done(null,{id : id,name: "Dummy name"})
    })
})

//Should export the routers to an another folder
//Routes
app.get(ROUTES.PING,(req,res)=>{
    //cookie parser working
    console.log(req.cookies)
  return  res.status(200).send("Hi the server is running and waiting for requests")
})
app.post(ROUTES.LOGIN,passport.authenticate('local',{failureRedirect: '/api',failureMessage: "Error , dbz adnen did not authorize you"}),(req,res)=>{
   return res.send("Hii :=)")
});
app.post("/protected",(req,res)=>{
    console.log(req.cookies)

    if(req.user == null)
       return res.status(400).send("Unauthorised !!!")
    //cookie parser working
    console.log(req.cookies)
    res.status(200).send(`Welcome dude ${JSON.stringify(req.user)}`)
})
//Server listen to port specified in .env file
app.listen(process.env.SERVER_PORT,(err)=>{
    if(err)
        console.log("Err",err)
    console.log(`Im listening at port ${process.env.SERVER_PORT}`)
})