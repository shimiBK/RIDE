import "./addride.css";
import axios from "axios";
import Searchbar from "../searchbar/Searchbar";
import userContext from "../../context/userContext";
import { convertTitle } from "../../utils/utils";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { SERVER_URL } from "../../App";

const Addride = ({ handleRideModal }) => {

  const [city, setCity] = useState("");
  const [users, setUsers] = useState({});
  const [events, setEvents] = useState([{}]);

  const { user } = useContext(userContext);

  const ename = useRef();
  const fname = useRef();
  const lname = useRef();
  const time = useRef();

  const getCity = (cityFromChild) => {
    setCity(cityFromChild);
  };

  const handleEmails = async (ride) => {
    for (let dbUser of users) {
      if (
        dbUser !== user &&
        dbUser.city === ride.city &&
        dbUser.sendMails.includes(ride.eventName)
      ) {
        const email = {
          to: dbUser.email,
          subject: `New ride for ${convertTitle(ride.eventName)} was uploaded`,
          message: `Hello ${user.firstName},\n\n${
            ride.firstName
          } is riding to ${convertTitle(ride.eventName)} at ${
            ride.time
          } \nWatch the ride here link http://localhost:3000/rides/${ride._id}`,
        };
        try {
          await axios.post("/email", email);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { value: enameValue } = ename.current;
    const { value: fnameValue } = fname.current;
    const { value: lnameValue } = lname.current;
    const { value: timeValue } = time.current;

    const ride = {
      ename: enameValue,
      fname: fnameValue,
      lname: lnameValue,
      city: city,
      time: timeValue,
      uID: user._id,
      userImg: user.image,
      userGender: user.gender,
    };
    try {
      const res = await axios.post("/rides", ride);
      handleRideModal(false);
      handleEmails(res.data);
      toast.success("Ride was successfully uploaded");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while uploading a ride");

    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, eventsRes] = await Promise.all([
        axios.get(`${SERVER_URL}/api/user`),
        axios.get(`${SERVER_URL}/api/events`)
      ]);
        setUsers(usersRes.data);
        setEvents(eventsRes.data);

    };
    fetchData();
  }, []);

  return (
    <>
      <div className="rideModal">
        <h1 className="rideTitle">Ride Information</h1>
        <form className="rideBox" onSubmit={handleClick}>
          <div className="rideInputContainer">
            <select
              name="events"
              ref={ename}
              className="rideSelectInput"
              required
            >
              <option value="" disabled selected>
                Choose Event
              </option>
              {events.map((event) => (
                <option key={event._id} value={event.eventValue}>
                  {event.eventName}
                </option>
              ))}
            </select>
            <input
              type="text"
              ref={fname}
              placeholder="First Name"
              className="rideInput"
              required
            />
            <input
              type="text"
              ref={lname}
              placeholder="Last Name"
              className="rideInput"
              required
            />
            <Searchbar
              placeholder="Search City"
              getCity={getCity}
              required={true}
            />
            <select
              name="events"
              ref={time}
              className="rideSelectInput"
              required
            >
              <option value="" disabled selected>
                Leaving Time
              </option>
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
          <button className="rideButton" type="submit">
            Add Ride
          </button>
        </form>
        <span
          className="close"
          onClick={() => {
            handleRideModal(false);
          }}
        >
          X
        </span>
      </div>
    </>
  );
};

export default Addride;
