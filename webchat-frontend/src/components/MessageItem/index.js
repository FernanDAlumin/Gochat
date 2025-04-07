import React from 'react';
import './MessageItem.css';

const MessageItem = ({ message, isOwn }) => {
  return (
    <div className={`message-item ${isOwn ? 'own-message' : 'other-message'}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;