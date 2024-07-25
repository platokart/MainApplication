import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const FrameComponent2 = ({
  selectedFunction,
  selectedExpertise,
  selectedIndustry,
}) => {
  const [consultants, setConsultants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleConsultants, setVisibleConsultants] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultants = async () => {
      setIsLoading(true);
      try {
        let url;
        if (selectedFunction) {
          url = `http://localhost:5000/customer/home/seek-consultation/function/${selectedFunction}`;
        } else if (selectedExpertise) {
          url = `http://localhost:5000/customer/home/seek-consultation/expertise/${selectedExpertise}`;
        } else if (selectedIndustry) {
          url = `http://localhost:5000/customer/home/seek-consultation/industry/${selectedIndustry}`;
        } else {
          url = `http://localhost:5000/customer/home/seek-consultation`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch consultants");
        }
        const data = await response.json();
        setConsultants(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching consultants:", error);
        setError("Failed to fetch consultants");
        setConsultants([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultants();
  }, [selectedFunction, selectedExpertise, selectedIndustry]);

  const filteredData =
    selectedCategory && consultants
      ? consultants.filter(
          (consultant) =>
            consultant.basicdetails[0]?.designation === selectedCategory
        )
      : consultants;

  const sortedData =
    selectedCategory === "Top Consultants" && consultants
      ? [...consultants].sort((a, b) =>
          a.basicdetails[0]?.firstName.localeCompare(
            b.basicdetails[0]?.firstName
          )
        )
      : filteredData;

      

  const handleShowMore = () => {
    setVisibleConsultants(prevVisible => {
      if (prevVisible + 3 >= sortedData.length) {
        return sortedData.length;
      }
      return prevVisible + 3;
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error || consultants.length === 0) {
    return (
      <div className="error-container">
        <div className="error-message-consultant">
          {error === "Failed to fetch consultants" ? "No consultants found" : error}
        </div>
        <div className="error-buttons">
          <button className="go-home" onClick={() => navigate('/user/home-page')}>
           Find another consultant
          </button>
        </div>
      </div>
    );
  }

  const renderConsultantDetails = (consultant) => {
    const basicDetails = consultant.basicdetails[0] || {};
    const additionalDetails = consultant.additionalDetails[0] || {};

    return (
      <div className="frame-container">
        <div className="frame-div">
          <div className="frame-wrapper">
            <div className="ellipse-parent">
              <div className="frame-inner" />
              <div className="wrapper-ellipse-22">
                                <img src={basicDetails.photo} className="image" alt="Consultant"/>
                            </div>
            </div>
          </div>
          <div className="middle-management-parent">
            <div className="middle-management">
              {basicDetails.designation || "N/A"}
            </div>
            <div className="consultations">0 Consultations</div>
          </div>
        </div>
        <div className="john-doe-parent">
          <h2 className="john-doe">{`${basicDetails.firstName || ""} ${
            basicDetails.lastName || ""
          }`}</h2>
          <div className="lorem-lorem-ipsum">
            {additionalDetails.aboutYourself || "No description available"}
          </div>
         <div className="frame-component1">
          <div className="category-data">
            {basicDetails.skills &&
              basicDetails.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">
                  {skill.label}
                </span>
              ))}
          </div>
        </div>
          <div className="frame-component2">
            <div className="star-rating-wrapper">
              <div className="star-rating2">
                <div className="stars">
                  {/* We don't have rating data, so let's skip this for now */}
                </div>
                <div className="reviews2">Reviews: N/A</div>
              </div>
            </div>
            <div className="get-consulation-button-visit">
              <button
                className="visit-profile-wrapper"
                onClick={() =>
                  navigate(`/consultant-profile/${consultant?._id}`)
                }
              >
                <div className="visit-profile">Visit Profile</div>
              </button>
              <button className="consult-now-wrapper">
                <div className="consult-now">Consult now</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="FrameComponent-container">
      <div className="top-consultants-wrapper">
        <h1 className="top-consultants">Top Consultants</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M9 14H39M14 24H34M20 34H28"
            stroke="#7C7D80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="frame-component4">
        <div className="frame-component5">
          <div className="frame-component6">
            <div className="frame-component7">
              <button
                className={`top-reviews-btn ${
                  selectedCategory === "Top Consultants" ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory("Top Consultants")}
              >
                <div className="number-of-consultation">Top Consultants</div>
              </button>
              <button
                className={`middle-management-btn ${
                  selectedCategory === "Middle Management" ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory("Middle Management")}
              >
                <div className="number-of-consultation">Middle Management</div>
              </button>
              <button
                className={`cxo-btn ${
                  selectedCategory === "CXO" ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory("CXO")}
              >
                <div className="number-of-consultation">CXO</div>
              </button>
              <button
                className={`senior-management-btn ${
                  selectedCategory === "Senior Management" ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory("Senior Management")}
              >
                <div className="senior-management">Senior Management</div>
              </button>
            </div>
          </div>
        </div>
        {sortedData.slice(0, visibleConsultants).map((consultant, index) => (
          <React.Fragment key={index}>
            {renderConsultantDetails(consultant)}
          </React.Fragment>
        ))}
      </div>
      {visibleConsultants < sortedData.length && (
        <div className="frame-component2-wrapper1">
          <button className="show-more-wrapper" onClick={handleShowMore}>
            <div className="show-more">Show more</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FrameComponent2;