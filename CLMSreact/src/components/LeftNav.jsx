import {Link} from "react-router-dom"
import * as ROUTES from "./../lib/routes"

import {useCheckRole} from "../lib/utils"
import * as PERMISSIONS from "../lib/permissions"


const LeftNav = ()=>{
    return <nav className="leftNav">
        <ul>
            {useCheckRole(PERMISSIONS.BOOK_ADD_PERM) &&  <li><Link to={ROUTES.BOOK_ADD}>Add a book</Link></li> }
            {useCheckRole(PERMISSIONS.BOOK_SEARCH_PERM) &&  <li><Link to={ROUTES.BOOK_SEARCH}>Search for a book</Link></li> }
            {useCheckRole(PERMISSIONS.BOOK_DEL_PERM) &&  <li><Link to={ROUTES.BOOK_DEL}>Delete a book</Link></li> }
            {useCheckRole(PERMISSIONS.BOOK_MOD_PERM) &&  <li><Link to={ROUTES.BOOK_MOD}>Modify a book</Link></li> }
            <br/>
            {useCheckRole(PERMISSIONS.TRANSACTION_ADD_PERM) &&  <li><Link to={ROUTES.TRANSACTION_ADD}>Add a Transaction</Link></li> }
            {useCheckRole(PERMISSIONS.TRANSACTION_SEARCH_PERM) &&  <li><Link to={ROUTES.TRANSACTION_SEARCH}>Search a Transaction</Link></li> }
            {useCheckRole(PERMISSIONS.TRANSACTION_DEL_PERM) &&  <li><Link to={ROUTES.TRANSACTION_DEL}>Delete a Transaction</Link></li> }
            {useCheckRole(PERMISSIONS.TRANSACTION_MOD_PERM) &&  <li><Link to={ROUTES.TRANSACTION_MOD}>Modify a Transaction</Link></li> }
            <br/>
            {useCheckRole(PERMISSIONS.BORROW_ADD_PERM) &&  <li><Link to={ROUTES.BORROW_ADD}>Add a Borrow Operation</Link></li> }
            {useCheckRole(PERMISSIONS.BORROW_DEL_PERM) &&  <li><Link to={ROUTES.BORROW_DEL}>Delete a Borrow Operation</Link></li> }
            {useCheckRole(PERMISSIONS.BORROW_MOD_PERM) &&  <li><Link to={ROUTES.BORROW_MOD}>Modify a Borrow Operation</Link></li> }
            {useCheckRole(PERMISSIONS.BORROW_SEARCH_PERM) &&  <li><Link to={ROUTES.BORROW_SEARCH}>Search a Borrow Operation</Link></li> }
            <br/>
            {useCheckRole(PERMISSIONS.STUDENT_SEARCH_PERM) &&  <li><Link to={ROUTES.STUDENT_SEARCH}>Search for a Student</Link></li> }
            {useCheckRole(PERMISSIONS.STUDENT_ADD_PERM) &&  <li><Link to={ROUTES.STUDENT_ADD}>Add a Student</Link></li> }
            {useCheckRole(PERMISSIONS.STUDENT_DEL_PERM) &&  <li><Link to={ROUTES.STUDENT_DEL}>Delete a Student</Link></li> }
            {useCheckRole(PERMISSIONS.STUDENT_MOD_PERM) &&  <li><Link to={ROUTES.STUDENT_MOD}>Modify a Student</Link></li> }           
            <br/>
            {useCheckRole(PERMISSIONS.USER_SEARCH_PERM) &&  <li><Link to={ROUTES.USER_SEARCH}>Search for a User</Link></li> }           
            {useCheckRole(PERMISSIONS.USER_ADD_PERM) &&  <li><Link to={ROUTES.USER_ADD}>Add a User</Link></li> }           
            {useCheckRole(PERMISSIONS.USER_DEL_PERM) &&  <li><Link to={ROUTES.USER_DEL}>Delete a User</Link></li> }           
            {useCheckRole(PERMISSIONS.USER_MOD_PERM) &&  <li><Link to={ROUTES.USER_MOD}>Modify a User</Link></li> }           
        </ul>
    </nav>; 
}
export default LeftNav