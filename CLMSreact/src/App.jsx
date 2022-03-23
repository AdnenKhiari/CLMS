import './App.css';
import AList from './components/AList';
import AForm from './components/AForm';
import Leftnav from './components/LeftNav';
import Test from "./test"
import TopNav from './components/Topnav';
import * as ROUTES from "./lib/routes"
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useRouteMatch
} from "react-router-dom";
import BookAdd from './pages/bookadd';
import BookSearch from './pages/booksearch';
import BookDelete from './pages/bookdel';
import BookMod from './pages/bookmod';
import Profile from './pages/Profile';

import StudentAdd from './pages/studentadd';
import StudentSearch from './pages/studentsearch';
import StudentMod from './pages/studentmod';
import StudentDel from './pages/studentdel';

import UsersAdd from './pages/useradd';
import UsersSearch from './pages/usersearch';
import UsersMod from './pages/usermod';
import UsersDel from './pages/userdel';

import BorrowAdd from './pages/borrowadd';
import BorrowSearch from './pages/borrowsearch';
import BorrowMod from './pages/borrowmod';
import BorrowDel from './pages/borrowdel';


import TransactionAdd from './pages/transactionadd';
import TransactionSearch from './pages/transactionsearch';
import TransactionMod from './pages/transactionmod';
import TransactionDel from './pages/transactiondel';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
          <TopNav />
          <div className='maingrid'>
            <Leftnav />
            <div></div>
            <div className='subgrid'>
              <Routes>
              <Route path={ROUTES.PROFILE} element={<Profile/>} />

                <Route path={ROUTES.BOOK_ADD} element={<BookAdd/>} />
                <Route path={ROUTES.BOOK_SEARCH} element={<BookSearch/>} />
                <Route path={ROUTES.BOOK_MOD} element={<BookMod/>} />
                <Route path={ROUTES.BOOK_DEL} element={<BookDelete/>} />

                <Route path={ROUTES.STUDENT_ADD} element={<StudentAdd/>} />
                <Route path={ROUTES.STUDENT_SEARCH} element={<StudentSearch/>} />
                <Route path={ROUTES.STUDENT_MOD} element={<StudentMod/>} />
                <Route path={ROUTES.STUDENT_DEL} element={<StudentDel/>} />

                <Route path={ROUTES.USER_ADD} element={<UsersAdd/>} />
                <Route path={ROUTES.USER_SEARCH} element={<UsersSearch/>} />
                <Route path={ROUTES.USER_MOD} element={<UsersMod/>} />
                <Route path={ROUTES.USER_DEL} element={<UsersDel/>} />

                <Route path={ROUTES.BORROW_ADD} element={<BorrowAdd/>} />
                <Route path={ROUTES.BORROW_SEARCH} element={<BorrowSearch/>} />
                <Route path={ROUTES.BORROW_MOD} element={<BorrowMod/>} />
                <Route path={ROUTES.BORROW_DEL} element={<BorrowDel/>} />

                <Route path={ROUTES.TRANSACTION_ADD} element={<TransactionAdd/>} />
                <Route path={ROUTES.TRANSACTION_SEARCH} element={<TransactionSearch/>} />
                <Route path={ROUTES.TRANSACTION_MOD} element={<TransactionMod/>} />
                <Route path={ROUTES.TRANSACTION_DEL} element={<TransactionDel/>} />

              </Routes>
            </div>
          </div>
      </BrowserRouter>
    </div>
  );
}
export default App;