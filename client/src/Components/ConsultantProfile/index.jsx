import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import ConultantProfileRatingDetails from "../ConsultantProfileRatingDetails/ConsultantProfileRatingDetails";
import ScheduledConsultationPopup from "./../ScheduledConsultationPopup/index";
import "./index.css";

const ConsultantProfile = () => {
  const [wholeData, setWholeData] = useState({});
  const [consultantData, setConsultantData] = useState({});
  const [average,setAverage]=useState(0);
  const [consultantRatings, setConsultantRatings] = useState({});
  const [consultationRatingsCount, setConsultationRatingsCount] = useState(0);
  const [consultantReviews, setConsultantReviews] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();
  console.log("consultantId:", id);
  console.log("consultantRatings:",consultantRatings)
  console.log("ratingscount:",consultationRatingsCount);

  const consultNowBtnCls = 'consultaion-profile-consult-now-btn'

  const getConsultantProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/customer/home/get-consultation/${id}/view-details`);
      const data = await response.json();
      console.log("whole data:", data);
      if (response.ok) {
        setWholeData(data);
        setConsultantData(data.consultant || {});
        setConsultantRatings(data.ratings || {});
        setConsultationRatingsCount(data.ratingsCount || 0);
        setConsultantReviews(data.reviews || []);
        setAverage(data.averageRating|| 0);
      } else {
        setErrorMsg(data?.message || "An error occurred");
      }
    } catch (e) {
      console.log(e);
      setErrorMsg("Failed to fetch consultant profile");
    }
  };

  useEffect(() => {
    getConsultantProfile();
  }, [id]);

  

  return (
    <div className="consultant-profile-bg-container">
      {wholeData && (
        <>
          <div className="consultant-profile-button-container">
            <button className="consultant-profile-back-btn">
              <FaArrowLeft />
            </button>
            <h2 className="consultant-profile-heading">Consultant Profile</h2>
          </div>
          <div className="consultant-profile-main-bg-card">
          <div className="consultant-profile-details-card">
            <img
              src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1717255741/Outline_jlkelm.svg"
              className="share-btn"
              alt="share"
            />
            <div className="consultant-profile-photo-container">
              <img
                className="consultant-profile-img"
                alt="profile-img"
                src={consultantData?.basicdetails?.[0]?.photo || "default-image-url.jpg"}
              />
              <h4 className="consultant-profile-name">
                {consultantData?.basicdetails?.[0]?.firstName || "First Name"} {consultantData?.basicdetails?.[0]?.lastName || "Last Name"}
              </h4>
            </div>
            <div>
              <p className="consultant-profile-description">
                {consultantData?.additionalDetails?.[0]?.aboutYourself || "Description not available"}
              </p>
            </div>
            <div>
              <p className="consultant-profile-description">
                {consultantData?.basicdetails?.[0]?.instituteName || "Institution name not available"}
              </p>
              <p className="consultant-profile-experience">
                {consultantData?.basicdetails?.[0]?.yearsOfExperience || "Experience not available"}
              </p>
            </div>
            <div className="consultant-expertise-function-container">
              <div className="consultant-speciality-card">
                <p className="consultant-profile-description">Expertise</p>
                <div className="consultant-profile-specialties-list">
                  {(consultantData?.basicdetails?.[0]?.skills || []).map(e => (
                    <li
                      className="consultant-profile-speciality-item"
                      key={e?.id || uuidv4()}
                    >
                      {e?.label || "Skill not available"}
                    </li>
                  ))}
                </div>
              </div>
              <div className="consultant-speciality-card">
                <p className="consultant-profile-description">Industry</p>
                <div className="consultant-profile-specialties-list">
                  {(consultantData?.basicdetails?.[0]?.industry || []).map(e => (
                    <li
                      className="consultant-profile-speciality-item"
                      key={e?.id || uuidv4()}
                    >
                      {e?.label || "Industry not available"}
                    </li>
                  ))}
                </div>
              </div>
              <div className="consultant-speciality-card">
                <p className="consultant-profile-description">Functions</p>
                <div className="consultant-profile-specialties-list">
                  <li className="consultant-profile-speciality-item">
                    {consultantData?.basicdetails?.[0]?.functionName || "Function not available"}
                  </li>
                </div>
              </div>
            </div>
            {errorMsg === "" ? (
              <div className="consultation-profile-recommendation-container">
                <div className="consultation-profile-recommendation-card">
                  <div className="consultaion-profile-recommendation-details">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="65"
                      viewBox="0 0 64 65"
                      fill="none"
                    >
                      <path
                        d="M61.3327 27.4983C61.3327 26.0838 60.7708 24.7272 59.7706 23.7271C58.7704 22.7269 57.4138 22.165 55.9994 22.165H39.146L41.706 9.97829C41.7593 9.71162 41.786 9.41829 41.786 9.12496C41.786 8.03162 41.3327 7.01829 40.6127 6.29829L37.786 3.49829L20.2393 21.045C19.2527 22.0316 18.666 23.365 18.666 24.8316V51.4983C18.666 52.9128 19.2279 54.2693 20.2281 55.2695C21.2283 56.2697 22.5849 56.8316 23.9993 56.8316H47.9994C50.2127 56.8316 52.106 55.4983 52.906 53.5783L60.9594 34.7783C61.1994 34.165 61.3327 33.525 61.3327 32.8316V27.4983ZM2.66602 56.8316H13.3327V24.8316H2.66602V56.8316Z"
                        fill="#21BF73"
                      />
                    </svg>
                    <h1 className="consultation-profile-percentage">94%</h1>
                  </div>
                  <p className="consultant-profile-description">User Recommendation</p>
                </div>
                <div className="consultation-profile-recommendation-card">
                  <div className="consultaion-profile-recommendation-details">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="65" viewBox="0 0 64 65" fill="none">
<path d="M30.7565 6.02016C31.2655 4.98868 32.7364 4.98868 33.2455 6.02016L40.4949 20.709C40.697 21.1186 41.0878 21.4025 41.5398 21.4682L57.7499 23.8237C58.8882 23.9891 59.3427 25.3879 58.519 26.1908L46.7893 37.6245C46.4622 37.9433 46.3129 38.4027 46.3902 38.8529L49.1592 54.9975C49.3536 56.1312 48.1637 56.9958 47.1455 56.4605L32.6468 48.8381C32.2425 48.6255 31.7595 48.6255 31.3552 48.8381L16.8564 56.4605C15.8383 56.9958 14.6483 56.1312 14.8428 54.9975L17.6118 38.8529C17.689 38.4027 17.5397 37.9433 17.2127 37.6245L5.48292 26.1908C4.65923 25.3879 5.11375 23.9891 6.25206 23.8237L22.4622 21.4682C22.9142 21.4025 23.3049 21.1186 23.5071 20.709L30.7565 6.02016Z" fill="#FFC100"/>
</svg>
                    <h1 className="consultation-profile-percentage">{average} {average===0 && <span style={{fontSize:"17px"}}>(No reviews yet)</span>}</h1>
                  </div>
                  <p className="consultant-profile-description">Average Rating</p>
                </div>
                {/* <div className="consultation-profile-recommendation-card">
                  <div className="consultaion-profile-recommendation-details">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="65"
                      viewBox="0 0 64 65"
                      fill="none"
                    >
                      <path
                        d="M32.0002 6.35323L25.1959 23.9272C24.9123 24.6895 25.1348 25.6464 25.8514 26.0918L38.2704 33.9073C38.6997 34.208 39.1191 34.4977 39.6127 34.6584L51.634 37.1513C52.2346 37.2844 52.8229 37.6726 52.7429 38.3515L50.9851 54.7308C50.9278 55.0797 50.8605 55.3054 50.6638 55.4841L36.209 64.1324C35.282 64.5929 34.2035 64.1055 34.0287 63.0758L30.4937 48.6744C30.3515 48.127 29.8638 47.7836 29.3438 47.7836H24.7238C24.196 47.7836 23.6823 48.127 23.5683 48.6744L22.4236 54.6666L13.5307 47.4279L13.5266 47.4252C12.9325 46.9696 12.3548 46.4166 11.9758 45.7604L5.08323 35.4928C4.43143 34.6833 4.9312 33.5581 5.75698 33.3977L14.2588 31.9786C14.7888 31.8676 15.2627 31.5358 15.6708 31.0039L26.1985 20.1574L28.1461 8.4382C28.1597 8.37756 28.1748 8.3187 28.1905 8.26147L29.8795 6.35323C30.3221 5.86176 31.2862 5.78326 32.0002 6.35323Z"
                        fill="#7B2A27"
                      />
                    </svg>
                    <h1 className="consultation-profile-percentage">92%</h1>
                  </div>
                  <p className="consultant-profile-description">User Satisfaction</p>
                </div> */}
              </div>
            ) : (
              <div className="consultation-profile-error-container">
                <p className="consultation-profile-error-message">{errorMsg}</p>
              </div>
            )}
            <ScheduledConsultationPopup cls = {consultNowBtnCls} />
            
          </div>
          {average !== 0 && (
            <ConultantProfileRatingDetails
            ratings={consultantRatings || {}}
            count={consultationRatingsCount || {}}
            reviews={consultantReviews || []}
          />
          )}
          </div>
          
        </>
      )}
    </div>
  );
};

export default ConsultantProfile;
