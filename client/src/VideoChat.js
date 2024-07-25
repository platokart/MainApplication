import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./App.css";

const VideoChat = () => {
    const socket = useRef(io.connect('http://localhost:5000')).current; // Refactor socket to useRef
    const [me, setMe] = useState("");
    const [stream, setStream] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [idToCall, setIdToCall] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [consultantEmail, setConsultantEmail] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
            setStream(currentStream);
            if (myVideo.current) {
                myVideo.current.srcObject = currentStream;
            }
        }).catch(error => {
            console.error("Error accessing media devices.", error);
        });

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
            setMessages(prevMessages => [...prevMessages, { from: data.from, message: data.message }]);
        });

        return () => {
            socket.off("me");
            socket.off("callUser");
            socket.off("instantRequest");
            socket.off("scheduledRequest");
            socket.off("message");
        };
    }, [socket]); // Add socket to dependency array

    useEffect(() => {
        if (userEmail) {
            socket.emit("register", { email: userEmail });
        }
    }, [userEmail, socket]); // Add socket and userEmail to dependency array

    const callUser = () => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: idToCall,
                signalData: data,
                from: me,
                name: name
            });
        });

        peer.on("stream", (userStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = userStream;
            }
        });

        peer.on("close", () => {
            console.log('Peer connection closed');
        });

        peer.on("error", (err) => {
            console.error('Peer connection error:', err);
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        });

        peer.on("stream", (userStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = userStream;
            }
        });

        peer.on("close", () => {
            console.log('Peer connection closed');
        });

        peer.on("error", (err) => {
            console.error('Peer connection error:', err);
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        window.location.reload();  // Optionally reload to reset state
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", {
                message: message,
                to: caller || idToCall,
                from: me,
                email: userEmail,
                consultantEmail: consultantEmail
            });
            setMessages(prevMessages => [...prevMessages, { from: me, message: message }]);
            setMessage("");
        }
    };

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(prevMuted => !prevMuted);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOn(prevVideoOn => !prevVideoOn);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
            <div className="container">
                <div className="video-container">
                    {/* Here the our video will appear*/}
                    <div className="video">
                        {stream && (
                            <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />
                        )}
                    </div>
                    {/*Here the opposite video will appear */}
                    <div className="video">
                        {callAccepted && !callEnded && (
                            <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
                        )}
                    </div>
                </div>
                <div className="myId">
                    {/* Here the opposite email should come after matching consultant --- consultant email should be there */}
                    <input
                        id="filled-basic"
                        type="text"
                        label="Consultant Email"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                        placeholder="Consultant Email"
                    />
                    <div className="call-button">
                        {/* calling option by default after joining put call option call Accepted */}
                        {callAccepted && !callEnded ? (
                            <button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </button>
                        ) : (
                            <button color="primary" aria-label="call" onClick={callUser}>
                                Call
                            </button>
                        )}
                    </div>
                    <div className="control-buttons">
                        <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
                        <button onClick={toggleVideo}>{isVideoOn ? 'Turn Video Off' : 'Turn Video On'}</button>
                    </div>
                    {/* after successful matching thee consultant his email and the user email will be used */}
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Your Email"
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        type="email"
                        value={consultantEmail}
                        onChange={(e) => setConsultantEmail(e.target.value)}
                        placeholder="Consultant Email"
                        style={{ marginBottom: "10px" }}
                    />
                </div>
                {/* for user*/}
                <div>
                    {receivingCall && !callAccepted && (
                        <div className="caller">
                            <h1>{name} is calling...</h1>
                            <button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </button>
                        </div>
                    )}
                </div>
                {/* chatting */}
                <div className="chat-container">
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.from === me ? "my-message" : "their-message"}>
                                <span>{msg.from === me ? "Me" : msg.from}</span>: {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default VideoChat;
