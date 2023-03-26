import "./message.css";
import React from "react";
import { format } from "timeago.js";

const Message = ({ message, own, currentUser, addressee }) => {
  return (
    <div className="message">
      <div className={own ? "messageTopOwn" : "messageTop"}>
        <img
          className="messageImg"
          src={
            own
              ? currentUser.image
                ? currentUser.image
                : "/assests/blank-profile.png"
              : addressee.image
              ? addressee.image
              : "/assests/blank-profile.png"
          }
          alt="pic"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
