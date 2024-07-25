import React from "react";
import "./index.css";
import {useNavigate} from 'react-router-dom';
const SignUpPage = () => {
  const navigate=useNavigate();
  return (
    <div className="signup-page-bg-container">
      <div className="signup-page-main-container">
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
          alt="signin-img"
          className="signup-image"
        />
        <div className="signup-page-details-bg-container">
          <div className="signup-page-details-main-container">
            <h1 className="signup-page-details-heading">
              Create a New Account
            </h1>
            <button className="sign-up-page-btn-sign-up-btn"  type="button" onClick={()=>navigate("/user/account-page")}>
              Sign up as a Customer
            </button>
            <button className="sign-up-page-btn-consultant-btn"  type="button" onClick={()=>navigate("/consultant/account-page")}>
              Be a consultant
            </button>
          </div>
            <p className="signup-page-details-description">
              Already have an account? <span className="span">Sign in</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
