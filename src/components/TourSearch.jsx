import React, { useState } from "react";
import guideListHeader from "../assets/guide-list-header.jpg";
import perfectTourImg from "../assets/perfect-tour.png";

const TourSearch = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    region: "",
    date: "",
    person: "",
    payment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      region_ids: localFilters.region ? [localFilters.region] : undefined,
      date_from: localFilters.date || undefined,
      payment_type: localFilters.payment || undefined,
      min_guest_count: localFilters.person || undefined,
    };
    Object.keys(newFilters).forEach(
      (key) => newFilters[key] === undefined && delete newFilters[key]
    );
    setFilters(newFilters);
  };

  return (
    <div className="search-section">
      <div className="image-container">
        <img
          src={guideListHeader}
          alt="Background"
          className="background-image"
        />
        <div className="text-overlay">
          <img src={perfectTourImg} alt="Perfect Tour" />
        </div>
        <div className="filter-container">
          <h1>Find Tour</h1>
          <div className="filter-row">
            <div className="filter-item">
              <p>Region</p>
              <input
                type="text"
                name="region"
                placeholder="Bukhara"
                value={localFilters.region}
                onChange={handleChange}
                className="region-input"
              />
            </div>
            <div className="filter-item">
              <p>Date</p>
              <input
                type="date"
                name="date"
                value={localFilters.date}
                onChange={handleChange}
                className="date-input"
              />
            </div>
            <div className="filter-item">
              <p>Person</p>
              <input
                type="number"
                name="person"
                placeholder="3"
                value={localFilters.person}
                onChange={handleChange}
                className="person-input"
              />
            </div>
            <div className="filter-item">
              <p>Payment</p>
              <input
                type="text"
                name="payment"
                placeholder="Hourly"
                value={localFilters.payment}
                onChange={handleChange}
                className="payment-input"
              />
            </div>
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourSearch;
