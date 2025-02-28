import React from "react";
import "./style/GuideReviews.css";
import image from "../assets/profile.png";

const ReviewsView = ({
  reviews,
  reviewForm,
  onReviewInputChange,
  onSubmitReview,
}) => {
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
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              value={reviewForm.rating}
              onChange={onReviewInputChange}
            />
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
