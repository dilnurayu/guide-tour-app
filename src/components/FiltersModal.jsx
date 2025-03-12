import React, { useEffect, useState } from "react";
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

  const handleApply = () => {
    const parsedFilters = { ...filters };
    if (parsedFilters.language_ids) {
      parsedFilters.language_ids = [parseInt(parsedFilters.language_ids, 10)];
    }
    if (parsedFilters.region_ids) {
      parsedFilters.region_ids = [parseInt(parsedFilters.region_ids, 10)];
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
          {/* <label>
            Guide ID:
            <input
              type="number"
              name="guide_id"
              value={filters.guide_id || ""}
              onChange={handleChange}
            />
          </label> */}
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
