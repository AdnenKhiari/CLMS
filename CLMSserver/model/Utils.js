const ApiError = require( "../errors/ApiError" )
const {redisClient} = require("../lib/db")
const SaveIDToRedis = async (sessionID,userid)=> new Promise((resolve,reject)=>{
    redisClient.set("sessionid:"+sessionID,userid,(error,reply)=>{
        if(error)
            return reject(error)
        return resolve(reply)
    })
})

const GetTokenFromRedis = async  (sessionID)=> new Promise((resolve,reject)=>{
    redisClient.get("sessionid:"+sessionID,(error,reply)=>{
        if(error)
            return reject(error)
        return resolve(reply)
    })
})

const RemoveTokenFromRedis = async  (sessionID)=> new Promise((resolve,reject)=>{
    redisClient.del("sessionid:"+sessionID,(error,reply)=>{
        if(error)
            return reject(error)
        return resolve(reply)
    })
})

module.exports = {
    SaveIDToRedis,
    GetTokenFromRedis,
    RemoveTokenFromRedis
}