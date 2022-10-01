
import "./addinfo.css"
import {useRef, useState} from 'react';
import axios from "axios";

const AddInfo = ({user}) => {

    const [checked, setChecked] = useState(false);
    const city = useRef();
    const gender = useRef();
    const sendMails = checked;



    const handleChange = () => {
        setChecked(!checked);
      };

      const handleClick = async (e) => {
        e.preventDefault();
          const addInfo = {
            city: city.current.value,
            gender: gender.current.value,
            sendMails: sendMails,
            loginFlag:false
          };
          try {
            await axios.put(`/user/${user._id}`, addInfo);

          } catch (err) {
            console.log(err);
          }
        
      };
    



  return (
    <div className="addInfo">
      <div className="infoModal">
        <h1 className="infoTitle">Choose a Login Method</h1>
        <div className="infoWrapper">
          <div className="infoleft">
            <div className="infoLoginButton google">
              <img src="./assests/google.png" alt="" className="icon" />
              Google
            </div>
            <div className="infoLoginButton facebook">
              <img src="./assests/facebook.png" alt="" className="icon" />
              Facebook
            </div>
          </div>
          <div className="infoCenter">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="infoRight">
            <form onSubmit={handleClick}>
                <input className="infoLoginInput" type="text" ref ={city} placeholder="City" />
                <input className="infoLoginInput" type="text" ref={gender} placeholder="Gender" />
                <input type="checkbox" checked={checked} onChange={handleChange}/>
                <label>
                    Send all from tel avivs
                </label>
                <button className="infoLoginSubmit">Login</button>
            </form>
          </div>

        </div>
        <div className="infoLoginExit" >X</div>
      </div>
    </div>
  );
};

export default AddInfo;