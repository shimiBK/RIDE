import "./myrides.css"
import 'react-toastify/dist/ReactToastify.css';
import {useState , useEffect, useReducer} from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import ConfirmDelete from "../../components/confirmdelete/ConfirmDelete";
import Searchbar from "../../components/searchbar/Searchbar";
import Ride from "../../components/ride/Ride";
import userContext from "../../context/userContext";
import { ACTION_TYPES } from "../../reducer/rideActionTypes";
import { INITIAL_STATE, rideReducer } from "../../reducer/rideReducer";



const Myrides = () => {

    const [confirmDel,setConfirmDel] = useState(false);
    const [editRide,setEditRide] = useState(false);
    const [ride,setRide] = useState("");
    const [city,setCity] = useState("");
    const {user} = useContext(userContext);
    const [state, dispatch] = useReducer(rideReducer, INITIAL_STATE);

    const fname = useRef();
    const lname = useRef();
    const facebook = useRef();
    const time = useRef();


    const changeEditRide = (value) =>{
        setEditRide(value);
    }

    const cancelDel = (childValue) =>{
        setConfirmDel(childValue);
    }

    const getCity = (cityFromChild)=>{

        setCity(cityFromChild);
      }

      const getRide = (idFromChild) =>{
        setRide(idFromChild);
      }



    useEffect(() =>{

        const getRides = async () => {

            dispatch({ type: ACTION_TYPES.FETCH_START });

            try{
                const res = await axios.get(`/rides/user/${user._id}`)

               dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data })
                
            }catch(error){
                
                dispatch({ type: ACTION_TYPES.FETCH_ERROR });
                console.log(error);

            }
        };
        getRides();
        
    },[user._id]);

        const updateRide = async (e) =>{

            dispatch({ type: ACTION_TYPES.UPDATE_START})

            
            e.preventDefault();
            const updatedInfo = {
                firstName:  fname.current.value || ride.firstName,
                lastName:  lname.current.value || ride.lastName,
                city: city || ride.city,
                time: time.current.value || ride.time,
            }


            try {
                await axios.put(`/rides/update/${ride._id}`,updatedInfo);
                toast.success("ride has been updated");
                dispatch({ type: ACTION_TYPES.UPDATE_SUCCESS})
                setEditRide(false);
                window.location.reload();
                //check if city is changed and send a mail.
                
            } catch (error) {
                dispatch({ type: ACTION_TYPES.UPDATE_ERROR})
                console.log(error);
                
            }
        }

    const deleteRide = async (rideID) => {

        dispatch({ type: ACTION_TYPES.DELETE_START});

        try { 
            await axios.delete(`/rides/${rideID}`);
            dispatch({ type: ACTION_TYPES.DELETE_SUCCESS, rideID });
            toast.success("Ride has been deleted successfully");
            window.location.reload();
            setConfirmDel(false);
        }catch (error) {
            dispatch({ type: ACTION_TYPES.DELETE_ERROR });
            console.log(error)
            
        }
    }

    const renderRide = (
        <div className="myRidesContainer">
            <h1 className="myRidesTitle">{user.firstName}  {user.lastName} Rides</h1>
            <div className="myRideItems">
                {state.rides.length > 0 ? (state.rides.map(ride =>
                <Ride 
                    ride={ride} 
                    myRides="true" 
                    key={ride._id} 
                    getRide={getRide} 
                    cancelDel={cancelDel} 
                    changeEditRide={changeEditRide}
                    containerStyle="myContainer"  
                />
                )) : 
                <h3 className="emptyRides">You dont have any rides yet</h3>}  
            </div>
        </div>
    );
  return (
    <>
    <div className="myrides">
        <Link to="/">
              <img src="/assests/chevron_left.png" alt="" className="previousPage"/>
        </Link>
            {state.loading ? <Loading size="30px" color="white"/> : renderRide }
        {confirmDel &&
            <ConfirmDelete 
            message="Are you sure you want to delete this ride?" 
            handleDelete={()=> deleteRide(ride._id)} cancelDel={cancelDel} 
        />}
            {editRide && 
            <div className="editRide">
                <h1 className="editRideTitle">Edit Ride Info</h1>
                <form className="updateRide" onSubmit={updateRide}>
                    <div className="editRideContainer">
                        <input 
                            type="text" 
                            className="editRideField" 
                            placeholder="First Name" 
                            ref={fname}
                        />
                        <input 
                            type="text" 
                            className="editRideField" 
                            placeholder="Last Name" 
                            ref={lname} 
                        />
                        <Searchbar placeholder="Choose City" getCity={getCity} required=""/>
                        <input 
                            type="text" 
                            ref={facebook} 
                            className="editRideField" 
                            placeholder="Facebook Profile"
                        />
                        <select  name="events" ref={time} className="editRideSelectField">
                            <option value="" disabled selected>Time</option>
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
                    {!state.loading && <button className="editRideButton" type="submit">Update</button>}
                        {state.loading && <button className="editRideButton" type="submit"><Loading/></button>}
                </form>

                    <span className="close" onClick={() => {setEditRide(false)}}>X</span>
            </div> 
            }   
    </div>

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
    </>
  )
}

export default Myrides