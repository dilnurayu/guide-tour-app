import React from "react";
import "./style/GuideReviewList.css";
import image from "../assets/profile.png";

const GuideReviewListView = ({ reviews }) => {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[monthIndex];

    function getOrdinal(n) {
      if (n % 100 >= 11 && n % 100 <= 13) {
        return n + "th";
      }
      switch (n % 10) {
        case 1:
          return n + "st";
        case 2:
          return n + "nd";
        case 3:
          return n + "rd";
        default:
          return n + "th";
      }
    }

    return `${getOrdinal(day)} ${monthName} ${year}`;
  }

  return (
    <div className="guide-review-list">
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div key={review.reviewId} className="review-list-container">
          <img src={image} alt="Reviewer" />
          <div className="review-wrapper">
            <div className="name-date-review">
              <h4>{review.tourist.name}</h4>
              <h5>{formatDate(review.createdAt)}</h5>
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
