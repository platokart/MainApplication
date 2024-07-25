
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './index.css'; 
import './styleguide.css';
import { Link } from 'react-router-dom';
const CreatePassword = () => {
  const [showPassword, setShowPassword] = useState(true); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false); 
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    setPasswordLengthError(false); 
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
  };

  const handleConfirm = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    
    if (password.length < 8) {
      setPasswordLengthError(true);
      return;
    } else {
      setPasswordLengthError(false);
    }

    
  };

  const inputType = showPassword ? 'password' : 'text';

  return (
    <div className="create-password-container">
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
      <div className="create-password-content">
        <h1 className="create-password-title">Create new password</h1>
        <div className="password-input-container">
          <label htmlFor="password" className='password-label' >Password</label><br/>
          <div className="password-input-wrapper">
            <input
              type={inputType}
              className="create-password-input"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="eye-icon-wrapper">
              {showPassword ? (
                <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
              ) : (
                <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>
        </div>
        <div className="password-input-container">
          <label htmlFor="confirmPassword" className='password-label'>Confirm Password</label><br/>
          <div className="password-input-wrapper">
          <input
            type="password"
            className="create-password-input"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        </div>

        <p className='password-match'>Both password must match</p>
       
        <button className="create-password-btn" onClick={handleConfirm}>
          Confirm
        </button>

        {passwordMismatch && (
          <p className="password-match-error">Passwords do not match.</p>
        )}
        {passwordLengthError && (
          <p className="password-match-error">Password must be at least 8 characters long.</p>
        )}
      </div>
    </div>
  );
}

export default CreatePassword;
