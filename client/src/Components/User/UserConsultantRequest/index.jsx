import React, { useState, useRef, useEffect } from 'react';
import FooterSeaWireFooter from "../../FooterSeaWireFooter";
import "./index.css";
import consultation_request from "../Assets/consultation_request.jpeg";
import UserNavbar from "../UserNavbar";
import { v4 as uuidv4 } from 'uuid';
import AnimationThankYou from '../../UserAnimationThankyou';
import ThankYou from '../../UserThankYou';
import NoMatchedConsultationsView from '../../NoMatchedConsultantsView';

const industries = [
  {
    id: uuidv4(),
    industry: "Select",
  },
  {
    id: uuidv4(),
    industry: "Pharma / Healthcare",
  },
  {
    id: uuidv4(),
    industry: "Start ups",
  },
  {
    id: uuidv4(),
    industry: "Infrastructure",
  },
  {
    id: uuidv4(),
    industry: "Retail and E comm",
  },
  {
    id: uuidv4(),
    industry: "Energy",
  },
  {
    id: uuidv4(),
    industry: "Real Estate",
  },
  {
    id: uuidv4(),
    industry: "Education",
  },
  {
    id: uuidv4(),
    industry: "Manufacturing",
  },
  {
    id: uuidv4(),
    industry: "Chemicals",
  },
  {
    id: uuidv4(),
    industry: "Aviation",
  },
  {
    id: uuidv4(),
    industry: "Automotive",
  },
  {
    id: uuidv4(),
    industry: "Banking, Insurance & NBFC",
  },
  {
    id: uuidv4(),
    industry: "Technology - Food Tech, EdTech, Fintech, HRTech",
  },
  {
    id: uuidv4(),
    industry: "FMCG / Durables",
  },
  {
    id: uuidv4(),
    industry: "Others",
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

const expertises = [
   {
     id: uuidv4(),
     value: "Select",
  },
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

const apiStatusInfo = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const ConsultationRequest = () => {
  const [consultationTopic, setConsultationTopic] = useState("");
  const [industry, setIndustry] = useState("");
  const [func, setFunction] = useState("");
  const [expertiseArea, setExpertiseArea] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusInfo.initial);
  const [consultantDetails, setConsultantDetails] = useState(null);
  const consultationTopicRef = useRef(null);
  const additionalInfoRef = useRef(null);

  const handleConsultationRequest = async (e) => {
    e.preventDefault();
    try {
      setApiStatus(apiStatusInfo.inProgress);
      const customerEmail = localStorage.getItem("email");
      console.log(customerEmail);
      const response = await fetch('http://localhost:5000/customer/home/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry,
          functionName: func,
          expertiseArea,
          additionalInformation: additionalInfo,
          consultationTopic,
          customerEmail: customerEmail,
        }),
      });
      if (response.ok) {
        setApiStatus(apiStatusInfo.success);
        const data = await response.json();
        setConsultantDetails(data[0]);
      } else {
        setApiStatus(apiStatusInfo.failure);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (consultationTopicRef.current) {
      consultationTopicRef.current.focus();
    }
  }, [consultationTopic]);

  useEffect(() => {
    if (additionalInfoRef.current) {
      additionalInfoRef.current.focus();
    }
  }, [additionalInfo]);

  const handleConsultationTopic = e =>{
    setConsultationTopic(e.target.value)
  }

  const ConsultationRequestBody = () => {
    return (
      <>
        <UserNavbar />
        <div className="consultation-request-top-container">
          <div className="consultation-request-consultation-form">
            <h2 className="consultation-request-consultation-heading">
              Consultation Request
            </h2>
            <form onSubmit={handleConsultationRequest}>
              <div className="consultation-request-form-group">
                <label htmlFor="topic1">
                  Consultation Topic (Please tell us about what you want to consult on)
                </label>
                <textarea
                  id="topic1"
                  rows="4"
                  className="input-field"
                  value={consultationTopic}
                  onChange={handleConsultationTopic}
                  ref={consultationTopicRef}
                  dir="ltr"
                ></textarea>
              </div>
              <div className="consultation-request-form-group">
                <label htmlFor="industry">Industry:</label>
                <div className="input-with-icon">
                  <select id="industry" name="industry" className="input-field" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    {industries.map(e => (
                      <option key={e.industry} value={e.industry}>{e.industry}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="consultation-request-form-group">
                <label htmlFor="function">Function:</label>
                <div className="input-with-icon">
                  <select id="function" name="function" className="input-field" value={func} onChange={(e) => setFunction(e.target.value)}>
                    {functions.map(e => (
                      <option value={e.func} key={e.func}>{e.func}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="consultation-request-form-group">
                <label htmlFor="expertise">Expertise Area:</label>
                <div className="input-with-icon">
                  <select id="expertise" name="expertise" className="input-field" value={expertiseArea} onChange={(e) => setExpertiseArea(e.target.value)}>
                    {expertises.map(e => (
                      <option value={e.value} key={e.value}>{e.value}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="consultation-request-form-group">
                <label htmlFor="additional-info">Additional Information:</label>
                <textarea
                  id="additional-info"
                  name="additional-info"
                  rows="4"
                  className="input-field"
                  placeholder="Not strictly required"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  ref={additionalInfoRef}
                ></textarea>
              </div>
              <div className="consultation-request-button">
                <button className="consultation-btn-request" type="submit">
                  Request Consultation
                </button>
              </div>
            </form>
          </div>
          <div className="consultation-request-image">
            <img src={consultation_request} className="image1" alt="consultation" />
          </div>
        </div>
        <FooterSeaWireFooter />
      </>
    );
  };

  const RenderConsultationRequest = () => {
    switch (apiStatus) {
      case apiStatusInfo.success:
        return <ThankYou consultantDetails={consultantDetails} />;
      case apiStatusInfo.inProgress:
        return <AnimationThankYou />;
      case apiStatusInfo.initial:
        return <ConsultationRequestBody />;
      case apiStatusInfo.failure:
        return <NoMatchedConsultationsView />;
      default:
        return null;
    }
  };

  return <RenderConsultationRequest />;
};

export default ConsultationRequest;
