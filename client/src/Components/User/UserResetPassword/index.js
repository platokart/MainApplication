import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import './styleguide.css';

function UserResetPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail()) {
      try {
        const response = await fetch('http://localhost:5000/customer/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        navigate("/user/check-mail");
      } catch (error) {
        setEmailError('Error sending reset link. Please try again.');
      }
    }
  };

  return (
    <div className="reset-password-container">
       <Link to="/reset-password"> {/* Wrap the arrow with Link */}
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none" className="back-link">
            <g clip-path="url(#clip0_312_190)">
              <path d="M23.5698 14.1422L16.4044 21.3075L32.055 21.3075C32.8093 21.3075 33.375 21.8732 33.375 22.6275C33.375 23.3817 32.8093 23.9474 32.055 23.9474L16.4044 23.9474L23.5698 31.1127C24.1354 31.6784 24.1354 32.4327 23.5698 32.9984C23.0041 33.564 22.2498 33.564 21.6841 32.9984L12.2561 23.5703C12.1618 23.476 11.9732 23.2874 11.9732 23.0989C11.8789 22.816 11.8789 22.4389 11.9732 22.156C11.9732 21.9675 12.1618 21.7789 12.2561 21.6846L21.6841 12.2566C22.2498 11.6909 23.0041 11.6909 23.5698 12.2566C24.1354 12.8222 24.1354 13.5765 23.5698 14.1422Z" fill="#191919"/>
            </g>
            <defs>
              <clipPath id="clip0_312_190">
                <rect width="32" height="32" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 22.627 45.2549)"/>
              </clipPath>
            </defs>
          </svg>
        </Link>
      <div className="reset-password-content">
        <h1 className="reset-password-title">Reset password</h1>
        <p className="reset-password-text">
          Enter the email associated with your account and we'll send a link to reset your password
        </p>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input 
            id="email" 
            className="form-input" 
            placeholder="Enter your email" 
            type="email" 
            value={email}
            onChange={handleEmailChange}
          />
          <button className="reset-password-btn" type="submit">Send link</button>
        </form>
        {emailError && <p className="error-msg">{emailError}</p>}
      </div>
    </div>
  );
}

export default UserResetPassword;
