import React from "react";
import "./index.css";
import image1 from "../Assets/get-consult.jpeg";
import Navbar1 from "../Navbar1";
import FooterSeaWireFooter from "../FooterSeaWireFooter";
import FrameComponent2 from "../UserFrameComponent2";
import { useParams } from "react-router-dom";
import ScheduledConsultationPopup from "../../ScheduledConsultationPopup";
import UserNavbar from "../UserNavbar";
const GetConsultation = () => {
  const {
    industry: selectedIndustry,
    function: selectedFunction,
    expertise: selectedExpertise,
  } = useParams();

  return (
    <>
      <UserNavbar />

      <div className="get-consultation-homepage">
        <div className="get-consultation-welcome-container">
          <div className="get-consultation-main-heading-container">
            <h1 className="get-consultation-welcome">
              Consultant at <span className="company-name1">Platokart</span>
            </h1>
            <p className="get-consultation-welcome-para">
              Your on-Line, On Demand, Real-Time Consultation and Advisory
              Platform
            </p>
            <button className="get-consultation-button">Get Started</button>
          </div>
            <img
            src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1716120829/Screenshot_2024-05-19_174223_vir8zy.png"
            alt="welcome-page-img"
            className="welcome-page-img"
          />
        </div>

        <section className="get-consultation-inner">
          <FrameComponent2
            selectedFunction={selectedFunction}
            selectedExpertise={selectedExpertise}
            selectedIndustry={selectedIndustry}
          />
        </section>
      </div>
      <FooterSeaWireFooter />
    </>
  );
};

export default GetConsultation;
