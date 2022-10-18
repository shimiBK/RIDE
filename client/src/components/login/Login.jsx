

import "./login.css"

const Login = ({loginmodal}) => {



  const google = () => {
    window.open("http://localhost:8800/auth/google", "_self");

  };

  const facebook = () => {
    window.open("http://localhost:8800/auth/facebook", "_self");
  };

 

  return (
    <div className="login">
      <div className="loginModal">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="loginWrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
              <img src="./assests/google.png" alt="" className="icon" />
              Google
            </div>
            {/* <div className="loginButton facebook" onClick={facebook}>
              <img src="./assests/facebook.png" alt="" className="icon" />
              Facebook
            </div> */}
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <input className="loginInput" type="text" placeholder="Username" />
            <input className="loginInput" type="text" placeholder="Password" />
            <button className="loginSubmit">Login</button>
          </div>
        </div>
        <div className="loginExit" onClick={ () => loginmodal(false)}>X</div>
      </div>
    </div>
  );
};

export default Login;