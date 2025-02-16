import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import "./style/GuidesList.css";
import guidePerson from "../assets/guide-person.png";
import renderStars from "../components/RenderStars";

const GuidesListView = ({ guides, loading, error }) => {
  if (loading)
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
              <div className="rating">{renderStars(0)}</div>
              <h3>Loading...</h3>
              <p>Price: Loading...</p>
              <button>Loading...</button>
            </li>
          ))}
        </ul>
      </div>
    );

  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="guides-list-container">
      <div className="guide-wrapper">
        <h2>Results: {guides.length}</h2>
        <h3>
          <CiFilter /> Advanced Filter
        </h3>
      </div>
      <ul className="guides-list">
        {guides.map((guide) => (
          <Link
            to={`/guides/${guide.resumeId}`}
            key={guide.resumeId}
            className="guide-item-link"
          >
            <li className="guide-item">
              <img
                src={guide.photo ? guide.photo : guidePerson}
                alt={guide.guideName}
              />
              <div className="rating">{renderStars(guide.rating)}</div>
              <h3>{guide.guideName}</h3>
              <p>
                Price: ${guide.price}/{guide.priceType}
              </p>
              <button>Book this guide</button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GuidesListView;
