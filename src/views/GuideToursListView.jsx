import React, { useState } from "react";
import "./GuideToursList.css";

const GuideToursListView = ({ tours, loading, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="guide-tours-list">
      <div className="title-create-tour-wrapper">
        <h1>Tours</h1>
        <button onClick={() => setIsModalOpen(true)}>Create New</button>
      </div>

      {tours.map((tour) => (
        <div className="guide-tour-list-container" key={tour.id}>
          <div className="guide-tour-list-left">
            <h3>{tour.about}</h3>
            <p>
              {tour.duration} Days | Languages: {tour.languageIds.join(", ")}
            </p>
            <p>
              Price: ${tour.price} / {tour.priceType}
            </p>
          </div>
          <div className="tours-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Tour</h2>
            <form>
              <div className="form-group">
                <label>About:</label>
                <input type="text" placeholder="Tour Title" required />
              </div>

              <div className="form-group">
                <label>Guest Count:</label>
                <input type="number" placeholder="Number of Guests" required />
              </div>

              <div className="form-group">
                <label>Language:</label>
                <input type="text" placeholder="Languages Available" required />
              </div>

              <div className="form-group">
                <label>Date:</label>
                <input type="date" required />
              </div>

              <div className="form-group">
                <label>Duration:</label>
                <input type="text" placeholder="Duration" required />
              </div>

              <div className="form-group">
                <label>Price Type:</label>
                <select required>
                  <option value="per person">Per Person</option>
                  <option value="per group">Per Group</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input type="number" placeholder="Price in $" required />
              </div>

              <div className="form-group">
                <label>Payment Type:</label>
                <select required>
                  <option value="credit card">Credit Card</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideToursListView;
