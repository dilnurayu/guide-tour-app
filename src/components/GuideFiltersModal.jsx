import React, { useState } from "react";
import "./FiltersModal.css";

const GuideFiltersModal = ({ initialFilters, onApply, onClose }) => {
  const [filters, setFilters] = useState(initialFilters);

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
      parsedFilters.language_ids = parsedFilters.language_ids
        .split(",")
        .map((val) => parseInt(val.trim()))
        .filter((val) => !isNaN(val));
    }
    if (parsedFilters.address_ids) {
      parsedFilters.address_ids = parsedFilters.address_ids
        .split(",")
        .map((val) => parseInt(val.trim()))
        .filter((val) => !isNaN(val));
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
            Language IDs (comma-separated):
            <input
              type="text"
              name="language_ids"
              value={filters.language_ids || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Address IDs (comma-separated):
            <input
              type="text"
              name="address_ids"
              value={filters.address_ids || ""}
              onChange={handleChange}
            />
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
