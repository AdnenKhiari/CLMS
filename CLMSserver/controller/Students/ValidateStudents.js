const ApiError = require("../../errors/ApiError")
const {StatusCodes} = require('http-status-codes');
const { ValidateInsertStudent } = require("../../model/Students")
const SchemaValidator = require("./Schema")
const ValidateGet =  (req,res,next)=>{
    const dt = req.query
    var error = null
    var data = null
    if(Object.keys(req.query).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id or some specifications",StatusCodes.BAD_REQUEST))
    try{
        if(dt.hasOwnProperty("ID"))
            var {error : error,data : data} = SchemaValidator.StudentGetSchema.IdOnly.validate(dt)
        else
            var {error : error,data : data} = SchemaValidator.StudentGetSchema.AllFields.validate(dt)
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
    }catch(err){
        return next(err)
    }
    return next()
}
const ValidateGetConstraints = (req,res,next)=>{
    return next()
}


const ValidateUpdate = (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id and some specifications",StatusCodes.BAD_REQUEST))
    try{
        const {error,value} =  SchemaValidator.StudentUpdateSchema.validate(req.body)
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        return next()
    }catch(err){
        return next(err)
    }
}

const ValidateInsert = async (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id or some specifications",StatusCodes.BAD_REQUEST))
    try{
        const {error,value} =  SchemaValidator.StudentAddSchema.validate(req.body)
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        req.body = value
        return next()
    }catch(err){
        return next(err)
    }
}

const ValidateInsertConstraints = async (req,res,next)=>{
    try{
        await ValidateInsertStudent(req.body)
    }catch(err){
        return next(err)
    }
    return next()
}

const ValidateUpdateConstraints =  ValidateInsertConstraints


const ValidateRemove =  (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters include an ID",StatusCodes.BAD_REQUEST))
    try{
        const {error,value} =  SchemaValidator.StudentRemoveSchema.validate(req.body)
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        return next()
    }catch(err){
        return next(err)
    }
}

const ValidateRemoveConstraints =  (req,res,next)=>{
    return next()
}

module.exports = {
    ValidateGet,
    ValidateGetConstraints,
    ValidateUpdate,
    ValidateUpdateConstraints,
    ValidateInsert,
    ValidateInsertConstraints,
    ValidateRemove,
    ValidateRemoveConstraints
}