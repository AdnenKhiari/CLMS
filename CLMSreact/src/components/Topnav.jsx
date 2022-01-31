import {Link} from "react-router-dom"

const TopNav = ()=>{
    return <header> 
    <p>Name</p>
    <h1>College Library Managment System</h1>
    <nav className="topNav">
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/page3">Help</Link></li>
            <li><Link to="/page4">Mail</Link></li>
        </ul>
    </nav>
    </header>; 
}
export default TopNav