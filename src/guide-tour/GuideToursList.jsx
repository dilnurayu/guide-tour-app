import React, { useState } from "react";
import "./GuideToursList.css";

const GuideToursList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="guide-tours-list">
        <div className="title-create-tour-wrapper">
          <h1>Tours</h1>
          <button onClick={openModal}>Create New</button>
        </div>

        <div className="guide-tour-list-container">
          <div className="guide-tour-list-left">
            <h3>Tashkent - Samarkand - Bukhara - Khiva: Pearl of the East</h3>
            <p>4 Days 3 Nights | English, Spanish</p>
            <p>Price: $250.00/per person</p>
          </div>
          <div className="tours-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Create a New Tour</h2>
              <form>
                <div className="form-group">
                  <label>About:</label>
                  <input type="text" placeholder="Tour Title" required />
                </div>

                <div className="form-group">
                  <label>Guest Count:</label>
                  <input
                    type="number"
                    placeholder="Number of Guests"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Language:</label>
                  <input
                    type="text"
                    placeholder="Languages Available"
                    required
                  />
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

                <div className="form-group">
                  <label>Tour Image:</label>
                  <input type="file" accept="image/*" />
                </div>

                <div className="form-group">
                  <label>Destination(s):</label>
                  <input
                    type="text"
                    placeholder="Enter Destinations"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Departure:</label>
                  <input
                    type="text"
                    placeholder="Departure Location"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Departure Time:</label>
                  <input type="time" required />
                </div>

                <div className="form-group">
                  <label>Return Time:</label>
                  <input type="time" required />
                </div>

                <div className="form-group">
                  <label>Dress Code:</label>
                  <input type="text" placeholder="Dress Code" required />
                </div>

                <div className="form-group">
                  <label>Not Included:</label>
                  <textarea
                    placeholder="What is NOT included?"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Included:</label>
                  <textarea placeholder="What is included?" required></textarea>
                </div>

                <div className="form-group">
                  <label>Photo Gallery:</label>
                  <input type="file" accept="image/*" multiple />
                </div>

                <div className="modal-buttons">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GuideToursList;
