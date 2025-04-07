import React from 'react';
import './ConversationList.css';

const ConversationList = ({ conversations, activeId, onSelect }) => {
  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h3>会话列表</h3>
      </div>
      <div className="conversation-items">
        {conversations.length === 0 ? (
          <div className="no-conversations">暂无历史会话</div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${conversation.id === activeId ? 'active' : ''}`}
              onClick={() => onSelect(conversation.id)}
            >
              <div className="conversation-title">{conversation.title}</div>
              <div className="conversation-preview">{conversation.lastMessage}</div>
              <div className="conversation-time">
                {formatTime(conversation.updatedAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 格式化时间的辅助函数
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return '昨天';
  } else if (diffDays < 7) {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    return `周${days[date.getDay()]}`;
  } else {
    return date.toLocaleDateString();
  }
};

export default ConversationList;