import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ConsultantSetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const passwordType = passwordHidden ? "password" : "text";
  const confirmPasswordType = confirmPasswordHidden ? "password" : "text";
  
  const passwordIcon = passwordHidden ? <IoEye size={26} /> : <IoEyeOff size={26} />;
  const confirmPasswordIcon = confirmPasswordHidden ? <IoEye size={26} /> : <IoEyeOff size={26} />;

  const validatePassword = (password) => {
    const minLength = 10;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 10 characters long.";
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return "";
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");

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
      const authorizationCode = localStorage.getItem('consultantAuth');
      const consultantEmail = localStorage.getItem('consultantEmail');
      console.log(consultantEmail);

      let parsedToken = null;
      if (authorizationCode) {
        try {
          parsedToken = JSON.parse(authorizationCode);
        } catch (error) {
          console.error('Error parsing token:', error);
          setErrorMessage("Authentication error. Please try again.");
          return;
        }
      }

      const formData = {
        password: password,
      }

      console.log("Submitting form data:", formData);

      const response = await fetch(
        "http://localhost:5000/consultant/register/set-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${parsedToken.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      
      if (response.ok === true) {
        navigate("/consultant/signin");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="set-password-bg-container">
      <img
        src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
        alt="signin-img"
        className="signin-image"
      />
      <div className="set-password-details-bg-container">
        <form onSubmit={handlePassword}>
          <h1 className="set-password-heading">Set Password</h1>
          <div className="input-container">
            <label className="set-password-label-el" htmlFor="password">
              Password
            </label>
            <div className="password-container">
              <input
                type={passwordType}
                className="password-input"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
              <button
                onClick={() => setPasswordHidden(!passwordHidden)}
                className="password-btn"
                type="button"
              >
                {passwordIcon}
              </button>
            </div>
          </div>
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="confirm-password">
              Re-Confirm
            </label>
            <div className="password-container">
              <input
                type={confirmPasswordType}
                className="password-input"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirm-password"
                required
              />
              <button
                onClick={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
                className="password-btn"
                type="button"
              >
                {confirmPasswordIcon}
              </button>
            </div>
          </div>
          <div className="password-rules-list">
            <li className="password-rule">
              Passwords must be a minimum of 10 characters long.
            </li>
            <li className="password-rule">
              Passwords must include at least one uppercase letter, one lowercase
              letter, one number, and one special character.
            </li>
            <li className="password-rule">
              Avoid common patterns or sequences, such as "123456" or "password."
            </li>
          </div>
          <button className="set-password-signup-btn" type="submit">
            Sign up
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ConsultantSetPasswordPage;