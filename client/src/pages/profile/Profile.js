import "./profile.css"
import axios from "axios";
import Navbar from "../../components/navbar/Navbar"
import { useEffect, useRef, useState } from "react";

const Profile = ({user}) => {

    const [cities , setCities] = useState([]);
    const [events , setEvents] = useState([]);

    const fname = useRef();
    const lname = useRef();
    const city = useRef();
    const gender = useRef();


    const handleUpdate = async (e) => {
        e.preventDefault();
          const updateInfo = {
            firstName:fname.current.value,
            lastName:lname.current.value,
            city: city.current.value,
            gender: gender.current.value,
          };
          try {
            await axios.put(`/user/${user._id}`, updateInfo);

          } catch (err) {
            console.log(err);
          }
        
      };

      const handleDelete = async () =>{
        try {
            await axios.delete(`rides/delete/${user._id}`);
            await axios.delete(`/user/${user._id}`);
            //to do show message
        } catch (error) {
            console.log(error);
        }finally{
            window.location.reload();
        }
        
      }

      const handleRemove = async (event) =>{

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
    
              } catch (err) {
                console.log(err);
              }

              window.location.reload();

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
        <div className="settingsContainer">
            <h1 className="profilePageTitle">Account Settings</h1>
            <div className="personalInfo">
               <h1 className="personalTitle">Personal Info</h1>
                <form className="updatePersonal" onSubmit={handleUpdate}>
                    <div className="personalInfoContainer">
                        <input type="text" className="personalField" placeholder="First Name" ref={fname} />
                        <input type="text" className="personalField" placeholder="Last Name" ref={lname} />
                        <select className="personalSelectField" ref={city}>
                            <option disabled selected>Choose City</option>
                                {cities.map((city) =>
                                    <option key={city._id} style={{direction:"ltr"}} value={city.english_name}>{city.english_name}</option>
                                )};
                        </select>
                        <select className="personalSelectField" type="text" ref={gender} placeholder="Gender">
                            <option value="" disabled selected>Choose Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Refuse">Id Rather not say</option>
                        </select>
                    </div>
                        <button className="personalButton" type="submit">Update</button>
                </form>
                </div>
                <div className="profileEvents">
                    <h1 className="prfEventsTitle">My Events</h1>
                    {events.length > 0 ?
                     <div className="prfEventsContainer">
                        {events.map((event)=>
                        <div className="prfEventItem">
                            <span className="prfEventName">{event}</span>
                            <span className="prfRemoveEvent" onClick={()=> handleRemove(event)}>X</span>
                        </div>)}
                    </div> : <h2 className="prfEmptyEvents">You are not following any event</h2>}
                </div>
                    <button className="deleteUserButton" onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
    </>
  )
}

export default Profile