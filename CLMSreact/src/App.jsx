import './App.css';
import AList from './components/AList';
import AForm from './components/AForm';
import Leftnav from './components/LeftNav';
import Test from "./test"
import TopNav from './components/Topnav';
import * as ROUTES from "./lib/routes"
import * as APIROUTES from "./lib/apiroutes"
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useRouteMatch,
  useLocation
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
import Login from './pages/login';
import {Navigate} from "react-router-dom"
import {UserContext} from "./contexts/UserContext"
import { useEffect, useState } from 'react';
import * as Fetcher  from "./lib/fetcher"
import {ErrorBoundary} from "react-error-boundary"
import ErrorFallbackComponent from "./components/ErrorFallbackComponent"
function App() {
  const {Submit,data,error,loading} = Fetcher.useFetch(APIROUTES.ME,Fetcher.getData)
  const [userData,setUserData] = useState(null)
  console.log("USER",userData)
  const getUser = async ()=>{
    try{
      console.log("Checking !: ")
      if(data === null)
        await Submit();

      console.log("USER FETCH",data,error)
      if(error !== null)
        throw Error("Not Auth")
      setUserData(data)
    }catch(err){
      console.log()
      setUserData(null)
    }
  }
  useEffect(()=>{
    getUser()
  },[data,setUserData])
  console.log("US: ",userData)
  if(loading)
    return "Loading !"
  return (
    <div className="App">
      <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>

      <UserContext.Provider value={{userData,setUserData}}>

        < MainSection />

      </UserContext.Provider >

      </BrowserRouter>
    </div>
  );
}
const MainSection = ()=>{
  const location  = useLocation()
  return <ErrorBoundary fallback={<ErrorFallbackComponent />} key={location.pathname}>
     <TopNav />
          <div className='maingrid'>
            <Leftnav />
            {/*empty div for css purposes*/ }
            <div></div>
            <div className='subgrid'>
              <AllRoutes />
            </div>
          </div>
    </ErrorBoundary>
}
const AllRoutes = ()=>{
 return <Routes>
    <Route path={ROUTES.LOGIN} element={<Login/>} />

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
    <Route path="/home" element={<Navigate replace to="/" />} />
    <Route path={ROUTES.TRANSACTION_ADD} element={<TransactionAdd/>} />
    <Route path={ROUTES.TRANSACTION_SEARCH} element={<TransactionSearch/>} />
    <Route path={ROUTES.TRANSACTION_MOD} element={<TransactionMod/>} />
    <Route path={ROUTES.TRANSACTION_DEL} element={<TransactionDel/>} />
  </Routes>
}
export default App;