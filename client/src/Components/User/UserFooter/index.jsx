import React from "react";
import "./index.css";
import { FiLinkedin } from "react-icons/fi";


const UserFooter = () => {
  return (
    <div className="footer-container">
      <div className="plato-content">
        <h4>Platokart</h4>
        <p>
          Online Ondemand Real
          <br />
          Time Consulting
        </p>
        <p>Copyright Platokart</p>
      </div>
      <div className="get-in-content">
        <h4>Get In Touch</h4>
        <div className="location-symbol-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C15.87 2 19 5.13 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 5.13 8.13 2 12 2ZM7 9C7 11.85 9.92 16.21 12 18.88C14.12 16.19 17 11.88 17 9C17 6.24 14.76 4 12 4C9.24 4 7 6.24 7 9ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
              fill="#0071C1"
            />
          </svg>
          <p>Syntropy Ventures</p>
        </div>
        <div className="help-symbol-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
              fill="#0071C1"
            />
          </svg>
          <a href="customercare@syntropy.net.in" className="anchor-helpdesk">
            helpdesk
          </a>
        </div>
      </div>
      <div className="follow-us-content">
        <div className="linkedin-icon">
          <a
            href="https://www.linkedin.com/company/syntropy-ventures/?viewAsMember=true"
            className="anchor-linkedin-icon"
          >
            <FiLinkedin />
          </a>
        </div>
        <p>Follow Us</p>
      </div>
      <div className="newsletter-content">
        <h4>Join a Newsletter</h4>
        <p>Your Email</p>
        <div className="input-email">
          <input type="email" placeholder="Enter Your Email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default UserFooter;
