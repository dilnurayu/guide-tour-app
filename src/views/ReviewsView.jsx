import React, { useState } from "react";
import "./style/GuideReviews.css";
import image from "../assets/profile.png";

const ReviewsView = ({
  reviews,
  reviewForm,
  onReviewInputChange,
  onSubmitReview,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (rating) => {
    const event = {
      target: {
        name: "rating",
        value: rating,
      },
    };
    onReviewInputChange(event);
  };

  return (
    <div className="guide-reviews">
      <div className="line"></div>
      <h3>Reviews ({reviews.length})</h3>
      <div className="review-form">
        <textarea
          name="description"
          placeholder="Write your review here"
          value={reviewForm.description}
          onChange={onReviewInputChange}
        />
        <div className="rate-comment">
          <div className="rate">
            <p>Rate:</p>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <span
                    key={index}
                    className={`star-input ${
                      ratingValue <= (hoveredRating || reviewForm.rating)
                        ? "filled"
                        : "empty"
                    }`}
                    onClick={() => handleStarClick(ratingValue)}
                    onMouseEnter={() => setHoveredRating(ratingValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    ★
                  </span>
                );
              })}
            </div>
          </div>
          <button onClick={onSubmitReview}>Comment</button>
        </div>
      </div>
      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewId} className="reviews-container">
              <img src={image} alt="guide" />
              <div>
                <h4>{review.tourist.name}</h4>
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
          ))
        ) : (
          <div className="no-reviews">No Reviews</div>
        )}
      </div>
    </div>
  );
};

export default ReviewsView;
