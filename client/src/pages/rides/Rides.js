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
import Ride from "../../components/ride/Ride"




export default function Rides({user,cities}) {

    const location = useLocation();
    const ename = location.pathname.split("/")[2];

    const NUM_OF_ITEMS = 8;

    const [rides,setRides] = useState([{}])
    const [filteredRides,setfilteredRides] = useState([{}]);
    const [city,setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showAll,setShowAll] = useState(false);





    const title = ename ? getTitle(ename) : "ALL EVENTS";

    const userId = user ? user._id : "";

    const getCity = (cityFromChild)=>{

        setCity(cityFromChild);
      }

    function getTitle(ename) {
        return ename.replaceAll("-"," ").toUpperCase();
    }


    
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
              showAll ? setRides(res.data) : setRides(res.data.slice(0,8));
                
                setIsLoading(false);
                
            }catch(error){
                console.log(error);
                setIsLoading(false);

            }
        };
        getRides();
        
    },[ename,showAll]);
    
    const renderRide = (
        <div className="ridesContainer">
            <h1 className="ridesTitle">RIDES FOR {title}</h1>
            <div className="searchFilter"> 
                {rides.length > 0 && <Searchbar placeholder="Search by city" data={cities} getCity={getCity}/>}
            </div>
        {city ?
        <div className="rideItems">     
            {filteredRides.length > 0 ?
            filteredRides.map(ride =>
            <Ride ride={ride} key={ride._id} />)
        : <h3 className="emptyRides">CURRENTLY THERE ARE NO RIDES FOR {city}</h3>}
        </div>
        :
        <div className="rideItems">     
        {rides.length > 0 ?
         rides.map(ride =>
            <Ride ride={ride} key={ride._id} />)
            : <h3 className="emptyRides">CURRENTLY THERE ARE NO RIDES FOR {title}</h3>}
            </div>
        }
       </div>)

  return (
    <>
    <div className="rides">
    <Link to="/">
              <img src="/assests/chevron_left.png" alt="" className="previousPage"/>
        </Link>
        {isLoading ? <Loading size="30px"/> : renderRide }
        {!city && rides.length >=8 && !showAll && <button className="facebookBtn" onClick={()=> setShowAll(true)}>Load More</button>}

    </div>
    </>
  );
};
