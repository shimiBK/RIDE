import React, { useEffect } from 'react';
import "./addride.css";
import {useState , useRef} from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import Searchbar from '../searchbar/Searchbar';
import { useContext } from "react";
import userContext from "../../context/userContext";

const Addride = ({handleRideModal}) => {

  const [city,setCity] = useState("");
  const [users,setUsers] = useState({});

  const {user} = useContext(userContext);

    const ename = useRef();
    const fname = useRef();
    const lname = useRef();
    const facebook = useRef();
    const time = useRef();

    const userId = user ? user._id : "";
    const userImg = user? user.image : "";

    const getCity = (cityFromChild)=>{

      setCity(cityFromChild);
    }
  

    

    const handleEmails = async (ride) => {
      for(let dbUser of users){
        if(dbUser !== user && dbUser.city === ride.city && dbUser.sendMails.includes(ride.eventName)){
          const email = {
            to: dbUser.email,
            subject: `New ride for ${ride.eventName} was uploaded`,
            message:`Hello ${user.firstName},\n\n${ride.firstName} is riding to ${ride.eventName} at ${ride.time} \nWatch the ride here link http://localhost:3000/rides/${ride._id}`
                    
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
        try {
          const res = await axios.post("/rides", ride);
          handleRideModal(false);
          handleEmails(res.data);
          toast.success("Ride was successfully uploaded");
        } catch (error) {
          console.log(error);
        }

      };


        useEffect(() => {

          const getUsers = async () => {
            try {
              const res = await axios.get('http://localhost:8800/api/user')
                setUsers(res.data);
              
            } catch (err) {
              console.log(err);
              
            }
          };
    
          getUsers();
    
        },[]);

      
  return (
    <>
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
                <Searchbar
                    placeholder="Search City" 
                    getCity={getCity} 
                    required={true}
                />
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
              <span className="close" onClick={() => {handleRideModal(false)}}>X</span>
          </div>
    </>
  )
}

export default Addride