import React from "react";
import "./style/GuideDetails.css";
import guidePerson from "../assets/profile.png";

const GuideDetailsView = ({
  guide,
  bookingData,
  onBookingInputChange,
  onBookNow,
}) => {
  const languages =
    guide.languages && guide.languages.length
      ? guide.languages.map((lang) => lang.name)
      : ["No languages available"];

  const regions =
    guide.addresses && guide.addresses.length
      ? guide.addresses.map(
          (addr) => `${addr.region.region}, ${addr.city.city}`
        )
      : ["No regions available"];

  const rating = Math.round(guide.rating) || 0;

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[monthIndex];

    function getOrdinal(n) {
      if (n % 100 >= 11 && n % 100 <= 13) {
        return n + "th";
      }
      switch (n % 10) {
        case 1:
          return n + "st";
        case 2:
          return n + "nd";
        case 3:
          return n + "rd";
        default:
          return n + "th";
      }
    }

    return `${getOrdinal(day)} ${monthName} ${year}`;
  }

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
            <img
              src={guide.guidePhoto ? guide.guidePhoto : guidePerson}
              alt="Profile"
              className="profile-picture"
            />
            <h2 className="profile-name">{guide.guideName}</h2>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  {i < rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <p className="experience-date">
              Experience since: {formatDate(guide.experienceStartDate)}
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-profile-wrapper">
        <div className="profile-gallery">
          {guide.tourPhotos && guide.tourPhotos.length > 0 && (
            <div className="profile-gallery-wrapper">
              <h2>From {guide.guideName}&apos;s gallery</h2>
              <p>
                Ex optio sequi et quos praesentium in nostrum labore nam rerum
                iusto aut magni nesciunt? Quo quidem neque iste expedita est
                dolor similique ut quasi maxime ut deserunt autem At praesentium
                voluptatem aut libero nisi.
              </p>
              <div className="photo-container">
                <div className="photo-container-wrapper">
                  <div className="main-photo">
                    <img src={guide.tourPhotos[0]} alt="Large photo" />
                  </div>
                  <div className="photo-container-right">
                    <div className="right-photo-container">
                      <img src={guide.tourPhotos[1]} alt="Top right photo" />
                    </div>
                    <div className="right-photo-container">
                      <img src={guide.tourPhotos[2]} alt="Bottom right photo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
            <select
              name="language_id"
              value={bookingData.language_id}
              onChange={onBookingInputChange}
            >
              <option value="">Select a language</option>
              {guide.languages &&
                guide.languages.length > 0 &&
                guide.languages.map((lang) => (
                  <option key={lang.language_id} value={lang.language_id}>
                    {lang.name}
                  </option>
                ))}
            </select>
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
