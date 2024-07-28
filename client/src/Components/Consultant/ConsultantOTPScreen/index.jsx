import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./index.css";

const OtpScreen = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const verifyOTP = async (otp) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/consultant/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setTimeout(() => {
          navigate('/consultant/detailsform');
        }, 100);
      } else {
        setErrorMsg(data.error);
      }
    } catch (error) {
      setErrorMsg('Error verifying OTP');
    }
  };

  return (
    <div className="otp-screen-bg-container">
      <FaArrowLeft cursor={'pointer'} size={'20px'} marginRight={'30px'} />
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
              height: "30px",
              width: "36px",
              borderRadius: "3px",
              background: "#FFF",
              marginRight: "20px",
              border: "None",
              fontSize: "20px",
              fontFamily: "Inter",
            }}
          />
          <p className="otp-screen-details-description">
            Didn't get the OTP? <span className="span">Resend</span>
          </p>
          <button className="otp-screen-proceed-btn" type="button" onClick={() => verifyOTP(otp)}>Proceed</button>
          <div style={{ textAlign: 'center' }}>
            {errorMsg !== "" && <p className="forgot-password-description" style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
