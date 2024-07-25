import React, { useState } from "react";
import './index.css'
import ConsultantNavbar from './../ConsultantNavbar/index';
import ConsultantFooter from "../ConsultantFooter";


const ConsultantContactUs = () => {
  const [name, setContactName] = useState("");
  const [email, setContactEmail] = useState("");
  const [number, setContactNumber] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitContactDetails = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <ConsultantNavbar />
      <div className="contact-us-bg-container">
        <div className="form-container">
          <h1 className="contact-us-heading">
            Get in <span className="contact-us-heading-span">Touch</span>
          </h1>
          <p className="contact-us-descritpion">
            Get in touch with us to discuss how we can assist you furthur.
          </p>
          <form onSubmit={onSubmitContactDetails}>
            <input
              placeholder="Name"
              type="text"
              className="contact-us-input"
              onChange={(e) => setContactName(e.target.value)}
              value={name}
            />
            <input
              placeholder="Email"
              type="email"
              className="contact-us-input"
              onChange={(e) => setContactEmail(e.target.value)}
              value={email}
            />
            <input
              placeholder="Contact number"
              type="text"
              className="contact-us-input"
              onChange={(e) => setContactNumber(e.target.value)}
              value={number}
            />
            <textarea
              placeholder="Type your message"
              className="contact-textarea-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="contact-us-button" type="submit">SEND</button>
          </form>
          <div className="contact-container">
            <div className="contact-sub-container">
              <img
                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716030246/Frame_831_cxgtgm.svg"
                className="contact-content-img"
                alt='phone'
              />
              <div className="contact-contents-container">
                <h5 className="contact-content-heading">PHONE</h5>
                <p className="contact-content-description">03 5432 1234</p>
              </div>
            </div>
            <div className="contact-sub-container">
              <img
                className="contact-content-img"
                src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716030235/email_boqtbr.png"
                alt="email"
              />
              <div className="contact-contents-container">
                <h5 className="contact-content-heading">EMAIL</h5>
                <p className="contact-content-description">helpdesk@com</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715958606/Rectangle_6198_gnga3e.png"
          className="contact-us-img"
          alt="contact-us"
        />
      </div>
      <ConsultantFooter />
    </div>
  );
};

export default ConsultantContactUs;
