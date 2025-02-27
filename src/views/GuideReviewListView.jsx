import React from "react";
import "./style/GuideReviewList.css";
import image from "../assets/profile.png";

const GuideReviewListView = ({ reviews }) => {
  return (
    <div className="guide-review-list">
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div key={review.reviewId} className="review-list-container">
          <img src={image} alt="Reviewer" />
          <div className="review-wrapper">
            <div className="name-date-review">
              <h4>{review.title}</h4>
              <h5>12.03.2024</h5>
            </div>
            <p>{review.description}</p>
            <span>
              <span className="star">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                ))}
              </span>
              {review.rating}/5
            </span>
            <div className="reply-button">
              <button>Reply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuideReviewListView;
