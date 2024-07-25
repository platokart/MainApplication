import React, { useState, useEffect } from 'react';

import './index.css';

const ChatNotificationItem = ({ chatNotificationDetails, onSelectChat,consultantId }) => {
    const [consultant,setConsultant]=useState([]);
    const fetchDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/consultant/pic/${consultantId}`);
            console.log(response)
            const data = await response.json();
            console.log("data:",data)
            // Merge dummy messages with fetched messages
            setConsultant(data.consultant[0]);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    

    useEffect(() => {
        // Fetch messages from the server
        fetchDetails();
    }, [consultantId]);
    let length=chatNotificationDetails.length;
    console.log(chatNotificationDetails[length-1]);
    return (
        <div className='chat-notification-item-card' onClick={onSelectChat}>
            <div className='chat-notifivation-profile-container'>
                <img
                    src={consultant?.basicdetails?.[0].photo}
                    className='chat-notification-profile-img'
                    alt='profile'
                />
                <div className='chat-notification-details-card'>
                    <h4 className='chat-notification-item-name'>{consultant?.basicdetails?.[0].firstName}</h4>
                    <p className='chat-notification-msg'>{chatNotificationDetails[length-1].message}</p>
                </div>
            </div>
            <div className='chat-notification-time-container'>
                {chatNotificationDetails.unheardNotifications > 0 && (
                        <div className='chat-notification-unheard-notification'>
                            {chatNotificationDetails.unheardNotifications}
                        </div>
                )}
                <p className={`${chatNotificationDetails.unheardNotifications > 0 ? 'chat-notification-sent-time' : 'chat-notification-msg'}`}>{chatNotificationDetails.time}</p>
            </div>
        </div>
    );
};

export default ChatNotificationItem;
