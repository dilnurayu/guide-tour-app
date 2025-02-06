// src/views/ToursListView.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import "../guide/GuidesList.css";
import defaultTourImage from "../assets/tour-image.png";

const ToursListView = ({ tours, loading, error }) => {
  if (loading) {
    return <p>Loading tours...</p>;
  }
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }
  return (
    <div className="guides-list-container">
      <div className="guide-wrapper">
        <h2>Results: {tours.length}</h2>
        <h3>
          <CiFilter /> Advanced Filter
        </h3>
      </div>
      <ul className="guides-list">
        {tours.map((tour) => (
          <Link
            to={`/destinations/${tour.tourId}`}
            key={tour.tourId}
            className="guide-item-link"
          >
            <li className="guide-item">
              <img
                src={
                  tour.photoGallery && tour.photoGallery.length > 0
                    ? tour.photoGallery[0]
                    : defaultTourImage
                }
                alt={tour.about}
              />
              <h3>{tour.about}</h3>
              <p>
                <FaRegClock />{" "}
                {tour.duration
                  ? `${tour.duration} Day${tour.duration > 1 ? "s" : ""}`
                  : "Duration not set"}
              </p>
              <p>
                Price: ${tour.price} / {tour.priceType}
              </p>
              <button>Book this tour</button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ToursListView;
