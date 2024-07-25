import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
//image compression
import imageCompression from 'browser-image-compression';

const designations = [
  {
    id: uuidv4(),
    designation: "Select",
  },
  {
    id: uuidv4(),
    designation: "Senior Manager",
  },
  {
    id: uuidv4(),
    designation: "Assistant General Manager",
  },
  {
    id: uuidv4(),
    designation: "Deputy General Manager",
  },
  {
    id: uuidv4(),
    designation: "General Manager",
  },
  {
    id: uuidv4(),
    designation: "Senior General Manager",
  },
  {
    id: uuidv4(),
    designation: "AVP",
  },
  {
    id: uuidv4(),
    designation: "DVP",
  },
  {
    id: uuidv4(),
    designation: "VP",
  },
  {
    id: uuidv4(),
    designation: "Sr VP",
  },
  {
    id: uuidv4(),
    designation: "EVP",
  },
  {
    id: uuidv4(),
    designation: "President",
  },
  {
    id: uuidv4(),
    designation: "Director",
  },
  {
    id: uuidv4(),
    designation: "Senior Director",
  },
  {
    id: uuidv4(),
    designation: "Executive Director",
  },
];

const functions = [
  {
    id: uuidv4(),
    func: "Select",
  },
  {
    id: uuidv4(),
    func: "HR",
  },
  {
    id: uuidv4(),
    func: "Legal",
  },
  {
    id: uuidv4(),
    func: "Finance & Accounts/Taxation",
  },
  {
    id: uuidv4(),
    func: "Company Secretarial",
  },
  {
    id: uuidv4(),
    func: "Information Technology",
  },
  {
    id: uuidv4(),
    func: "Risk & Compliance",
  },
  {
    id: uuidv4(),
    func: "Sales and Marketing",
  },
  {
    id: uuidv4(),
    func: "Operations",
  },
  {
    id: uuidv4(),
    func: "Customer Service",
  },
  {
    id: uuidv4(),
    func: "Project Management",
  },
  {
    id: uuidv4(),
    func: "Others",
  },
];

const industries = [
  {
    id: uuidv4(),
    value: "Select (mark most recent 3)",
    label: "Select (mark most recent 3)",
  },
  {
    id: uuidv4(),
    value: "Pharma / Healthcare",
    label: "Pharma / Healthcare",
  },
  {
    id: uuidv4(),
    value: "Start ups",
    label: "Start ups",
  },
  {
    id: uuidv4(),
    value: "Infrastructure",
    label: "Infrastructure",
  },
  {
    id: uuidv4(),
    value: "Retail and E comm",
    label: "Retail and E comm",
  },
  {
    id: uuidv4(),
    value: "Energy",
    label: "Energy",
  },
  {
    id: uuidv4(),
    value: "Real Estate",
    label: "Real Estate",
  },
  {
    id: uuidv4(),
    value: "Education",
    label: "Education",
  },
  {
    id: uuidv4(),
    value: "Manufacturing",
    label: "Manufacturing",
  },
  {
    id: uuidv4(),
    value: "Chemicals",
    label: "Chemicals",
  },
  {
    id: uuidv4(),
    value: "Aviation",
    label: "Aviation",
  },
  {
    id: uuidv4(),
    value: "Automotive",
    label: "Automotive",
  },
  {
    id: uuidv4(),
    value: "Banking, Insurance & NBFC",
    label: "Banking, Insurance & NBFC",
  },
  {
    id: uuidv4(),
    value: "Technology - Food Tech, EdTech, Fintech, HRTech",
    label: "Technology - Food Tech, EdTech, Fintech, HRTech",
  },
  {
    id: uuidv4(),
    value: "FMCG / Durables",
    label: "FMCG / Durables",
  },
  {
    id: uuidv4(),
    value: "Others",
    label: "Others",
  },
];

const expertises = [
  // {
  //   id: uuidv4(),
  //   value: "Select (mark at most 5 skills)",
  // },
  {
    id: uuidv4(),
    value: "Markets/Growth",
    label: "Markets/Growth",
  },
  {
    id: uuidv4(),
    value: "Change Management",
    label: "Change Management",
  },
  {
    id: uuidv4(),
    value: "Innovation",
    label: "Innovation",
  },
  {
    id: uuidv4(),
    value: "Lean / Six Sigma",
    label: "Lean / Six Sigma",
  },
  {
    id: uuidv4(),
    value: "Logistics & Supplychain",
    label: "Logistics & Supplychain",
  },
  {
    id: uuidv4(),
    value: "Talent Management and Organizational Development",
    label: "Talent Management and Organizational Development",
  },
  {
    id: uuidv4(),
    value: "HR lifecycel services",
    label: "HR lifecycel services",
  },
  {
    id: uuidv4(),
    value: "Leadership Development",
    label: "Leadership Development",
  },
  {
    id: uuidv4(),
    value: "Coaching",
    label: "Coaching",
  },
  {
    id: uuidv4(),
    value: "Enterprice architecture",
    label: "Enterprice architecture",
  },
  {
    id: uuidv4(),
    value: "Digital Transformation",
    label: "Digital Transformation",
  },
  {
    id: uuidv4(),
    value: "Cloud Consulting",
    label: "Cloud Consulting",
  },
  {
    id: uuidv4(),
    value: "Cyber Security",
    label: "Cyber Security",
  },
];

