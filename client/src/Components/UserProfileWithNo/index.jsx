import React, { useState, useEffect, useRef } from "react";
import './index.css'; 
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useNavigate } from "react-router-dom";



const companyTypes = [
 
  {
    id: uuidv4(),
    type: "Startup",
  },
  {
    id: uuidv4(),
    type: "Public",
  },
  {
    id: uuidv4(),
    type: "Private",
  },
  {
    id: uuidv4(),
    type: "Government",
  },
  {
    id: uuidv4(),
    type: "Non-Profit",
  },
  {
    id: uuidv4(),
    type: "MNC",
  },
  {
    id: uuidv4(),
    type: "SME",
  },
  {
    id: uuidv4(),
    type: "Indian MNC",
  },
  {
    id: uuidv4(),
    type: "Other",
  },
];

const numberOfEmployees = [
 
  {
    id: uuidv4(),
    number: "1-10",
  },
  {
    id: uuidv4(),
    number: "11-50",
  },
  {
    id: uuidv4(),
    number: "51-200",
  },
  {
    id: uuidv4(),
    number: "201-500",
  },
  {
    id: uuidv4(),
    number: "501-1000",
  },
  {
    id: uuidv4(),
    number: "1001-5000",
  },
  {
    id: uuidv4(),
    number: "5001-10000",
  },
  {
    id: uuidv4(),
    number: "10000+",
  },
];

const natureOfOfferings = [
  {
    id: uuidv4(),
    offering: "Product",
  },
  {
    id: uuidv4(),
    offering: "Service",
  },
  {
    id: uuidv4(),
    offering: "Product & Services",
  },
  {
    id: uuidv4(),
    offering: "Captive",
  },
  {
    id: uuidv4(),
    offering: "Innovation Labs",
  },
  {
    id: uuidv4(),
    offering: "R&D/Development Center",
  },
  {
    id: uuidv4(),
    offering: "Market Place",
  },
  {
    id: uuidv4(),
    offering: "Other",
  },
];

const fundingStage = [

  {
    id: uuidv4(),
    stage: "Bootstrapped",
  },
  {
    id: uuidv4(),
    stage: "Seed Stage",
  },
  {
    id: uuidv4(),
    stage: "Series A",
  },
  {
    id: uuidv4(),
    stage: "Series B",
  },
  {
    id: uuidv4(),
    stage: "Series C",
  },
  {
    id: uuidv4(),
    stage: "Series D and beyond",
  },
  {
    id: uuidv4(),
    stage: "Unicorn",
  },
  {
    id: uuidv4(),
    stage: "IPO",
  },
  {
    id: uuidv4(),
    stage: "Acquired",
  },
  {
    id: uuidv4(),
    stage: "Not Sure",
  },
  {
    id: uuidv4(),
    stage: "Other",
  },
];


const styles = {
  autocomplete: {
    position: "relative",
    display: "inline-block",
  },
  autocompleteList: {
    border: "1px solid #d4d4d4",
    borderBottom: "none",
    borderTop: "none",
    zIndex: 99,
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    maxHeight: "200px",
    overflowY: "auto",
  },
  autocompleteItems: {
    border: "1px solid #d4d4d4",
    borderBottom: "none",
    cursor: "pointer",
    padding: "10px",
    backgroundColor: "#fff",
  },
  autocompleteItemsHover: {
    backgroundColor: "#e9e9e9",
  },
  autocompleteActive: {
    backgroundColor: "DodgerBlue",
    color: "#ffffff",
  },
};


