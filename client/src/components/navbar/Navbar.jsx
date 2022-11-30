import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from '../login/Login'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import userContext from "../../context/userContext";
import AddEvent from "../addEvent/AddEvent";


function Navbar() {

  const [loginModal,setLoginModal] = useState(false);
  const [hamburger, setHamburger] = useState(true);
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const [open,setOpen] = useState(false);
  const [eventModal , setEventModal] = useState(false);
  const { user } = useContext(userContext);



  const googleLogout = () => {
    window.open("http://localhost:8800/auth/logout", "_self");
  };

  const loginmodal = (logindata) => {
    setLoginModal(logindata);
  }

  const handleEventModal = (childValue) =>{
    setEventModal(childValue);
  }

  return (
    <>
    <div className="navbar">
      <div className="navContainer">
          <div className="navLeft">
            <Link to="/" style={{ textDecoration: 'none' }}>
            <h3 className="logo">RIDEDM</h3>
            </Link>
          </div>
          <div className="navRight">
            {!user && <button className="loginBtn" onClick={ () => setLoginModal(true)}>Login</button>}
            <div className="dropDownWrapper">
            {user && 
              <div className="dropDownMenu" onClick={()=> setOpen(!open)}>
                  <img src={user.image ? user.image : "/assests/blank-profile.png"} alt="" className="navbarProfileImg" />
                  <span className="navbarUserInfo">{user.firstName + " " + user.lastName}</span>
                  {!open && <ArrowDropDownIcon className="arrowIcon" />}
                  {open && <ArrowDropUpIcon className="arrowIcon" />}
              </div>}
              {open &&
              <div className="listContainer">
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                  <div className="listItem">Profile</div>
                </Link>
                {user.isAdmin &&
                 <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="listItem" onClick={()=> {setEventModal(true);setOpen(false)}}>Post Event</div>
                </Link>}
                <Link to="/myrides" style={{ textDecoration: 'none' }} >
                  <div className="listItem">My Rides</div>
                </Link>
                <div className="listItem" onClick={googleLogout}>Logout</div>
              </div>}
            </div>
          </div>
        </div>
        {hamburger &&
            <div className="hamburgerMenu">
              <MenuIcon className="hamburgerMenuIcon" onClick={()=> {setHamburger(false);setSidebarMenu(true)}}/>
            </div>}
            {sidebarMenu && 
            <div className="sidebar">
                 {!hamburger && <div className="closeHamburger">
              <CloseIcon classname="closeHamburger" onClick={()=> {setHamburger(true);setSidebarMenu(false)}}/>
            </div>}
              <div className="sidebarItems" >
                  {user && <div className="loggedItems">
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <div className="sidebarItem">Profile</div>
                </Link>
                {user.isAdmin &&
                 <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="sidebarItem" onClick={()=> {setEventModal(true);setOpen(false)}}>Post Event</div>
                </Link>}
                <Link to="/myrides" style={{ textDecoration: 'none' }} >
                  <div className="sidebarItem">My Rides</div>
                </Link>
                <div className="sidebarItem" onClick={googleLogout}>Logout</div>
                </div>}
                 {!user && <div className="sidebarItem" onClick={ () => {setLoginModal(true);setSidebarMenu(false);setHamburger(true)}}>Login</div>}
                </div>
                 </div>}
                
               
        {loginModal && <Login loginmodal={loginmodal} />}
        {eventModal && <AddEvent handleEventModal={handleEventModal}/>}
      </div>
    </>
  )
}

export default Navbar