const yrsOfExperience = [
  {
    id: uuidv4(),
    yrs: "Select",
  },
  {
    id: uuidv4(),
    yrs: "Less than 5 years",
  },
  {
    id: uuidv4(),
    yrs: "5 - 10 years",
  },
  {
    id: uuidv4(),
    yrs: "10 - 15 years",
  },
  {
    id: uuidv4(),
    yrs: "15 - 20 years",
  },
  {
    id: uuidv4(),
    yrs: "20 - 25 years",
  },
  {
    id: uuidv4(),
    yrs: ">25 years",
  },
];

const DetailsForm = () => {
  //photo file
  const [photo, setPhoto] = useState(null);
  const [base64Photo, setBase64Photo] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [industry, setIndustry] = useState("");
  const [industrySelected, setIndustriesSelected] = useState([]);
  const [highestEducation, setHighestEducation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [designation, setDesigantion] = useState("");
  const [yrOfPassing, setYrOfPassing] = useState("");
  const [universityName, setUniversityName] = useState("");
  //funtion or department
  const [department, setDepartment] = useState("");
  //area of expertise or consulting
  const [expertise, setExpertise] = useState("");
  const [selectedExpertises, setSelectedExpertises] = useState([]);
  //select input
  const [title, setTitle] = useState("");
  //diversity of experience
  const [experience, setExperience] = useState("");
  //about consultant
  //resume file
  //supporting document file
  const [readMoreToggle, setReadMoreToggle] = useState(true);

  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  //using useRef() hook
  const inputRefForPhoto = useRef(null);
  
  

  const onSubmitDetailsForm = async (e) => {
    e.preventDefault();
    
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

      // Ensure all variables are defined and initialized
      console.log(firstName);
      console.log(lastName);
      console.log(base64Photo);
      console.log(contact);
      console.log(organizationName);
      console.log(designation);
      console.log(department);
      console.log(experience);
      console.log(highestEducation);
      console.log(industrySelected);
      console.log(selectedExpertises);
      console.log(yrOfPassing);
      console.log(universityName); // assuming this variable is also needed

      const formData = {
        email: consultantEmail,
        firstName,
        lastName,
        contact,
        orgName: organizationName,
        industry: industrySelected,
        designation,
        functionName: department,
        skills: selectedExpertises,
        yearsOfExperience: experience,
        highestEducation,
        yearOfPassing: yrOfPassing,
        instituteName: universityName,
        photo: base64Photo,
      };
  
      console.log("Submitting form data:", formData);
  
      const response = await fetch(
        "http://localhost:5000/consultant/register/basic-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${parsedToken.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      
      console.log(response);
      const {data}= await response.json();
      console.log(data);
      console.log(response.ok);
      if (response.ok=== true) {
        navigate("/consultant/additional-details");
      } else {
        console.error('Failed to submit form:', response.statusText);
      }

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const readMore =
    "By providing your information for registration process, you consent to Syntropy collecting, using, and disclosing this information solely for the purpose of offering you consultation services tailored to your needs and demographics.Your information will be treated confidentially and will not be used for any marketing,professional, or other purposes.";
  const readLess =
    "By providing your information for registration process, you consent to Syntropy collection, using, and ";

  const readBtnTxt = readMoreToggle ? "ReadMore" : "ReadLess";
  const readConsentMsg = readMoreToggle ? readLess : readMore;
  // const companyListsHiding =  & companyList.length > 0

  //handling image click
  const handleImageClick = () => {
    inputRefForPhoto.current.click();
  };

  //handle industries selection
  const handleIndustriesSelection = (selected) => {
    if (selected.length <= 3) {
      setIndustriesSelected(selected);
    }
  };

  //handle expertises selection
  const handleSkillsSelection = (selected) => {
    if (selected.length <= 5) {
      setSelectedExpertises(selected);
    }
  };

  const handleFileChange = (e) => {
    const uploadedPhoto = e.target.files[0];
    if (uploadedPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (base64String) {
          setBase64Photo(base64String);
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
    <div className="details-form-bg-container">
      <img
        src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1714724348/Rectangle_51_izuu5g.png"
        alt="signin-img"
        className="detailsform-image"
      />
      <div className="details-form-container">
        <h1 className="details-form-heading">Details Form</h1>
        <form onSubmit={onSubmitDetailsForm}>
          {/**photo input k */}
          <div className="photo-input-container">
            <div
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
              className="photo-container"
            >
              {base64Photo === null ? (
                <img
                src='https://res.cloudinary.com/dgl0v7vwf/image/upload/v1715322155/mdi_camera_gymqaw.png'
                alt="profile-img"
                className="profile-img"
              />) : (
              <img
                src={base64Photo}
                alt="profile-img"
                className="profile-img"
              />)}
              <input
                type="file"
                required
                id="profile-photo"
                ref={inputRefForPhoto}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <label
              className="details-form-label-el profile-img-label"
              htmlFor="profile-photo"
            >
              Add profile photo
            </label>
          </div>
          {/** name input k*/}
          <div className="details-form-name-container">
            <div className="name-input-container">
              <label className="details-form-label-el" htmlFor="firstname">
                First name
              </label>
              <input
                type="text"
                className="details-form-input-el-name"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstname"
                required
              />
            </div>
            <div className="name-input-container">
              <label className="details-form-label-el" htmlFor="lastname">
                Last name
              </label>
              <input
                type="text"
                className="details-form-input-el-name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastname"
                required
              />
            </div>
          </div>
          {/**contact input k*/}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="contact">
              Contact
            </label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              className="details-form-input-el"
              placeholder="Enter here..."
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              id="contact"
              required
            />
          </div>
          {/**name of the organization k*/}
          <div className="input-container">
            <label
              className="details-form-label-el"
              htmlFor="organization-name"
            >
              Name of the organization (current or last active)
            </label>
            <input
              type="text"
              className="details-form-input-el"
              placeholder="Enter here..."
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              id="organization-name"
              required
            />
          </div>
          {/** industry input k*/}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="industries">
              Industry
            </label>
            <Select
              options={industries}
              value={industrySelected}
              className="select-input-el"
              isMulti
              onChange={handleIndustriesSelection}
              placeholder="Select (mark most recent 3)"
              required
            />
          </div>
          {/**designation k*/}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="no-of-employees">
              Designation
            </label>
            <select
              required
              className="select-input-el"
              id="no-of-employees"
              onChange={(e) => setDesigantion(e.target.value)}
              value={designation}
            >
              {designations.map((e) => (
                <option value={e.designation} id={e.id}>
                  {e.designation}
                </option>
              ))}
            </select>
          </div>
          {/** function/department input k*/}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="no-of-employees">
              Function
            </label>
            <select
              required
              className="select-input-el"
              id="no-of-employees"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
            >
              {functions.map((e) => (
                <option value={e.func} id={e.id}>
                  {e.func}
                </option>
              ))}
            </select>
          </div>
          {/** skills and expertise input k*/}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="expertises">
              Expertises
            </label>
            <Select
              options={expertises}
              value={selectedExpertises}
              className="select-input-el"
              isMulti
              onChange={handleSkillsSelection}
              placeholder="Select (mark most recent 5)"
              required
            />
          </div>
          {/** years of experience and highest education qualification in one k*/}
          <div className="details-form-name-container">
            <div className="name-input-container">
              <label
                className="details-form-label-el"
                htmlFor="no-of-employees"
              >
                Years of experience
              </label>
              <select
                required
                className="yrs-of-exp-el"
                id="no-of-employees"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                {yrsOfExperience.map((e) => (
                  <option value={e.yrs} id={e.id}>
                    {e.yrs}
                  </option>
                ))}
              </select>
            </div>
            {/**highest education qualification k*/}
            <div className="name-input-container">
              <label
                className="details-form-label-el"
                htmlFor="highest-education"
              >
                Highest Education Qualification
              </label>
              <input
                type="text"
                className="details-form-input-el-name contact-input-el"
                placeholder="Enter here..."
                value={highestEducation}
                onChange={(e) => setHighestEducation(e.target.value)}
                id="highest-education"
                required
              />
            </div>
          </div>
          {/** year of passing of highest education qualification */}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="year-of-passing">
              Year of passing of Highest education
            </label>
            <input
              type="text"
              className="details-form-input-el"
              placeholder="Enter here..."
              value={yrOfPassing}
              onChange={(e) => setYrOfPassing(e.target.value)}
              id="year-of-passing"
              required
            />
          </div>
          {/** where highest education is done university name */}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="university-name">
              Institute/University Name(From where highest education pursued)
            </label>
            <input
              type="text"
              className="details-form-input-el"
              placeholder="Enter here..."
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              id="university-name"
              required
            />
          </div>
          {/** readmore consent */}
          <div className="details-form-checkbox-container">
            <input
              type="checkbox"
              className="details-form-checkbox"
              checked={check}
              onChange={(e) => setCheck(!check)}
            />
            <p className="details-form-consent-description">
              {`"${readConsentMsg} `}{" "}
              <span
                className="details-form-readmor-span"
                onClick={() => setReadMoreToggle(!readMoreToggle)}
              >{`${readBtnTxt}`}</span>
              "
            </p>
          </div>
          <button
            className="details-form-signup-btn"
            type="submit"
            disabled={!check}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsForm;
