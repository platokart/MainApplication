import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth1";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consultantAuth, setAuth] = useAuth();
  const [errorMsg,setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [passwordHidden, setPasswordHidded] = useState(true);

  const passwordIcon = passwordHidden ? <IoEye size={26} /> : <IoEyeOff size={26} />;
  const passwordType = passwordHidden ? 'password' : 'type'

  const onClickSignIn=async(email,password)=> {
    localStorage.setItem('consultantEmail',email);
    try {
      const response = await fetch('http://localhost:5000/consultant/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email,password:password }),
        
      });
      console.log(response);
      const data= await response.json();
      console.log(data);
      if(response.status===401){
        setErrorMsg(data.error);
        return
      }
      localStorage.setItem("consultantToken", data.token);
      localStorage.setItem("consultantId", data.id);
    

// In your onClickSignIn function, after successful login:
setAuth({ token: data.token, consultant: { id: data.id } ,consultantEmail:email});
      if(response.ok) {
        //have to redirect to the consultant homepage
        navigate('/consultant/home-page');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="new-account-page-bg-container">
      <div className="new-account-page-main-container">
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
          alt="signin-img"
          className="signin-image"
        />
        <div className="new-account-page-details-bg-container">
          <div className="new-account-page-details-main-container">
            <h1 className="new-account-page-details-heading">Welcome Back!</h1>
            <div className="input-container">
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
              />
            </div>
            {/* <div className="input-container">
              <label
                className="new-account-page-details-label-el"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="new-account-page-details-input-el"
                placeholder="********"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div> */}
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
                />
                <button
                  onClick={() => setPasswordHidded(!passwordHidden)}
                  className="password-btn"
                  type="button"
                >
                  {passwordIcon}
                </button>
              </div>
            </div>
            <button className="new-account-page-details-proceed-btn" type="button" onClick={()=>onClickSignIn(email,password)}>
              Sign in
            </button>
            {errorMsg !== "" && <p className="forgot-password-description" style={{color:"red",textAlign:"center"}}>{errorMsg}</p>}
            <p className="forgot-password-description" onClick={()=> navigate("/consultant/reset-password")}>Forgot Password?</p>
          </div>
          <div>
            <p className="new-account-page-details-description">
              Don't have an account? <span className="span" onClick={()=>navigate("/consultant/account-page")}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
