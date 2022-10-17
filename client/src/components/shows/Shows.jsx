import "./shows.css";
import React, { useState , useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Event from "../event/Event";
import Addride from "../addride/Addride";




const Shows = ({user,cities}) => {

    const [openModal , setOpenModal] = useState(false);


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
        {openModal && <Addride user={user} cities={cities} handleRideModal={handleRideModal} />}
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