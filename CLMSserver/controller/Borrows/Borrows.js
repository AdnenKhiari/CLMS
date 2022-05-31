const express = require("express")
const router = express.Router()
const {format_data} = require("../../lib/utils")
const getBorrowsValidation = require("./ValidateBorrows")
const {getAllBorrows, addABorrow, deleteABorrow,patchABorrow} = require("../../model/Borrows")
const { StatusCodes } = require( "http-status-codes" )

const {IsAuthenticated,Authenticate,Authorised} = require("../../lib/Auth")

router.get('/',getBorrowsValidation.ValidateGet,getBorrowsValidation.ValidateGetConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.query)
        console.log(bd)
        const data = await getAllBorrows(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.post('/',Authenticate,Authorised('A'),getBorrowsValidation.ValidateInsert,getBorrowsValidation.ValidateInsertConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await addABorrow(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.patch('/',Authenticate,Authorised('A'),getBorrowsValidation.ValidateUpdate,getBorrowsValidation.ValidateUpdateConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await patchABorrow(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.delete('/',Authenticate,Authorised('A'),getBorrowsValidation.ValidateRemove,getBorrowsValidation.ValidateRemoveConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await deleteABorrow(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

module.exports = router