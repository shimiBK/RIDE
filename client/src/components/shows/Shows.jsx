import "./shows.css";
import React, { useState , useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Event from "../event/Event";
import Addride from "../addride/Addride";
import { useContext } from "react";
import userContext from "../../context/userContext";
import axios from "axios";









const Shows = () => {

    const [openModal , setOpenModal] = useState(false);
    const [events,setEvents] = useState([{}]);
    const {user} = useContext(userContext);
    const eventsRef = useRef();




    const handleRideModal = (childValue) =>{
      setOpenModal(childValue);
    }
   


    //check if there is user in order to add a ride 
    
      const handleRide = () => {

        if(user){
          setOpenModal(true) 
        }
        else{
          toast.info("Please login in order to add a ride")
        }}


      useEffect(()=>{


        const getEvents = async () =>{
          try {

            const res = await axios.get("http://localhost:8800/api/events");
            setEvents(res.data);
  
            
          } catch (error) {
            console.log(error);
            
          }
        }

        getEvents();

        
      },[user]);


  return (
    <div className="shows">
    <div className="showsContainer">
        <h1 className="showsTitle">UPCOMING EVENTS</h1>
        <div className="eventItems" ref={eventsRef}>
          {events.map(event=>
          <Event event={event} key={event._id} />
          )}
          </div>
          {/* <ArrowBackIosIcon style={{fontSize:"40px"}} className="leftChevron"/>
          <ArrowForwardIosIcon style={{fontSize:"40px"}} className="rightChevron"/> */}
          <button className="addRideBtn" onClick={handleRide}>I WANT TO SHARE A RIDE</button>
        {openModal && <Addride handleRideModal={handleRideModal} />}
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