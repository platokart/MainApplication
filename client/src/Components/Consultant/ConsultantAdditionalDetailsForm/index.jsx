import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Select } from "antd";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailsForm = () => {
  const [consultantDescription, setConsultantDescription] = useState("");
  //resume file
  const [resumeFile, setResumeFile] = useState(null);
  const [base64Resume,setBase64Resume] = useState(null);
  const [linkedIn, setLinkedIn] = useState("");
  const [feePerSession, setFeePerSession] = useState("");
  const [ctc, setCtc] = useState("");
  //supporting document file
  const [compensationDetails, setCompensationDetails] = useState(null);
  const [base64CompensationDetails,setBase64CompensationDetails] = useState(null);
  const [appointmentLetter, setAppointmentLetter] = useState(null);
  const [base64AppointmentLetter,setBase64AppointmentLetter] = useState(null);
  const navigate = useNavigate();
  //using useRef() hook
  const inputRefForResume = useRef(null);
  const inputRefForCompensationDetails = useRef(null);
  const inputRefForAppointemntLetter = useRef(null);

  const onSubmitDetailsForm = async (e) => {
    e.preventDefault();
    console.log(consultantDescription);
    console.log(resumeFile);
    console.log(linkedIn);
    console.log(feePerSession);
    console.log(ctc);
    console.log(compensationDetails);
    console.log(appointmentLetter);
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
        }
      }

     
       


      const formData = {
        aboutYourself:consultantDescription,
        resumeAttachment:base64Resume,
        linkedinProfile:linkedIn,
        feePerSession,
        lastCTC:ctc,
        compensationDetails: base64CompensationDetails,
        appointmentLetter : base64AppointmentLetter
      }
  
      console.log("Submitting form data:", formData);
  
      const response = await fetch(
        "http://localhost:5000/consultant/register/additional-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${parsedToken.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
     

       
      // const response = await fetch(
      //   "http://localhost:5000/consultant/register/additional-details",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Authorization": `Bearer ${parsedToken.token}`,
      //     },
      //     body: JSON.stringify({
      //       email : consultantEmail,
      //       additionalDetails : [
      //       {
      //         aboutYourself:consultantDescription,
      //         resumeAttachment:resumeFile,
      //         linkedinProfile:linkedIn,
      //         feePerSession,
      //         lastCTC:ctc,
      //         compensationDetails,
      //         appointmentLetter
      //       }
      //     ]}),
      //   }
      // );
      
      console.log(response);
        if(response.ok===true){
          navigate("/consultant/critical-details");
        }
        
      //here redirect to userotpscreen how??
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //handling resume img click
  const handleResumeClick = () => {
    inputRefForResume.current.click();
  };

  //handling supporting docs img click
  const handleCompensationDetails = () => {
    inputRefForCompensationDetails.current.click();
  };

  const handleAppointemntLetter = () => {
    inputRefForAppointemntLetter.current.click();
  };

  return (
    <div className="details-form-bg-container">
      <img
        src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
        alt="signin-img"
        className="detailsform-image"
      />
      <div className="details-form-contents-container">
        <div className="details-form-container">
          <h1 className="details-form-heading">Additional Details</h1>
          <form onSubmit={onSubmitDetailsForm}>
            {/** consultant description k*/}
            <div className="input-container">
              <label className="details-form-label-el">
                Tell people about yourself
              </label>
              <div className="consulant-description-container">
                <textarea
                  type="text"
                  className="details-form-textarea-el"
                  // placeholder="Search"
                  value={consultantDescription}
                  onChange={(e) => setConsultantDescription(e.target.value)}
                  maxLength={250}
                  required
                ></textarea>
                <p className="words-desc">0/250</p>
              </div>
            </div>
            {/** resume input k */}
            <div className="input-container">
              <label
                className="details-form-label-el resume-label"
                htmlFor="resume"
              >
                Resume
              </label>
              <div className="resume-container">
                {/**first container */}
                <div
                  className="resume-container-1"
                  onClick={handleResumeClick}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <img
                      src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715353768/file-add_vjkblk.png"
                      alt="file-upload-img"
                      className="file-upload-img"
                    />
                    <input
                      type="file"
                      required
                      ref={inputRefForResume}
                      style={{ display: "none" }}
                      // placeholder="Search"
                      // value={resumeFile}
                      onChange={(e) => {
                        const uploadedResume = e.target.files[0];
                        setResumeFile(uploadedResume);
                        if (uploadedResume) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setBase64Resume(reader.result);
                          };
                          reader.readAsDataURL(uploadedResume);
                        }
                      }}
                      id="resume"
                    />
                  </div>
                  <p className="resume-description">Click to upload</p>
                </div>
                {/**second container */}
                <div className="resume-container-2">
                  <input
                    type="checkbox"
                    className="resume-checkbox"
                    checked={resumeFile !== null}
                  />
                  <div className="resume-description-container">
                    {resumeFile !== null ? (
                      <p className="resume-description-1">{resumeFile.name}</p>
                    ) : (
                      <p className="resume-description-1">resume.pdf</p>
                    )}
                    <p className="resume-description-2">upload complete</p>
                  </div>
                </div>
              </div>
            </div>
            {/** linkedin profile k*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="linkedin">
                Linkedin profile
              </label>
              <input
                type="text"
                className="input-el"
                placeholder="https://linkedin.com"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                id="linkedin"
                required
              />
            </div>
            {/**fee per session k*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="fee">
                Fee per session (a session is typically 1hr - 1.5hr)
              </label>
              <input
                type="text"
                className="input-el"
                placeholder="Enter here (in rupees)"
                value={feePerSession}
                onChange={(e) => setFeePerSession(e.target.value)}
                id="fee"
                required
              />
            </div>
            {/** last or current ctc k*/}
            <div className="input-container">
              <label className="details-form-label-el" htmlFor="ctc">
                Current/Last drawn CTC value (annual)
              </label>
              <input
                type="text"
                className="input-el"
                placeholder="Enter here (in rupees)"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
                id="ctc"
                required
              />
            </div>
            {/** Compensation details k*/}
            <div className="input-container">
              <label
                className="details-form-label-el resume-label"
                htmlFor="compensation-details"
              >
                Compensation Details
              </label>
              <div className="resume-container">
                {/**first container */}
                <div
                  className="resume-container-1"
                  onClick={handleCompensationDetails}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <img
                      src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715353768/file-add_vjkblk.png"
                      alt="file-upload-img"
                      className="file-upload-img"
                    />
                    <input
                      type="file"
                      required
                      ref={inputRefForCompensationDetails}
                      style={{ display: "none" }}
                      // value={compensationDetails}
                      onChange={(e) => {
                        const uploadedCompensationDetails = e.target.files[0];
                        setCompensationDetails(uploadedCompensationDetails);
                        if (uploadedCompensationDetails) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setBase64CompensationDetails(reader.result);
                          };
                          reader.readAsDataURL(uploadedCompensationDetails);
                        }
                      }}
                      id="compensation-details"
                    />
                  </div>
                  <p className="resume-description">Click to upload</p>
                </div>
                {/**second container */}
                <div className="resume-container-2">
                  <input
                    type="checkbox"
                    className="resume-checkbox"
                    checked={compensationDetails !== null}
                  />
                  <div className="resume-description-container">
                    {compensationDetails !== null ? (
                      <p className="resume-description-1">
                        {compensationDetails.name}
                      </p>
                    ) : (
                      <p className="resume-description-1">
                        compensationDetails.pdf
                      </p>
                    )}
                    <p className="resume-description-2">upload complete</p>
                  </div>
                </div>
              </div>
            </div>
            {/** appointement letter/ Experience/ Relieving letter k*/}
            <div className="input-container">
              <label
                className="details-form-label-el resume-label"
                htmlFor="appointment-letter"
              >
                Appointment letter/ Experience/ Relieving letter
              </label>
              <div className="resume-container">
                {/**first container */}
                <div
                  className="resume-container-1"
                  onClick={handleAppointemntLetter}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <img
                      src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715353768/file-add_vjkblk.png"
                      alt="file-upload-img"
                      className="file-upload-img"
                    />
                    <input
                      type="file"
                      required
                      ref={inputRefForAppointemntLetter}
                      style={{ display: "none" }}
                      // value={appointmentLetter}
                      onChange={(e) => {
                        const uploadedAppointmentLetter = e.target.files[0];
                        setAppointmentLetter(uploadedAppointmentLetter);
                        if (uploadedAppointmentLetter) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setBase64AppointmentLetter(reader.result);
                          };
                          reader.readAsDataURL(uploadedAppointmentLetter);
                        }
                      }}
                      id="appointment-letter"
                    />
                  </div>
                  <p className="resume-description">Click to upload</p>
                </div>
                {/**second container */}
                <div className="resume-container-2">
                  <input
                    type="checkbox"
                    className="resume-checkbox"
                    checked={appointmentLetter !== null}
                  />
                  <div className="resume-description-container">
                    {appointmentLetter !== null ? (
                      <p className="resume-description-1">
                        {appointmentLetter.name}
                      </p>
                    ) : (
                      <p className="resume-description-1">
                        appointmentletter.pdf
                      </p>
                    )}
                    <p className="resume-description-2">upload complete</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="details-form-signup-btn" type="submit">
              Signup
            </button>
          </form>
        </div>
        <div className="skip-step-container">
          <p className="or">Or</p>
          <h4 className="skip-for-now" onClick={()=>navigate('/consultant/critical-details')}>Skip this step for now</h4>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
