import React from "react";
import "./style/GuideReviews.css";
import image from "../assets/guide-person.png";

const ReviewsView = ({ reviews }) => {
  return (
    <div className="guide-reviews">
      <div className="line"></div>
      <h3>Reviews {reviews.length}</h3>
      <textarea placeholder="Write your review here" />
      <div className="rate-comment">
        <div className="rate">
          <p>Rate:</p>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star">
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <button>Comment</button>
      </div>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewId} className="reviews-container">
              <img src={image} alt="guide" />
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
          ))
        ) : (
          <div className="no-reviews">No Reviews</div>
        )}
      </div>
    </div>
  );
};

export default ReviewsView;
