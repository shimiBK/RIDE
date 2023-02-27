import "./login.css"
import { SERVER_URL } from "../../App";


const Login = ({loginmodal}) => {



  const google = () => {
    window.open(`${SERVER_URL}/auth/google", "_self`);

  };



  return (
    <div className="login">
      <div className="loginModal">
        <h1 className="loginTitle">Log in with</h1>
        <div className="loginWrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
              <img src="./assests/google.png" alt="" className="icon" />
              Google
            </div>
          </div>
          <div className="center">
            <div className="or">OR</div>
          </div>
           <div className="right">
              <input className="loginInput" type="text" placeholder="Username" />
              <input className="loginInput" type="text" placeholder="Password" />
              <button className="loginSubmit">Login</button>
          </div>
          <div className="loginExit" onClick={ () => loginmodal(false)}>X</div>
          </div>
        </div>
      </div>
  );
};

export default Login;