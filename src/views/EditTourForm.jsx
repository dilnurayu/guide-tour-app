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
    title: tour.title || "",
    about: tour.about || "",
    guestCount: tour.guestCount || "",
    languageIds: tour.languages.map((lang) => String(lang.language_id)) || [],
    destinationIds: tour.addresses.map((addr) => String(addr.address_id)) || [],
    date: formatDate(tour.date) || "",
    duration: tour.duration || "",
    priceType: tour.priceType || "per person",
    price: tour.price || "",
    paymentType: tour.paymentType || "cash",
    departureTime: tour.departureTime || "00:00:00",
    returnTime: tour.returnTime || "00:00:00",
    dressCode: tour.dressCode || "",
    notIncluded: tour.notIncluded || "",
    included: tour.included || "",
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

    // Photos validation (if provided)
    if (photos.length > 0) {
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
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (files.length > 0) {
        const invalidFiles = files.filter(
          (file) => !file.type.startsWith("image/")
        );
        if (invalidFiles.length > 0) {
          photoErrors = "All files must be images.";
        }

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
      const firstErrorField = document.querySelector(".error-field");
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
      await updateTour(tour.tourId, requestData);
      onSaved();
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
          general: "An error occurred while updating the tour",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to display error class
  const getErrorClass = (fieldName) => {
    return errors[fieldName] ? "error-field" : "";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Tour</h2>
        {errors.general && <p className="error">{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Tour Title"
              className={getErrorClass("title")}
              required
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>About:</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About the Tour"
              className={getErrorClass("about")}
              required
            />
            {errors.about && <p className="error">{errors.about}</p>}
          </div>
          <div className="form-group">
            <label>Guest Count:</label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="Number of Guests"
              className={getErrorClass("guestCount")}
              required
            />
            {errors.guestCount && <p className="error">{errors.guestCount}</p>}
          </div>
          <div className="form-group">
            <label>Language:</label>
            <select
              name="languageIds"
              value={formData.languageIds}
              multiple
              onChange={handleChange}
              className={getErrorClass("languageIds")}
              required
            >
              {languageOptions &&
                languageOptions.map((lang) => (
                  <option key={lang.language_id} value={lang.language_id}>
                    {lang.name}
                  </option>
                ))}
            </select>
            {errors.languageIds && (
              <p className="error">{errors.languageIds}</p>
            )}
          </div>
          <div className="form-group">
            <label>Destination:</label>
            <select
              name="destinationIds"
              value={formData.destinationIds}
              multiple
              onChange={handleChange}
              className={getErrorClass("destinationIds")}
              required
            >
              {destinationOptions &&
                destinationOptions.map((dest) => (
                  <option key={dest.address_id} value={dest.address_id}>
                    {dest.region.region} - {dest.city.city}
                  </option>
                ))}
            </select>
            {errors.destinationIds && (
              <p className="error">{errors.destinationIds}</p>
            )}
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={getErrorClass("date")}
              required
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>
          <div className="form-group">
            <label>Duration (hours):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              className={getErrorClass("duration")}
              required
            />
            {errors.duration && <p className="error">{errors.duration}</p>}
          </div>
          <div className="form-group">
            <label>Price Type:</label>
            <select
              name="priceType"
              value={formData.priceType}
              onChange={handleChange}
              className={getErrorClass("priceType")}
              required
            >
              <option value="per person">Per Person</option>
              <option value="per group">Per Group</option>
            </select>
            {errors.priceType && <p className="error">{errors.priceType}</p>}
          </div>
          <div className="form-group">
            <label>Price ($):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price in $"
              className={getErrorClass("price")}
              required
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div className="form-group">
            <label>Payment Type:</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className={getErrorClass("paymentType")}
              required
            >
              <option value="credit card">Credit Card</option>
              <option value="cash">Cash</option>
            </select>
            {errors.paymentType && (
              <p className="error">{errors.paymentType}</p>
            )}
          </div>
          <div className="form-group">
            <label>Departure Time:</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              className={getErrorClass("departureTime")}
              required
            />
            {errors.departureTime && (
              <p className="error">{errors.departureTime}</p>
            )}
          </div>
          <div className="form-group">
            <label>Return Time:</label>
            <input
              type="time"
              name="returnTime"
              value={formData.returnTime}
              onChange={handleChange}
              className={getErrorClass("returnTime")}
              required
            />
            {errors.returnTime && <p className="error">{errors.returnTime}</p>}
          </div>
          <div className="form-group">
            <label>Dress Code:</label>
            <input
              type="text"
              name="dressCode"
              value={formData.dressCode}
              onChange={handleChange}
              placeholder="Dress Code (optional)"
              className={getErrorClass("dressCode")}
            />
            {errors.dressCode && <p className="error">{errors.dressCode}</p>}
          </div>
          <div className="form-group">
            <label>Not Included:</label>
            <input
              type="text"
              name="notIncluded"
              value={formData.notIncluded}
              onChange={handleChange}
              placeholder="Not Included (optional)"
              className={getErrorClass("notIncluded")}
            />
            {errors.notIncluded && (
              <p className="error">{errors.notIncluded}</p>
            )}
          </div>
          <div className="form-group">
            <label>Included:</label>
            <input
              type="text"
              name="included"
              value={formData.included}
              onChange={handleChange}
              placeholder="Included (optional)"
              className={getErrorClass("included")}
            />
            {errors.included && <p className="error">{errors.included}</p>}
          </div>
          {/* <div className="form-group">
            <label>Photos (optional):</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={getErrorClass("photos")}
            />
            {errors.photos && <p className="error">{errors.photos}</p>}
          </div> */}
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
