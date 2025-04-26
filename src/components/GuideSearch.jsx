import React, { useState, useEffect } from "react";
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
  const [addressOptions, setAddressOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    fetch("https://guide-tour-api.vercel.app/addresses")
      .then((res) => res.json())
      .then((data) => setAddressOptions(data))
      .catch((err) => console.error("Error fetching addresses:", err));

    fetch("https://guide-tour-api.vercel.app/languages")
      .then((res) => res.json())
      .then((data) => setLanguageOptions(data))
      .catch((err) => console.error("Error fetching languages:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      address_ids: localFilters.address
        ? [parseInt(localFilters.address)]
        : undefined,
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
              <select
                name="address"
                value={localFilters.address}
                onChange={handleChange}
                className="address-input"
              >
                <option value="">Select Region</option>
                {addressOptions.map((addr) => (
                  <option key={addr.address_id} value={addr.address_id}>
                    {addr.region.region} - {addr.city.city}
                  </option>
                ))}
              </select>
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
              <p>Language</p>
              <select
                name="language"
                value={localFilters.language}
                onChange={handleChange}
                className="person-input"
              >
                <option value="">Select Language</option>
                {languageOptions.map((lang) => (
                  <option key={lang.language_id} value={lang.language_id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <p>Payment Type</p>
              <select
                name="payment"
                value={localFilters.payment}
                onChange={handleChange}
                className="payment-input"
              >
                <option value="">Select Payment Type</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="fixed">Fixed</option>
              </select>
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
