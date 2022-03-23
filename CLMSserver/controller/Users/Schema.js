const Joi = require("joi")
//To test
const UsersGetSchema = {
    AllFields: Joi.object({
        first_name: Joi.string().required().allow("").trim().label("First Name"),
        last_name: Joi.string().required().allow("").trim().label("Last Name"),
        gender: Joi.string().trim().required().valid("M","F","").label("Gender"),
        email : Joi.string().trim().allow("").required().label("Email"),
        birth_date : Joi.date().allow("").required().label("BirthDate"),
        grade: Joi.string().trim().required().valid("A","C","D","").label("Grade"),
        salary : Joi.number().positive().required().allow("").label("Salary"),
        address : Joi.string().trim().allow("").optional().label("Address").default(null).allow(null)
     }),
    IdOnly: Joi.object({
        ID : Joi.number().positive().required().label("ID")
    })
} 

const UsersAddSchema = Joi.object({
    first_name: Joi.string().required().trim().label("First Name"),
    last_name: Joi.string().required().trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F").label("Gender"),
    email : Joi.string().trim().required().email({tlds: false}).label("Email"),
    password : Joi.string().min(3).required().label("Password"),
    address : Joi.string().trim().optional().label("Address").default(null).allow(null),
    grade: Joi.string().trim().required().valid("A","C","D").label("Grade"),
    salary : Joi.number().positive().required().label("Salary"),
    birth_date : Joi.date().required().label("BirthDate")
})

//To see null values while adding
const UsersUpdateSchema = Joi.object({
    ID : Joi.number().positive().required().label("ID"),
    first_name: Joi.string().required().allow("").trim().label("First Name"),
    last_name: Joi.string().required().allow("").trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F","").label("Gender"),
    grade: Joi.string().trim().required().valid("A","C","D","").label("Grade"),
    salary : Joi.number().positive().required().label("Salary").allow(""),
    email : Joi.string().trim().allow("").required().email({tlds: false}).label("Email"),
    password : Joi.string().min(3).required().allow("").label("Password"),
    address : Joi.string().trim().allow("",null).required().label("Address").allow(null),
    birth_date : Joi.date().allow("").required().label("BirthDate")
})

const UsersRemoveSchema = Joi.object({
    ID : Joi.number().positive().required().label("ID")
})

module.exports = {
    UsersGetSchema,
    UsersAddSchema,
    UsersUpdateSchema,
    UsersRemoveSchema
}