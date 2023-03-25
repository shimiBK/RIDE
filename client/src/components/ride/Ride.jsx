import "./ride.css"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import userContext from "../../context/userContext";
import { useState, useContext } from "react";
import { convertTitle } from "../../utils/utils";
import chatContext from "../../context/chatContext";
import { SERVER_URL } from "../../App";
import axios from 'axios';


const Ride = ({ride,myRides,getRide,cancelDel,changeEditRide,containerStyle,chatStatus}) => {

    const [editMenu,setEditMenu] = useState(false);
    const [conversation,setConversation] = useState(null);
    const [loading,setLoading] = useState(false);
    const [addresseeId,setAddresseeId] = useState("");
    const {currentChat,setCurrentChat } = useContext(chatContext);
    const { user } = useContext(userContext);


const handleSendMessage = async (addresseeId) => {

    try {
        setLoading(true);
        const res = await axios.get(`${SERVER_URL}/api/conversation/find/${addresseeId}/${user?._id}`);
        setCurrentChat(res.data);
        setLoading(false)
        chatStatus(true);


    } catch (error) {
        console.log(error);
        setLoading(false);
        
    }

}

  return (
    <div className="rideItem" >
        <div className={containerStyle}>
            {myRides &&
             <div className="infoItem">
                <div className="myRideEventName">{convertTitle(ride.eventName)}</div>
            </div>}
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
           {myRides &&
            <div className="editWrapper">
                <span className="editIcon">
                    <MoreVertIcon onClick={()=> setEditMenu(true)}/>
                 </span>
                {editMenu &&
                <div className="editList">
                    <div className="editButtonContainer">
                    <button className="editListItem" onClick={()=> {changeEditRide(true);getRide(ride);setEditMenu(false)}}> <EditIcon/>Edit</button>
                    <button className="editListItem" onClick={()=> {cancelDel(true);getRide(ride);setEditMenu(false)}}><DeleteIcon/> Delete</button>  
                    </div>
                    <span className="editListClose" onClick={() => {setEditMenu(false)}}>X</span>
                </div>}
            </div>}
        <span className="genderIcon">
            {ride.userGender === "Male" && <MaleIcon/>}
            {ride.userGender === "Female" && <FemaleIcon style={{color:'#f15bb5'}}/> }
         </span>
        <button className="facebookBtn" onClick={()=> {handleSendMessage(ride.userID);
}}>{loading ? "Loading" : "SEND MESSAGE"}</button>
        </div>
</div>)
}

export default Ride