import { useState, useEffect } from "react";
import "./index.css";

const Basicplan = () => {
  const [planDetails, setPlanDetails] = useState({
    credits: 0,
    addedCredits: [],
  });

  const getPlanDetails = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await fetch(
        `http://localhost:5000/payment/My-Plan/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setPlanDetails(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPlanDetails();
  }, []);

  return (
    <div className="credit-details-container">
      <h1 className="page-title">Your Credit Dashboard</h1>
      <div className="credits-summary">
        <h3 className="total-credits">
          <span className="label">Total Credits:</span>
          <span className="credit-amount">{planDetails.credits}</span>
        </h3>
      </div>
      <div className="credits-list">
        {planDetails.addedCredits.length > 0 ? (
          planDetails.addedCredits.map((credit, index) => (
            <div key={index} className="credit-card">
              <h4 className="plan-title">Plan: {credit.Plan}</h4>
              <p className="date-details">
                Added On: {new Date(credit.addedAt).toLocaleDateString()}
              </p>
              <p className="date-details">
                Expiry Date: {new Date(credit.expiryDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-credits">No credits available</p>
        )}
      </div>
    </div>
  );
};

export default Basicplan;
