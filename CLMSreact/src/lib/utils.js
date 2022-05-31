import ISBNValidator from "isbn-validate"
import {UserContext} from "../contexts/UserContext"
import {useContext} from "react"
export const useCheckRole = (perm)=> {
    const {userData} = useContext(UserContext)
    return userData !== null && userData.grade >= perm
}

export const validate_isbn =(value,helpers)=> !ISBNValidator.Validate(value.replace("-","")) ? helpers.message("Invalid ISBN") : value
