const Joi = require("joi")

const LoginSchema = Joi.object({
    username: Joi.string().email({tlds : false}).required().label("Email"),
    password : Joi.string().required().label("Password"),
})

module.exports = {LoginSchema}