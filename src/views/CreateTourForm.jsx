import React, { useState } from "react";
import { createTour } from "../services/GuideToursService";

const CreateTourForm = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    about: "",
    guestCount: "",
    languageIds: "",
    destinationIds: "",
    date: "",
    duration: "",
    priceType: "per person",
    price: "",
    paymentType: "cash",
    departureTime: "00:00:00",
    returnTime: "00:00:00",
    dressCode: "",
    notIncluded: "",
    included: "",
  });

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const tourData = {
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
      destination_ids: formData.destinationIds
        .split(",")
        .map((id) => Number(id.trim())),
      language_ids: formData.languageIds
        .split(",")
        .map((id) => Number(id.trim())),
    };

    const requestData = new FormData();
    requestData.append("tour_data", JSON.stringify(tourData));

    // Append each photo individually.
    photos.forEach((photo) => {
      requestData.append("photos", photo, photo.name);
    });

    try {
      await createTour(requestData);
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Create a New Tour</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>About:</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tour Title"
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
            <input
              type="text"
              name="languageIds"
              value={formData.languageIds}
              onChange={handleChange}
              placeholder="e.g., 1,2"
              required
            />
          </div>

          <div className="form-group">
            <label>Destination:</label>
            <input
              type="text"
              name="destinationIds"
              value={formData.destinationIds}
              onChange={handleChange}
              placeholder="e.g., 2,3"
              required
            />
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
            <label>Duration (days):</label>
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

          <div className="form-group">
            <label>Photos:</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
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

export default CreateTourForm;
