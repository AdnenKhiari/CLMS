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
import Profile from './pages/Profile';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
          <TopNav />
          <div className='maingrid'>
            <Leftnav />
            <div className='subgrid'>
              <Routes>
                <Route path={ROUTES.BOOK_ADD} element={<BookAdd/>} />
                <Route path={ROUTES.PROFILE} element={<Profile/>} />
              </Routes>
            </div>
          </div>
      </BrowserRouter>
    </div>
  );
}
export default App;