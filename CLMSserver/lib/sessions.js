const {redisClient} = require("./db.js")

//Configuring sessions for data persistency for express-passport
const sessions = require("express-session")

//Binding the redis client to the sessions middleware with redis-connect
const redisStore = require("connect-redis")(sessions)

module.exports = sessions({
    store : new redisStore({client : redisClient }),
    resave:false,
    saveUninitialized : true,
    secret: process.env.COOKIE_SECRET,
    cookie : {
        sameSite : "lax",
        maxAge: 1000*10
    }
})