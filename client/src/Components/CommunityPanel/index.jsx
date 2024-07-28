import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popup from "reactjs-popup";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import ChatNotificationItemDetailContainer from "../ChatSystem/ChatNotificationItemDetailContainer";
import CommunityNavbar from '../ChatSystem/CommunityNavbar'
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import axios from 'axios';
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const functions = [
  { id: uuidv4(), func: "HR" },
  { id: uuidv4(), func: "Legal" },
  { id: uuidv4(), func: "Finance & Accounts/Taxation" },
  { id: uuidv4(), func: "Company Secretarial" },
  { id: uuidv4(), func: "Information Technology" },
  { id: uuidv4(), func: "Risk & Compliance" },
  { id: uuidv4(), func: "Sales and Marketing" },
  { id: uuidv4(), func: "Operations" },
  { id: uuidv4(), func: "Customer Service" },
  { id: uuidv4(), func: "Project Management" },
  { id: uuidv4(), func: "Others" },
];

const industries = [
  { id: uuidv4(), value: "Pharma / Healthcare", label: "Pharma / Healthcare" },
  { id: uuidv4(), value: "Start ups", label: "Start ups" },
  { id: uuidv4(), value: "Infrastructure", label: "Infrastructure" },
  { id: uuidv4(), value: "Retail and E comm", label: "Retail and E comm" },
  { id: uuidv4(), value: "Energy", label: "Energy" },
  { id: uuidv4(), value: "Real Estate", label: "Real Estate" },
  { id: uuidv4(), value: "Education", label: "Education" },
  { id: uuidv4(), value: "Manufacturing", label: "Manufacturing" },
  { id: uuidv4(), value: "Chemicals", label: "Chemicals" },
  { id: uuidv4(), value: "Aviation", label: "Aviation" },
  { id: uuidv4(), value: "Automotive", label: "Automotive" },
  { id: uuidv4(), value: "Banking, Insurance & NBFC", label: "Banking, Insurance & NBFC" },
  { id: uuidv4(), value: "Technology - Food Tech, EdTech, Fintech, HRTech", label: "Technology - Food Tech, EdTech, Fintech, HRTech" },
  { id: uuidv4(), value: "FMCG / Durables", label: "FMCG / Durables" },
  { id: uuidv4(), value: "Others", label: "Others" },
];

const expertises = [
  { id: uuidv4(), value: "Markets/Growth", label: "Markets/Growth" },
  { id: uuidv4(), value: "Change Management", label: "Change Management" },
  { id: uuidv4(), value: "Innovation", label: "Innovation" },
  { id: uuidv4(), value: "Lean / Six Sigma", label: "Lean / Six Sigma" },
  { id: uuidv4(), value: "Logistics & Supplychain", label: "Logistics & Supplychain" },
  { id: uuidv4(), value: "Talent Management and Organizational Development", label: "Talent Management and Organizational Development" },
  { id: uuidv4(), value: "HR lifecycel services", label: "HR lifecycel services" },
  { id: uuidv4(), value: "Leadership Development", label: "Leadership Development" },
  { id: uuidv4(), value: "Coaching", label: "Coaching" },
  { id: uuidv4(), value: "Enterprice architecture", label: "Enterprice architecture" },
  { id: uuidv4(), value: "Digital Transformation", label: "Digital Transformation" },
  { id: uuidv4(), value: "Cloud Consulting", label: "Cloud Consulting" },
  { id: uuidv4(), value: "Cyber Security", label: "Cyber Security" },
];

