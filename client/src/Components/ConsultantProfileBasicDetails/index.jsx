import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { useNavigate } from 'react-router-dom';
const industries = [
  { id: uuidv4(), industry: "Pharma / Healthcare" },
  { id: uuidv4(), industry: "Start ups" },
  { id: uuidv4(), industry: "Infrastructure" },
  { id: uuidv4(), industry: "Retail and E comm" },
  { id: uuidv4(), industry: "Energy" },
  { id: uuidv4(), industry: "Real Estate" },
  { id: uuidv4(), industry: "Education" },
  { id: uuidv4(), industry: "Manufacturing" },
  { id: uuidv4(), industry: "Chemicals" },
  { id: uuidv4(), industry: "Aviation" },
  { id: uuidv4(), industry: "Automotive" },
  { id: uuidv4(), industry: "Banking, Insurance & NBFC" },
  { id: uuidv4(), industry: "Technology - Food Tech, EdTech, Fintech, HRTech" },
  { id: uuidv4(), industry: "FMCG / Durables" },
  { id: uuidv4(), industry: "Others" },
];

const designations = [
  { id: uuidv4(), designation: "Senior Manager" },
  { id: uuidv4(), designation: "Assistant General Manager" },
  { id: uuidv4(), designation: "Deputy General Manager" },
  { id: uuidv4(), designation: "General Manager" },
  { id: uuidv4(), designation: "Senior General Manager" },
  { id: uuidv4(), designation: "AVP" },
  { id: uuidv4(), designation: "DVP" },
  { id: uuidv4(), designation: "VP" },
  { id: uuidv4(), designation: "Sr VP" },
  { id: uuidv4(), designation: "EVP" },
  { id: uuidv4(), designation: "President" },
  { id: uuidv4(), designation: "Director" },
  { id: uuidv4(), designation: "Senior Director" },
  { id: uuidv4(), designation: "Executive Director" },
];

const functions = [
  { id: uuidv4(), func: "HR" },
  { id: uuidv4(), func: "Legal" },
  { id: uuidv4(), func: "Finance & Accounts/Taxation" },
  { id: uuidv4(), func: "Com panNumbery Secretarial" },
  { id: uuidv4(), func: "Information Technology" },
  { id: uuidv4(), func: "Risk & Compliance" },
  { id: uuidv4(), func: "Sales and Marketing" },
  { id: uuidv4(), func: "Operations" },
  { id: uuidv4(), func: "Customer Service" },
  { id: uuidv4(), func: "Project Management" },
  { id: uuidv4(), func: "Others" },
];

const expertises = [
  { id: uuidv4(), exp: "Markets/Growth" },
  { id: uuidv4(), exp: "Change Management" },
  { id: uuidv4(), exp: "Innovation" },
  { id: uuidv4(), exp: "Lean / Six Sigma" },
  { id: uuidv4(), exp: "Logistics & Supplychain" },
  { id: uuidv4(), exp: "Talent Management and Organizational Development" },
  { id: uuidv4(), exp: "HR lifecycel services" },
  { id: uuidv4(), exp: "Leadership Development" },
  { id: uuidv4(), exp: "Coaching" },
  { id: uuidv4(), exp: "Enterprice architecture" },
  { id: uuidv4(), exp: "Digital Transformation" },
  { id: uuidv4(), exp: "Cloud Consulting" },
  { id: uuidv4(), exp: "Cyber Security" },
];

const yrsOfExperience = [
  { id: uuidv4(), yrs: "Less than 5 years" },
  { id: uuidv4(), yrs: "5 - 10 years" },
  { id: uuidv4(), yrs: "10 - 15 years" },
  { id: uuidv4(), yrs: "15 - 20 years" },
  { id: uuidv4(), yrs: "20 - 25 years" },
  { id: uuidv4(), yrs: ">25 years" },
];

