const express = require("express")

const router = express.Router()
//to format the data

const {format_data} = require("../../lib/utils")

const getUsersValidation = require("./ValidateUsers")

const {getAllUsers,addAUser, deleteAUser, patchAUser} = require("../../model/Users")
const { StatusCodes } = require( "http-status-codes" )

const {IsAuthenticated,Authenticate,Authorised} = require("../../lib/Auth")

router.get('/',Authenticate,Authorised('C'),getUsersValidation.ValidateGet,getUsersValidation.ValidateGetConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.query)
        console.log(bd)
        const data = await getAllUsers(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.post('/',Authenticate,Authorised('D'),getUsersValidation.ValidateInsert,getUsersValidation.ValidateInsertConstraints,async (req,res,next)=>{
    try{
        const bd = (req.body)
        console.log(bd)
        const data = await addAUser(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.patch('/',Authenticate,Authorised('D'),getUsersValidation.ValidateUpdate,getUsersValidation.ValidateUpdateConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await patchAUser(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

router.delete('/',Authenticate,Authorised('D'),getUsersValidation.ValidateRemove,getUsersValidation.ValidateRemoveConstraints,async (req,res,next)=>{
    try{
        const bd = format_data(req.body)
        console.log(bd)
        const data = await deleteAUser(bd)
        console.log(data.length)
        res.status(StatusCodes.OK).json(data)
    }catch(err){
        next(err)
    }
})

module.exports = router