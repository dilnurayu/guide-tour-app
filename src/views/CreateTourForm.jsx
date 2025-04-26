import React, { useState, useEffect } from "react";
import { createTour } from "../services/GuideToursService";
import "./style/Modal.css";

const CreateTourForm = ({
  onClose,
  onCreated,
  languageOptions,
  destinationOptions,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    guestCount: "",
    languageIds: [],
    destinationIds: [],
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.about.trim()) newErrors.about = "About section is required";

    // Numeric validation
    if (!formData.guestCount || parseInt(formData.guestCount) <= 0) {
      newErrors.guestCount = "Guest count must be a positive number";
    }

    if (!formData.duration || parseInt(formData.duration) <= 0) {
      newErrors.duration = "Duration must be a positive number";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    // Array selections validation
    if (formData.languageIds.length === 0) {
      newErrors.languageIds = "At least one language must be selected";
    }

    if (formData.destinationIds.length === 0) {
      newErrors.destinationIds = "At least one destination must be selected";
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    // Time validation
    if (!formData.departureTime) {
      newErrors.departureTime = "Departure time is required";
    }

    if (!formData.returnTime) {
      newErrors.returnTime = "Return time is required";
    }

    // Photos validation
    if (!photos || photos.length !== 3) {
      newErrors.photos = "Exactly 3 photos are required";
    } else {
      // Check file types and sizes
      const invalidPhotos = photos.filter(
        (photo) => !photo.type.startsWith("image/")
      );
      if (invalidPhotos.length > 0) {
        newErrors.photos = "All files must be images";
      }

      const largePhotos = photos.filter(
        (photo) => photo.size > 2 * 1024 * 1024
      );
      if (largePhotos.length > 0) {
        newErrors.photos = "All images must be under 2MB in size";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;
    if (multiple) {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear errors for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPhotos(files);

      // Validate photos immediately
      let photoErrors = "";
      if (files.length !== 3) {
        photoErrors = "Please upload exactly 3 images.";
      } else {
        // Check file types
        const invalidFiles = files.filter(
          (file) => !file.type.startsWith("image/")
        );
        if (invalidFiles.length > 0) {
          photoErrors = "All files must be images.";
        }

        // Check file sizes
        const largeFiles = files.filter((file) => file.size > 2 * 1024 * 1024);
        if (largeFiles.length > 0) {
          photoErrors = "All images must be under 2MB in size.";
        }
      }

      if (photoErrors) {
        setErrors((prev) => ({ ...prev, photos: photoErrors }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.photos;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all form fields
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to the first error
      const firstErrorField = document.querySelector(`.error-field`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

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
      dress_code: formData.dressCode || null,
      not_included: formData.notIncluded || null,
      included: formData.included || null,
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
      await createTour(requestData);
      onCreated();
    } catch (err) {
      // Handle specific API errors
      if (err.response && err.response.data) {
        const errorDetail = err.response.data.detail || err.message;

        if (errorDetail.includes("address IDs")) {
          setErrors((prev) => ({
            ...prev,
            destinationIds: "One or more selected destinations are invalid",
          }));
        } else if (errorDetail.includes("language IDs")) {
          setErrors((prev) => ({
            ...prev,
            languageIds: "One or more selected languages are invalid",
          }));
        } else if (errorDetail.includes("not an image")) {
          setErrors((prev) => ({
            ...prev,
            photos: "All files must be images",
          }));
        } else if (errorDetail.includes("File size too large")) {
          setErrors((prev) => ({
            ...prev,
            photos: "All images must be under 2MB in size",
          }));
        } else {
          setErrors((prev) => ({ ...prev, general: errorDetail }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "An error occurred while creating the tour",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to display error message
  const getErrorClass = (fieldName) => {
    return errors[fieldName] ? "error-field" : "";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Create a New Tour</h2>
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${getErrorClass("title")}`}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Tour Title"
            />
            {errors.title && <div className="field-error">{errors.title}</div>}
          </div>

          <div className={`form-group ${getErrorClass("about")}`}>
            <label>About:</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About the Tour"
              rows="4"
            />
            {errors.about && <div className="field-error">{errors.about}</div>}
          </div>

          <div className={`form-group ${getErrorClass("guestCount")}`}>
            <label>Guest Count:</label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="Number of Guests"
              min="1"
            />
            {errors.guestCount && (
              <div className="field-error">{errors.guestCount}</div>
            )}
          </div>

          <div className={`form-group ${getErrorClass("languageIds")}`}>
            <label>Language:</label>
            <select
              name="languageIds"
              value={formData.languageIds}
              multiple
              onChange={handleChange}
            >
              {languageOptions &&
                languageOptions.map((lang) => (
                  <option key={lang.language_id} value={lang.language_id}>
                    {lang.name}
                  </option>
                ))}
            </select>
            {errors.languageIds && (
              <div className="field-error">{errors.languageIds}</div>
            )}
          </div>

          <div className={`form-group ${getErrorClass("destinationIds")}`}>
            <label>Destination:</label>
            <select
              name="destinationIds"
              value={formData.destinationIds}
              multiple
              onChange={handleChange}
            >
              {destinationOptions &&
                destinationOptions.map((dest) => (
                  <option key={dest.address_id} value={dest.address_id}>
                    {dest.region.region} - {dest.city.city}
                  </option>
                ))}
            </select>
            {errors.destinationIds && (
              <div className="field-error">{errors.destinationIds}</div>
            )}
          </div>

          <div className={`form-group ${getErrorClass("date")}`}>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.date && <div className="field-error">{errors.date}</div>}
          </div>

          <div className={`form-group ${getErrorClass("duration")}`}>
            <label>Duration (hours):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              min="1"
            />
            {errors.duration && (
              <div className="field-error">{errors.duration}</div>
            )}
          </div>

          <div className={`form-group ${getErrorClass("priceType")}`}>
            <label>Price Type:</label>
            <select
              name="priceType"
              value={formData.priceType}
              onChange={handleChange}
            >
              <option value="per person">Per Person</option>
              <option value="per group">Per Group</option>
            </select>
            {errors.priceType && (
              <div className="field-error">{errors.priceType}</div>
            )}
          </div>

          <div className={`form-group ${getErrorClass("price")}`}>
            <label>Price ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price in $"
              min="0.01"
              step="0.01"
            />
            {errors.price && <div className="field-error">{errors.price}</div>}
          </div>

          <div className={`form-group ${getErrorClass("paymentType")}`}>
            <label>Payment Type:</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
            >
              <option value="credit card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
            {errors.paymentType && (
              <div className="field-error">{errors.paymentType}</div>
            )}
          </div>

          <div className={`form-group ${getErrorClass("departureTime")}`}>
            <label>Departure Time:</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
            />
            {errors.departureTime && (
              <div className="field-error">{errors.departureTime}</div>
            )}
          </div>

          <div className={`form-group ${getErrorClass("returnTime")}`}>
            <label>Return Time:</label>
            <input
              type="time"
              name="returnTime"
              value={formData.returnTime}
              onChange={handleChange}
            />
            {errors.returnTime && (
              <div className="field-error">{errors.returnTime}</div>
            )}
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
            <textarea
              name="notIncluded"
              value={formData.notIncluded}
              onChange={handleChange}
              placeholder="Not Included (optional)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Included:</label>
            <textarea
              name="included"
              value={formData.included}
              onChange={handleChange}
              placeholder="Included (optional)"
              rows="3"
            />
          </div>

          <div className={`form-group ${getErrorClass("photos")}`}>
            <label>Photos (exactly 3 required, max 2MB each):</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {errors.photos && (
              <div className="field-error">{errors.photos}</div>
            )}
            {photos.length > 0 && (
              <div className="file-list">
                {photos.map((file, index) => (
                  <div key={index} className="file-item">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Creating Tour..." : "Create Tour"}
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
