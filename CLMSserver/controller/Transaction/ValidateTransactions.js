const logger = require("../../log/logger")
const { format_data } = require( '../../lib/utils' );
const { ValidateTransactionInsertConstraints } =require("./../../model/Transactions")
const ApiError = require("../../errors/ApiError")
const {StatusCodes} = require('http-status-codes');
const SchemaValidator = require("./Schema")

const ValidateGet =  (req,res,next)=>{
    const dt = format_data(req.query)
    if(Object.keys(dt).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id or some specifications",StatusCodes.BAD_REQUEST))
    try{
        if(dt.hasOwnProperty("ID")){
            var {error ,value : data } = SchemaValidator.TransactionsGetSchema.IDOnly.validate(dt)
        }else{
            var {error ,value : data } = SchemaValidator.TransactionsGetSchema.AllFields.validate(dt)
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
        const {error,value} =  SchemaValidator.TransactionUpdateSchema.validate(req.body)
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
        const {error,value} =  SchemaValidator.TransactionInsertSchema.validate(req.body)
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
        await ValidateTransactionInsertConstraints(req.body)
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
        const {error,value} =  SchemaValidator.TransactionsRemoveSchema.validate(req.body)
        if(error)
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        req.body = value
        return next()
    }catch(err){
        return next(err)
    }
}

const ValidateRemoveConstraints =   (req,res,next)=>{
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