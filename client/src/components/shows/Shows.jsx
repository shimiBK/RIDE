import "./shows.css";
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Event from "../event/Event";
import Addride from "../addride/Addride";
import { useContext } from "react";
import userContext from "../../context/userContext";
import axios from "axios";
import { SERVER_URL } from "../../App";

const Shows = () => {
  const [openModal, setOpenModal] = useState(false);
  const [events, setEvents] = useState([]);
  const { user } = useContext(userContext);
  const eventsRef = useRef();

  const handleRideModal = (childValue) => {
    setOpenModal(childValue);
  };

  //check if there is a user in order to add a ride

  const handleRide = () => {
    if (user) {
      setOpenModal(true);
    } else {
      toast.info("Please login in order to add a ride");
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/events`);
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getEvents();
  }, [user]);

  return (
    <div className="shows">
      <div className="showsContainer">
        <h1 className="showsTitle">UPCOMING EVENTS</h1>
        <div className="anotherTest">
          <div className="eventItems" ref={eventsRef}>
            {events.map((event) => (
              <Event key={event._id} event={event} />
            ))}
            <button className="addRideBtn" onClick={handleRide}>
              I WANT TO SHARE A RIDE
            </button>
          </div>
        </div>
        {/* <ArrowBackIosIcon style={{fontSize:"40px"}} className="leftChevron"/>
          <ArrowForwardIosIcon style={{fontSize:"40px"}} className="rightChevron"/> */}
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
  );
};

export default Shows;
