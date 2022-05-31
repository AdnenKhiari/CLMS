const express= require("express")
const router = express.Router()
const {format_data} = require("../../lib/utils")
const  getTransactionsValidation = require("./ValidateTransactions")
//import the winston logger
const logger = require("../../log/logger")
//import books model
const TransactionsModel = require("../../model/Transactions")
const { StatusCodes } = require( "http-status-codes" )

const {IsAuthenticated,Authenticate,Authorised} = require("../../lib/Auth")

router.get("/",getTransactionsValidation.ValidateGet,getTransactionsValidation.ValidateGetConstraints,async (req,res,next)=>{
    try{
        const data = await TransactionsModel.getATransaction(req.query) 
        console.log(req.query)
        console.log("DATA Number:",data.length)
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})

router.post('/',Authenticate,Authorised('A'),getTransactionsValidation.ValidateInsert,getTransactionsValidation.ValidateInsertConstraints,async (req,res,next)=>{
    try{
        const data = await TransactionsModel.addATransaction(req.body) ;
       // console.log(data)
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})

router.delete('/',Authenticate,Authorised('A'), getTransactionsValidation.ValidateRemove,getTransactionsValidation.ValidateRemoveConstraints,async (req,res,next)=>{
    try{
        const data = await TransactionsModel.deleteATransaction(req.body) ;
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})

router.patch('/',Authenticate,Authorised('A'),getTransactionsValidation.ValidateUpdate,getTransactionsValidation.ValidateUpdateConstraints,async (req,res,next)=>{
    try{
        req.body = format_data(req.body)
        const data = await TransactionsModel.patchATransaction(req.body) ;
        console.log(data)
        return res.status(StatusCodes.OK).send(data)
    }catch(err){
        return next(err)
    }
})
module.exports = router