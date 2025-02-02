import React from "react";
import "./GuideSearch.css";
import guideListHeader from "../assets/guide-list-header.jpg";

const GuideSearch = () => {
  return (
    <div className="search-section">
      <div className="image-container">
        <img
          src={guideListHeader}
          alt="Background"
          className="background-image"
        />
        <div className="text-overlay">
          <h1>Find Your Perfect Guide</h1>
        </div>
        <div className="filter-container">
          <h1>One way</h1>
          <div className="filter-row">
            <div className="filter-item">
              <p>Region</p>
              <input
                type="text"
                placeholder="Bukhara"
                className="region-input"
              />
            </div>
            <div className="filter-item">
              <p>Date</p>
              <input
                type="date"
                placeholder="12.03.2025-15.03.2025"
                className="date-input"
              />
            </div>
            <div className="filter-item">
              <p>Person</p>
              <input type="number" placeholder="3" className="person-input" />
            </div>
            <div className="filter-item">
              <p>Payment</p>
              <input
                type="text"
                placeholder="Hourly"
                className="payment-input"
              />
            </div>
          </div>
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default GuideSearch;
