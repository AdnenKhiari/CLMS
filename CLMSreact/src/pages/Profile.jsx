import { useContext } from "react"
import {UserContext} from "../contexts/UserContext"
import {Navigate} from "react-router-dom"


const Profile = ()=>{
    const {userData} = useContext(UserContext) 

    if(userData === null)
        return <Navigate to="/login" />
    return <>
    <div>
        <p>User First name : {userData.first_name}</p>
        <p>User Last name : {userData.last_name}</p>
        <p>User Gender : {userData.gender}</p>
        <p>User Served Books Today :</p>
        <p>User Address : {userData.address}</p>
        <p>User Email  : {userData.email}</p>
    </div>
    </>
}

export default Profile