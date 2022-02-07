//import the winston logger
const logger = require("../log/logger")
//Passport for auth
const passport = require("passport")

//Strategy Used : Local email and password
var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy((username,password,done)=>{
    logger.debug(`Try to log user : ${username} ${password}`)
    return done(null,{name : "Dummy name",username,password})
}))

//User Serealisation
passport.serializeUser((user,done)=>{
    process.nextTick(()=>{
        logger.debug("Serialised")
        return done(null,0)
    })
})
//User Deserialsation
passport.deserializeUser((id,done)=>{
    process.nextTick(()=>{
        logger.debug("Deserialised")
        return done(null,{id : id,name: "Dummy name"})
    })
})

module.exports = passport