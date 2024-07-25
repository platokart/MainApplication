import React from 'react'
import './index.css'
const ChatMessageItem = ({messages}) => {
  console.log(messages);
  return (
    <div className='chat-screen-history'>
        {messages.map((msg, index) => (
          <div   key={index} className={`message ${msg.sender}`}>
            <p className="message-content">{msg.message}</p>
            <span className="message-timestamp">{msg.timestamp}</span>
          </div>
        ))}
    </div>
  )
}

export default ChatMessageItem