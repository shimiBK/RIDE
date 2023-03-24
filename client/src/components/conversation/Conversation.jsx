import "./conversation.css";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../App";
import axios from "axios";
import Loading from "../loading/Loading";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reciverID = conversation.members.find(
      (member) => member !== currentUser?._id
    );

    const getUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${SERVER_URL}/api/user/${reciverID}`);
        setUser(res.data);
         setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  const renderConversations = (
    <div className="conversationsItemsContainer">
      <img
        src={user?.image ? user.image : "/assests/blank-profile.png"}
        alt="profilePic"
        className="conProfilePic"
      />
      <div className="messageDetailsContainer">
        <span className="addresseeName">
          {user?.firstName + " " + user?.lastName}
        </span>
      </div>
    </div>
  );

  return (
    <div className="conversationBox">
      {loading ? <Loading size="15px" color="black" /> : renderConversations}
    </div>
  );
};

export default Conversation;
