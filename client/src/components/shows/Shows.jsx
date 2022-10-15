import "./shows.css";
import React, { useState , useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Searchbar from "../searchbar/Searchbar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Event from "../event/Event";




const Shows = ({user,cities}) => {

    const [openModal , setOpenModal] = useState(false);
    const [city,setCity] = useState("");
    const [users,setUsers] = useState({});
    
  
    const ename = useRef();
    const fname = useRef();
    const lname = useRef();
    const facebook = useRef();
    const time = useRef();
    const eventsRef = useRef();

    const userId = user ? user._id : "";
    const userImg = user? user.image : "";

    const getCity = (cityFromChild)=>{

      setCity(cityFromChild);
    }
  

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



    const handleClick = async (e) => {
        e.preventDefault();
          const ride = {
            ename: ename.current.value,
            fname: fname.current.value,
            lname: lname.current.value,
            city: city,
            facebook: facebook.current.value,
            time: time.current.value,
            uID: userId,
            userImg:userImg,
            userGender:user.gender,
          };

          console.log(ride);
          try {
            await axios.post("/rides", ride);
            setOpenModal(false);
            handleEmails(ride);
            toast.success("Ride was successfully uploaded");
          } catch (error) {
            console.log(error);
          }

        
      };

      const handleRide = () => {

        if(user){
          setOpenModal(true) 
        }
        else{
          toast.info("Please login in order to add a ride")
        }}
        


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
            <Event user={user} eventName="armin-van-buuren" eventTitle="Armin Van Buuren" eventLocation="סלינה | אילת" eventDate="16.03.22" ToastContainer={ToastContainer}/>
            <Event user={user} eventName="martin-garrix" eventTitle="Martin Garrix" eventLocation="לייב פארק | ראשון לציון" eventDate="24.05.22"/>
            <Event user={user} eventName="david-guetta" eventTitle="David Guetta" eventLocation="לייב פארק | ראשון לציון" eventDate="30.07.22"/>
            <Event user={user} eventName="hardwell" eventTitle="Hardwell" eventLocation="גני התערוכה | תל אביב" eventDate="26.08.22"/>
            <Event user={user} eventName="tiesto" eventTitle="Tiesto" eventLocation="האנגר 11 | תל אביב" eventDate="20.10.22"/>
            <Event user={user} eventName="illenium" eventTitle="Illenium" eventLocation="האנגר 11 | תל אביב" eventDate="30.10.22"/>
          </div>
          {/* <ArrowBackIosIcon style={{fontSize:"40px"}} className="leftChevron"/>
          <ArrowForwardIosIcon style={{fontSize:"40px"}} className="rightChevron"/> */}
          <button className="addRideBtn" onClick={handleRide}>I WANT TO SHARE A RIDE</button>
        {openModal &&
        (
          <div div className="rideModal">
            <h1 className="rideTitle">Ride Information</h1>
            <form className="rideBox" onSubmit={handleClick}>
              <div className="rideInputContainer">
                <select name="events" ref={ename} className="rideSelectInput">
                  <option value="" disabled selected>Choose Event</option>
                  <option value="david-guetta">David Guetta</option>
                  <option value="armin-van-buuren">Armin Van Buuren</option>
                  <option value="martin-garrix">Martin Garrix</option>
                  <option value="hardwell">Hardwell</option>
                  <option value="Tiesto">Tiesto</option>
                  <option value="illenium">ILLENIUM</option>
                </select>
                <input
                    type="text"
                    ref={fname}
                    placeholder="First Name"
                    className="rideInput"
                  />
                <input
                    type="text"
                    ref={lname}
                    placeholder="Last Name"
                    className="rideInput"
                  />
                <Searchbar placeholder="Search City" data={cities} getCity={getCity} required="true"/>
                <input
                    type="text"
                    ref={facebook}
                    placeholder="Facebook Profile Link" 
                    className="rideInput"
                  />
              <select name="events" ref={time} className="rideSelectInput">
                <option value="" disabled selected>Leaving Time</option>
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
              </div>
              <button
                className="rideButton" 
                type="submit">
                  Add Ride
              </button>
              </form>
              <span className="close" onClick={() => {setOpenModal(false)}}>X</span>
          </div>
        )}
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
    </div>    
</div>

  )
}

export default Shows