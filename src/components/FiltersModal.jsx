import React, { useState } from "react";
import "./FiltersModal.css";

const FiltersModal = ({ initialFilters, onApply, onClose }) => {
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
    if (parsedFilters.region_ids) {
      parsedFilters.region_ids = parsedFilters.region_ids
        .split(",")
        .map((val) => parseInt(val.trim()))
        .filter((val) => !isNaN(val));
    }
    if (parsedFilters.language_ids) {
      parsedFilters.language_ids = parsedFilters.language_ids
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
            Date From:
            <input
              type="date"
              name="date_from"
              value={filters.date_from || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Date To:
            <input
              type="date"
              name="date_to"
              value={filters.date_to || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Guide ID:
            <input
              type="number"
              name="guide_id"
              value={filters.guide_id || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Region IDs (comma-separated):
            <input
              type="text"
              name="region_ids"
              value={filters.region_ids || ""}
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
            Min Rating:
            <input
              type="number"
              step="0.1"
              name="min_rating"
              value={filters.min_rating || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Payment Type:
            <input
              type="text"
              name="payment_type"
              value={filters.payment_type || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Min Guest Count:
            <input
              type="number"
              name="min_guest_count"
              value={filters.min_guest_count || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Max Guest Count:
            <input
              type="number"
              name="max_guest_count"
              value={filters.max_guest_count || ""}
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

export default FiltersModal;
