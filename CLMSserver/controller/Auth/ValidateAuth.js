const AuthSchema = require("./AuthSchema")
const ApiError = require("../../errors/ApiError")
const {StatusCodes} = require("http-status-codes")
const ValidateLogin = async (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Credentials",StatusCodes.BAD_REQUEST))
    const {error,value} = AuthSchema.LoginSchema.validate(req.body)
    if(error)
        return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
    req.body = value
    return next()
} 

module.exports = {ValidateLogin}