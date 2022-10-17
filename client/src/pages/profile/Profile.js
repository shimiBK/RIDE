import "./profile.css"
import axios from "axios";
import Navbar from "../../components/navbar/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/loading/Loading";
import Searchbar from "../../components/searchbar/Searchbar";
import ConfirmDelete from "../../components/confirmdelete/ConfirmDelete";
import { convertTitle } from "../../utils/utils";

const Profile = ({user,cities}) => {

    const [events , setEvents] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [confirmDel,setConfirmDel] = useState(false);
    const [city,setCity] = useState("");

    const fname = useRef();
    const lname = useRef();
    const gender = useRef();



    const getCity = (cityFromChild)=>{

        setCity(cityFromChild);
      }

      const cancelDel = (childValue) =>{
        setConfirmDel(childValue);
    }
    

    const handleUpdate = async (e) => {

        setIsLoading(true);

        e.preventDefault();
          const updateInfo = {
            firstName: fname.current.value ? fname.current.value : user.firstName ,
            lastName:lname.current.value ? lname.current.value : user.lastName ,
            city: city ? city : user.city ,
            gender: gender.current.value ? gender.current.value : user.gender ,
          };
          try {
            await axios.put(`/user/${user._id}`, updateInfo);
            toast.success("Account has been updated successfully")
            window.location.reload();
            setIsLoading(false);

          } catch (err) {
            console.log(err);
            setIsLoading(false);
          }
        
      };

      const handleDelete = async () =>{
        try {
            await axios.delete(`rides/delete/${user._id}`);
            await axios.delete(`/user/${user._id}`);
            setConfirmDel(false);
        } catch (error) {
            console.log(error);
        }finally{
            window.location.reload();
        }
      }

      const handleRemove = async (event) =>{

        setIsLoading(true);
        const arr = user.sendMails;
        
        const index = arr.indexOf(event);
            if(index > -1)
            {
                arr.splice(index,1);   
            }
            const updatedInfo = {
                sendMails:arr,
              };
              try {
                await axios.put(`/user/${user._id}`, updatedInfo);
                setIsLoading(false);
    
              } catch (err) {
                console.log(err);
              }
      }

    useEffect(()=>{
        const updateEvents = () =>{
            if(user)
                setEvents(user.sendMails);
        }
        updateEvents();
      
    })


  return (
    <>
    <div className="profile">
        <Navbar user={user} />
            <h1 className="profilePageTitle">Account Settings</h1>
            {isLoading ? <Loading size="30px"/> :<div className="settingsContainer">
            <div className="formsWrapper">
                <div className="personalInfo">
                    <h1 className="personalTitle">Personal Info</h1>
                    <form className="updatePersonal" onSubmit={handleUpdate}>
                        <div className="personalInfoContainer">
                            <input type="text"
                                className="personalField" 
                                placeholder="First Name" 
                                ref={fname} 
                             />
                            <input 
                                type="text" 
                                className="personalField" 
                                placeholder="Last Name" 
                                ref={lname} 
                            />
                            <Searchbar placeholder="Choose City" data={cities} getCity={getCity} required=""/>
                            <select 
                                className="personalSelectField" 
                                type="text" 
                                ref={gender} 
                                placeholder="Gender">
                                <option value="" disabled selected>Choose Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Refuse">Id Rather not say</option>
                            </select>
                        </div>
                            {!isLoading && <button className="personalButton" type="submit">Update</button>}                    </form>
                    </div>
                <div className="profileEvents">
                    <h1 className="prfEventsTitle">My Events</h1>
                    {events.length > 0 ?
                     <div className="prfEventsContainer">
                        {events.map((event)=>
                        <div className="prfEventItem">
                            <span className="prfEventName">{convertTitle(event)}</span>
                            <span className="prfRemoveEvent" onClick={()=> handleRemove(event)}>X</span>
                        </div>)}
                    </div> : <h2 className="prfEmptyEvents">You are not following any event</h2>}
                </div>
                </div>
                    <button className="deleteUserButton" onClick={()=>setConfirmDel(true)}>Delete Account</button>
            </div>}
            {confirmDel && <ConfirmDelete message="Are you sure you want to delete your account?" handleDelete={handleDelete} cancelDel={cancelDel}/>}
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

export default Profile