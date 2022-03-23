const logger = require("../../log/logger")
const { format_data } = require( '../../lib/utils' );
const {BookGetSchema,BookInsertSchema,BookUpdateSchema,BookRemoveSchema} = require("./Schema");
const {ValidateBookInsertConstraints} =require("./../../model/Books")
const ApiError = require( "../../errors/ApiError" );
const { StatusCodes } = require( "http-status-codes" );

const validateGet = (req,res,next)=>{
    let schema = null
    //format data
    req.query = format_data(req.query)
    //make sure that data exists
    if(Object.keys(req.query).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id or some specifications",StatusCodes.BAD_REQUEST))
    //choose the correct validation
    if(req.query.ID != undefined &&  req.query.ID != null){
        schema = BookGetSchema.IDOnly.validate(req.query)
    }else{
        schema = BookGetSchema.AllFields.validate(req.query)
    }   
    //validate
    const {error,value} = schema
    if(error != null){
        return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
    }
    req.query = value
    return next()
} 


const validateRemove = (req,res,next)=>{
    req.body = format_data(req.body)
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters include an ID",StatusCodes.BAD_REQUEST))
    if(req.body.ID){
        const {error,value} = BookRemoveSchema.AllFields.validate(req.body)
        if(error != null){
            return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
        }
        req.body = value
        return next()
    }
    return next(new ApiError("Missing Resources","Missing Parameters ID",StatusCodes.BAD_REQUEST))
} 

const validateRemoveConstraints  = (req,res,next)=>{
    return next()
}

const validateInsertInput = (req,res,next)=>{
    req.body = format_data(req.body)
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters ,include values to add a book",StatusCodes.BAD_REQUEST))
    const {error,value} = BookInsertSchema.AllFields.validate(req.body)
    if(error != null){
        return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
    }
    req.body = value
    return next()
} 

const validateInsertConstraints = async (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters ,include values to add a book",StatusCodes.BAD_REQUEST))
    try{
        const result = await ValidateBookInsertConstraints(req.body)
        if(!result)
            return next(new ApiError("Constraint Error","ISBN Already Exists",StatusCodes.UNPROCESSABLE_ENTITY))
        else
            return next()
    }catch(err){
        return next(err)
    }
}

const validateUpdate = (req,res,next)=>{
    req.body = format_data(req.body)
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters Either include an id or some specifications",StatusCodes.BAD_REQUEST))
        const {error,value} = BookUpdateSchema.AllFields.validate(req.body)
    if(error != null){
        return next(new ApiError("Input Validation Error","Wrong Inputs",StatusCodes.BAD_REQUEST,error.details.map((el)=>el.message)))
    }
    req.body = value
    return next()
}

const validateUpdateConstraints = async (req,res,next)=>{
    if(Object.keys(req.body).length == 0)
        return next(new ApiError("Missing Resources","Missing Parameters ,include ID to modify a book",StatusCodes.BAD_REQUEST))
    if(req.body.ID != null){
        if(req.body.ISBN){
            try{
                const result = await ValidateBookInsertConstraints(req.body)
                if(!result)
                    return next(new ApiError("Constraint Error","ISBN Already Exists",StatusCodes.UNPROCESSABLE_ENTITY))
                else
                    return next()
            }catch(err){
                return next(err)
            }
        }
        return next()
    }
    return next(new ApiError("Missing Resources","Missing Parameters ,include ID to modify a book",StatusCodes.BAD_REQUEST))
}

module.exports = {
    validateGet,
    validateInsertInput,
    validateInsertConstraints,
    validateUpdate,
    validateUpdateConstraints,
    validateRemove,
    validateRemoveConstraints
}