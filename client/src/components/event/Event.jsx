import "./event.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useContext } from "react";
import userContext from "../../context/userContext";



const Event = (props) => {

    const [isHover,setIsHover] = useState(false);
    const {eventName , eventTitle ,eventLocation , eventDate , ToastCotainer } = props;
    const ToastContainer = ToastCotainer;
    const path = `/rides/${eventName}`;
    const imagePath = `assests/${eventName}.jpg`
    const {user} = useContext(userContext);


    const handleFollow = async (eventName) =>{
      
        const list = user.sendMails;
        if(!list.includes(eventName))
        {
          list.push(eventName);
          const addEvent = {
            sendMails:list
          }
          try {
            await axios.put(`/user/${user._id}`,addEvent);
            toast.success("Event was successfully added to your followings");
            
          } catch (error) {
            console.log(error);
          }
        }else{
          toast.info("You already follow this event");
        }
      };

  return (
    <>
    <div className="eventItem" onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    <Link to={path}>
      <img src={imagePath} alt="" className="showImg"/>
    </Link>
    <div className="eventTitle">
     {!isHover && <h1 className="eventName">{eventTitle}</h1>}
  </div>
  <div className="subscribe">
    {user && <h1 onClick={ () => handleFollow(eventName)}>+</h1>}
  </div>
  {isHover &&
   <div className="eventTitleHover">
        <h1 className="eventName">{eventTitle}</h1>
        <h3 className="eventLocation">{eventLocation}</h3>
        <h3 className="eventDate">{eventDate}</h3>
  </div>}
</div>
    </>
  )
}

export default Event