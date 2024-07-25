import React from "react";

const ConsultantProfileReviewItem = ({ consultantProfileRatingDetails }) => {
  const { rating, feedback } = consultantProfileRatingDetails;

  return (
    <div className="review-item">
      <p>Rating: {rating}</p>
      <p>Feedback: {feedback}</p>
      {/* Render other properties as needed */}
    </div>
  );
};

export default ConsultantProfileReviewItem;
