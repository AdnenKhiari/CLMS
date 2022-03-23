import {Link} from "react-router-dom"
import * as ROUTES from "./../lib/routes"
const LeftNav = ()=>{
    return <nav className="leftNav">
        <ul>
            <li><Link to={ROUTES.BOOK_ADD}>Add a book</Link></li>
            <li><Link to={ROUTES.BOOK_SEARCH}>Search for a book</Link></li>
            <li><Link to={ROUTES.BOOK_DEL}>Delete a book</Link></li>
            <li><Link to={ROUTES.BOOK_MOD}>Modify a book</Link></li>
            <br/>
            <li><Link to={ROUTES.TRANSACTION_ADD}>Add a Transaction</Link></li>
            <li><Link to={ROUTES.TRANSACTION_SEARCH}>Search a Transaction</Link></li>
            <li><Link to={ROUTES.TRANSACTION_DEL}>Delete a Transaction</Link></li>
            <li><Link to={ROUTES.TRANSACTION_MOD}>Modify a Transaction</Link></li>
            <br/>
            <li><Link to={ROUTES.BORROW_ADD}>Add a Borrow Operation</Link></li>
            <li><Link to={ROUTES.BORROW_DEL}>Delete a Borrow Operation</Link></li>
            <li><Link to={ROUTES.BORROW_MOD}>Modify a Borrow Operation</Link></li>
            <li><Link to={ROUTES.BORROW_SEARCH}>Search a Borrow Operation</Link></li>
            <br/>
            <li><Link to={ROUTES.STUDENT_SEARCH}>Search for a Student</Link></li>
            <li><Link to={ROUTES.STUDENT_ADD}>Add a Student</Link></li>
            <li><Link to={ROUTES.STUDENT_DEL}>Delete a Student</Link></li>
            <li><Link to={ROUTES.STUDENT_MOD}>Modify a Student</Link></li>
            <br/>
            <li><Link to={ROUTES.USER_SEARCH}>Search for a User</Link></li>
            <li><Link to={ROUTES.USER_ADD}>Add a User</Link></li>
            <li><Link to={ROUTES.USER_DEL}>Delete a User</Link></li>
            <li><Link to={ROUTES.USER_MOD}>Modify a User</Link></li>
        </ul>
    </nav>; 
}
export default LeftNav