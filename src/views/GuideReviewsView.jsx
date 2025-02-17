import React from "react";
import "./style/GuideReviews.css";
import image from "../assets/guide-person.png";

const GuideReviewsView = ({ reviews }) => {
  return (
    <div className="guide-reviews">
      <div className="line"></div>
      <h3>Reviews</h3>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.reviewId} className="reviews-container">
            <img src={image} />
            <div>
              <h4>{review.title}</h4>
              <p>{review.description}</p>
              <span>
                <span className="star">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>{" "}
                {review.rating}/5
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideReviewsView;
