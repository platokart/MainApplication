import React, { useState ,useEffect} from "react";
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
  {
    id: uuidv4(),
    func: "HR",
  },
  {
    id: uuidv4(),
    func: "Legal",
  },
  {
    id: uuidv4(),
    func: "Finance & Accounts/Taxation",
  },
  {
    id: uuidv4(),
    func: "Company Secretarial",
  },
  {
    id: uuidv4(),
    func: "Information Technology",
  },
  {
    id: uuidv4(),
    func: "Risk & Compliance",
  },
  {
    id: uuidv4(),
    func: "Sales and Marketing",
  },
  {
    id: uuidv4(),
    func: "Operations",
  },
  {
    id: uuidv4(),
    func: "Customer Service",
  },
  {
    id: uuidv4(),
    func: "Project Management",
  },
  {
    id: uuidv4(),
    func: "Others",
  },
];

const industries = [
  {
    id: uuidv4(),
    value: "Pharma / Healthcare",
    label: "Pharma / Healthcare",
  },
  {
    id: uuidv4(),
    value: "Start ups",
    label: "Start ups",
  },
  {
    id: uuidv4(),
    value: "Infrastructure",
    label: "Infrastructure",
  },
  {
    id: uuidv4(),
    value: "Retail and E comm",
    label: "Retail and E comm",
  },
  {
    id: uuidv4(),
    value: "Energy",
    label: "Energy",
  },
  {
    id: uuidv4(),
    value: "Real Estate",
    label: "Real Estate",
  },
  {
    id: uuidv4(),
    value: "Education",
    label: "Education",
  },
  {
    id: uuidv4(),
    value: "Manufacturing",
    label: "Manufacturing",
  },
  {
    id: uuidv4(),
    value: "Chemicals",
    label: "Chemicals",
  },
  {
    id: uuidv4(),
    value: "Aviation",
    label: "Aviation",
  },
  {
    id: uuidv4(),
    value: "Automotive",
    label: "Automotive",
  },
  {
    id: uuidv4(),
    value: "Banking, Insurance & NBFC",
    label: "Banking, Insurance & NBFC",
  },
  {
    id: uuidv4(),
    value: "Technology - Food Tech, EdTech, Fintech, HRTech",
    label: "Technology - Food Tech, EdTech, Fintech, HRTech",
  },
  {
    id: uuidv4(),
    value: "FMCG / Durables",
    label: "FMCG / Durables",
  },
  {
    id: uuidv4(),
    value: "Others",
    label: "Others",
  },
];

const expertises = [
  {
    id: uuidv4(),
    value: "Markets/Growth",
    label: "Markets/Growth",
  },
  {
    id: uuidv4(),
    value: "Change Management",
    label: "Change Management",
  },
  {
    id: uuidv4(),
    value: "Innovation",
    label: "Innovation",
  },
  {
    id: uuidv4(),
    value: "Lean / Six Sigma",
    label: "Lean / Six Sigma",
  },
  {
    id: uuidv4(),
    value: "Logistics & Supplychain",
    label: "Logistics & Supplychain",
  },
  {
    id: uuidv4(),
    value: "Talent Management and Organizational Development",
    label: "Talent Management and Organizational Development",
  },
  {
    id: uuidv4(),
    value: "HR lifecycel services",
    label: "HR lifecycel services",
  },
  {
    id: uuidv4(),
    value: "Leadership Development",
    label: "Leadership Development",
  },
  {
    id: uuidv4(),
    value: "Coaching",
    label: "Coaching",
  },
  {
    id: uuidv4(),
    value: "Enterprice architecture",
    label: "Enterprice architecture",
  },
  {
    id: uuidv4(),
    value: "Digital Transformation",
    label: "Digital Transformation",
  },
  {
    id: uuidv4(),
    value: "Cloud Consulting",
    label: "Cloud Consulting",
  },
  {
    id: uuidv4(),
    value: "Cyber Security",
    label: "Cyber Security",
  },
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
    <div className="community-panels-container community-bg-con">
      <div className="chat-notification-heading-container community-header">
        <button className="chat-notification-back-arrow">
          <FaArrowLeft />
        </button>
        <h3 className="chat-notification-heading community-header-heading">
          Community
        </h3>
      </div>
      {renderDropdown('industry', 'Industry', industries)}
      {renderDropdown('function', 'Function', functions)}
      {renderDropdown('expertise', 'Expertise', expertises)}
    </div>
  );
};

