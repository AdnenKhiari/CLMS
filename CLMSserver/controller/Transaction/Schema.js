const Joi = require("joi");
const {logger} = require("../../log/logger")

const TransactionsGetSchema = {
    IDOnly:  Joi.object({
        ID: Joi.number().positive("ID should be positive").required("Missing Arguments: ID")
    }),
    AllFields : Joi.object({
        name : Joi.string().trim().allow("").required().label("Name"),
        comment: Joi.string().trim().allow("").optional().allow(null).default(null).label("Comment"),
        borrow_ID : Joi.number().positive().required().allow("").label("Borrow ID"),
        user_ID : Joi.number().positive().required().allow("").label("User ID")
    })
}
const TransactionInsertSchema =  Joi.object({
    name : Joi.string().trim().required().label("Name"),
    comment: Joi.string().trim().optional().allow(null).default(null).label("Comment"),
    borrow_ID : Joi.number().positive().required().label("Borrow ID"),
    user_ID : Joi.number().positive().required().label("User ID")
})

const TransactionUpdateSchema = Joi.object({
        ID: Joi.number().positive().required().label("ID"),
        name : Joi.string().allow("").trim().required().label("Name"),
        comment: Joi.string().allow("").trim().optional().allow(null).default(null).label("Comment"),
        borrow_ID : Joi.number().allow("").positive().required().label("Borrow ID"),
        user_ID : Joi.number().allow("").positive().required().label("User ID")
})


const TransactionsRemoveSchema = Joi.object({
        ID : Joi.number().positive().required().label("ID")
})

module.exports ={
    TransactionsGetSchema,
    TransactionInsertSchema,
    TransactionUpdateSchema,
    TransactionsRemoveSchema
}
