import React, { useState } from "react";
import { updateTour } from "../services/GuideToursService";
import "./style/Modal.css";

const EditTourForm = ({
  tour,
  onClose,
  onSaved,
  languageOptions,
  destinationOptions,
}) => {
  const formatDate = (dateString) =>
    dateString ? dateString.split("T")[0] : "";

  const [formData, setFormData] = useState({
    title: tour.title,
    about: tour.about,
    guestCount: tour.guestCount,
    // Convert languageIds and destinationIds to arrays of strings for the multi-select
    languageIds: tour.languageIds.map(String),
    destinationIds: tour.destinationIds.map(String),
    date: formatDate(tour.date),
    duration: tour.duration,
    priceType: tour.priceType,
    price: tour.price,
    paymentType: tour.paymentType,
    departureTime: tour.departureTime,
    returnTime: tour.returnTime,
    dressCode: tour.dressCode,
    notIncluded: tour.notIncluded,
    included: tour.included,
  });

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;
    if (multiple) {
      // For multi-select, get all selected option values
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const tourData = {
      title: formData.title,
      guest_count: Number(formData.guestCount),
      price: Number(formData.price),
      price_type: formData.priceType,
      payment_type: formData.paymentType,
      date: formData.date,
      departure_time: formData.departureTime,
      return_time: formData.returnTime,
      duration: Number(formData.duration),
      dress_code: formData.dressCode,
      not_included: formData.notIncluded,
      included: formData.included,
      about: formData.about,
      destination_ids: formData.destinationIds.map((id) => Number(id)),
      language_ids: formData.languageIds.map((id) => Number(id)),
    };

    const requestData = new FormData();
    requestData.append("tour_data", JSON.stringify(tourData));

    photos.forEach((photo) => {
      requestData.append("photos", photo, photo.name);
    });

    try {
      await updateTour(tour.tourId, requestData);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Tour</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Tour Title"
              required
            />
          </div>
          <div className="form-group">
            <label>About:</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About the Tour"
              required
            />
          </div>
          <div className="form-group">
            <label>Guest Count:</label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="Number of Guests"
              required
            />
          </div>
          <div className="form-group">
            <label>Language:</label>
            <select
              name="languageIds"
              value={formData.languageIds}
              multiple
              onChange={handleChange}
              required
            >
              {languageOptions &&
                languageOptions.map((lang) => (
                  <option key={lang.language_id} value={lang.language_id}>
                    {lang.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Destination:</label>
            <select
              name="destinationIds"
              value={formData.destinationIds}
              multiple
              onChange={handleChange}
              required
            >
              {destinationOptions &&
                destinationOptions.map((dest) => (
                  <option key={dest.address_id} value={dest.address_id}>
                    {dest.region.region} - {dest.city.city}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Duration (hours):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              required
            />
          </div>
          <div className="form-group">
            <label>Price Type:</label>
            <select
              name="priceType"
              value={formData.priceType}
              onChange={handleChange}
              required
            >
              <option value="per person">Per Person</option>
              <option value="per group">Per Group</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price in $"
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Type:</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              required
            >
              <option value="credit card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <div className="form-group">
            <label>Departure Time:</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Return Time:</label>
            <input
              type="time"
              name="returnTime"
              value={formData.returnTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Dress Code:</label>
            <input
              type="text"
              name="dressCode"
              value={formData.dressCode}
              onChange={handleChange}
              placeholder="Dress Code (optional)"
            />
          </div>
          <div className="form-group">
            <label>Not Included:</label>
            <input
              type="text"
              name="notIncluded"
              value={formData.notIncluded}
              onChange={handleChange}
              placeholder="Not Included (optional)"
            />
          </div>
          <div className="form-group">
            <label>Included:</label>
            <input
              type="text"
              name="included"
              value={formData.included}
              onChange={handleChange}
              placeholder="Included (optional)"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTourForm;
