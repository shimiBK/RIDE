import "./rides.css"
import axios from "axios";
import {useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom";


export default function Rides() {
    const location = useLocation();
    const ename = location.pathname.split("/")[2];

    const title = ename ? getTitle(ename) : "ALL EVENTS"

    function getTitle(ename) {
        return ename.replaceAll("-"," ").toUpperCase();
    }

    const [rides,setRides] = useState([{
        eventName: '',
        firstName: '',
        lastName: ',',
        city: '',
        facebook: '',
        time:'',
    }])

    useEffect(() =>{
        const getRides = async () => {
            try{
                const res = await axios.get(
                    ename 
                    ? `http://localhost:8800/api/rides?eventName=${ename}`
                    : `http://localhost:8800/api/rides`
    
                );
                setRides(res.data);
            }catch{}
        };
        getRides();
     
    },[ename]);


  return (
    <>
    <div className="ridesContainer">
        <h1 className="ridesTitle">RIDES FOR {title}</h1>
        <Link to="/">
              <img src="/assests/chevron_left.png" alt="" className="previousPage"/>
        </Link>
        <div className="ridesWrapper">
                {rides.length > 0 ? (rides.map(ride =>
            <div>
                <div className="rideItem">
                    <div className="infoContainer">
                        <div className="infoItem">
                        <span class="material-icons">person</span>
                        <span className="infoText">{ride.firstName + " " +  ride.lastName}</span>
                        </div>
                        <div className="infoItem">
                        <span class="material-icons">location_on</span>
                        <span className="infoText">{ride.city}</span>
                        </div>
                        <div className="infoItem">
                        <span class="material-icons">schedule</span>
                        <span className="infoText">{ride.time}</span>
                        </div>
                    </div>
                    <button className="sendMessage" onClick={() => {window.location.assign(ride.facebook)}}>FACEBOOK PROFILE</button>
                </div>
                </div>)) : <h3 className="emptyRides">CURRENTLY THERE ARE NO RIDES FOR {title}</h3>}  
             </div>
    </div>
    </>

  );
};
