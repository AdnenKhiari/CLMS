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
              </Routes>
            </div>
          </div>
      </BrowserRouter>
    </div>
  );
}
export default App;