import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import Popup from "reactjs-popup";
import {useParams,useNavigate} from 'react-router-dom'
//video call end,setting btn
import { MdOutlineCallEnd, MdSettings } from "react-icons/md";
//video cam,call initialte btn
import { IoMdVideocam, IoMdCall } from "react-icons/io";
//microphone on btn
import { FaMicrophone, FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
//messae btn
import { FaMessage } from "react-icons/fa6";
import { RiRecordCircleFill } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import ReportAbusePage from "../ReportAbuse";
import ReportIssuePage from './../ReportIssuePage/index';


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
  VideoContainer,
  VideoCallFeaturesIcons,
  VideoCallFeaturesBtn,
  VideoCallCutBtn,
  VideoCallBtn,
  ChatContainer,
  MsgInputContainer,
  MsgInput,
} from "../VideoCallScreen/styledComponents";

import "./index.css";

import process from "process/browser";
const VideoCallScreenC = () => {
  const {customerEmail,consultantEmail}=useParams();
  const socket = useRef(io.connect("http://localhost:5001")).current;
  //msg btn clicked
  const navigate=useNavigate();
  const [isClicked, setClicked] = useState(false);
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [settingsBtnClicked, setSettingsBtnClicked] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    if (consultantEmail) {
      setIdToCall(consultantEmail);
    }
  }, [consultantEmail]);

  useEffect(() => {
    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: data.from, message: data.message },
      ]);
    });

    return () => {
      socket.off("me");
      socket.off("callUser");
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    if (customerEmail) {
      socket.emit("register", { email: customerEmail });
    }
  }, [customerEmail, socket]);

  const callUser = () => {
    // setClicked(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }

        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: currentStream,
        });

        peer.on("signal", (data) => {
          socket.emit("callUser", {
            userToCall: idToCall,
            signalData: data,
            from: me,
            name: name,
          });
        });

        peer.on("stream", (userStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = userStream;
          }
        });

        peer.on("close", () => {
          console.log("Peer connection closed");
        });

        peer.on("error", (err) => {
          console.error("Peer connection error:", err);
        });

        socket.on("callAccepted", (signal) => {
          setCallAccepted(true);
          peer.signal(signal);
        });

        connectionRef.current = peer;
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };

  const leaveCall = () => {
    setCallEnded(true);
    navigate('/accept-consultation');
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.reload();
     // Optionally reload to reset state
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        message: message,
        to: caller || idToCall,
        from: me,
        email: customerEmail,
        consultantEmail: consultantEmail,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: me, message: message },
      ]);
      setMessage("");
    }
  };

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prevMuted) => !prevMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOn((prevVideoOn) => !prevVideoOn);
    }
  };

  const videoContainerClass = isClicked ? 'is-clicked-video-container' : 'video-container'


  return (
    <VideoCallBgContainer>
      <VideoCallHeading>Platokart</VideoCallHeading>
      <VideoCallBgCard msgbtnClicked={isClicked}>
        <VideoCallingMainContainer msgbtnClicked={isClicked}>
            {/** video container */}
            <div className={`${videoContainerClass}`}>
            {/* This ours video */}
            <div className={`${isClicked ? 'clicked-straming-video' : 'streaming-video'}`}>
                {<video className={`${isClicked ? 'clicked-video-player' : 'video-player'}`}  playsInline muted ref={myVideo} autoPlay />}
            </div>
            {/* This others video */}
           <div className={`${isClicked ? 'clicked-straming-video' : 'streaming-video'}`}>
                {callAccepted && !callEnded && (
                <video className={`${isClicked ? 'clicked-video-player' : 'video-player'}`}  playsInline ref={userVideo} autoPlay />
                )}
            </div> 
          </div>
          <VideoCallFeaturesIcons>
            {/** order */}
            {/** message button */}
             <VideoCallFeaturesBtn
              className="video-call-features-btn"
              onClick={() => setClicked(!isClicked)}
              btnClicked={isClicked}
            >
              <FaMessage />
            </VideoCallFeaturesBtn> 
            {/** video on and off button */}
            {/* <button onClick={toggleVideo}>{isVideoOn ? 'Turn Video Off' : 'Turn Video On'}</button> */}
            <VideoCallFeaturesBtn
              className="video-call-features-btn"
              onClick={toggleVideo}
              btnClicked={isVideoOn}
            >
              {isVideoOn===true ? <IoMdVideocam /> : <FaVideoSlash />}
            </VideoCallFeaturesBtn>
            {/* Calling */}
            {/**call initialte or cut  button*/}
            {callAccepted===true && callEnded!==true  ? (
              <VideoCallCutBtn onClick={leaveCall}>
                <MdOutlineCallEnd />
              </VideoCallCutBtn>
            ) : (
              <VideoCallBtn onClick={callUser}>
                <IoMdCall />
              </VideoCallBtn>
            )}
            {/* <VideoCallCutBtn className="video-call-features-btn video-call-cut-btn">
                            <MdOutlineCallEnd />
                        </VideoCallCutBtn> */}
            {/*********** */}
            {/**audio on or off button */}
            {/* <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button> */}
            <VideoCallFeaturesBtn
              className="video-call-features-btn"
              onClick={toggleMute}
              btnClicked={isMuted}
            >
              {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </VideoCallFeaturesBtn>
            {/**settings  button */}
            {/**settings btn */}
            <Popup
              trigger={
                <VideoCallFeaturesBtn className="video-call-features-btn" btnClicked={settingsBtnClicked}>
                  <MdSettings />
                </VideoCallFeaturesBtn>
              }
              position="top right"
              onClick={() => setSettingsBtnClicked(!settingsBtnClicked)}
              btnClicked={settingsBtnClicked}
            >
              <div className="popup-body">
                <li className="popup-list-item" onClick={()=>navigate('/report-abuse')}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M20.9733 4H11.0267L4 11.0267V20.9733L11.0267 28H20.9733L28 20.9733V11.0267L20.9733 4ZM25.3333 19.8667L19.8667 25.3333H12.1333L6.66667 19.8667V12.1333L12.1333 6.66667H19.8667L25.3333 12.1333V19.8667Z"
                      fill="black"
                    />
                    <path
                      d="M15.9993 22.6667C16.7357 22.6667 17.3327 22.0697 17.3327 21.3333C17.3327 20.597 16.7357 20 15.9993 20C15.263 20 14.666 20.597 14.666 21.3333C14.666 22.0697 15.263 22.6667 15.9993 22.6667Z"
                      fill="black"
                    />
                    <path
                      d="M14.666 9.33325H17.3327V18.6666H14.666V9.33325Z"
                      fill="black"
                    />
                  </svg>
                  <p className="popup-list-content">Report abuse</p>
                </li>
                <li className="popup-list-item"onClick={()=>navigate('/report-issue')}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M7.43402 7.46008C6.9417 7.95928 6.66579 8.63229 6.66602 9.33341V25.3334C6.66602 26.0407 6.94697 26.7189 7.44706 27.219C7.94716 27.7191 8.62544 28.0001 9.33268 28.0001H22.666C23.3733 28.0001 24.0515 27.7191 24.5516 27.219C25.0517 26.7189 25.3327 26.0407 25.3327 25.3334M25.3327 20.0001V9.33341C25.3327 8.62617 25.0517 7.94789 24.5516 7.4478C24.0515 6.9477 23.3733 6.66675 22.666 6.66675H19.9993"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 6.66667C12 5.95942 12.281 5.28115 12.781 4.78105C13.2811 4.28095 13.9594 4 14.6667 4H17.3333C18.0406 4 18.7189 4.28095 19.219 4.78105C19.719 5.28115 20 5.95942 20 6.66667C20 7.37391 19.719 8.05219 19.219 8.55229C18.7189 9.05238 18.0406 9.33333 17.3333 9.33333H14.6667M4 4L28 28"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="popup-list-content">Report an issue</p>
                </li>
              </div>
            </Popup>
          </VideoCallFeaturesIcons>
        </VideoCallingMainContainer>
         {isClicked && (
          <ChatContainer msgbtnClicked={isClicked}>
            <div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.from === me ? "my-message" : "their-message"}
                >
                  <span>{msg.from === me ? "Me" : msg.from}</span>:{" "}
                  {msg.message}
                </div>
              ))}
            </div>
            <MsgInputContainer>
              <MsgInput
                type="text"
                placeholder="Type a message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <button className="chat-btns sent-btn" onClick={sendMessage}>
                <LuSendHorizonal />
              </button>
            </MsgInputContainer>
          </ChatContainer>
        )} 
      </VideoCallBgCard>
        
        {/** buttons container */}
    </VideoCallBgContainer>
  );
};

export default VideoCallScreenC;
