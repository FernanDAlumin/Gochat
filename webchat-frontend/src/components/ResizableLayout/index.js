import React, { useState, useRef } from 'react';
import './ResizableLayout.css';

const ResizableLayout = ({ left, right }) => {
  const [sidebarWidth, setSidebarWidth] = useState(25); // 初始宽度百分比
  const resizer = useRef(null);
  const layout = useRef(null);
  
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
  
  return (
    <div className="resizable-layout" ref={layout}>
      <div className="resizable-sidebar" style={{ width: `${sidebarWidth}%` }}>
        {left}
      </div>
      <div 
        className="resizer"
        ref={resizer}
        onMouseDown={startResize}
      />
      <div className="resizable-content">
        {right}
      </div>
    </div>
  );
};

export default ResizableLayout;