import "./conversation.css"
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from "../../App";
import axios from 'axios';


const Conversation = ({conversation , currentUser}) => {

    const [user,setUser] = useState(null);

    
    useEffect(()=>{

        const reciverID = conversation.members.find((member)=> member !== currentUser?._id);

        
        const getUser = async () =>{

            try {
                const res = await axios.get(`${SERVER_URL}/api/user/${reciverID}`)
                setUser(res.data);
                
            } catch (error) {

                console.log(error);
                
            }
        }
        getUser();

    },[conversation,currentUser])




  return (
        <div className="conversationBox">
        <img
            src={user?.image? user.image : "/assests/blank-profile.png"}
            alt="profilePic"
            className="conProfilePic"
        />
            <div className="messageDetailsContainer">
            <span className="addresseeName">{user?.firstName + " " + user?.lastName}</span>
        </div>
        </div>

  )
}

export default Conversation
