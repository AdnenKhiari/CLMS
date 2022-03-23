const Joi = require("joi")

//To test
const BorrowsGetSchema = {
    AllFields: Joi.object({
        student_ID : Joi.number().positive().required().allow("").label("Student ID"),
        book_ID : Joi.number().positive().required().allow("").label("Book ID"),
        date_borrowed : Joi.date().required().allow("").label("Date Borrowed"),
        date_return : Joi.date().optional().allow("",null).default(null).label("Date Return"),
    }),
    IdOnly: Joi.object({
        ID : Joi.number().positive().required().label("ID")
    })
} 

const BorrowsAddSchema = Joi.object({
    student_ID : Joi.number().positive().required().label("Student ID"),
    book_ID : Joi.number().positive().required().label("Book ID"),
    date_borrowed : Joi.date().required().label("Date Borrowed"),
    date_return : Joi.date().optional().allow(null).default(null).label("Date Return"),
})

const BorrowsUpdateSchema = Joi.object({
    ID : Joi.number().positive().required().label("ID"),
    student_ID : Joi.number().positive().required().allow("").label("Student ID"),
    book_ID : Joi.number().positive().required().allow("").label("Book ID"),
    date_borrowed : Joi.date().required().allow("").label("Date Borrowed"),
    date_return : Joi.date().optional().allow("",null).default(null).label("Date Return"),
})

const BorrowsRemoveSchema = Joi.object({
    ID : Joi.number().positive().required().label("ID")
})

module.exports = {
    BorrowsGetSchema,
    BorrowsAddSchema,
    BorrowsUpdateSchema,
    BorrowsRemoveSchema
}