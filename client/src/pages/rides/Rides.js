import "./rides.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState, useEffect, useReducer, useCallback, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { hasNumber, getTitle } from "../../utils/utils";
import { ACTION_TYPES } from "../../reducer/rideActionTypes";
import { INITIAL_STATE, rideReducer } from "../../reducer/rideReducer";
import { SERVER_URL } from "../../App";
import Searchbar from "../../components/searchbar/Searchbar";
import Loading from "../../components/loading/Loading";
import Ride from "../../components/ride/Ride";
import userContext from "../../context/userContext";

export default function Rides({chatStatus}) {

  
  const DEFAULT_FILTERED_RIDES = [];

  const { pathname } = useLocation();
  const ename = pathname.split("/")[2] ?? "";
  const title = getTitle(ename);

  const [filteredRides, setfilteredRides] = useState(DEFAULT_FILTERED_RIDES);
  const [city, setCity] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [rideState, dispatch] = useReducer(rideReducer, INITIAL_STATE);
  const { user } = useContext(userContext);


  //get city from Searchbar comp'
  const getCity = useCallback((cityFromChild) => {
    setCity(cityFromChild);
  }, []);

  useEffect(() => {
    const filtered = rideState.rides.filter((ride) => {
      return ride.city?.includes(city) ?? "";
    });
    
    if(filteredRides !== filtered){
      setfilteredRides(filtered);
    }
    
  }, [city]);

  useEffect(() => {
    const getRides = async () => {
      dispatch({ type: ACTION_TYPES.FETCH_START });

      try {
        const ownerId = user?._id; 
        const res = await axios.get(
          ename && hasNumber(ename)
            ? `${SERVER_URL}/api/rides?_id=${ename}&ownerId_ne=${ownerId}`
            : ename
            ? `${SERVER_URL}/api/rides?eventName=${ename}&ownerId_ne=${ownerId}`
            : `${SERVER_URL}/api/rides?ownerId_ne=${ownerId}`
        );

        showAll
          ? dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data })
          : dispatch({
              type: ACTION_TYPES.FETCH_SUCCESS,
              payload: res.data.slice(0, 8),
            });
      } catch (error) {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR });
        console.log(error);
      }
    };
    getRides();
  }, [ename, showAll]);

  const renderRide = (
    <div className="ridesContainer">
      <h1 className="ridesTitle">RIDES FOR {title}</h1>
      <div className="searchFilter">
        {rideState.rides.length >= 8 && (
          <Searchbar placeholder="Search by city" getCity={getCity} />
        )}
      </div>
      {city ? (
        <div className="rideItems">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <Ride key={ride._id} ride={ride} containerStyle="infoContainer" chatStatus={chatStatus}/>
            ))
          ) : (
            <h3 className="emptyRides">
              CURRENTLY THERE ARE NO RIDES FOR {city}
            </h3>
          )}
        </div>
      ) : (
        <div className="rideItems">
          {rideState.rides.length > 0 ? (
            rideState.rides.map((ride) => (
              <Ride ride={ride} key={ride._id} chatStatus={chatStatus} containerStyle="infoContainer" />
            ))
          ) : (
            <h3 className="emptyRides">
              CURRENTLY THERE ARE NO RIDES FOR {title}
            </h3>
          )}
        </div>
      )}

      {!city && rideState.rides.length >= 8 && !showAll && (
        <div className="loadMoreButtonContainer">
          <button className="loadMoreBtn" onClick={() => setShowAll(true)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="rides">
        <Link to="/">
          <img
            src="/assests/chevron_left.png"
            alt=""
            className="previousPage"
          />
        </Link>
        {rideState.loading ? <Loading size="30px" color="white" /> : renderRide}
      </div>
    </>
  );
}
