import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const companyTypes = [
  {
    id: uuidv4(),
    type: "Select",
  },
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
    number: "Select",
  },
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
    offering: "Select",
  },
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
    stage: "Select",
  },
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

const DetailsForm = () => {
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [offeringNature, setOfferingNature] = useState("");
  const [funding, setFunding] = useState("");
  const [companyFoundingYr, setCompanyFoundinYr] = useState();
  const [readMoreToggle, setReadMoreToggle] = useState(true);
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
  years.push({ id: uuidv4(), year: "Select" });
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

  //filter companies based on input
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

      const username = "viswateja";
      const url = `https://secure.geonames.org/searchJSON?name_startsWith=${headquarters}&maxRows=5&username=${username}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        if (!data.geonames || data.geonames.length === 0) {
          setSuggestions([{ name: "No results found", countryName: "" }]);
        } else {
          setSuggestions(data.geonames);
        }
      } catch (error) {
        console.error("Error fetching data from Geonames:", error);
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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onSubmitDetailsForm = async (e) => {
    
    e.preventDefault();
    try {
      const authorizationCode = localStorage.getItem('auth');
      const consumerEmail = localStorage.getItem('email');
      console.log(consumerEmail);

      let parsedToken = null;
      if (authorizationCode) {
        try {
          parsedToken = JSON.parse(authorizationCode);
        } catch (error) {
          console.error('Error parsing token:', error);
        }
      }


      const formData = {
        email: consumerEmail,
        companyName:company,
        industry,
        companyType,
        fundingStage:funding,
        companyFounded: companyFoundingYr,
        numberOfEmployees: companySize,
        headquarterLocation:headquarters,
        numberOfOfferings: offeringNature,
        companyWebsite: companyWebsiteUrl,
        contact,
      };
  
      console.log("Submitting form data:", formData);
  
      const response = await fetch(
        "http://localhost:5000/customer/register",
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
        navigate("/user/set-password");
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
          {/** new order */}
          {/** company name */}
          {/**company name input */}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="company">
              Company Name
            </label>
            <input
              type="text"
              className="details-form-input-el"
              placeholder="Search" //search icon to be added
              value={company}
              onChange={(e) => (setCompany(e.target.value), filterCompanies())}
              id="company"
              required
            />
            {/* {company.length > 2  && ( */}
            <div
              className={`${
                (companyList.length > 0) & (company.length > 0)
                  ? "filtered-companies-list"
                  : "hide-companies"
              }`}
            >
              {companyList.map((each) => (
                <li
                  className="filtered-company-option"
                  key={each.id}
                  onClick={() => (
                    setCompany(each.name), setFilteredCompanies([])
                  )}
                >
                  {each.name}
                </li>
              ))}
            </div>
            {/* // )} */}
          </div>
          {/**industry dropdown */}
          {/** industry input */}
          <div className="input-container">
            <label className="details-form-label-el" htmlFor="industry">
              Industry
            </label>
            <select
              className="industry-level-input-select"
              required
              onChange={(e) => {
                setIndustry(e.target.value);
              }}
              value={industry}
              id="industry"
            >
              {industries.map((i) => (
                <option className="select-option" value={i.industry} key={i.id}>
                  {i.industry}
                </option>
              ))}
            </select>
          </div>
          {/**company type and funding stage in same line */}
          <div className="input-long-container">
            {/** company type input */}
            <div className="horizantal-input-container">
              <label className="details-form-label-el" htmlFor="company-type">
                Company Type
              </label>
              <select
                required
                className="select-input-el"
                id="company-type"
                onChange={(e) => setCompanyType(e.target.value)}
                value={companyType}
              >
                {companyTypes.map((e) => (
                  <option className="select-option" value={e.type} id={e.id}>
                    {e.type}
                  </option>
                ))}
              </select>
            </div>
            {/**funding stage */}
            <div className="horizantal-input-container">
              <label className="details-form-label-el" htmlFor="funding-stage">
                Funding Stage
              </label>
              <select
                required
                className="select-input-el"
                id="funding-stage"
                onChange={(e) => setFunding(e.target.value)}
                value={funding}
              >
                {fundingStage.map((e) => (
                  <option value={e.stage} id={e.id}>
                    {e.stage}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/**company founded and number of employees */}
          <div className="input-long-container">
            {/** company founded input pending */}
            <div className="horizantal-input-container">
              <label
                className="details-form-label-el"
                htmlFor="company-founded"
              >
                Company Founded
              </label>
              <select
                required
                className="select-input-el"
                id="company-founded"
                value={companyFoundingYr}
                onChange={(e) => setCompanyFoundinYr(e.target.value)}
              >
                {years.map((e) => (
                  <option value={e.year} id={e.id}>
                    {e.year}
                  </option>
                ))}
              </select>
            </div>
            {/**number of employees */}
            <div className="horizantal-input-container">
              <label
                className="details-form-label-el"
                htmlFor="no-of-employees"
              >
                Number of Employees
              </label>
              <select
                required
                className="select-input-el"
                id="no-of-employees"
                onChange={(e) => setCompanySize(e.target.value)}
                value={companySize}
              >
                {numberOfEmployees.map((e) => (
                  <option className="select-option" value={e.number} id={e.id}>
                    {e.number}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/**headquarter location and number of offerings */}
          <div className="input-long-container">
            {/** head quarter location input pending */}
            <div className="horizantal-input-container">
              <label className="details-form-label-el" htmlFor="headquarters">
                Headquarter location
              </label>
              <input
                required
                type="text"
                className="details-form-user-input"
                placeholder="Enter here..."
                value={headquarters}
                onChange={(e) => {
                  setHeadquarters(e.target.value);
                  setShowSuggestions(true);
                }}
                id="headquarters"
              />
              {showSuggestions && headquarters.length >= 3 && (
                <div
                  className={`${
                    (suggestions.length > 0) & (headquarters.length > 0)
                      ? "filtered-companies-list"
                      : "hide-companies"
                  }`}
                  ref={autocompleteListRef}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="filtered-company-option"
                      style={styles.autocompleteItems}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name !== "No results found"
                        ? `${suggestion.name}, ${suggestion.countryName}`
                        : suggestion.name}
                    </li>
                  ))}
                </div>
              )}
            </div>
            {/**nature of offerings */}
            <div className="horizantal-input-container">
              <label
                className="details-form-label-el"
                htmlFor="nature-of-offerings"
              >
                Nature of offerings
              </label>
              <select
                required
                className="select-input-el"
                id="nature-of-offerings"
                onChange={(e) => setOfferingNature(e.target.value)}
                value={offeringNature}
              >
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
          {/**company website url and contact */}
          <div className="details-form-long-container">
            {/** company website url input */}
            <div className="details-from-part-container">
              <label className="details-form-label-el" htmlFor="website-url">
                Company Website
              </label>
              <input
              required
                type="text"
                className="details-form-user-input"
                placeholder="https://example.com"
                value={companyWebsiteUrl}
                onChange={(e) => setCompanyWebsiteUrl(e.target.value)}
                id="website-url"
              />
            </div>
            {/**contact input */}
            <div className="details-from-part-container">
              <label className="details-form-label-el" htmlFor="contact">
                Contact
              </label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="details-form-user-input"
                placeholder="Enter here..."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                id="contact"
              />
            </div>
          </div>
          {/**end */}
          <div className="details-form-checkbox-container">
            <input
              type="checkbox"
              className="details-form-checkbox"
              onChange={(e) => setChecked(!check)}
              value={check}
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
            onClick={(e) => onSubmitDetailsForm(e)}
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
