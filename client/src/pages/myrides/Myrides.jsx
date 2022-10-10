import "./myrides.css"
import axios from "axios";
import {useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import Navbar from "../../components/navbar/Navbar";


const Myrides = ({user}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [rides,setRides] = useState([{}]);
    const [editMenu,setEditMenu] = useState(false);
    const [confirmDel,setConfirmDel] = useState(false);
    const [editRide,setEditRide] = useState(false);
    const [ride,setRide] = useState("");
    const [cities , setCities] = useState([]);

    const userId = user ? user._id : "";
    const rideId = ride ? ride._id : "";
    
    const fname = useRef();
    const lname = useRef();
    const city = useRef();
    const facebook = useRef();
    const time = useRef();



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
                city: city.current.value ? city.current.value : ride.city,
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

    useEffect(() =>{
        const getCities = async () => {
            try{
                const res = await axios.get('http://localhost:8800/api/cities');
                setCities(res.data);                
            }catch(error){
                console.log(error);
            }
        };
        getCities();
    },[]);


    const deleteRide = async (rideID) => {

        try { 
            await axios.delete(`/rides/${rideID}`);
            toast.success("Ride has been deleted successfully");
            setTimeout(window.location.reload(),5000);
            

        }catch (error) {
            console.log(error)
            
        }
    }

    const renderRide = (
        <div className="myRidesWrapper">
        {rides.length > 0 ? (rides.map(ride =>
        <div className="myRideItem" key={ride._id}>
            <div className="myRidesInfoContainer">
             
                <div className="myRidesInfoItem">
                <span className="myRideEventName">{ride.eventName}</span>
                </div>
                <div className="myRidesInfoItem">
                    <img src={ride.userImg ? ride.userImg : "/assests/blank-profile.png"} alt="" className="profileImg" />
                </div>
                <div className="myRidesInfoItem">
                    <span className="userInfo">{ride.firstName + " " +  ride.lastName}</span>
                </div>
                <div className="myRidesInfoItem">
                    <span className="fixedText">From →</span>
                    <span className="userInfo">{ride.city}</span>
                </div>
                <div className="myRidesInfoItem">
                    <span className="fixedText">Time →</span>
                    <span className="userInfo">{ride.time}</span>
                </div>
                <div className="editWrapper">
                    <span className="editIcon">
                        <MoreVertIcon onClick={()=> setEditMenu(!editMenu)}/>
                    </span>
                    {editMenu &&
                    <div className="editList">
                        <div className="editLisItem" onClick={()=> {setEditRide(true);setRide(ride)}}>Edit</div>
                        <div className="editLisItem" onClick={()=> {setConfirmDel(true);setRide(ride);}}>Delete</div>
                    </div> }
                </div>
                <span className="genderIcon">
                    {ride.userGender === "Male" && <MaleIcon/>}
                    {ride.userGender === "Female" && <FemaleIcon style={{color:'#f15bb5'}}/> }
                </span>
            </div>
            <button className="myRidesFacebookBtn" onClick={() => {window.open(ride.facebook , "_blank")}}>FACEBOOK PROFILE</button>
        </div>)) : <h3 className="emptyRides">Your dont have any rides yet</h3>}  
     </div>

    );

  return (
    <>
    <div className="myrides">
        <Navbar user={user}/>
        <h1 className="myRidesTitle">{user.firstName}  {user.lastName} Rides</h1>
            {isLoading ? <Loading/> : renderRide }
        {confirmDel &&
            <div className="confirmDel">
                <div className="delModal">
                        <span className="confirmText">Are you sure you want to delete your ride?</span>
                    <div className="delBtns">
                        <button className="deletelBtn" onClick={ () => {deleteRide(ride._id);setConfirmDel(false)}} >DELETE</button>
                        <button className="cancelBtn" onClick= {() => setConfirmDel(false)}>CANCEL</button>
                    </div>
                </div>
            </div>}
            {editRide && 
            <div className="editRide">
                <h1 className="editRideTitle">Edit Ride Info</h1>
                <form className="updateRide" onSubmit={updateRide}>
                    <div className="editRideContainer">
                    <input type="text" className="editRideField" placeholder="First Name" ref={fname}/>
                        <input type="text" className="editRideField" placeholder="Last Name" ref={lname} />
                        <select ref={city} className="editRideSelectField">
                            <option value="" disabled selected>Choose City</option>
                                {cities.map((city) =>
                                    <option key={city._id} style={{direction:"ltr"}} value={city.english_name}>{city.english_name}</option>
                                )};
                        </select>
                        <input type="text" ref={facebook} className="editRideField" placeholder="Facebook Profile"/>
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