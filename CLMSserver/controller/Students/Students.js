const express = require("express")

const router = express.Router()
//to format the data

const {format_data} = require("../../lib/utils")

const getStudentsValidation = require("./ValidateStudents")

const {getAllStudents,addAStudent, deleteAStudent, patchAStudent} = require("../../model/Students")
const { StatusCodes } = require( "http-status-codes" )

const {IsAuthenticated,Authenticate,Authorised} = require("../../lib/Auth")

router.get('/',Authenticate,Authorised('A'),getStudentsValidation.ValidateGet,getStudentsValidation.ValidateGetConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.query)
        console.log(bd)
        const data = await getAllStudents(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.post('/',Authenticate,Authorised('A'),getStudentsValidation.ValidateInsert,getStudentsValidation.ValidateInsertConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await addAStudent(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.patch('/',Authenticate,Authorised('A'),getStudentsValidation.ValidateUpdate,getStudentsValidation.ValidateUpdateConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await patchAStudent(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.delete('/',Authenticate,Authorised('A'),getStudentsValidation.ValidateRemove,getStudentsValidation.ValidateRemoveConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await deleteAStudent(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

module.exports = router