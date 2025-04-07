import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息..."
        className="message-input"
      />
      <button type="submit" className="send-button">
        发送
      </button>
    </form>
  );
};

export default ChatInput;