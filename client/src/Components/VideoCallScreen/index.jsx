import React, { useState } from "react";
import Popup from 'reactjs-popup'

import { MdOutlineCallEnd, MdSettings } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { RiRecordCircleFill } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import {
  VideoCallBgContainer,
  VideoCallHeading,
  VideoCallBgCard,
  VideoCallingMainContainer,
  VideoCallBgImageContainer,
  VideoCallContentsContainer,
  VideoCallingContentCard,
  VideoCallContent,
  VideoOppositeImage,
  VideoCallFeaturesIcons,
  VideoCallFeaturesBtn,
  VideoCallCutBtn,
  ChatContainer,
  MsgInputContainer,
  MsgInput,
} from "./styledComponents.js";


import "./index.css";




const VideoCallScreen = () => {
  const [msgbtnClicked, setMsgBtnClicked] = useState(false);
  const [videoBtnClicked, setVideoBtnClicked] = useState(false);
  const [microphoneBtnClicked, setMicriphoneBtnClicked] = useState(false);
  const [settingsBtnClicked, setSettingsBtnClicked] = useState(false);
  const [msgInput, setMsgInput] = useState("");

  //settings popup
  // const ReactPopUp = () => (
    
  //  )


  return (
    <VideoCallBgContainer>
      <VideoCallHeading>Platokart</VideoCallHeading>
      <VideoCallBgCard msgbtnClicked={msgbtnClicked}>
        <VideoCallingMainContainer msgbtnClicked={msgbtnClicked}>
          <VideoCallBgImageContainer bgimage="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716796219/b021d479ae8ce00e16354e3f83ecee54_mnndqv.jpg">
            <VideoCallContentsContainer>
              <div className="video-call-content-card">
                <p className="video-call-content-desc">
                  <button className="recording-btn">
                    <RiRecordCircleFill />
                  </button>{" "}
                  12.2.3.3
                </p>
              </div>
              <div className="video-call-content-card">
                <p className="video-call-content-desc">John Doe</p>
              </div>
            </VideoCallContentsContainer>
            <VideoOppositeImage
              alt="opposite-image"
              src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716795479/6942d6fc31d28f5cd28118ba6ce9e55c_gkygja.jpg"
            />
          </VideoCallBgImageContainer>
          <VideoCallFeaturesIcons>
            <VideoCallFeaturesBtn
              className="video-call-features-btn"
              onClick={() => setMsgBtnClicked(!msgbtnClicked)}
              btnClicked={msgbtnClicked}
            >
              <FaMessage />
            </VideoCallFeaturesBtn>
            <VideoCallFeaturesBtn
              className="video-call-features-btn"
              onClick={() => setVideoBtnClicked(!videoBtnClicked)}
              btnClicked={videoBtnClicked}
            >
              <IoMdVideocam />
            </VideoCallFeaturesBtn>
            <VideoCallCutBtn className="video-call-features-btn video-call-cut-btn">
              <MdOutlineCallEnd />
            </VideoCallCutBtn>
            <VideoCallFeaturesBtn
              className="video-call-features-btn"
              onClick={() => setMicriphoneBtnClicked(!microphoneBtnClicked)}
              btnClicked={microphoneBtnClicked}
            >
              <FaMicrophone />
            </VideoCallFeaturesBtn>
            {/**settings btn */}
              <Popup
                trigger={
                  <VideoCallFeaturesBtn
                      className="video-call-features-btn"
                      
                    >
                  <MdSettings />
                </VideoCallFeaturesBtn>
                }
                position="top right"
                onClick={() => setSettingsBtnClicked(!settingsBtnClicked)}
                btnClicked={settingsBtnClicked}
              >
                <div className="popup-body">
                  <li className="popup-list-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20.9733 4H11.0267L4 11.0267V20.9733L11.0267 28H20.9733L28 20.9733V11.0267L20.9733 4ZM25.3333 19.8667L19.8667 25.3333H12.1333L6.66667 19.8667V12.1333L12.1333 6.66667H19.8667L25.3333 12.1333V19.8667Z" fill="black"/>
                    <path d="M15.9993 22.6667C16.7357 22.6667 17.3327 22.0697 17.3327 21.3333C17.3327 20.597 16.7357 20 15.9993 20C15.263 20 14.666 20.597 14.666 21.3333C14.666 22.0697 15.263 22.6667 15.9993 22.6667Z" fill="black"/>
                    <path d="M14.666 9.33325H17.3327V18.6666H14.666V9.33325Z" fill="black"/>
                    </svg>
                    <p className="popup-list-content">Report abuse</p>
                  </li>
                  <li className="popup-list-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M7.43402 7.46008C6.9417 7.95928 6.66579 8.63229 6.66602 9.33341V25.3334C6.66602 26.0407 6.94697 26.7189 7.44706 27.219C7.94716 27.7191 8.62544 28.0001 9.33268 28.0001H22.666C23.3733 28.0001 24.0515 27.7191 24.5516 27.219C25.0517 26.7189 25.3327 26.0407 25.3327 25.3334M25.3327 20.0001V9.33341C25.3327 8.62617 25.0517 7.94789 24.5516 7.4478C24.0515 6.9477 23.3733 6.66675 22.666 6.66675H19.9993" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 6.66667C12 5.95942 12.281 5.28115 12.781 4.78105C13.2811 4.28095 13.9594 4 14.6667 4H17.3333C18.0406 4 18.7189 4.28095 19.219 4.78105C19.719 5.28115 20 5.95942 20 6.66667C20 7.37391 19.719 8.05219 19.219 8.55229C18.7189 9.05238 18.0406 9.33333 17.3333 9.33333H14.6667M4 4L28 28" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className="popup-list-content">Report an issue</p>
                  </li>
                </div>
              </Popup>
          </VideoCallFeaturesIcons>
        </VideoCallingMainContainer>
        {msgbtnClicked && (
          <ChatContainer msgbtnClicked={msgbtnClicked}>
            <MsgInputContainer>
              <button className="chat-btns chat-btn-1">
                <GrGallery />
              </button>
              <MsgInput
                type="text"
                placeholder="Type Something here..."
                onChange={(e) => setMsgInput(e.target.value)}
                value={msgInput}
              />
              <button className="chat-btns sent-btn">
                <LuSendHorizonal />
              </button>
            </MsgInputContainer>
          </ChatContainer>
        )}
      </VideoCallBgCard>
    </VideoCallBgContainer>
  );
};

export default VideoCallScreen;
