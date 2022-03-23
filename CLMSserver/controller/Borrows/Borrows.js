const express = require("express")
const router = express.Router()
const {format_data} = require("../../lib/utils")
const getBorrowsValidation = require("./ValidateBorrows")
const {getAllBorrows, addABorrow, deleteABorrow,patchABorrow} = require("../../model/Borrows")
const { StatusCodes } = require( "http-status-codes" )

// TODO : MAKE SURE THAT JOI SANITASIZE DATA + OVERRIDE ALL DATA AND CHECK SCHEMAS

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

router.post('/',getBorrowsValidation.ValidateInsert,getBorrowsValidation.ValidateInsertConstraints,async (req,res,next)=>{
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

router.patch('/',getBorrowsValidation.ValidateUpdate,getBorrowsValidation.ValidateUpdateConstraints,async (req,res,next)=>{
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

router.delete('/',getBorrowsValidation.ValidateRemove,getBorrowsValidation.ValidateRemoveConstraints,async (req,res,next)=>{
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