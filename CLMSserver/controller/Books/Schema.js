const Joi = require("joi");
const {logger} = require("../../log/logger")
const ISBNValidator = require( 'isbn-validate' );
const { number } = require( "joi" );

const validate_isbn = (value,helpers)=> !ISBNValidator.Validate(value.replace("-","")) ? helpers.message("Invalid ISBN") : value
const BookGetSchema = {
    IDOnly:  Joi.object({
        ID: Joi.number().positive("ID should be positive").required("Missing Arguments: ID")
    }),
    AllFields : Joi.object({
        title : Joi.string().trim().allow("").exist().label("Title"),
        publisher: Joi.string().trim().allow("").default("").exist().label("Publisher"),
        author: Joi.string().trim().allow("").default("").exist().label("Author"),
        ISBN: Joi.string().trim().allow("").default("").exist().label("ISBN"),
        publication_date: Joi.date().allow("").default(null).label("Publication Date")
    })
}
const BookInsertSchema = {
    AllFields :  Joi.object({
        title : Joi.string().trim().disallow("").exist().label("Title"),
        publisher: Joi.string().trim().disallow("").exist().label("Publisher"),
        author: Joi.string().trim().disallow("").exist().label("Author"),
        ISBN: Joi.string().trim().custom(validate_isbn).disallow("").exist().label("ISBN"),
        publication_date: Joi.date().disallow("").allow(null).optional().default(null).label("Publication Date"),
        cover_url: Joi.string().uri().allow(null).trim().disallow("").optional().default(null).label("Cover Url")
    })
}
const BookUpdateSchema = {
    AllFields : Joi.object({
            ID : Joi.number().positive().required().label("ID"),
            title : Joi.string().trim().allow("").label("Title"),
            publisher: Joi.string().trim().allow("").label("Publisher"),
            author: Joi.string().trim().allow("").label("Author"),
            ISBN: Joi.string().trim().custom(validate_isbn).allow("").label("ISBN"),
            publication_date: Joi.date().allow("").allow(null).label("Publication Date").default(null),
            cover_url: Joi.string().uri().trim().allow("").allow(null).label("Cover Url").default(null)
    })
}

const BookRemoveSchema =  {
    AllFields : Joi.object({
        ID : Joi.number().positive().required().label("ID")
    })
}
module.exports ={
    BookGetSchema,
    BookInsertSchema,
    BookUpdateSchema,
    BookRemoveSchema
}