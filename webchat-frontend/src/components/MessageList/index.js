import React from 'react';
import MessageItem from '../MessageItem';
import './MessageList.css';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="no-messages">开始聊天吧!</div>
      ) : (
        messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            isOwn={message.sender === 'user'}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;