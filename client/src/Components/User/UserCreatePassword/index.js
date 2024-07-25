import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './index.css';
import './styleguide.css';

const UserCreatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return "";
  };

  const handleConfirm = async () => {
    setErrorMessage('');

    const validationError = validatePassword(password);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const customerEmail = localStorage.getItem('email');
      const response = await fetch('http://localhost:5000/customer/password/create', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: customerEmail,
          password: password
        }),
      });

      if (response.ok) {
        navigate('/user/home-page');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%'
    }}>
      <div className="create-password-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: '80%',
        maxWidth: '700px',  
      }}>
        <h1 className="create-password-title">Create new password</h1>
        <div className="password-input-container">
          <label htmlFor="password" className='password-label'>Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="create-password-input"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye-icon-wrapper" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
            </div>
          </div>
        </div>
        <div className="password-input-container">
          <label htmlFor="confirmPassword" className='password-label'>Confirm Password</label>
          <div className="password-input-wrapper">
            <input
              type="password"
              className="create-password-input"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="password-rules-list">
          <p>Password must:</p>
          <ul>
            <li>Be at least 8 characters long</li>
            <li>Include at least one uppercase letter</li>
            <li>Include at least one lowercase letter</li>
            <li>Include at least one number</li>
            <li>Include at least one special character</li>
          </ul>
        </div>
        <button className="create-password-btn" onClick={handleConfirm}>
          Confirm
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default UserCreatePassword;