import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaArrowLeft } from "react-icons/fa";
import ChatNotificationItem from '../ChatNotificationItem';
import ChatNotificationItemDetailContainer from './../ChatNotificationItemDetailContainer/index';
import ChatMessageItem from '../ChatMessageItem';
import './index.css';

const dummyMessages = [];

const ChatScreen = () => {
    const [messages, setMessages] = useState(dummyMessages);
    const [selectedChat, setSelectedChat] = useState(null);

    const customerId = localStorage.getItem('email'); // Replace with actual customer ID or get it dynamically
    console.log(customerId);
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5000/video/${customerId}/my-chats`);
            console.log(response)
            const data = await response.json();
            console.log("data:",data)
            // Merge dummy messages with fetched messages
            const mergedMessages = [...dummyMessages, ...data.messages];
            setMessages(mergedMessages);
            console.log(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    

    useEffect(() => {
        // Fetch messages from the server
        fetchMessages();
    }, [customerId]);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        console.log(chat);
    };

    return (
        <div className='chat-screen-bg-container'>
            <div className='chat-notifications-container'>
                <div className='chat-notification-heading-container'>
                    <button className='chat-notification-back-arrow'><FaArrowLeft /></button>
                    <h3 className='chat-notification-heading'>My Chats</h3>
                </div>
                <div className="chat-notifications-card-container">
                    {messages.map(each => (
                        <ChatNotificationItem
                            key={each.id}
                            chatNotificationDetails={each.messages}
                            onSelectChat={() => handleChatSelect(each)}
                            consultantId={each.consultantId}
                        />
                    ))}
                </div>
            </div>
            <div className='chat-screen-notification-item-detail-container'>
                {selectedChat ? (
                    <div className='chat-screen-history'>
                        <ChatNotificationItemDetailContainer
                            chatProfileDetails={selectedChat}
                            consultantId={selectedChat?.consultantId}
                        />
                        <ChatMessageItem
                            messages={selectedChat.messages}
                        />
                    </div>
                    
                ) : (
                    <div className='chat-screen-history'>
                        <p>Select a chat to view messages</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatScreen;
