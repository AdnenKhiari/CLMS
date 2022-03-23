import ISBNValidator from "isbn-validate"
export const validate_isbn =(value,helpers)=> !ISBNValidator.Validate(value.replace("-","")) ? helpers.message("Invalid ISBN") : value