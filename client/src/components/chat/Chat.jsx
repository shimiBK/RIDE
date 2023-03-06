import React, { useEffect, useRef, useState,useContext } from 'react'
import "./chat.css"
import Message from '../message/Message';
import chatContext from "../../context/chatContext";
import axios from 'axios';
import { SERVER_URL } from '../../App';

const Chat = ({chatStatus, currentUser}) => {



  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const {currentChat} = useContext(chatContext);
  const scrollRef = useRef();

  console.log(currentChat);

    useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${SERVER_URL}/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
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

    try {
      const res = await axios.post(`${SERVER_URL}/api/messages/`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
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
          src="/assests/blank-profile.png"
          alt="pic"
        />
        <div className="reciverName">Joshua Jewish</div>
      </div>
      <div className="exitChat" onClick={()=> chatStatus(false)}>
        X
      </div>
    </div>
    <div className="chatMiddle">
      {messages.map((m) => (
        <div ref={scrollRef}>
          <Message message={m} own={m.sender === currentUser._id} />
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
  )
}

export default Chat