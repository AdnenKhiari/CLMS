//Passport for authentication
const express = require("express")
const ValidateAuth = require("./ValidateAuth")
const router = express.Router()
const {LoginUserByCredentials,IssueConnectToken,IsAuthenticated,Authenticate,Authorised,InvalidateUser} = require("../../lib/Auth")
const ApiError = require( "../../errors/ApiError" )
router.post('/login',ValidateAuth.ValidateLogin,async (req,res,next)=>{
    try{
        const isAuth = await IsAuthenticated(req,res)
        if(!isAuth){
            //loginuser
            const user = await LoginUserByCredentials(req.body)
            req.user = user      
            console.log("Logged in : ",req.user)

            //Issue connect token
            await IssueConnectToken(user.ID,res)
        }
        //redirect
        return res.send(req.user)
    }catch(err){
        req.user = null
        return next(err)
    }
})
router.post('/logout',async (req,res,next)=>{
    try{
        await InvalidateUser(req,res)
        return res.send("Ok")
    }catch(err){
        return next(err)
    }

})
router.get("/me",async (req,res,next)=>{
    try{
        const user = await IsAuthenticated(req,res)
        req.user = user            
    }catch(err){
        req.user = null
        return next(err)
    }
    return res.send(req.user)
})

router.get("/protected",Authenticate,async (req,res)=>{
    console.log(req.user)
    res.status(200).send(`Welcome dude ${JSON.stringify(req.user)}`)
})
router.get("/protected/C",Authenticate,Authorised('C'),async (req,res)=>{
    console.log(req.user)
    res.status(200).send(`Welcome dude ${JSON.stringify(req.user)}`)
})
router.get("/protected/A",Authenticate,Authorised('A'),async (req,res)=>{
    console.log(req.user)
    res.status(200).send(`Welcome dude ${JSON.stringify(req.user)}`)
})
router.get("/protected/D",Authenticate,Authorised('D'),async (req,res)=>{
    console.log(req.user)
    res.status(200).send(`Welcome dude ${JSON.stringify(req.user)}`)
})

module.exports = router