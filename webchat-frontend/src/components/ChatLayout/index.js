import React, { useState, useEffect, useRef } from 'react';
import ConversationList from '../ConversationList';
import ChatWindow from '../ChatWindow';
import './ChatLayout.css';

const ChatLayout = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(25); // 初始宽度百分比
  const resizer = useRef(null);
  const layout = useRef(null);

  // 拖动调整宽度的功能
  const startResize = (e) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const doDrag = (e) => {
      if (!layout.current) return;

      const layoutWidth = layout.current.offsetWidth;
      const newWidth = (startWidth + (e.clientX - startX) / layoutWidth * 100);

      // 限制最小和最大宽度
      const clampedWidth = Math.min(Math.max(newWidth, 15), 50);
      setSidebarWidth(clampedWidth);
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  // 从本地存储加载会话
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations);
      setConversations(parsedConversations);

      // 如果有会话，设置最近的一个为活动会话
      if (parsedConversations.length > 0) {
        const sortedConversations = [...parsedConversations].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setActiveConversationId(sortedConversations[0].id);
      }
    }
  }, []);

  // 当活动会话改变时，加载该会话的消息
  useEffect(() => {
    if (activeConversationId) {
      const savedMessages = localStorage.getItem(`messages_${activeConversationId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  // 保存消息到本地存储
  useEffect(() => {
    if (activeConversationId && messages.length > 0) {
      localStorage.setItem(`messages_${activeConversationId}`, JSON.stringify(messages));

      // 更新会话列表中的最后一条消息和更新时间
      const updatedConversations = conversations.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            lastMessage: messages[messages.length - 1].text.substring(0, 30),
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    }
  }, [messages, activeConversationId, conversations]);

  // 创建新会话
  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: `会话 ${conversations.length + 1}`,
      lastMessage: '新建会话',
      updatedAt: new Date().toISOString()
    };

    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    setActiveConversationId(newId);
    setMessages([]);
  };

  // 处理发送消息
  const handleSendMessage = (text) => {
    // 如果没有活动会话，创建一个新的
    if (!activeConversationId) {
      createNewConversation();
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
  };

  return (
    <div className="chat-layout" ref={layout}>
      <div className="sidebar" style={{ width: `${sidebarWidth}%` }}>
        <div className="new-conversation-button" onClick={createNewConversation}>
          新建会话
        </div>
        <ConversationList
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={setActiveConversationId}
        />
      </div>
      <div
        className="resizer"
        ref={resizer}
        onMouseDown={startResize}
      />
      <div className="main-content">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          conversationTitle={
            activeConversationId
              ? conversations.find(c => c.id === activeConversationId)?.title
              : '新会话'
          }
        />
      </div>
    </div>
  );
};

export default ChatLayout;