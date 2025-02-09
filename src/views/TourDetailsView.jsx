// src/views/TourDetailsView.jsx
import React from "react";
import "./style/TourDetails.css";
import image from "../assets/tour-image.png";

const TourDetailsView = ({ tour }) => {
  // Optionally, you can format the date.
  const formattedDate = new Date(tour.date).toLocaleDateString();

  return (
    <div className="tour-details">
      <div className="tour-details-wrapper">
        <div className="tour-about">
          <div className="tour-about-wrapper">
            <h1>Tour #{tour.tourId} Details</h1>
            <h5>{tour.duration} hours</h5>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
              <span>(2.3k review)</span>
            </div>
            <p>{tour.about}</p>
            <ul>
              <li>
                <p>Guest Count</p>
                <span>{tour.guestCount}</span>
              </li>
              <li>
                <p>Date</p>
                <span>{formattedDate}</span>
              </li>
              <li>
                <p>Departure Time</p>
                <span>{tour.departureTime}</span>
              </li>
              <li>
                <p>Return Time</p>
                <span>{tour.returnTime}</span>
              </li>
              <li>
                <p>Dress Code</p>
                <span>{tour.dressCode}</span>
              </li>
              <li>
                <p>Not Included</p>
                <span>{tour.notIncluded}</span>
              </li>
              <li>
                <p>Included</p>
                <span>{tour.included}</span>
              </li>
              <li>
                <p>Destinations</p>
                <span>{tour.destinationIds.join(", ")}</span>
              </li>
              <li>
                <p>Languages</p>
                <span>{tour.languageIds.join(", ")}</span>
              </li>
            </ul>
            <div className="tour-about-button-wrapper">
              <div></div>
              <button>${tour.price} / per person</button>
            </div>
          </div>
        </div>
        <div className="book-tour">
          <div className="book-tour-wrapper">
            <h1>Book This Tour</h1>
            <p>
              Ex optio sequi et quos praesentium in nostrum labore nam rerum
              iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.
            </p>
            <input placeholder="Name" />
            <input placeholder="Phone" />
            <input placeholder="dd-mm-yy" />
            <input placeholder="Number of guests" />
            <input placeholder="Language" />
            <input placeholder="Message" />
            <button className="book-btn">Book Now</button>
          </div>
        </div>
      </div>
      <div className="tour-gallery">
        <h1>From Gallery</h1>
        <p>
          Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto
          aut magni nesciunt? Quo quidem neque iste expedita est dolor similique
          ut quasi maxime ut deserunt autem At praesentium voluptatem aut libero
          nisi.
        </p>
        <div className="tour-gallery-photos">
          {tour.photoGallery && tour.photoGallery.length > 0 ? (
            tour.photoGallery.map((photo, index) => (
              <img
                key={index}
                src={"http://localhost:8000" + photo || image}
                alt={`Gallery ${index + 1}`}
              />
            ))
          ) : (
            <img src={image} alt="Default Gallery" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetailsView;
