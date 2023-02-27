import "./event.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import userContext from "../../context/userContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import Searchbar from "../searchbar/Searchbar";
import { addDash } from "../../utils/utils";
import ConfirmDelete from "../confirmdelete/ConfirmDelete";

const Event = ({ event }) => {
  const [isHover, setIsHover] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [city, setCity] = useState(false);

  const path = `/rides/${event.eventValue}`;
  const imagePath = `assests/${event.eventValue}.jpg`;
  const { user } = useContext(userContext);

  const updatedEventName = useRef();
  const updatedEventVenue = useRef();
  const updatedEventDate = useRef();

  const getCity = (cityFromChild) => {
    setCity(cityFromChild);
  };

  const cancelDel = (childValue) => {
    setConfirmDel(childValue);
  };

  const handleFollow = async (eventName) => {
    const list = user.sendMails;
    if (!list.includes(eventName)) {
      list.push(eventName);
      const addEvent = {
        sendMails: list,
      };
      try {
        await axios.put(`/user/${user._id}`, addEvent);
        toast.success("Event was successfully added to your followings");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info("You already follow this event");
    }
  };

  const HandleEventUpdate = async (e) => {
    e.preventDefault();

    
    const { value: updatedEventNameValue } = updatedEventName.current;
    const { value: updatedEventVenueValue } = updatedEventVenue.current;
    const { value: updatedEventDateValue } = updatedEventDate.current;


    const updatedInfo = {
      eventName: updatedEventNameValue || event.eventName,
      eventValue: addDash(updatedEventNameValue) || event.eventValue,
      eventLocation: city || event.eventLocation,
      eventVenue: updatedEventVenueValue || event.eventVenue,
      eventDate: updatedEventDateValue || event.eventDate,
    };

    try {
      await axios.put(`/events/update/${event._id}`, updatedInfo);
      toast.success("Event has been updated");
      setUpdateEvent(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (eventID) => {
    try {
      await axios.delete(`/events/${eventID}`);
      toast.success("Event has been deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="eventItem"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {!editEvent && (
          <Link to={path}>
            <img src={imagePath} alt="" className="showImg" />
          </Link>
        )}
        <div className="eventTitle">
          {!isHover && !editEvent && (
            <h1 className="eventName">{event.eventName}</h1>
          )}
        </div>
        {user.isAdmin && !editEvent && (
          <span className="editEventIcon">
            <MoreVertIcon onClick={() => setEditEvent(true)} />
          </span>
        )}
        {user && !user.isAdmin && (
          <div className="subscribe">
            <h1 onClick={() => handleFollow(event.eventValue)}>+</h1>
          </div>
        )}
        {user && user.isAdmin && (
          <div className="editEventWrapper">
            {editEvent && (
              <div className="editEventList">
                <div className="editEventButtonContainer">
                  <button
                    className="editEventListItem"
                    onClick={() => {
                      setUpdateEvent(true);
                      setEditEvent(false);
                    }}
                  >
                    <EditIcon />
                    Edit
                  </button>
                  <button
                    className="editEventListItem"
                    onClick={() => {
                      setConfirmDel(true);
                      setEditEvent(false);
                    }}
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                  <button
                    className="editEventListItem"
                    onClick={() => {
                      handleFollow(event.eventValue);
                      setEditEvent(false);
                    }}
                  >
                    <AddIcon />
                    Follow
                  </button>
                </div>
                <span
                  className="closeEditEvent"
                  onClick={() => setEditEvent(false)}
                >
                  X
                </span>
              </div>
            )}
          </div>
        )}
        {isHover && !editEvent && (
          <div className="eventTitleHover">
            <h1 className="eventName">{event.eventName}</h1>
            <h3 className="eventLocation">{`${event.eventVenue} | ${event.eventLocation} `}</h3>
            <h3 className="eventDate">{event.eventDate}</h3>
          </div>
        )}
        {updateEvent && (
          <div className="eventModal">
            <h1 className="eventModalTitle">EVENT INFORMATION</h1>
            <form className="addEventForm" onSubmit={HandleEventUpdate}>
              <div className="eventInputContainer">
                <input
                  type="text"
                  ref={updatedEventName}
                  placeholder="Artist / Event Name"
                  className="addEventInput"
                />
                <Searchbar
                  placeholder="Event Location"
                  getCity={getCity}
                  required={false}
                />
                <input
                  type="text"
                  ref={updatedEventVenue}
                  placeholder="Event Venue"
                  className="addEventInput"
                />
                <input
                  type="text"
                  ref={updatedEventDate}
                  placeholder="Event Date"
                  className="addEventInput"
                />
              </div>
              <button className="eventButton" type="submit">
                Update Event
              </button>
            </form>
            <span className="close" onClick={() => setUpdateEvent(false)}>
              X
            </span>
          </div>
        )}
        {confirmDel && (
          <ConfirmDelete
            message="Are you sure you want to delete this event?"
            handleDelete={() => deleteEvent(event._id)}
            cancelDel={cancelDel}
          />
        )}
      </div>
    </>
  );
};

export default Event;
