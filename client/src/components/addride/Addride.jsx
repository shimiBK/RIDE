import React from 'react';
import "./addride.css";
import {useState , useRef} from "react";
import axios from "axios";

function Addride() {
    const [openModal , setOpenModal] = useState(false);
    const ename = useRef();
    const fname = useRef();
    const lname = useRef();
    const city = useRef();
    const facebook = useRef();
    const time = useRef();

    const handleClick = async (e) => {
        e.preventDefault();
          const ride = {
            ename: ename.current.value,
            fname: fname.current.value,
            lname: lname.current.value,
            city: city.current.value,
            facebook: facebook.current.value,
            time: time.current.value
          };
          try {
            await axios.post("/rides", ride);
            setOpenModal(false);

          } catch (err) {
            console.log(err);
          }
        
      };
  return (
    <>
    <div class="addRide">
        <button class="addRideBtn" onClick={() => {setOpenModal(true)} }>I WANT TO GIVE A RIDE</button>
    </div>
    {openModal && (<div class="rideModalWrapper">
        <form className="rideBox" onSubmit={handleClick}>
        <div class="rideModal">
            <h1 class="rideTitle">RIDE INFORMATION</h1>
            <label for="events">Choose Event:</label>
            <select name="events" ref={ename} class="rideInput">
            <option value="choose-event" disabled selected>Event</option>
            <option value="david-guetta">David Guetta</option>
            <option value="armin-van-buuren">Armin Van Buuren</option>
            <option value="martin-garrix">Martin Garrix</option>
            <option value="martin-garrix">Hardwell</option>
            <option value="martin-garrix">Tiesto</option>
            <option value="martin-garrix">ILLENIUM</option>
            </select>
            <label>Name:</label>
            <input type="text"  ref={fname} placeholder="John" class="rideInput"/>
            <label>Surname:</label>
            <input type="text" ref={lname} placeholder="Doe" class="rideInput"/>
            <label>Ride From:</label>
            <input type="text"  ref={city} placeholder="Tel-Aviv" class="rideInput"/>
            <label>Facebook Profile Link:</label>
            <input type="text"  ref={facebook} placeholder="https://www.facebook.com/john.doe" class="rideInput"/>
            <label>Leaving Time:</label>
            <select name="events" ref={time} class="rideInput">
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
            <button class="rideButton" type="submit">Add Ride</button>
            <span class="close" onClick={() => {setOpenModal(false)}}>X</span>
        </div>
        </form>
    </div>)}
    </>
  )
}

export default Addride