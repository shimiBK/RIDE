import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from '../login/Login'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function Navbar({user}) {

  const [loginModal,setLoginModal] = useState(false);
  const [open,setOpen] = useState(false);


  const googleLogout = () => {
    window.open("http://localhost:8800/auth/logout", "_self");
  };

  const loginmodal = (logindata) => {
    setLoginModal(logindata);
  }

  return (
    <div className="navbar">
      <div className="navContainer">
          <div className="navLeft">
            <Link to="/" style={{ textDecoration: 'none' }}>
            <h3 className="logo">RIDEDM</h3>
            </Link>
          </div>
          <div className="navRight">
            <Link>
            {!user && <button className="loginBtn" onClick={ () => setLoginModal(true)}>Login</button>}
            </Link>
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
                <Link to="/myrides" style={{ textDecoration: 'none' }} >
                <div className="listItem">My Rides</div>
                </Link>
                <div className="listItem" onClick={googleLogout}>Logout</div>
              </div>}
            </div>
          </div>
        </div>
        {loginModal && <Login loginmodal={loginmodal} />}
       </div>
  )
}

export default Navbar