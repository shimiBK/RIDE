import "./myrides.css"
import axios from "axios";
import {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import ConfirmDelete from "../../components/confirmdelete/ConfirmDelete";
import Searchbar from "../../components/searchbar/Searchbar";
import Ride from "../../components/ride/Ride";
import { useContext } from "react";
import userContext from "../../context/userContext";



const Myrides = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [rides,setRides] = useState([{}]);
    const [confirmDel,setConfirmDel] = useState(false);
    const [editRide,setEditRide] = useState(false);
    const [ride,setRide] = useState("");
    const [city,setCity] = useState("");
    const {user} = useContext(userContext);


    const userId = user ? user._id : "";
    const rideId = ride ? ride._id : "";
    
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

            setIsLoading(true);
            
            try{
                const result = await axios.get(`/rides/user/${userId}`)

                setRides(result.data);
                setIsLoading(false);
                
            }catch(error){
                console.log(error);
                setIsLoading(false);

            }
        };
        getRides();
        
    },[]);

        const updateRide = async (e) =>{

            e.preventDefault();
            const updatedInfo = {
                firstName: fname.current.value ? fname.current.value : ride.firstName,
                lastName: lname.current.value ? lname.current.value : ride.lastName,
                city: city ? city : ride.city,
                time: time.current.value ? time.current.value : ride.time,
            }

            console.log(updatedInfo);

            try {
                await axios.put(`/rides/update/${rideId}`,updatedInfo);
                toast.success("ride has been updated");
                setEditRide(false);
                window.location.reload();
                //check if city is changed and send a mail.
                
            } catch (error) {
                console.log(error);
                
            }
        }

    const deleteRide = async (rideID) => {

            setIsLoading(true)

        try { 
            await axios.delete(`/rides/${rideID}`);
            setIsLoading(false);
            toast.success("Ride has been deleted successfully");
            setConfirmDel(false);
            setTimeout(()=>{
                window.location.reload();
            },500);

        }catch (error) {
            console.log(error)
            
        }
    }

    const renderRide = (
        <div className="myRidesContainer">
            <h1 className="myRidesTitle">{user.firstName}  {user.lastName} Rides</h1>
            <div className="myRideItems">
                {rides.length > 0 ? (rides.map(ride =>
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
                <h3 className="emptyRides">Your dont have any rides yet</h3>}  
            </div>
        </div>
    );
  return (
    <>
    <div className="myrides">
        {/* <Navbar user={user}/> */}
        <Link to="/">
              <img src="/assests/chevron_left.png" alt="" className="previousPage"/>
        </Link>
            {isLoading ? <Loading/> : renderRide }
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
                    {!isLoading && <button className="editRideButton" type="submit">Update</button>}
                        {isLoading && <button className="editRideButton" type="submit"><Loading/></button>}
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