const IndustrySidebar = ({ onSelectionChange }) => {
  const [openDropdown, setOpenDropdown] = useState('industry');
  const [selectedCategory, setSelectedCategory] = useState('industry');
  const [selectedItem, setSelectedItem] = useState('Infrastructure');
 
  const handleDropDown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
    setSelectedCategory(section);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onSelectionChange(selectedCategory, item);
  };

  const renderDropdown = (section, title, items) => {
    const isOpen = openDropdown === section;
    return (
      <div className="dropdown-wrapper">
        <div
          className={`community-panel-heading-container drop-down-container ${isOpen ? 'dropdown-clicked' : ''}`}
          onClick={() => handleDropDown(section)}
        >
          <h1 className={isOpen ? 'dropdown-clicked-txt' : 'dropdown-txt'}>
            {title}
          </h1>
          {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </div>
        {isOpen && (
          <div className="industry-options-list">
            {items.map((item) => {
              const itemValue = item.label || item.func || item.value;
              return (
                <p
                  className={`community-options-con ${selectedItem === itemValue ? 'selected' : ''}`}
                  key={item.id}
                  onClick={() => handleItemClick(itemValue)}
                >
                  {itemValue}
                </p>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="chat-notification-heading-container community-header">
        <h3 className="chat-notification-heading community-header-heading">
          Community
        </h3>
      </div>
      {renderDropdown('industry', 'Industry', industries)}
      {renderDropdown('function', 'Function', functions)}
      {renderDropdown('expertise', 'Expertise', expertises)}
    </>
  );
};

const ImagePopup = ({ imageUrl, onClose }) => {
  const [isFullView, setIsFullView] = useState(false);

  return (
    <div className="image-popup-overlay" onClick={onClose}>
      <div 
        className={`image-popup-content ${isFullView ? 'full-view' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Enlarged" 
          onClick={() => setIsFullView(!isFullView)}
        />
      </div>
    </div>
  );
};

const ChatMessage = ({ id, name, message, time, imageUrl, photo, onReply, replyTo, isCurrentUser, onReplyClick, isUnread, onDelete }) => {
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState('');

  const handleImageClick = (url) => {
    setPopupImageUrl(url);
    setShowImagePopup(true);
  };

 
  const handleDeleteClick = (e, deleteType) => {
    e.stopPropagation(); // Prevent event from bubbling up
    onDelete(id, deleteType);
  };

  return (
    <div id={`message-${id}`} className={`chat-message-wrapper ${isCurrentUser ? 'current-user' : ''} ${isUnread ? 'unread' : ''}`}>
      {!isCurrentUser && (
        <img 
          className="profile-pic" 
          src={photo} 
          alt="Profile" 
          onClick={() => handleImageClick(photo)}
        />
      )}
      <div className={`chat-message ${isCurrentUser ? 'current-user' : ''}`}>
        <div className="chat-message-header">
          <h4 className="chat-message-name">@{name}</h4>
          <div className="chat-message-options">
          <Popup
          trigger={<button className="options-button"><IoMdMore /></button>}
          position="bottom right"
          nested
        >
          {close => (
            <div className="options-menu">
              <button onClick={() => onReply({ id, name, message })}>Reply</button>
              {!isCurrentUser && (
                <Popup
                  trigger={<button>Delete</button>}
                  position="right top"
                  nested
                >
                  {close => (
                    <div className="delete-options">
                      <button 
                        onClick={(e) => {
                          handleDeleteClick(e, 'for me');
                          close();
                        }}
                      >
                        Delete for me
                      </button>
                      <button 
                        onClick={(e) => {
                          handleDeleteClick(e, 'for everyone');
                          close();
                        }}
                      >
                        Delete for everyone
                      </button>
                    </div>
                  )}
                </Popup>
              )}
            </div>
          )}
        </Popup>
          </div>
        </div>
        <div className="chat-message-content">
          {replyTo && (
            <div className="reply-reference" onClick={() => onReplyClick(replyTo.id)}>
              <p className="reply-author">@{replyTo.name}</p>
              <p className="reply-text">{replyTo.message}</p>
            </div>
          )}
          {imageUrl && (
            <img 
              className="chat-media" 
              src={`http://localhost:5000/community/files/${imageUrl}`} 
              alt="Media" 
              onClick={() => handleImageClick(`http://localhost:5000/community/files/${imageUrl}`)}
            />
          )}
          <p className="chat-message-text">{message}</p>
        </div>
        <div className="chat-message-footer">
          <p className="chat-message-time">{time}</p>
        </div>
      </div>
      {isCurrentUser && (
        <img 
          className="profile-pic" 
          src={photo} 
          alt="Profile" 
          onClick={() => handleImageClick(photo)}
        />
      )}
      {showImagePopup && (
        <ImagePopup 
          imageUrl={popupImageUrl} 
          onClose={() => setShowImagePopup(false)} 
        />
      )}
    </div>
  );
};

const ChatSection = ({ selectedCategory, selectedItem }) => {
  const [msgInput, setMsgInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [consultantInfo, setConsultantInfo] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [lastViewedTime, setLastViewedTime] = useState(null);
  const [showNewMessagesDivider, setShowNewMessagesDivider] = useState(true);
  const messagesEndRef = useRef(null);
  const firstUnreadRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    fetchConsultantInfo();
    fetchLastViewedTime();
  }, [selectedCategory, selectedItem]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showNewMessagesDivider) {
      const timer = setTimeout(() => {
        setShowNewMessagesDivider(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showNewMessagesDivider]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchLastViewedTime = async () => {
    try {
      const consultantId = localStorage.getItem('id');
      const response = await fetch(`http://localhost:5000/community/lastviewed?consultantId=${consultantId}&category=${selectedCategory}&item=${selectedItem}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLastViewedTime(new Date(data.lastViewedTime));
    } catch (error) {
      console.error('Error fetching last viewed time:', error);
    }
  };

  const updateLastViewedTime = async () => {
    try {
      const consultantId = localStorage.getItem('id');
      await fetch('http://localhost:5000/community/lastviewed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consultantId,
          category: selectedCategory,
          item: selectedItem,
          lastViewedTime: new Date().toISOString()
        }),
      });
      setLastViewedTime(new Date());
    } catch (error) {
      console.error('Error updating last viewed time:', error);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight === scrollHeight) {
      updateLastViewedTime();
    }
  };

  const fetchConsultantInfo = async () => {
    try {
      const consultantId = localStorage.getItem('id');
      const email = localStorage.getItem('consultantEmail');
      const response = await fetch(`http://localhost:5000/consultant/consultants/${consultantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Email': email
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setConsultantInfo(data);
    } catch (error) {
      console.error('Error fetching consultant info:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const consultantId = localStorage.getItem('id');
      const response = await fetch(`http://localhost:5000/community/messages?category=${selectedCategory}&item=${selectedItem}&consultantId=${consultantId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const sortedMessages = data.data.messages
        .filter(msg => !msg.deletedFor.includes(consultantId))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInput(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setFileInput(null);
    setImagePreview(null);
  };

  const handleDelete = async (messageId, deleteType) => {
    console.log(`Attempting to delete message ${messageId} ${deleteType}`);
    try {
      const consultantId = localStorage.getItem('id');
      const response = await fetch('http://localhost:5000/community/messages/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          consultantId,
          deleteType,
          category: selectedCategory,
          item: selectedItem
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Delete response:', data);
  
      if (deleteType === 'for everyone') {
        setMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageId));
      } else {
        setMessages(prevMessages => prevMessages.map(msg => 
          msg._id === messageId ? { ...msg, deletedForMe: true } : msg
        ));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  const handleSendMessage = async () => {
    try {
      const consultantId = localStorage.getItem('id');
      let base64Image = null;
  
      if (fileInput) {
        base64Image = await convertToBase64(fileInput);
      }
  
      const consultantPhoto = consultantInfo?.basicdetails?.[0]?.photo;
      
      const messageData = {
        consultantId,
        category: selectedCategory,
        item: selectedItem,
        message: msgInput,
        imagefile: base64Image || null,
        name: consultantInfo?.basicdetails?.[0]?.firstName || 'Anonymous',
        photo: consultantPhoto,
        replyTo: replyingTo ? {
          id:  replyingTo.id,
          name: replyingTo.name,
          message: replyingTo.message
        } : null
      };
      
      const response = await fetch('http://localhost:5000/community/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      setMessages(prevMessages => [...prevMessages, data.data.message]);
  
      setMsgInput("");
      setFileInput(null);
      setImagePreview(null);
      setReplyingTo(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const currentUserId = localStorage.getItem('id');

  const handleReplyClick = (messageId) => {
    const element = document.getElementById(`message-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 2000);
    }
  };

  return (
    <div className="chat-screen-notification-item-detail-container">
      <CommunityNavbar selectedCategory={selectedCategory} selectedItem={selectedItem} />
      <div className="chat-screen-history" onScroll={handleScroll}>
        {messages.map((message, index) => {
          const isUnread = new Date(message.createdAt) > lastViewedTime;
          const isFirstUnread = isUnread && index === messages.findIndex(m => new Date(m.createdAt) > lastViewedTime);
          if (message.deletedForMe) {
            return (
              <div key={message._id} className="deleted-message">
                This message was deleted
              </div>
            );
          }
          return (
            <React.Fragment key={message._id}>
              {isFirstUnread && showNewMessagesDivider && (
                <div className="unread-divider" ref={firstUnreadRef}>
                  New Messages
                </div>
              )}
              <ChatMessage
                id={message._id}
                name={message.name}
                message={message.message}
                photo={message.photo}
                time={new Date(message.createdAt).toLocaleTimeString()}
                imageUrl={message.imagefile}
                onReply={handleReply}
                replyTo={message.replyTo}
                isCurrentUser={!(message.consultant === currentUserId)}
                onReplyClick={handleReplyClick}
                isUnread={isUnread}
                onDelete={handleDelete}
              />
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-screen-msg-input-container">
        {replyingTo && (
          <div className="replying-to">
            Replying to @{replyingTo.name}. <button onClick={() => setReplyingTo(null)}>Cancel</button>
          </div>
        )}
        <button className="chat-screen-msg-btn" onClick={() => document.getElementById('file-input').click()}>
          <FaPlus />
        </button>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Preview" className="image-preview" />
            <button onClick={clearImage} className="clear-image-btn">X</button>
          </div>
        )}
        <input
          type="text"
          placeholder={replyingTo ? "Type your reply..." : "Type Something here..."}
          onChange={(e) => setMsgInput(e.target.value)}
          value={msgInput}
          className="chat-screen-input-container"
        />
        <button className="chat-screen-msg-btn" onClick={handleSendMessage}>
          <LuSendHorizonal />
        </button>
      </div>
    </div>
  );
};



const CommunityPanel = () => {
  const [selectedItems, setSelectedItems] = useState({
    category: 'industry',
    item: 'Infrastructure'
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectionChange = (category, item) => {
    setSelectedItems({ category, item });
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="app-container">
      <button className="menu-button" onClick={toggleSidebar}>
        Menu
      </button>
      <div className={`community-panels-container ${isSidebarOpen ? 'open' : ''}`}>
        <IndustrySidebar onSelectionChange={handleSelectionChange} />
      </div>
      <ChatSection selectedCategory={selectedItems.category} selectedItem={selectedItems.item} />
    </div>
  );
};

export default CommunityPanel;