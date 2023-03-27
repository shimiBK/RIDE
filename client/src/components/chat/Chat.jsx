import React, { useEffect, useRef, useState, useContext } from "react";
import "./chat.css";
import Message from "../message/Message";
import chatContext from "../../context/chatContext";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../App";

const Chat = ({ chatStatus, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [addressee, setAddressee] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentChat } = useContext(chatContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", currentUser._id);
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser, socket]);

  useEffect(() => {
    const addresseeId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/user/${addresseeId}`);
        setAddressee(res.data);
      } catch (err) {
        console.log(err);
        toast.error("An error occurred"); 
      }
    };
    getUser();
  }, [currentUser, currentChat.members]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while loading messages"); 

      }
    };

    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const addresseId = addressee._id;

    //check if the addressee is online
    if (onlineUsers.some((u) => u.userId === addresseId)) {
      socket.emit("sendMessage", {
        senderId: currentUser._id,
        addresseId,
        text: newMessage,
      });
    }

    try {
      const res = await axios.post(`${SERVER_URL}/api/messages/`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while uploading a ride");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <div className="reciverDetails">
          <img
            className="messageImg"
            src={
              addressee.image ? addressee.image : "/assests/blank-profile.png"
            }
            alt="userImage"
          />
          <div className="reciverName">
            {addressee.firstName} {addressee.lastName}
          </div>
        </div>
        <div className="exitChat" onClick={() => chatStatus(false)}>
          X
        </div>
      </div>
      <div className="chatMiddle">
        {messages.map((m) => (
          <div ref={scrollRef}>
            <Message
              message={m}
              own={m.sender === currentUser._id}
              currentUser={currentUser}
              addressee={addressee}
            />
          </div>
        ))}
      </div>
      <div className="chatInput">
        <input
          className="chatMessageInput"
          placeholder="Write Something..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }}
        ></input>
      </div>
    </div>
  );
};

export default Chat;
