const ApiError = require("../../errors/ApiError")
const {StatusCodes} = require('http-status-codes');
const { ValidateInsertBorrow } = require("../../model/Borrows")
const SchemaValidator = require("./Schema")
const {format_data} = require("../../lib/utils")

const ValidateGet =  (req,res,next)=>{
    const dt = format_data(req.query)
    if(Object.keys(dt).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id or some specifications",StatusCodes.BAD_REQUEST))
    try{
        if(dt.hasOwnProperty("ID")){
            var {error ,value : data } = SchemaValidator.BorrowsGetSchema.IdOnly.validate(dt)
        }else{
            var {error ,value : data } = SchemaValidator.BorrowsGetSchema.AllFields.validate(dt)
        }
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        //formatted data
            req.query = data
    }catch(err){
        return next(err)
    }
    return next()
}
const ValidateGetConstraints = (req,res,next)=>{
    return next()
}


const ValidateUpdate = async (req,res,next)=>{
    
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id and some specifications",StatusCodes.BAD_REQUEST))
    try{
        const {error,value} =  SchemaValidator.BorrowsUpdateSchema.validate(req.body)
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        //formatted data
            req.body = value
        return next()
    }catch(err){
        return next(err)
    }
}

const ValidateInsert = async (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id or some specifications",StatusCodes.BAD_REQUEST))
    try{
        const {error,value} =  SchemaValidator.BorrowsAddSchema.validate(req.body)
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
        await ValidateInsertBorrow(req.body)
    }catch(err){
        return next(err)
    }
    return next()
}

const ValidateUpdateConstraints = ValidateInsertConstraints

const ValidateRemove =  (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters include an ID",StatusCodes.BAD_REQUEST))
    try{
        const {error,value} =  SchemaValidator.BorrowsRemoveSchema.validate(req.body)
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        req.body = value
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