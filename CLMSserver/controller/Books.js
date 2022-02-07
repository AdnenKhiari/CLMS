const express= require("express")
const router = express.Router()

//import the winston logger
const logger = require("../log/logger")
//import books model
const BooksModel = require("../model/Books")
router.get("/",async (req,res,next)=>{
    try{
        console.log(req.query)
        const data = await BooksModel.getAllBooks(req.query) 
        console.log(data)
        return res.status(200).send(data)
    }catch(err){
        return next(err)
    }
})

router.post('/',async (req,res,next)=>{
    try{
        const data = await BooksModel.addABook(req.body) ;
        console.log(data)
        return res.status(200).send(data)
    }catch(err){
        return next(err)
    }
})
//000198078-7
module.exports = router