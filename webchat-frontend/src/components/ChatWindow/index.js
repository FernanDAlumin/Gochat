import React, { useRef, useEffect } from 'react';
import MessageList from '../MessageList';
import ChatInput from '../ChatInput';
import './ChatWindow.css';

const ChatWindow = ({ messages, onSendMessage, conversationTitle }) => {
  const messagesEndRef = useRef(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{conversationTitle || 'WebChat'}</h2>
      </div>
      <MessageList messages={messages} />
      <div ref={messagesEndRef} />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;