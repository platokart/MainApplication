import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";

const NewUserAccountPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getEmailForm = async (email, setEmail) => {
    try {
      const response = await fetch('http://localhost:5000/customer/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.status=== 400) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.error === "Email already registered") {
          setError(errorData.message || "This email is already registered. Please sign in instead.");
        } else {
          throw new Error(`Failed to send OTP: ${errorData.error || response.statusText}`);
        }
      } else {
        setEmail("");
        localStorage.setItem('email', email);
        navigate("/user/otp");
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
              Create a New User Account
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
              Already have an account? <span className="span" onClick={() => navigate("/user/signin")}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserAccountPage;