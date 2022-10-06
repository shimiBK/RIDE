import "./shows.css";
import React, { useState , useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";




const Shows = ({user}) => {

    const [openModal , setOpenModal] = useState(false);
    const [authModal,setAuthModal] = useState(false);
    const [popupMessage,setPopupMessage] = useState("");
    const [illenium,setIllenium] = useState(false);
    const [tiesto,setTiesto] = useState(false);
    const [hardwell,setHardwell] = useState(false);
    const [davidGuetta,setDavidGuetta] = useState(false);
    const [martinGarrix,setMartinGarrix] = useState(false);
    const [armin,setArmin] = useState(false);
    const [cities, setCities] = useState([]);
    const [users,setUsers] = useState({});


    const ename = useRef();
    const fname = useRef();
    const lname = useRef();
    const city = useRef();
    const facebook = useRef();
    const time = useRef();
    const eventsRef = useRef();

    const userId = user ? user._id : "";
    const userImg = user? user.image : "";

    const handleEmails = async (ride) => {

      for(let dbUser of users){
        if(dbUser !== user && dbUser.city === ride.city && dbUser.sendMails.includes(ride.ename)){
          const email = {
            to: dbUser.email,
            subject: `New ride for ${ride.ename} was uploaded`,
            message:`${ride.fname} is riding to ${ride.ename} at ${ride.time}`
          }
          try {
            await axios.post('/email', email);
            
          } catch (error) {
            console.log(error);  
          }
        };

      }
    };

    const handleFollow = async (eventName) =>{
      
      const list = user.sendMails;
      if(!list.includes(eventName))
      {
        list.push(eventName);
        const addEvent = {
          sendMails:list
        }
        try {
          await axios.put(`/user/${user._id}`,addEvent);
          setPopupMessage("Event was successfully added to your followings");
          setAuthModal(true);
          
          
        } catch (error) {
          console.log(error);
          
        }
      }else{
        setPopupMessage("You already follow this event");
        setAuthModal(true);

      }
    };

    const handleClick = async (e) => {
        e.preventDefault();
          const ride = {
            ename: ename.current.value,
            fname: fname.current.value,
            lname: lname.current.value,
            city: city.current.value,
            facebook: facebook.current.value,
            time: time.current.value,
            uID: userId,
            userImg:userImg,
            userGender:user.gender,
          };
          try {
            await axios.post("/rides", ride);
            setOpenModal(false);
            handleEmails(ride);
            setPopupMessage("RIDE WAS SUCCESSFULLY UPLOADED");
            setAuthModal(true);

          } catch (error) {
            console.log(error);
          }

        
      };

      const handleRide = () => {

        if(user){
          setOpenModal(true) 
        }
        else{
          setPopupMessage("PLEASE LOGIN IN ORDER TO SHARE A RIDE");
           setAuthModal(true);
        }}
        

      useEffect(() =>{
        const getCities = async () => {
            
            try{
                const res = await axios.get('http://localhost:8800/api/cities');
                setCities(res.data);                
            }catch(error){
                console.log(error);
            }
        };
        getCities();
        
    },[]);


    useEffect(() =>{

      const getUsers = async () =>{
        try {
          const res = await axios.get('http://localhost:8800/api/user')
            setUsers(res.data);
          
        } catch (err) {
          console.log(err);
          
        }
      };

      getUsers();

    },[])



  return (
    <div className="shows">
    <div className="showsContainer">
        <h1 className="showsTitle">UPCOMING EVENTS</h1>
        <div className="eventItems" ref={eventsRef}>
            <div className="eventItem" onMouseOver={() => setArmin(true)} onMouseLeave={() => setArmin(false)}>
                <Link to="/rides/armin-van-buuren">
                  <img src="assests/armin-van-buuren3.jpg" alt="" className="showImg"/>
                </Link>
                <div className="eventTitle">
                {!armin && <h1 className="eventName">Armin Van Buuren</h1>}
              </div>
              <div className="subscribe">
                {user && <h1 onClick={ () => handleFollow("armin-van-buuren")}>+</h1>}
              </div>
              {armin &&
               <div className="eventTitleHover">
                    <h1 className="eventName">Armin Van Buuren</h1>
                    <h3 className="eventLocation">סלינה | אילת</h3>
                    <h3 className="eventDate">16.03.22</h3>
              </div>}
            </div>
            <div className="eventItem" onMouseOver={() => setMartinGarrix(true)} onMouseLeave={() => setMartinGarrix(false)}>
                <Link to="rides/martin-garrix">
                <img src="assests/martin-garrix3.jpg" alt="" className="showImg"/>
                </Link>
                <div className="eventTitle">
                {!martinGarrix && <h1 className="eventName">Martin Garrix</h1>}
              </div>
              <div className="subscribe">
                { user && <h1 onClick={ () => handleFollow("martin-garrix")}>+</h1>}
              </div>
              {martinGarrix &&
               <div className="eventTitleHover">
                <h1 className="eventName">Martin Garrix</h1>
                <h3 className="eventLocation">לייב פארק | ראשון לציון</h3>
                <h3 className="eventDate">24.05.22</h3>
              </div>}
        
            </div>
            <div className="eventItem" onMouseOver={() => setDavidGuetta(true)} onMouseLeave={() => setDavidGuetta(false)}>
                <Link to="/rides/david-guetta">
                <img src="assests/david-guetta3.jpg" alt="" className="showImg"/>
                </Link>
                <div className="eventTitle">
                {!davidGuetta && <h1 className="eventName">David Guetta</h1>}
              </div>
              <div className="subscribe">
                  { user && <h1 onClick={ () => handleFollow("david-guetta")}>+</h1>}
              </div>
              {davidGuetta &&
               <div className="eventTitleHover">
                <h1 className="eventNameHover">David Guetta</h1>
                <h3 className="eventLocation">לייב פארק | ראשון לציון</h3>
                <h3 className="eventDate">30.07.22</h3> 
                </div>}
            </div>
            <div className="eventItem" onMouseOver={() => setHardwell(true)} onMouseLeave={() => setHardwell(false)}>
              <Link to="rides/hardwell">
              <img src="assests/hardwell.jpg" alt="" className="showImg"/>
              </Link>
              <div className="eventTitle">
                {!hardwell && <h1 className="eventName">Hardwell</h1>}
              </div>
              <div className="subscribe">
                { user && <h1 onClick={ () => handleFollow("hardwell")}>+</h1>}
              </div>
              {hardwell &&  <div className="eventTitleHover">
              <h1 className="eventNameHover">Hardwell</h1>
              <h3 className="eventLocation">גני התערוכה | תל אביב</h3>
              <h3 className="eventDate">26.05.22</h3>
              </div>}
            </div>
            <div className="eventItem" onMouseOver={() => setTiesto(true)} onMouseLeave={() => setTiesto(false)}>
                <Link to="rides/tiesto">
                <img src="assests/tiesto3.jpg" alt="" className="showImg"/>
                </Link>
                <div className="eventTitle">
                  {!tiesto && <h1 className="eventName">Tiesto</h1>}
               </div>
               <div className="subscribe">
                {user && <h1 onClick={ () => handleFollow("tiesto")}>+</h1>}
              </div>
               {tiesto && <div className="eventTitleHover">
                <h1 className="eventNameHover">Tiesto</h1>
                <h3 className="eventLocation">האנגר 11 | תל אביב</h3>
                <h3 className="eventDate">30.06.22</h3>
              </div>}

            </div>
            <div className="eventItem"   onMouseOver={() => setIllenium(true)} onMouseLeave={() => setIllenium(false)}>
              <Link to="rides/illenium">
              <img src="assests/illenium.jpg" alt="" className="showImg"/>
              </Link>
              <div className="eventTitle" >
                {!illenium && <h1 className="eventName">Illenium</h1>}
              </div>
              <div className="subscribe">
                { user && <h1 onClick={ () => handleFollow("illenium")}>+</h1>}
              </div>
              {illenium && <div className="eventTitleHover">
                <h1 className="eventNameHover">Illenium</h1>
                <h3 className="eventLocation">האנגר 11 | תל אביב</h3>
                <h3 className="eventDate">30.06.22</h3>
              </div>}
          </div>
          </div>
          <button className="addRideBtn" onClick={handleRide}>I WANT TO SHARE A RIDE</button>

    {openModal &&
     (
        <form className="rideBox" onSubmit={handleClick}>
        <div className="rideModal">
            <h1 className="rideTitle">RIDE INFORMATION</h1>
            <label for="events">Choose Event:</label>
            <select name="events" ref={ename} className="rideInput">
            <option value="choose-event" disabled selected>Event</option>
            <option value="david-guetta">David Guetta</option>
            <option value="armin-van-buuren">Armin Van Buuren</option>
            <option value="martin-garrix">Martin Garrix</option>
            <option value="hardwell">Hardwell</option>
            <option value="Tiesto">Tiesto</option>
            <option value="illenium">ILLENIUM</option>
            </select>
            <label>Name:</label>
            <input type="text"  ref={fname} placeholder="John" className="rideInput"/>
            <label>Surname:</label>
            <input type="text" ref={lname} placeholder="Doe" className="rideInput"/>
            <label>Ride From:</label>
            <select className="rideInput" ref={city}>
              <option disabled selected>Choose City</option>
              {cities.map((city) =>
                <option key={city._id} style={{direction:"ltr"}} value={city.english_name}>{city.english_name}</option>
              )};
            </select>
            <label>Facebook Profile Link:</label>
            <input type="text" ref={facebook} placeholder="https://www.facebook.com/john.doe" className="rideInput"/>
            <label>Leaving Time:</label>
            <select name="events" ref={time} className="rideInput">
            <option value="choose-event" disabled selected>Time</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23:00">23:00</option>
            </select>
            <button className="rideButton" type="submit">Add Ride</button>
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

export default Shows