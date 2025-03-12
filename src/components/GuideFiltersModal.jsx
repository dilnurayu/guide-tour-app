import React, { useState, useEffect } from "react";
import "./FiltersModal.css";

const GuideFiltersModal = ({ initialFilters, onApply, onClose }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [addressOptions, setAddressOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    fetch("https://guide-tour-api.vercel.app/addresses")
      .then((res) => res.json())
      .then((data) => setAddressOptions(data))
      .catch((err) => console.error("Error fetching addresses: ", err));

    fetch("https://guide-tour-api.vercel.app/languages")
      .then((res) => res.json())
      .then((data) => setLanguageOptions(data))
      .catch((err) => console.error("Error fetching languages: ", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    const parsedFilters = { ...filters };
    if (parsedFilters.language_ids) {
      parsedFilters.language_ids = [parseInt(parsedFilters.language_ids, 10)];
    }
    if (parsedFilters.address_ids) {
      parsedFilters.address_ids = [parseInt(parsedFilters.address_ids, 10)];
    }
    onApply(parsedFilters);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Advanced Filters</h2>
        <div className="modal-content">
          <label>
            Min Rating:
            <input
              type="number"
              name="min_rating"
              value={filters.min_rating || ""}
              onChange={handleChange}
              step="0.1"
            />
          </label>
          <label>
            Max Rating:
            <input
              type="number"
              name="max_rating"
              value={filters.max_rating || ""}
              onChange={handleChange}
              step="0.1"
            />
          </label>
          <label>
            Min Price:
            <input
              type="number"
              name="min_price"
              value={filters.min_price || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Max Price:
            <input
              type="number"
              name="max_price"
              value={filters.max_price || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Language:
            <select
              name="language_ids"
              value={filters.language_ids || ""}
              onChange={handleChange}
            >
              <option value="">Select Language</option>
              {languageOptions.map((lang) => (
                <option key={lang.language_id} value={lang.language_id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Address (Region):
            <select
              name="address_ids"
              value={filters.address_ids || ""}
              onChange={handleChange}
            >
              <option value="">Select Address</option>
              {addressOptions.map((addr) => (
                <option key={addr.address_id} value={addr.address_id}>
                  {addr.region.region} - {addr.city.city}
                </option>
              ))}
            </select>
          </label>
          <label>
            Price Type:
            <select
              name="price_type"
              value={filters.price_type || ""}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="fixed">Fixed</option>
            </select>
          </label>
          <label>
            Experience Start Date:
            <input
              type="date"
              name="experience_start_date"
              value={filters.experience_start_date || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={handleApply}>Apply Filters</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default GuideFiltersModal;
