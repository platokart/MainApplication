import React from "react";
import "./index.css";
import plato_image from "../Assets/plato image.jpeg";
import { useNavigate } from "react-router-dom";

const NoMatchedConsultantsView = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="thank-you-container90"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        jusifyContent: "center",
      }}
    >
      <div className="heading-container90">
        <h1 className="user-thank-you-form-heading">
          {/* <span>Your request has been accepted by </span>
        <span className="user-thank-you-name">John Doe</span>  */}
          {props.mainMsg !== ""
            ? props.mainMsg
            : "There are no consultants available at this point of time."}
        </h1>
        <h1 className="user-thank-you-form-heading">
          {props.mainMsg === "" && "Please try some other time"}
        </h1>
      </div>
      {props.mainMsg !== "" ? (
        <button
          className="details-form-signup-btn back-to-home-page"
          style={{ width: "300px" }}
        >
          Waiting...
        </button>
      ) : (
        <button
          className="details-form-signup-btn back-to-home-page"
          style={{ width: "300px" }}
          onClick={() => navigate("/user/home-page")}
        >
          Back to Home Page
        </button>
      )}
      {/* <div className="thank-you">
        <div className="thank-you-inner">
          <img src={plato_image} alt="John Doe" className="image"/>
          <h3 className="john-doe-name">John Doe</h3>
          <div className="frame-div1">
            <button className="resource-operations-label">
              Human Resource
            </button>
            <button className="resource-operations-label">
              Operations
            </button>
          </div>
          <div className="user-thank-you-action-buttons">
            <button className="action-button join-call">Join Call</button>
            <button className="action-button view-profile">View Consultant Profile</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NoMatchedConsultantsView;
