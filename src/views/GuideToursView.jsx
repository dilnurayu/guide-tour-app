import React from "react";
import "./style//GuideTours.css";

const GuideToursView = ({ tours }) => {
  return (
    <div className="guide-tours">
      <div className="line"></div>
      <h3>Available Tours</h3>
      <p>{tours.length} Available</p>
      <div className="guide-tours-list">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <div key={tour.tourId} className="guide-tour-container">
              <div className="guide-tour-left">
                <h3>{tour.title}</h3>
                <p>
                  {tour.duration} Days | Languages:{" "}
                  {tour.languageIds.join(", ")}
                </p>
                <p>
                  Price: ${tour.price} {tour.priceType}
                </p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">
                      {i < tour.averageRating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
              <button>Choose</button>
            </div>
          ))
        ) : (
          <div>No available tours</div>
        )}
      </div>
    </div>
  );
};

export default GuideToursView;
