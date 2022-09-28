import "./navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from '../login/Login'

function Navbar({user}) {

  const [loginModal,setLoginModal] = useState(false);

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
            {user && <button className="logoutBtn" onClick={googleLogout}>Logout</button>}
            </Link>
          </div>
          
        </div>
        {loginModal && <Login loginmodal={loginmodal} />}
       </div>
  )
}

export default Navbar