import React, { useState } from "react";
import "./GuideSearch.css";
import guideListHeader from "../assets/guide-list-header.jpg";
import perfectGuideImg from "../assets/perfect-guide.png";

const GuideSearch = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    address: "",
    language: "",
    price: "",
    payment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      address_ids: localFilters.address ? [localFilters.address] : undefined,
      language_ids: localFilters.language
        ? [parseInt(localFilters.language)]
        : undefined,

      price_type: localFilters.payment || undefined,
      max_price: localFilters.price || undefined,
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
          <img src={perfectGuideImg} alt="Perfect Guide" />
        </div>
        <div className="filter-container">
          <h1>Find Guide</h1>
          <div className="filter-row">
            <div className="filter-item">
              <p>Region</p>
              <input
                type="text"
                name="address"
                placeholder="Bukhara"
                value={localFilters.address}
                onChange={handleChange}
                className="address-input"
              />
            </div>
            <div className="filter-item">
              <p>Price</p>
              <input
                type="text"
                name="price"
                value={localFilters.price}
                onChange={handleChange}
                className="price-input"
                placeholder="10"
              />
            </div>
            <div className="filter-item">
              <p>Language ID</p>
              <input
                type="text"
                name="language"
                placeholder="e.g., 1"
                value={localFilters.language}
                onChange={handleChange}
                className="person-input"
              />
            </div>
            <div className="filter-item">
              <p>Payment Type</p>
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

export default GuideSearch;