const ChatMessage = ({key, name, message, time, imageUrl ,photo}) => (

  <div className="chat-message-wrapper">
      <Popup
      trigger={
        <img
          className="profile-pic"
          src={photo}
          alt="Profile"
        />
      }
      position="bottom left"
    >
      {/* <div className="popup-body">
        <li className="popup-list-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16" fill="none">
            <g clip-path="url(#clip0_269_7292)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6654 6.00065C10.6654 6.7079 10.3844 7.38617 9.88432 7.88627C9.38422 8.38637 8.70594 8.66732 7.9987 8.66732C7.29145 8.66732 6.61318 8.38637 6.11308 7.88627C5.61298 7.38617 5.33203 6.7079 5.33203 6.00065C5.33203 5.29341 5.61298 4.61513 6.11308 4.11503C6.61318 3.61494 7.29145 3.33398 7.9987 3.33398C8.70594 3.33398 9.38422 3.61494 9.88432 4.11503C10.3844 4.61513 10.6654 5.29341 10.6654 6.00065ZM9.33203 6.00065C9.33203 6.35427 9.19156 6.69341 8.94151 6.94346C8.69146 7.19351 8.35232 7.33398 7.9987 7.33398C7.64508 7.33398 7.30594 7.19351 7.05589 6.94346C6.80584 6.69341 6.66536 6.35427 6.66536 6.00065C6.66536 5.64703 6.80584 5.30789 7.05589 5.05784C7.30594 4.80779 7.64508 4.66732 7.9987 4.66732C8.35232 4.66732 8.69146 4.80779 8.94151 5.05784C9.19156 5.30789 9.33203 5.64703 9.33203 6.00065Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99935 0.666992C3.94935 0.666992 0.666016 3.95033 0.666016 8.00033C0.666016 12.0503 3.94935 15.3337 7.99935 15.3337C12.0493 15.3337 15.3327 12.0503 15.3327 8.00033C15.3327 3.95033 12.0493 0.666992 7.99935 0.666992ZM1.99935 8.00033C1.99935 9.39366 2.47468 10.6763 3.27135 11.695C3.83084 10.9603 4.55262 10.3648 5.3803 9.9552C6.20799 9.54558 7.11918 9.33286 8.04268 9.33366C8.95424 9.33279 9.85396 9.54001 10.6733 9.93951C11.4926 10.339 12.21 10.9203 12.7707 11.639C13.3483 10.8814 13.7372 9.99714 13.9053 9.05939C14.0733 8.12163 14.0156 7.15735 13.737 6.24632C13.4584 5.33528 12.9668 4.50369 12.303 3.82035C11.6392 3.13701 10.8222 2.62157 9.9196 2.31666C9.01702 2.01176 8.05481 1.92617 7.11259 2.06697C6.17036 2.20778 5.27521 2.57092 4.50119 3.12636C3.72718 3.6818 3.09656 4.41357 2.6615 5.26112C2.22645 6.10867 1.99947 7.04764 1.99935 8.00033ZM7.99935 14.0003C6.62198 14.0024 5.28619 13.5286 4.21802 12.659C4.64797 12.0435 5.22024 11.5409 5.88614 11.1941C6.55205 10.8473 7.29187 10.6665 8.04268 10.667C8.78412 10.6664 9.51501 10.8427 10.1746 11.1813C10.8343 11.5198 11.4036 12.0109 11.8353 12.6137C10.7589 13.5115 9.40107 14.0023 7.99935 14.0003Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_269_7292">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
         
          <p className="popup-list-content">Visit Profile</p>
          
        </li>
      </div> */}
    </Popup>
    <div className="chat-message">
      <div className="chat-message-header">
        <div className="chat-message-user">
          <div className="chat-message-info">
            <h4 className="chat-message-name">@{name}</h4>
          </div>
        </div>
      </div>
      <div className="chat-message-content">
        {imageUrl && <img className="chat-media" src={`http://localhost:5000/community/files/${imageUrl}`} alt="Media" />}
        <p className="chat-message-text">{message}</p>
      </div>
      <div className="chat-message-footer">
        <p className="chat-message-time">{time}</p>
      </div>
    </div>
  </div>
);

const ChatSection = ({ selectedCategory, selectedItem }) => {
  const [msgInput, setMsgInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [consultantInfo, setConsultantInfo] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [base64Photo, setBase64Photo] = useState("");

  useEffect(() => {
    fetchMessages();
    fetchConsultantInfo();
  }, [selectedCategory, selectedItem]);

  const fetchConsultantInfo = async () => {
    try {
      const consultantId = localStorage.getItem('id');
      const email = localStorage.getItem('email');
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
      const response = await fetch(`http://localhost:5000/community/messages?category=${selectedCategory}&item=${selectedItem}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const sortedMessages = data.data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
        imagefile: base64Image,
        name: consultantInfo?.basicdetails?.[0]?.firstName || 'Anonymous',
        photo: consultantPhoto
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

  return (
    <div className="chat-screen-notification-item-detail-container">
      <CommunityNavbar selectedCategory={selectedCategory} selectedItem={selectedItem} />
      <div className="chat-screen-history">
        {messages.map((message) => (
          <ChatMessage
            key={message._id}
            name={message.name}
            message={message.message}
            photo={message.photo}
            time={new Date(message.createdAt).toLocaleTimeString()}
            imageUrl={message.imagefile}
          />
        ))}
      </div>
      <div className="chat-screen-msg-input-container">
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
          placeholder="Type Something here..."
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
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({
    category: 'industry',
    item: 'Infrastructure'
  });

  const handleSelectionChange = (category, item) => {
    setSelectedItems({ category, item });
  };

  return (
    <div className="app-container">
      <IndustrySidebar onSelectionChange={handleSelectionChange} />
      <ChatSection selectedCategory={selectedItems.category} selectedItem={selectedItems.item} />
    </div>
  );
};

export default CommunityPanel;