import "./rides.css"
import axios from "axios";
import {useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";



export default function Rides({user}) {

    const location = useLocation();
    const ename = location.pathname.split("/")[2];

    const [rides,setRides] = useState([{}])
    const [confirmDel,setConfirmDel] = useState(false);
    const [rideID,setRideID] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const title = ename ? getTitle(ename) : "ALL EVENTS";

    const userId = user ? user._id : "";


    function getTitle(ename) {
        return ename.replaceAll("-"," ").toUpperCase();
    }


    const deleteRide = async (rideID) => {

        try {
            window.location.reload();
            
        } catch (error) {
            console.log(error)
        }

        try { 
            await axios.delete(`/rides/${rideID}`);

            
        }catch (error) {
            console.log(error)
            
        }
    }

    
    useEffect(() =>{

        const getRides = async () => {

            setIsLoading(true);
            
            try{
                const res = await axios.get(
                    ename 
                    ? `http://localhost:8800/api/rides?eventName=${ename}`
                    : `http://localhost:8800/api/rides`
                );
                setRides(res.data);
                setIsLoading(false);
                
            }catch(error){
                console.log(error);
                setIsLoading(false);

            }
        };
        getRides();
        
    },[ename]);
    
    const renderRide = (
        <div className="ridesWrapper">
        {rides.length > 0 ? (rides.map(ride =>
        <div className="rideItem" key={ride._id}>
            <div className="infoContainer">
                <div className="infoItem">
                    <img src={ride.userImg ? ride.userImg : "/assests/blank-profile.png"} alt="" className="profileImg" />
                </div>
                <div className="infoItem">
                    <span className="userInfo">{ride.firstName + " " +  ride.lastName}</span>
                </div>
                <div className="infoItem">
                    <span className="fixedText">From</span>
                </div>
                <div className="infoItem">
                     <span className="userInfo">{ride.city}</span>
                </div>
                <div className="infoItem">
                    <span className="fixedText">Time</span>
                </div>
                <div className="infoItem">
                    <span className="userInfo">{ride.time}</span>
                </div>
                {ride.userID === userId && <span className="deleteRide" onClick={() => {setConfirmDel(true);setRideID(ride._id);}}>X</span>}
            </div>
            <button className="facebookBtn" onClick={() => {window.open(ride.facebook , "_blank")}}>FACEBOOK PROFILE</button>
        </div>)) : <h3 className="emptyRides">CURRENTLY THERE ARE NO RIDES FOR {title}</h3>}  
     </div>

    );

  return (
    <>
    <div className="ridesContainer">
        <h1 className="ridesTitle">RIDES FOR {title}</h1>
        <Link to="/">
              <img src="/assests/chevron_left.png" alt="" className="previousPage"/>
        </Link>
        {isLoading ? <Loading/> : renderRide }
        {confirmDel &&
         <div className="confirmDel">
            <div className="delModal">
                <h2 className="confirmTitle">ARE YOU SURE YOU WANT TO DELETE THIS RIDE?</h2>
                <div className="delBtns">
                    <button className="deletelBtn" onClick={ () => {deleteRide(rideID);}} >DELETE</button>
                    <button className="cancelBtn" onClick= {() => setConfirmDel(false)}>CANCEL</button>
                </div>
            </div>
        </div>}
    </div>
    </>
  );
};
