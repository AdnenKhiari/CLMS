const express= require("express")
const router = express.Router()
const {format_data} = require("../../lib/utils")
const  getBooksValidation = require("./ValidateBooks")
const {IsAuthenticated,Authenticate,Authorised} = require("../../lib/Auth")

//import the winston logger
const logger = require("../../log/logger")
//import books model
const BooksModel = require("../../model/Books")
const { StatusCodes } = require( "http-status-codes" )
router.get("/",getBooksValidation.validateGet,async (req,res,next)=>{
    try{
        const data = await BooksModel.getAllBooks(req.query) 
        console.log(req.query)
        console.log("DATA Number:",data.length)
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})

router.post('/',Authenticate,Authorised('A'),getBooksValidation.validateInsertInput,getBooksValidation.validateInsertConstraints,async (req,res,next)=>{
    try{
        const data = await BooksModel.addABook(req.body) ;
       // console.log(data)
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})

router.delete('/',Authenticate,Authorised('A'),getBooksValidation.validateRemove,getBooksValidation.validateRemoveConstraints,async (req,res,next)=>{
    try{
        const data = await BooksModel.deleteABook(req.body) ;
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})

router.patch('/',Authenticate,Authorised('A'),getBooksValidation.validateUpdate,getBooksValidation.validateUpdateConstraints,async (req,res,next)=>{
    try{
        req.body = format_data(req.body)
        const data = await BooksModel.patchABook(req.body) ;
        console.log(data)
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})
module.exports = router