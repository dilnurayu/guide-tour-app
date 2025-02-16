import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import "./style/GuidesList.css";
import defaultTourImage from "../assets/tour-image.png";
import FiltersModal from "../components/FiltersModal";
import renderStars from "../components/RenderStars";

const ToursListView = ({ tours, loading, error, onApplyFilters }) => {
  const [showModal, setShowModal] = useState(false);

  const renderModal = () =>
    showModal && (
      <FiltersModal
        initialFilters={{}}
        onApply={(filters) => {
          setShowModal(false);
          if (onApplyFilters) {
            onApplyFilters(filters);
          }
        }}
        onClose={() => setShowModal(false)}
      />
    );

  if (loading) {
    return (
      <div className="guides-list-container">
        <div className="guide-wrapper">
          <h2>Results: Loading...</h2>
          <h3 style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
            <CiFilter /> Advanced Filter
          </h3>
        </div>
        <ul className="guides-list">
          {Array.from({ length: 9 }).map((_, index) => (
            <li className="guide-item" key={index}>
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
        {renderModal()}
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
        <h3 style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
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
      {renderModal()}
    </div>
  );
};

export default ToursListView;
