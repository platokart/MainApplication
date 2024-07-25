import React from "react";
import ConsultantProfileReviewItem from "../ConsultantProfileReviewItem";
import "./index.css";

const ConsultantProfileRatingDetails = (props) => {
  const { ratings = {}, count = {}, reviews = [] } = props;

  // Convert object to array for ratings and count
  const ratingsArray = Object.entries(ratings).map(([key, value]) => ({ rating: key, details: value }));
  const countArray = Object.entries(count).map(([key, value]) => ({ rating: key, count: value }));

  
  // Calculate the total number of ratings
  const totalRatings = countArray.reduce((sum, { count }) => sum + count, 0);

  const calculatePercentage = (ratingCount) => {
    return totalRatings === 0 ? 0 : ((ratingCount / totalRatings) * 100).toFixed(2);
  };

  return (
    <div className="consultant-profile-ratings-card">
      <h1 className="consultant-profile-rating-heading">
        Ratings & Reviews ({totalRatings})
      </h1>
      <div className="consultant-profile-rating-container">
        <div className="consultant-profile-rating-sub-container">
          <h3 className="consultant-profile-rating-sub-heading">Ratings</h3>
          <div className="consultant-profile-sub-bg-container">
            <div className="consultant-profile-rating-percentage-container">
              {countArray.length > 0 ? (
                countArray.map(({ rating, count }) => (
                  <li className="consultant-profile-rating-percentage-item" key={rating}>
                    <p className="consultant-profile-rating-number">{rating}</p>
                    <span className="consultant-profile-rating-percentage-bg-container">
                      <span
                        className="consultant-profile-rating-percentage-color-container"
                        style={{ width: `${calculatePercentage(count)}%` }}
                      ></span>
                    </span>
                  </li>
                ))
              ) : (
                <p>No ratings available</p>
              )}
            </div>
            <div className="consultant-profile-rating-number-con">
              <div className="consultant-profile-rating-number">
                <p className="consultant-profile-rating">{totalRatings}</p>
                <img
                  src="https://res.cloudinary.com/dgl0v7vwf/image/upload/v1717302585/Star_uv7sem.svg"
                  className="consultant-profile-rating-star-img"
                  alt="star-img"
                />
              </div>
              <p className="consultant-profile-reviews-number-container">
                {totalRatings} Reviews
              </p>
            </div>
          </div>
        </div>
        <hr className="consultant-profile-break-line" />
        <div className="consultant-profile-reviews-card">
          <h3 className="consultant-profile-review-card-heading">Reviews</h3>
          <div className="consultant-profile-reviews-card-list">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ConsultantProfileReviewItem
                  key={review._id}  // Ensure that each review item has a unique key
                  consultantProfileRatingDetails={review}
                />
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
          <button className="consultant-profile-review-load-more-button">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfileRatingDetails;
