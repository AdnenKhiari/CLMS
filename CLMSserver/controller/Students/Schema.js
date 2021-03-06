const Joi = require("joi")
//To test
const StudentGetSchema = {
    AllFields: Joi.object({
        first_name: Joi.string().required().allow("").trim().label("First Name"),
        last_name: Joi.string().required().allow("").trim().label("Last Name"),
        gender: Joi.string().trim().required().valid("M","F","").label("Gender"),
        email : Joi.string().trim().allow("").required().label("Email"),
        birth_date : Joi.date().allow("").required().label("BirthDate"),
        address : Joi.string().trim().allow("").optional().label("Address").default(null).allow(null)
     }),
    IdOnly: Joi.object({
        ID : Joi.number().positive().required().label("ID")
    })
} 

const StudentAddSchema = Joi.object({
    first_name: Joi.string().required().trim().label("First Name"),
    last_name: Joi.string().required().trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F").label("Gender"),
    email : Joi.string().trim().required().email({tlds: false}).label("Email"),
    password : Joi.string().min(3).required().label("Password"),
    address : Joi.string().trim().optional().label("Address").default(null).allow(null),
    birth_date : Joi.date().required().label("BirthDate")
})

//To see null values while adding
const StudentUpdateSchema = Joi.object({
    ID : Joi.number().positive().required().label("ID"),
    first_name: Joi.string().required().allow("").trim().label("First Name"),
    last_name: Joi.string().required().allow("").trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F","").label("Gender"),
    email : Joi.string().trim().allow("").required().email({tlds: false}).label("Email"),
    password : Joi.string().min(3).required().allow("").label("Password"),
    address : Joi.string().trim().allow("",null).required().label("Address").allow(null),
    birth_date : Joi.date().allow("").required().label("BirthDate")
})

const StudentRemoveSchema = Joi.object({
    ID : Joi.number().positive().required().label("ID")
})

module.exports = {
    StudentGetSchema,
    StudentAddSchema,
    StudentUpdateSchema,
    StudentRemoveSchema
}