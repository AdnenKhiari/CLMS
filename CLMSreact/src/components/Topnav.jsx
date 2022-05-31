import { useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import {UserContext} from "../contexts/UserContext.js"
import * as Fetcher  from "../lib/fetcher"
import * as APIROUTES from "../lib/apiroutes"


const TopNav = ()=>{
    const {userData,setUserData} = useContext(UserContext)
    const nav = useNavigate()
    const {Submit,data,error} = Fetcher.useFetch(APIROUTES.LOGOUT,Fetcher.postData)
    const Logout = ()=>{
        Submit()
        setUserData(null)
        nav("/home",{replace: true})
    }
    return <header> 
    <p>Name</p>
    <h1>College Library Managment System</h1>
    <nav className="topNav">
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            { userData ? <li><p onClick={(e)=>Logout()}>Logout</p></li> :   <li><Link to="/login">Login</Link></li> }
            <li><Link to="/page4">Mail</Link></li>
        </ul>
    </nav>
    </header>; 
}
export default TopNav