const higherEducationDegrees = [
  { id: uuidv4(), degree: "Bachelor's" },
  { id: uuidv4(), degree: "Master's" },
  { id: uuidv4(), degree: "Doctorate" },
  { id: uuidv4(), degree: "Diploma" },
  { id: uuidv4(), degree: "Certificate" },
  { id: uuidv4(), degree: "Associate Degree" },
];

const availabities = [
  { value: 'daily', label: 'Daily' },
  { value: 'allWeekdays', label: 'All Weekdays' },
  { value: 'weekendsOnly', label: 'Weekends only' },
  { value: 'customSpecify', label: 'Custom specify' },
]

const BasicDetails = () => {
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState("");
  const [base64Photo, setBase64Photo] = useState("");
  const [contactNumber, setContactNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [industry, setIndustry] = useState('');
  const [designation, setDesignation] = useState('');
  const [func, setFunc] = useState('');
  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [institute, setInstitute] = useState('');

  const inputRefForPhoto = useRef(null);


  const [consultantDetails, setConsultantDetails] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    orgName: '',
    industry: '',
    designation: '',
    functionName: '',
    skills: '',
    yearsOfExperience: '',
    highestEducation: '',
    yearOfPassing: '',
    instituteName: '',
    photo:"",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultantDetails = async () => {
      try {
        const email = localStorage.getItem('consultantEmail');
        const response = await fetch('http://localhost:5000/consultant/edit/basic-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': email // Custom header to pass the email
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch consultant details');
        }
        console.log(response);
        const data = await response.json();
        console.log(data.consultant[0]);
        if (data.consultant) {
          setConsultantDetails(data.consultant[0].basicdetails[0]);
        }
      } catch (error) {
        console.error('Error fetching consultant details:', error);
      }
    };
  
    fetchConsultantDetails();
  },[]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultantDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const email = localStorage.getItem('consultantEmail');
      const response = await fetch('http://localhost:5000/consultant/edit/basic-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'email': email
        },
        body: JSON.stringify(consultantDetails),
      });

      if (response.ok) {
        console.log('Details updated successfully');
      } else {
        console.error('Failed to update details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  const handleImageClick = () => {
    inputRefForPhoto.current.click();
  };

  const handleProfilePercentageClick = () => {
    setShowFullProfile(true);
  };

  const handleFileChange = (e) => {
    const uploadedPhoto = e.target.files[0];
    if (uploadedPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (base64String) {
          setPhoto(base64String);
          setConsultantDetails(prev=> ({
            ...prev,
            photo:base64String
          }));
          console.log(photo);
        } else {
          console.error('Failed to convert image to base64');
        }
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
      };
      reader.readAsDataURL(uploadedPhoto);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div className='AdditionalDetailsContainer'>
      <form className='user-basic-profile-form-container' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="photo-input-container">
  <div
    onClick={handleImageClick}
    style={{ cursor: "pointer" }}
    className="photo-container"
  >
    {consultantDetails.photo ? (
      <img
        src={consultantDetails.photo}
        alt="profile"
        className="profile-img"
      />
    ) : (
      <img
        src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715322155/mdi_camera_gymqaw.png"
        alt="profile-img"
        className="profile-img"
      />
    )}
    <input
      type="file"
      id="profile-photo"
      ref={inputRefForPhoto}
      style={{ display: "none" }}
      onChange={handleFileChange}
    />
  </div>
  <label
    className="image-label"
    htmlFor="profile-photo"
  >
    Edit profile photo
  </label>
</div>
        <div className="basic-form-details-names" >
          <div>
            <label htmlFor="firstName" className='user-basic-profile-label'>First Name</label>
            <div className="input-group">
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
              </div>
              <input
            type="text"
            id="firstName"
            name="firstName"
            value={consultantDetails.firstName}
            onChange={handleChange}
            className='user-basic-profile-input-field'
          />
            </div>
          </div>
          <div className='basic-profile-second-container'>
            <label htmlFor="lastName" className='user-basic-profile-label'>Last Name</label>
            <div className="input-group">
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
              </div>
              <input
            type="text"
            id="lastName"
            name="lastName"
            value={consultantDetails.lastName}
            onChange={handleChange}
            className='user-basic-profile-input-field'
          />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="contactNumber" className='user-basic-profile-label'>Contact Number</label>
          <div className="input-group">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
              </svg>
            </div>
            <input
            type="text"
            id="contact"
            name="contact"
            value={consultantDetails.contact}
            onChange={handleChange}
            className='user-basic-profile-input-field'
          />
          </div>
        </div>

        <div>
          <label htmlFor="organization" className='user-basic-profile-label'>Name of the Organization (current or last active)</label>
          <div className="input-group">
            <div className="icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
            </div>
            <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={consultantDetails.orgName}
            onChange={handleChange}
            className='user-basic-profile-input-field'
          />
          </div>
        </div>

        <div>
          <label htmlFor="industry" className='user-basic-profile-label'>Industry</label>
          <div className="input-group">
            <div className="icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
            </div>
            <select
      id="industry"
      className='user-basic-profile-input-field'
      value={consultantDetails.industry}
      onChange={(e) => setConsultantDetails(prev => ({...prev, industry: e.target.value}))}
    >
      <option value="" disabled hidden>Select Industry</option>
      {industries.map(ind => (
        <option key={ind.id} value={ind.industry}>{ind.industry}</option>
      ))}
    </select>
          </div>
        </div>

        <div>
          <label htmlFor="designation" className='user-basic-profile-label'>Designation</label>
          <div className="input-group">
            <div className="icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
            </div>
            <select
      id="designation"
      className='user-basic-profile-input-field'
      value={consultantDetails.designation}
      onChange={(e) => setConsultantDetails(prev => ({...prev, designation: e.target.value}))}
    >
      <option value="" disabled hidden>Select Designation</option>
      {designations.map(des => (
        <option key={des.id} value={des.designation}>{des.designation}</option>
      ))}
    </select>
          </div>
        </div>

        <div>
          <label htmlFor="func" className='user-basic-profile-label'>Function</label>
          <div className="input-group">
            <div className="icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
            </div>
            <select
      id="func"
      className='user-basic-profile-input-field'
      value={consultantDetails.func}
      onChange={(e) => setConsultantDetails(prev => ({...prev, func: e.target.value}))}
    >
      <option value="" disabled hidden>Select Function</option>
      {functions.map(fn => (
        <option key={fn.id} value={fn.func}>{fn.func}</option>
      ))}
    </select>
          </div>
        </div>

        <div>
          <label htmlFor="expertise" className='user-basic-profile-label'>Skills and Expertise</label>
          <div className="input-group">
            <div className="icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
            </div>
            <select
      id="expertise"
      className='user-basic-profile-input-field'
      value={consultantDetails.skills}
      onChange={(e) => setConsultantDetails(prev => ({...prev, skills: e.target.value}))}
    >
      <option value="" disabled hidden>Select Skills and Expertise</option>
      {expertises.map(exp => (
        <option key={exp.id} value={exp.exp}>{exp.exp}</option>
      ))}
    </select>
          </div>
        </div>

        <div  className="basic-form-details-names">
        <div>
  <label htmlFor="experience" className='user-basic-profile-label'>Years of Experience</label>
  <div className="input-group">
    <div className="icon-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
      </svg>
    </div>
    <select
      id="experience"
      className='user-basic-profile-input-field'
      value={consultantDetails.yearsOfExperience}
      onChange={(e) => setConsultantDetails(prev => ({...prev, yearsOfExperience: e.target.value}))}
    >
      <option value="" disabled hidden>Select Years of Experience</option>
      {yrsOfExperience.map(exp => (
        <option key={exp.id} value={exp.yrs}>{exp.yrs}</option>
      ))}
    </select>
  </div>
</div>


          <div className='basic-profile-second-container'>
            <label htmlFor="education" className='user-basic-profile-label'>Highest Education Qualification</label>
            <div className="input-group">
              <div className="icon-container">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
              </div>
              <select
      id="education"
      className='user-basic-profile-input-field'
      value={consultantDetails.education}
      onChange={(e) => setConsultantDetails(prev => ({...prev, education: e.target.value}))}
    >
      <option value="" disabled hidden>Select Highest Education</option>
      {higherEducationDegrees.map(deg => (
        <option key={deg.id} value={deg.degree}>{deg.degree}</option>
      ))}
    </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="passingYear" className='user-basic-profile-label'>Year of Passing of Highest Education</label>
          <div className="input-group">
            <div className="icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
            </div>
            <input
              type="text"
              id="passingYear"
              placeholder="Year"
              className='user-basic-profile-input-field'
              value={consultantDetails.yearOfPassing}
              onChange={(e) => setPassingYear(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="institute" className='user-basic-profile-label'>Institute/University Name (From where highest education pursued)</label>
          <div className="input-group">
            <div className="icon-container">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
            </div>
            <input
              type="text"
              id="institute"
              placeholder="University Name"
              className='user-basic-profile-input-field'
              value={consultantDetails.instituteName}
              onChange={(e) => setInstitute(e.target.value)}
            />
          </div>
        </div>

        <div className='user-basic-profile-button-container'>
       <button className="user-basic-profile-save-button">Save Changes</button>
     </div>
      </form>
      </div>
    )
}

const AdditionalDetails = () => {
  const [additionalConsultantDetails, setadditionalConsultantDetails] = useState({
    aboutYourself: "",
    linkedinProfile: "",
    feePerSession: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultantDetails = async () => {
      try {
        const email = localStorage.getItem('consultantEmail');
        const response = await fetch('http://localhost:5000/consultant/edit/basic-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': email // Custom header to pass the email
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch consultant details');
        }
  
        const data = await response.json();
        console.log(data.consultant[0]);
        if (data.consultant) {
          setadditionalConsultantDetails(data.consultant[0].additionalDetails[0]);
        }
      } catch (error) {
        console.error('Error fetching consultant details:', error);
      }
    };
  
    fetchConsultantDetails();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setadditionalConsultantDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = localStorage.getItem('consultantEmail');
      const response = await fetch('http://localhost:5000/consultant/edit/additional-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'email': email
        },
        body: JSON.stringify(additionalConsultantDetails),
      });

      if (response.ok) {
        console.log('Additional details updated successfully');
      } else {
        console.error('Failed to update additional details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="AdditionalDetailsContainer">
      <form className="Addition-details-top-form" onSubmit={handleSubmit}>
        <h2 className="AdditionalDetailsHeading">Additional Details</h2>

        <div className="Additional-details-form-group">
          <label htmlFor="aboutYourself" className="Additional-details-form-label">
            Tell people about yourself
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <textarea
              id="aboutYourself"
              name="aboutYourself"
              className="user-basic-profile-text-field"
              placeholder="Write something about yourself..."
              rows={5}
              value={additionalConsultantDetails.aboutYourself}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="Additional-details-form-group">
          <label htmlFor="linkedinProfile" className="Additional-details-form-label">
            LinkedIn Profile
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              type="text"
              id="linkedinProfile"
              name="linkedinProfile"
              className="user-basic-profile-input-field"
              placeholder="Your LinkedIn profile URL"
              value={additionalConsultantDetails.linkedinProfile}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="Additional-details-form-group">
          <label htmlFor="feePerSession" className="Additional-details-form-label">
            Fee per session (a session is typically 1hr - 1.5hr)
          </label>
          <div className="input-group">
            <div className="icon-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              type="text"
              id="feePerSession"
              name="feePerSession"
              className="user-basic-profile-input-field"
              placeholder="Enter fee per session"
              value={additionalConsultantDetails.feePerSession}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="user-additional-profile-button-container">
          <button type="submit" className="user-additional-profile-save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};


const CriticalDetails = () => {
  const [criticalConsultantDetails, setCriticalConsultantDetails] = useState({
    makeYourAvailability: "",
    provideTimeAvailability: "",
  });
  const [availability,setAvailability] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultantDetails = async () => {
      try {
        const email = localStorage.getItem('consultantEmail');
        const response = await fetch('http://localhost:5000/consultant/edit/basic-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': email // Custom header to pass the email
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch consultant details');
        }
  
        const data = await response.json();
        console.log(data.consultant[0]);
        if (data.consultant) {
          setCriticalConsultantDetails(data.consultant[0].criticalDetails[0]);
        }
      } catch (error) {
        console.error('Error fetching consultant details:', error);
      }
    };
  
    fetchConsultantDetails();
  }, []);


  useEffect(() => {
    console.log('Availability changed:', availability);
  }, [availability]);

  

  const handleChange1 = (event) => {
    const { value, checked } = event.target;
    const lowerValue = value.toLowerCase();
  
    setAvailability((prevSelectedOptions) => {
      let newAvailability;
      if (checked) {
        newAvailability = [...prevSelectedOptions, lowerValue];
      } else {
        newAvailability = prevSelectedOptions.filter((option) => option !== lowerValue);
      }
  
      // If "customSpecify" is unchecked, remove it from the array
      if (lowerValue === 'customspecify' && !checked) {
        newAvailability = newAvailability.filter(option => !option.includes('customspecify'));
      }
  
      console.log('New availability:', newAvailability);
      setCriticalConsultantDetails(prevState => ({
        ...prevState,
        makeYourAvailability: newAvailability.join(', ')
      }));
  
      return newAvailability;
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriticalConsultantDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    try {
      const email = localStorage.getItem('consultantEmail');
      const response = await fetch('http://localhost:5000/consultant/edit/critical-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'email': email
        },
        body: JSON.stringify(criticalConsultantDetails),
      });

      if (response.ok) {
        console.log('Critical details updated successfully');
      } else {
        console.error('Failed to update critical details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="AdditionalDetailsContainer">
      <form className="critical-details-form" onSubmit={handleSaveChanges}>
        <h2 className="critical-details-heading">Critical Details</h2>

        <div className="marking-availability-container">
          <label className="details-form-label-el" htmlFor="">
            Mark your availability
          </label>
          {availabities.map(e => (
  <div className="availability-con" key={e.value}>
    <input
      type="checkbox"
      className="checkbox-availability"
      id={e.value}
      value={e.value}
      checked={availability.includes(e.value.toLowerCase())}
      onChange={handleChange1}
    />
    <label className="availability-label-el" htmlFor={e.value}>
      {e.label}
    </label>
  </div>
))}
        </div>

        <div className="critical-details-form-group">
          <label htmlFor="provideTimeAvailability" className="critical-details-form-label">
            Provide time availability
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black" />
              </svg>
            </div>
            <input
              type="text"
              id="provideTimeAvailability"
              name="provideTimeAvailability"
              className="user-basic-profile-input-field"
              placeholder="e.g., 9 AM - 5 PM"
              value={criticalConsultantDetails.provideTimeAvailability}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="user-critical-profile-button-container">
          <button type="submit" className="user-critical-profile-save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};



const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    bankAccountNumber: "",
    ifscCode: "",
    bankName: "",
    bankBranch: "",
     panNumber: ""
  });

  useEffect(() => {
    const fetchConsultantDetails = async () => {
      try {
        const email = localStorage.getItem('consultantEmail');
        const response = await fetch('http://localhost:5000/consultant/edit/basic-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': email // Custom header to pass the email
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch consultant details');
        }
  
        const data = await response.json();
        console.log(data.consultant[0]);
        if (data.consultant) {
          setPaymentDetails(data.consultant[0].paymentDetails[0]);
        }
      } catch (error) {
        console.error('Error fetching consultant details:', error);
      }
    };
  
    fetchConsultantDetails();
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitPaymentDetails = async (event) => {
    event.preventDefault();
    try {
      const email = localStorage.getItem('consultantEmail');
      const response = await fetch('http://localhost:5000/consultant/edit/payment-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'email': email
        },
        body: JSON.stringify(paymentDetails),
      });
      
      if (response.ok) {
        console.log('Payment details updated successfully');
        // You might want to show a success message to the user here
      } else {
        console.error('Failed to update payment details');
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="AdditionalDetailsContainer">
      <form
        className="user-basic-profile-form-container"
        onSubmit={handleSubmitPaymentDetails}
      >
        <h2 className="critical-details-heading">Payment Details</h2>
        <div>
          <label htmlFor="bankAccountNumber" className="user-basic-profile-label">
            Bank account number
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              type="text"
              id="bankAccountNumber"
              name="bankAccountNumber"
              placeholder="25273916981"
              className="user-basic-profile-input-field"
              value={paymentDetails.bankAccountNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="ifscCode" className="user-basic-profile-label">
            ifscCode
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              placeholder="XYZ"
              className="user-basic-profile-input-field"
              value={paymentDetails.ifscCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="bankName" className="user-basic-profile-label">
            Bank name
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              type="text"
              id="bankName"
              name="bankName"
              placeholder="XYZ"
              className="user-basic-profile-input-field"
              value={paymentDetails.bankName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="bankBranch" className="user-basic-profile-label">
            Branch address
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              type="text"
              id="bankBranch"
              name="bankBranch"
              placeholder="Branch Address"
              className="user-basic-profile-input-field"
              value={paymentDetails.bankBranch}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor=" panNumber" className="user-basic-profile-label">
             panNumber number (Ensure name is same as appearing in bank credentials and  panNumber card)
          </label>
          <div className="input-group">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z"
                  fill="black"
                />
              </svg>
            </div>
            <input
              type="text"
              id=" panNumber"
              name=" panNumber"
              placeholder=" panNumber Number"
              className="user-basic-profile-input-field"
              value={paymentDetails. panNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="user-basic-profile-button-container">
          <button className="user-basic-profile-save-button" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};


const ConsultantProfileBasicDetails = () => {
  const [activeSection, setActiveSection] = useState("basic");
  return (
    <div className="user-basic-profile-container">
      
      <div className="button-group">
        <div
          // className={`button-outlier ${
          //   activeSection === "basic" ? "active" : ""
          // }`}
        >
          <button
            className={`profile-button ${
              activeSection === "basic" ? "active" : ""
            }`}
            onClick={() => setActiveSection("basic")}
          >
            Basic Details
          </button>
        </div>
        <div
          // className={`button-outlier ${
          //   activeSection === "basic" ? "active" : ""
          // }`}
        >
          <button
            className={`profile-button ${
              activeSection === "additional" ? "active" : ""
            }`}
            onClick={() => setActiveSection("additional")}
          >
            Additional Details
          </button>
        </div>
        <div
          // className={`button-outlier ${
          //   activeSection === "basic" ? "active" : ""
          // }`}
        >
          <button
            className={`profile-button ${
              activeSection === "critical" ? "active" : ""
            }`}
            onClick={() => setActiveSection("critical")}
          >
            Critical Details
          </button>
        </div>
        <div
          // className={`button-outlier ${
          //   activeSection === "basic" ? "active" : ""
          // }`}
        >
          <button
            className={`profile-button ${
              activeSection === "payment" ? "active" : ""
            }`}
            onClick={() => setActiveSection("payment")}
          >
            Payment Details
          </button>
        </div>
      </div>
      <div className="form-container">
        {activeSection === "basic" && <BasicDetails />}
        {activeSection === "additional" && <AdditionalDetails />}
        {activeSection === "critical" && <CriticalDetails />}
        {activeSection === "payment" && <PaymentDetails />}
      </div>
    </div>
  );
};

export default ConsultantProfileBasicDetails;