const UserProfileWithNo = () => {

  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState("");
  const [email, setemail] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [offeringNature, setOfferingNature] = useState("");
  const [funding, setFunding] = useState("");
  const [companyFoundingYr, setCompanyFoundinYr] = useState();
  const [headquarters, setHeadquarters] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteListRef = useRef(null);
  //filtered companies are stored
  const [companyList, setFilteredCompanies] = useState([]);
  //company option clicked
  const [companyClicked, setCompanyClicked] = useState(false);
  //toggle password type
  //result to store api data
  const [companies, setCompanies] = useState([]);
  //for check box
  const [check, setChecked] = useState(false);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const startYear = 1800;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    let id = uuidv4();
    let obj = { id, year };
    years.push(obj);
  }
 
  years.reverse();

  //getting all companies
  const getCompanies = async () => {
    try {
      const { data } = await axios.get(
        "https://api.thecompaniesapi.com/v1/companies?size=100"
      );
      // console.log(data)
      setCompanies(data.companies);
      // console.log(companies)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  
  const filterCompanies = () => {
    const filteredCompanies = companies.filter((each) =>
      each.name.toLowerCase().includes(company.toLowerCase())
    );
    setFilteredCompanies(filteredCompanies);
  };

  // useEffect(() =>{
  //   filterCompanies()
  // },[])

  //cities
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (headquarters.length < 3) {
        setSuggestions([]);
        return;
      }

      const username = 'viswateja';
      const url = `https://secure.geonames.org/searchJSON?name_startsWith=${headquarters}&maxRows=5&username=${username}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        if (!data.geonames || data.geonames.length === 0) {
          setSuggestions([{ name: 'No results found', countryName: '' }]);
        } else {
          setSuggestions(data.geonames);
        }
      } catch (error) {
        console.error('Error fetching data from Geonames:', error);
      }
    };

    fetchSuggestions();
  }, [headquarters]);

  const handleSuggestionClick = (suggestion) => {
    setHeadquarters(`${suggestion.name}, ${suggestion.countryName}`);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (
      autocompleteListRef.current &&
      !autocompleteListRef.current.contains(e.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onSubmitDetailsForm = async (e) => {
    e.preventDefault();
  };

  
  return (
    <div className="user-profile-with-no-profile-container">
      <form onSubmit={onSubmitDetailsForm}>
        <h1 className='user-profile-with-no-heading'>Your Profile</h1>
        <div className="user-profile-with-no-form">
          <div className="user-profile-with-no-form-group">
            <label htmlFor="companyName" className='user-profile-with-no-label'>Company Name</label>
            <div className="input-group1">
              <div className="icon-container1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
              </div>
              <input id="companyName" type="text" placeholder="XYZ Company"    value={company}
              onChange={(e) => (setCompany(e.target.value), filterCompanies())}
           className='user-profile-with-no-input-field' style={{color: 'black'}} />
            </div>
          </div>
   
          <div className="user-profile-with-no-form-group">
            <label htmlFor="industry" className='user-profile-with-no-label'>Industry</label>
            <div className="input-group1">
              <div className="icon-container1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
              </div>
              <input id="industry" type="text" placeholder="Industry1, Industry2, Industry3" onChange={(e) => {
                setIndustry(e.target.value);
              }}
              value={industry} className='user-profile-with-no-input-field' />
            </div>
          </div>
   
          <div className="user-profile-with-no-form-group inline-group">
            <div>
              <label htmlFor="companyType" className='user-profile-with-no-label'>Company Type</label>
              <div className="input-group1">
                <div className="icon-container1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
                </svg>
             </div>

             <select required
               className='user-profile-with-no-input-field'
               id="companyType"
               onChange={(e) => setCompanyType(e.target.value)}
               value={companyType}
             >
              <option value="" disabled selected hidden>XYZ</option>
               {companyTypes.map((e) => (
                 <option className="select-option" value={e.type} id={e.id}>
                   {e.type}
                 </option>
               ))}
             </select>
           </div>
         </div>

         <div>
           <label htmlFor="fundingStage" className='user-profile-with-no-label'>Funding Stage</label>
           <div className="input-group1">
             <div className="icon-container1">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
               </svg>
             </div>

             <select required
               id="fundingStage" className='user-profile-with-no-input-field'
               onChange={(e) => setFunding(e.target.value)}
               value={funding}
             >
              <option value="" disabled selected hidden>XYZ</option>
               {fundingStage.map((e) => (
                 <option value={e.stage} className="select-option" id={e.id}>
                   {e.stage}
                 </option>
               ))}
             </select>

           </div>
         </div>
       </div>

       <div className="user-profile-with-no-form-group inline-group">
         <div>
           <label htmlFor="companyFounded" className='user-profile-with-no-label'>Company Founded</label>
           <div className="input-group1">
             <div className="icon-container1">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
               </svg>
             </div>

             <select
               required
               id="companyFounded" className='user-profile-with-no-input-field'
               value={companyFoundingYr}
               onChange={(e) => setCompanyFoundinYr(e.target.value)}
             >
              <option value="" disabled selected hidden>XYZ</option>
               {years.map((e) => (
                 <option value={e.year} id={e.id} className="select-option">
                   {e.year}
                 </option>
               ))}
             </select>
           </div>
         </div>

         <div>
           <label htmlFor="numberOfEmployees" className='user-profile-with-no-label'>Number of Employees</label>
           <div className="input-group1">
             <div className="icon-container1">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
               </svg>
             </div>

             <select
               required
               id="numberOfEmployees" className='user-profile-with-no-input-field'
               onChange={(e) => setCompanySize(e.target.value)}
               value={companySize}
             >
              <option value="" disabled selected hidden>XYZ</option>
               {numberOfEmployees.map((e) => (
                 <option className="select-option" value={e.number} id={e.id}>
                   {e.number}
                 </option>
               ))}
             </select>

           </div>
         </div>
       </div>

       <div className="user-profile-with-no-form-group inline-group">
         <div>
           <label htmlFor="headquarters" className='user-profile-with-no-label' value={headquarters}
             onChange={(e) => setHeadquarters(e.target.value)}
           >Headquarters Location</label>
           <div className="input-group1">
             <div className="icon-container1">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
               </svg>
             </div>

             <select id="headquarters" className='user-profile-with-no-input-field' value={headquarters}
               onChange={(e) => {
                 setHeadquarters(e.target.value);
                 setShowSuggestions(true);
               }} placeholder="XYZ">
               {/* <option value="" disabled selected hidden>XYZ</option>
               {suggestions.map((suggestion, index) => (
                 <option
                   key={index}
                   value={`${suggestion.name || ''}, ${suggestion.countryName || ''}`}
                 >
                   {`${suggestion.name || ''}, ${suggestion.countryName || ''}`}
                 </option>  ))}*/}
               <option value="" disabled selected hidden>XYZ</option>
               <option value='location1'>Location1</option>
               <option value='location2'>Location2</option>
               {/* Add more options as needed */}
             </select>
           </div>
         </div>

         <div>
           <label htmlFor="numberOfOpenings" className='user-profile-with-no-label'>Number of Openings</label>
           <div className="input-group1">
             <div className="icon-container1">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
               </svg>
             </div>

             <select
               required
               id="numberOfOpenings" className='user-profile-with-no-input-field'
               onChange={(e) => setOfferingNature(e.target.value)}
               value={offeringNature}>
                <option value="" disabled selected hidden>XYZ</option>
               {natureOfOfferings.map((e) => (
                 <option
                   className="select-option"
                   value={e.offering}
                   id={e.id}
                 >
                   {e.offering}
                 </option>
               ))}
             </select>

           </div>
         </div>
       </div>

       <div className="user-profile-with-no-form-group">
         <label htmlFor="email" className='user-profile-with-no-label'>Email</label>
         <div className="input-group1">
           <div className="icon-container1">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
             </svg>
           </div>

           <input id="email" type="email" value={email}
             onChange={(e) => setemail(e.target.value)} placeholder="example@example.com" className='user-profile-with-no-input-field'/>
         </div>
       </div>

       <div className="user-profile-with-no-form-group inline-group">
         <div className="user-profile-with-no-form-group">
           <label htmlFor="website" className='user-profile-with-no-label'>Company Website</label>
           <div className="input-group1">

             <input id="website" type="url" value={companyWebsiteUrl} style={{ color: 'var(--Grey-1, #191919);'}}
               onChange={(e) => setCompanyWebsiteUrl(e.target.value)} placeholder="Add here..." className='user-profile-with-no-input-field-no-color' />
           </div>
         </div>

         <div className="user-profile-with-no-form-group">
           <label htmlFor="website" className='user-profile-with-no-label'>Contact</label>
           <div className="input-group1">
             <div className="icon-container1">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" fill="black"/>
               </svg>
             </div>

             <input id="contact" type="tel" pattern="[0-9]{10}" value={contact}
               onChange={(e) => setContact(e.target.value)} placeholder="9109277352" className='user-profile-with-no-input-field'/>
           </div>
         </div>

       </div>
     </div>

     <div className='user-profile-with-no-button-container'>
       <button className="user-profile-with-no-save-button">Save Changes</button>
     </div>
   </form>
 </div>
);
};

export default UserProfileWithNo;
