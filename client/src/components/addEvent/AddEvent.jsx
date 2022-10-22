import { useRef, useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import "./addevent.css"
import axios from "axios";
import { toast } from 'react-toastify';
import { addDash } from "../../utils/utils";

const AddEvent = ({handleEventModal}) => {

    const [city,setCity] = useState("");

    const eventName = useRef();
    const eventVenue = useRef();
    const eventDate = useRef();


    const getCity = (cityFromChild)=>{

        setCity(cityFromChild);
      }


      const handleClick = async (e) => {
        e.preventDefault();
          const event = {
            eventName: eventName.current.value,
            eventTitle: addDash(eventName.current.value),
            eventLocation:city,
            eventVenue: eventVenue.current.value,
            eventDate: eventDate.current.value
          };
          try {
            const res = await axios.post("/events", event);
            handleEventModal(false)
            toast.success("Event was successfully uploaded");
            setTimeout(()=>{
              window.location.reload();
          },500);
          } catch (error) {
            console.log(error);
          }
  
        };
    





  return (
    <>
    <div className="eventModal">
      <h1 className="eventModalTitle">EVENT INFORMATION</h1>
      <form className="addEventForm" onSubmit={handleClick}>
        <div className="eventInputContainer">
          <input
            type="text"
            ref={eventName}
            placeholder="Artist / Event Name"
            className="addEventInput"
          />
          <Searchbar
            placeholder="Event Location" 
            getCity={getCity} 
             required={true}
          />
          <input
            type="text"
            ref={eventVenue}
            placeholder="Event Venue" 
            className="addEventInput"
          />
          <input
            type="text"
            ref={eventDate}
            placeholder="Event Date" 
            className="addEventInput"
          />
        </div>
        <button
          className="eventButton" 
          type="submit">
          Add Ride
        </button>
      </form>
      <span className="close" onClick={()=> handleEventModal(false)}>X</span>
    </div>
  </>
  )
}

export default AddEvent