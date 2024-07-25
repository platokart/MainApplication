import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";

const NewAccountPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getEmailForm = async (email, setEmail) => {
    try {
      const response = await fetch('http://localhost:5000/consultant/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.error === "Email already registered") {
          setError(data.message);
        } else {
          throw new Error(`Failed to send OTP: ${data.error || response.statusText}`);
        }
      } else {
        setEmail("");
        localStorage.setItem('consultantEmail', email);
        navigate("/consultant/otp");
      }
    } catch(error) {
      console.error('Error submitting form:', error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="new-account-page-bg-container">
      <div className="new-account-page-main-container">
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
          alt="signin-img"
          className="newaccount-image"
        />
        <div className="new-account-page-details-bg-container">
          <div className="new-account-page-details-main-container">
            <h1 className="new-account-page-details-heading">
              Create a New Account
            </h1>
            
            <label
              className="new-account-page-details-label-el"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="new-account-page-details-input-el"
              placeholder="johndoe@email.net"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <button 
              className="new-account-page-details-proceed-btn" 
              type="button" 
              onClick={() => getEmailForm(email, setEmail)}
            >
              Proceed
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div>
            <p className="new-account-page-details-description">
              Already have an account? <span className="span" onClick={() => navigate("/consultant/signin")}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAccountPage;