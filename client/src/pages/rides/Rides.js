import "./rides.css"
import axios from "axios";
import {useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "../../components/searchbar/Searchbar";








export default function Rides({user,cities}) {

    const location = useLocation();
    const ename = location.pathname.split("/")[2];

    const NUM_OF_ITEMS = 8;

    const [rides,setRides] = useState([{}])
    const [filteredRides,setfilteredRides] = useState([{}]);
    const [city,setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [numOfItems,setNumOfItems] = useState(8);





    const title = ename ? getTitle(ename) : "ALL EVENTS";

    const userId = user ? user._id : "";

    const getCity = (cityFromChild)=>{

        setCity(cityFromChild);
      }

    function getTitle(ename) {
        return ename.replaceAll("-"," ").toUpperCase();
    }



    useEffect(() =>{
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    },[]);

    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            
                setNumOfItems((prev) => prev + NUM_OF_ITEMS);

        }
    };

    
    useEffect(()=>{

        const filtered = rides.filter((ride)=>{
            return ride.city === city;
        });

        setfilteredRides(filtered);

    },[city])



    
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
        
    },[ename,numOfItems]);
    
    const renderRide = (
        <div className="ridesWrapper">
                    {city ? filteredRides.length > 0 ? (filteredRides.map(ride =>
        <div className="rideItem" key={ride._id}>
            <div className="infoContainer">
                <div className="infoItem">
                    <img src={ride.userImg ? ride.userImg : "/assests/blank-profile.png"} alt="" className="profileImg" />
                </div>
                <div className="infoItem">
                    <span className="userInfo">{ride.firstName + " " +  ride.lastName}</span>
                </div>
                <div className="infoItem">
                    <span className="fixedText">From →</span>
                    <span className="userInfo">{ride.city}</span>
                </div>
                <div className="infoItem">
                    <span className="fixedText">Time →</span>
                    <span className="userInfo">{ride.time}</span>
                </div>
                {/* {ride.userID === userId && <span className="deleteRide" onClick={() => {toast("Are You sure you want to delete this ride?");setConfirmDel(true);setRideID(ride._id);}}>X</span>} */}
                <span className="genderIcon">
                    {ride.userGender === "Male" && <MaleIcon/>}
                    {ride.userGender === "Female" && <FemaleIcon style={{color:'#f15bb5'}}/> }
                </span>
            </div>
            <button className="facebookBtn" onClick={() => {window.open(ride.facebook , "_blank")}}>FACEBOOK PROFILE</button>
        </div>)) : <h3 className="emptyRides">THERE ARE NO RIDES FROM {city}</h3>
         :
        rides.length > 0 ? (rides.map(ride =>
        <div className="rideItem" key={ride._id}>
            <div className="infoContainer">
                <div className="infoItem">
                    <img src={ride.userImg ? ride.userImg : "/assests/blank-profile.png"} alt="" className="profileImg" />
                </div>
                <div className="infoItem">
                    <span className="userInfo">{ride.firstName + " " +  ride.lastName}</span>
                </div>
                <div className="infoItem">
                    <span className="fixedText">From →</span>
                    <span className="userInfo">{ride.city}</span>
                </div>
                <div className="infoItem">
                    <span className="fixedText">Time →</span>
                    <span className="userInfo">{ride.time}</span>
                </div>
                {/* {ride.userID === userId && <span className="deleteRide" onClick={() => {toast("Are You sure you want to delete this ride?");setConfirmDel(true);setRideID(ride._id);}}>X</span>} */}
                <span className="genderIcon">
                    {ride.userGender === "Male" && <MaleIcon/>}
                    {ride.userGender === "Female" && <FemaleIcon style={{color:'#f15bb5'}}/> }
                </span>
            </div>
            <button className="facebookBtn" onClick={() => {window.open(ride.facebook , "_blank")}}>FACEBOOK PROFILE</button>
        </div>)) : <h3 className="emptyRides">CURRENTLY THERE ARE NO RIDES FOR {title}</h3>
    }  
     </div>

    );

  return (
    <>
    <div className="ridesContainer">
        <h1 className="ridesTitle">RIDES FOR {title}</h1>
        <div className="searchFilter">
            <Searchbar placeholder="Filter by city" data={cities} getCity={getCity}/>
        </div>
        <Link to="/">
              <img src="/assests/chevron_left.png" alt="" className="previousPage"/>
        </Link>
        {isLoading ? <Loading/> : renderRide }
    </div>
    </>
  );
};
