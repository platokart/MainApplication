import React, { useState,useEffect } from "react";
import OtpInput from "react-otp-input";
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import {useAuth} from '../../../Context/Auth1'
import "./index.css";
const OtpScreen = () => {
  const [otp, setOtp] = useState("");
  const [errorMsg,setErrorMsg] = useState("");
  const navigate=useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    console.log("Current auth state:", auth);
  }, [auth]);

  const verifyOTP = async (otp) => {
    try {
      const response = await fetch('http://localhost:5000/customer/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("API response:", data);
  
        const newAuthState = {
          user: data.user || { id: data.id }, // Ensure there's a user object
          token: data.token,
          email: data.email,
        };
  
        console.log("New auth state before setting:", newAuthState);
        setAuth(newAuthState);
  
        localStorage.setItem('auth', JSON.stringify(newAuthState));
        console.log("Auth state stored in localStorage:", JSON.parse(localStorage.getItem('auth')));
  
        // Delay navigation to ensure state is updated
        setTimeout(() => {
          console.log("Navigating to home page, current auth state:", newAuthState);
          navigate('/user/detailsform');
        }, 100);
      } else {
        console.error("OTP verification failed");
        setErrorMsg(data.error)
        return
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="otp-screen-bg-container">
      {/* arror btn to be added*/}
      <FaArrowLeft cursor={'pointer'} size={'20px'} marginRight={'30px'}/>
      <div className="otp-screen-main-container">
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
          alt="signin-img"
          className="otpscreen-image"
        />
        <div className="otp-screen-details-container">
            <h1 className="otp-screen-details-heading">
              We've sent you an OTP on your email
            </h1>
            <p className="otp-screen-details-description">Enter OTP</p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
              className="otp-input"
              inputStyle={{
                height : "30px",
                width : "36px",
                borderRadius: "3px",
                background: "#FFF",
                marginRight: "20px",
                border: "None",
                fontSize : "20px",
                // fontWeight  : "500",
                fontFamily : "Inter",
              }}
            />

            <p className="otp-screen-details-description">
              Didn't get the OTP? <span className="span">Resend</span>
            </p>

            <button className="otp-screen-proceed-btn" type="button" onClick={() => verifyOTP(otp)}>Proceed</button>
            <div style={{textAlign:'center'}}>
            {errorMsg !== "" && <p className="forgot-password-description" style={{color:"red",textAlign:"center"}}>{errorMsg}</p>}
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default OtpScreen;
