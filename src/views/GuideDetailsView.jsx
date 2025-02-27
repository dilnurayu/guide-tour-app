import React from "react";
import "./style/GuideDetails.css";
import guidePerson from "../assets/profile.png";
import image from "../assets/guide-details/image.png";
import image1 from "../assets/guide-details/image-1.png";
import image2 from "../assets/guide-details/image-2.png";

const GuideDetailsView = ({
  guide,
  bookingData,
  onBookingInputChange,
  onBookNow,
}) => {
  const languages =
    guide.languages && guide.languages.length
      ? guide.languages.map((lang) => lang.name)
      : ["English", "Spanish", "French"];

  const regions =
    guide.addresses && guide.addresses.length
      ? guide.addresses.map((addr) => `Region ${addr.region_id}`)
      : ["Europe", "South America", "Asia"];

  const rating = Math.round(guide.rating) || 0;

  return (
    <div className="profile-container">
      <div className="about-container">
        <div className="left-section">
          <div className="left-section-wrapper">
            <h2>About the Guide</h2>
            <div>
              <h3>Languages</h3>
              <div className="languages-list">
                {languages.map((lang, index) => (
                  <p key={index}>{lang}</p>
                ))}
              </div>
            </div>
            <div>
              <h3>Regions to Guide</h3>
              <div className="regions-list">
                {regions.map((region, index) => (
                  <p key={index}>{region}</p>
                ))}
              </div>
            </div>
            <div>
              <h3>About</h3>
              <p className="about-text">{guide.bio}</p>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="right-section-wrapper">
            <img src={guidePerson} alt="Profile" className="profile-picture" />
            <h2 className="profile-name">{guide.guideName}</h2>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  {i < rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <p className="experience-date">
              Experience since: {guide.experienceStartDate}
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-profile-wrapper">
        <div className="profile-gallery">
          <div className="profile-gallery-wrapper">
            <h2>From {guide.guideName}'s gallery</h2>
            <p>
              Ex optio sequi et quos praesentium in nostrum labore nam rerum
              iusto aut magni nesciunt? Quo quidem neque iste expedita est dolor
              similique ut quasi maxime ut deserunt autem At praesentium
              voluptatem aut libero nisi.
            </p>
            <div className="w-full max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-2 gap-4 photo-grid">
                <div className="relative aspect-square">
                  <img
                    src={image}
                    alt="Large photo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="relative aspect-square">
                    <img
                      src={image1}
                      alt="Top right photo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="relative aspect-square">
                    <img
                      src={image2}
                      alt="Bottom right photo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="book-guide">
          <div className="book-guide-wrapper">
            <h1>Book This Guide</h1>
            <p>
              Ex optio sequi et quos praesentium in nostrum labore nam rerum
              iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.
            </p>
            <input
              placeholder="dd-mm-yy"
              name="tour_date"
              type="date"
              value={bookingData.tour_date}
              onChange={onBookingInputChange}
            />
            <input
              placeholder="Reservation count"
              name="reserve_count"
              value={bookingData.reserve_count}
              onChange={onBookingInputChange}
            />
            <input
              placeholder="Language"
              name="language_id"
              value={bookingData.language_id}
              onChange={onBookingInputChange}
            />
            <input
              placeholder="Message"
              name="message"
              value={bookingData.message}
              onChange={onBookingInputChange}
            />
            <button className="book-btn" onClick={onBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetailsView;
