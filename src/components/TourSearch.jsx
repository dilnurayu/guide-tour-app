import React, { useState, useEffect } from "react";
import guideListHeader from "../assets/guide-list-header.jpg";
import perfectTourImg from "../assets/perfect-tour.png";

const TourSearch = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    region: "",
    date: "",
    person: "",
    payment: "",
  });
  const [addressOptions, setAddressOptions] = useState([]);

  useEffect(() => {
    fetch("https://guide-tour-api.vercel.app/addresses")
      .then((res) => res.json())
      .then((data) => setAddressOptions(data))
      .catch((err) => console.error("Error fetching addresses:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      region_ids: localFilters.region
        ? [parseInt(localFilters.region)]
        : undefined,
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
              <select
                name="region"
                value={localFilters.region}
                onChange={handleChange}
                className="region-input"
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

export default TourSearch;
