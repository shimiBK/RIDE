import "./festivals.css";
import React, { useState , useRef } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


const Festivals = ({user}) => {



    const [openModal , setOpenModal] = useState(false);
    const [authModal,setAuthModal] = useState(false);
    const [popupMessage,setPopupMessage] = useState("");
    const [tomorrowland, setTomorrowland] = useState(false);
    const [ultra , setUltra] = useState(false);
    const [edc , setEdc] = useState(false);
    const [untold , setUntold] = useState(false);
    const [creamfields , setCreamfields] = useState(false);
    const [amf , setAmf] = useState(false);

    const festName = useRef();
    const fname = useRef();
    const lname = useRef();
    const city = useRef();
    const facebook = useRef();
    const desc = useRef();
    const festivalsRef = useRef();

    const userId = user ? user._id : "";
    const userImg = user? user.image : "";
  

    const handleClick = async (e) => {
      e.preventDefault();
          const partner = {
            festName: festName.current.value,
            fname: fname.current.value,
            lname: lname.current.value,
            city: city.current.value,
            facebook: facebook.current.value,
            desc: desc.current.value,
            uID: userId,
            userImg:userImg,

          };
          try {
            await axios.post("/partners", partner);
            setOpenModal(false);

          } catch (err) {
            console.log(err);
          }
          finally{
            setPopupMessage("POST WAS SUCCESSFULLY UPLOADED");
            setAuthModal(true);
          }
        
      };

      
      const handlePartner = () => {

        if(user){
          setOpenModal(true) 
        }
        else{
          setPopupMessage("PLEASE LOGIN IN ORDER TO SHARE A POST");
           setAuthModal(true);
        }
        
      }



  return (
    <div className="festivals">
    <div className="festivalsContainer">
        <h1 className="festivalsTitle">UPCOMING FESTIVALS</h1>
        <div className="festivalItems" ref={festivalsRef}>
            <div className="festivalItem" onMouseOver={() => setTomorrowland(true)} onMouseLeave={() => setTomorrowland(false)}>
                <Link to="/partners/tomorrowland">
                <img src="assests/tomorrowland-3.jpg" alt="" className="fesitvalImg"/>
                </Link>
                <div className="festivalTitle">
                {!tomorrowland && <h1 className="festivalName">Tomorrowland</h1>}
              </div>
              {tomorrowland && <div className="festivalTitleHover">
                    <h1 className="festivalName">Tomorrowland</h1>
                    <h3 className="festivalLocation">בום | בלגיה</h3>
                    <h3 className="festivalDate">15.07.22 - 18.07.22</h3>
                    </div>}
            </div>
            <div className="festivalItem" onMouseOver={() => setUltra(true)} onMouseLeave={() => setUltra(false)}>
                <Link to="partners/ultra-miami">
                <img src="assests/ultra-festival.jpg" alt="" className="fesitvalImg"/>
                </Link>
                <div className="festivalTitle">
                {!ultra && <h1 className="festivalName">Ultra Music Festival</h1>}
              </div>
              {ultra && <div className="festivalTitleHover">
                <h1 className="festivalName">Ultra Music Festival</h1>
                <h3 className="festivalLocation">מיאמי | ארה"ב</h3>
                <h3 className="festivalDate">13.03.22 - 16.03.22</h3>
                </div>}
            </div>
            <div className="festivalItem" onMouseOver={() => setEdc(true)} onMouseLeave={() => setEdc(false)}>
                <Link to="/partners/edc-las-vegas">
                <img src="assests/edc-2.jpg" alt="" className="fesitvalImg"/>
                </Link>
                <div className="festivalTitle">
                {!edc && <h1 className="festivalName">EDC Las Vegas</h1>}
              </div>
              {edc && <div className="festivalTitleHover">
                <h1 className="festivalName">EDC Las Vegas</h1>
                <h3 className="festivalLocation">לאס וגאס | ארה"ב</h3>
                <h3 className="festivalDate">25.08.22 - 28.08.22</h3>
            </div>}
            </div>
            <div className="festivalItem" onMouseOver={() => setUntold(true)} onMouseLeave={() => setUntold(false)}>
              <Link to="partners/untold-festival">
              <img src="assests/untold-festival.jpg" alt="" className="fesitvalImg"/>
              </Link>
              <div className="festivalTitle">
                {!untold && <h1 className="festivalName">Untold Festival</h1>}
              </div>
              {untold && <div className="festivalTitleHover">
              <h1 className="festivalName">Untold Festival</h1>
              <h3 className="festivalLocation">טרנסילבניה | רומניה</h3>
              <h3 className="festivalDate">04.08.22 - 07.08.22</h3>
            </div>}
            </div>
            <div className="festivalItem" onMouseOver={() => setCreamfields(true)} onMouseLeave={() => setCreamfields(false)}>
                <Link to="partners/creamfields">
                <img src="assests/creamfields-2.jpg" alt="" className="fesitvalImg"/>
                </Link>
                <div className="festivalTitle">
                {!creamfields && <h1 className="festivalName">Creamfields</h1>}
              </div>
              {creamfields && <div className="festivalTitleHover">
                <h1 className="festivalName">Creamfields</h1>
                <h3 className="festivalLocation"> דיירסברי | אנגליה</h3>
                <h3 className="festivalDate">11.09.22 - 14.09.22</h3>
            </div>}
            </div>
              <div className="festivalItem" onMouseOver={() => setAmf(true)} onMouseLeave={() => setAmf(false)}>
                <Link to="partners/amf">
                <img src="assests/amf-festival.jpg" alt="" className="fesitvalImg"/>
                </Link>
                <div className="festivalTitle">
                {!amf && <h1 className="festivalName">AMF</h1>}
              </div>
              {amf && <div className="festivalTitleHover">
                <h1 className="festivalName">AMF</h1>
                <h3 className="festivalLocation">אמסטרדם | הולנד</h3>
                <h3 className="festivalDate">22.10.22</h3>
            </div>}
            </div>
          </div>
        <button className="addFestivalBtn" onClick={handlePartner}>I NEED A PARTNER</button>
    {openModal &&
     (
        <form className="partnerBox" onSubmit={handleClick}>
          <div className="partnerModal">
              <h1 className="partnerTitle">YOUR INFORMATION</h1>
              <label for="festivals">Choose festival:</label>
              <select name="festivals" ref={festName} className="partnerInput">
                <option value="choose-festival" disabled selected>Festival</option>
                <option value="tomorrowland">Tomorrowland</option>
                <option value="ultra-miami">Ultra Miami</option>
                <option value="edc-las-vegas">EDC Las Vegas</option>
                <option value="untold-festival">Untold Festival</option>
                <option value="creamfields">Creamfields</option>
                <option value="AMF">AMF</option>
              </select>
              <label>Name:</label>
                <input type="text"  ref={fname} placeholder="John" className="partnerInput"/>
              <label>Surname:</label>
                <input type="text" ref={lname} placeholder="Doe" className="partnerInput"/>
              <label>Where are you from:</label>
                <input type="text"  ref={city} placeholder="Tel-Aviv" className="partnerInput"/>
              <label>Facebook Profile Link:</label>
                <input type="text"  ref={facebook} placeholder="https://www.facebook.com/john.doe" className="partnerInput"/>
              <label>About yourself:</label>
                <textarea className="partnerInput" placeholder="Describe Yourself" type="text" maxlength="150" ref={desc}></textarea>
              <button className="partnerButton" type="submit">Upload</button>
              <span className="close" onClick={() => {setOpenModal(false)}}>X</span>
          </div>
        </form>)}

        {authModal && 
        <div className="confirmAuth">
        <div className="authModal">
            <h2 className="authTitle">{popupMessage}</h2>
            <div className="authBtns">
            <button className="approveBtn" onClick={ () => setAuthModal(false)} >OK</button> 
              </div>
            </div>
    </div>}


    </div> 
</div>
  )
}

export default Festivals