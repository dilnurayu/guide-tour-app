// src/views/ToursListView.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock, FaRegStar, FaStar } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import "./style/GuidesList.css";
import defaultTourImage from "../assets/tour-image.png";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="star full-star" />
      ))}
      {halfStar === 1 && <FaStarHalfAlt className="star half-star" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="star empty-star" />
      ))}
    </>
  );
};

const ToursListView = ({ tours, loading, error }) => {
  if (loading) {
    return (
      <div className="guides-list-container">
        <div className="guide-wrapper">
          <h2>Results: Loading..</h2>
          <h3>
            <CiFilter /> Advanced Filter
          </h3>
        </div>
        <ul className="guides-list">
          {Array.from({ length: 9 }).map((_index) => (
            <li className="guide-item">
              <div className="img" />
              <p>{renderStars(0)}</p>
              <h3>Loading...</h3>
              <p>
                <FaRegClock /> Loading...
              </p>
              <p>Price: Loading...</p>
              <button>Loading...</button>
            </li>
          ))}
        </ul>
      </div>
    );
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
                src={tour.photoGallery?.[0] || defaultTourImage}
                alt={tour.about}
              />
              <p>{renderStars(tour.averageRating)}</p>
              <h3>{tour.title}</h3>
              <p>
                <FaRegClock />{" "}
                {tour.duration
                  ? `${tour.duration} Hour${tour.duration > 1 ? "s" : ""}`
                  : "Duration not set"}
              </p>
              <p>
                Price: ${tour.price}/{tour.priceType}
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
