const logger = require("../log/logger")
const {StatusCodes: http_status_codes } = require("http-status-codes")

const ApiError = require("./ApiError")

const SERVER_ERROR = {
    name: "Internal server error",
    message: "Unexpected error occured , please send a bug report to the admin"
}

const HandleApiError = (err,req,res)=>{
    //add the headers sent
    if(err instanceof ApiError){
        //Handle Error if required
       // console.log("ERROR FOUND ",err)
        return res.status(err.status_code).json(FormatApiError(err))
    }else{
        //Should send error and devops stuff and format errors accordingly
        console.log("Untrusted But safe error",err)
        logError()
        return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json(SERVER_ERROR)
    }
}

const HandleDbConnectionError = (err)=>{
    logError(err)
    console.log("DB ERROR",err)
    process.exit(-1)
}

const HandlePromiseError = (err,promise)=>{
    logError(err)
    console.log("FAILED PROMISE",promise)
    MailError(err)
    process.exit(-1)
}

const HandleGenericError = (reason)=>{
    logError(reason)
    console.log("Failed reason :",reason)
    MailError(reason)
    process.exit(-1)
}

const logError = (err)=>{
    logger.error(err)
}

const MailError  = (err)=>{

}

const FormatApiError = (err)=>{
    return {
        name: err.name,
        message: err.message,
        details: err.details
    } 
}

module.exports = {HandleGenericError,HandleApiError,HandlePromiseError,HandleDbConnectionError}