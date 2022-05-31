const {getUserByUsernamePassword, getAllUsers} = require("../model/Users")
const {SaveIDToRedis,GetTokenFromRedis,RemoveTokenFromRedis} = require("../model/Utils")
var rand = require('csprng');
const ApiError = require( "../errors/ApiError" );
const { StatusCodes } = require( "http-status-codes" );
const ClmsConnectCookieOption = require("./cookies")

const LoginUserByCredentials = async (data)=>{
    console.log("Trying to log a user : ",data.username,data.password)
    try{
        const user = await getUserByUsernamePassword(data.username,data.password)
        return user
    }catch(err){
        throw err
    }
}

const IssueConnectToken = async (id,res)=>{
    try{
        const sessionID = rand(176,16)
        await SaveIDToRedis(sessionID,id)
        res.cookie("clms-auth-connect",sessionID,ClmsConnectCookieOption)
    }catch(err){
        throw err
    }
}
const InvalidateUser = async (req,res)=>{
    try{
        req.user = null
        await RemoveTokenFromRedis(req.cookies["clms-auth-connect"])
        res.clearCookie("clms-auth-connect",ClmsConnectCookieOption)
        return null
    }catch(err){
        throw err
    }
}

const IsAuthenticated = async (req,res)=>{
    if(req.user !== null && req.user !== undefined)
        return req.user
    if(req.cookies["clms-auth-connect"] !== undefined){
        try{
            const result = await GetTokenFromRedis(req.cookies["clms-auth-connect"])
            if(result === null)
                return InvalidateUser(req,res)
            req.user = (await getAllUsers({ID : result }))[0]
            return req.user
        }catch(err){
            if(err instanceof ApiError){
                //means invalid ID but valid sessions ID
                return InvalidateUser(req,res)
            }
            throw err
        }
    } 
    return InvalidateUser(req,res)
}

const Authenticate = async(req,res,next)=>{
    try{
        const user = await IsAuthenticated(req,res)
        if(user === null)
            return next(new ApiError("Not Authenticated","You need to be authenticated to access the resource",StatusCodes.UNAUTHORIZED))
        return next()
    }catch(err){
        return next(err)
    }
}

const Authorised = (role)=> (req,res,next)=>{
    if(req.user === null || req.user ===undefined)
        return next(new ApiError("Not Authenticated","You need to be authenticated to access the resource",StatusCodes.UNAUTHORIZED))
    if(role <= req.user.grade)
        return next()
    return next(new ApiError("Not Authorised","You need to have a higher grade to view the resource",StatusCodes.FORBIDDEN))
}

module.exports = {LoginUserByCredentials,IssueConnectToken,IsAuthenticated,Authenticate,Authorised,InvalidateUser}