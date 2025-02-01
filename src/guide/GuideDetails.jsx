import React from "react";
import "./GuideDetails.css";
import guidePerson from "../assets/guide-person.png";
import image from "../assets/guide-details/image.png";
import image1 from "../assets/guide-details/image-1.png";
import image2 from "../assets/guide-details/image-2.png";

const ProfilePage = () => {
  return (
    <>
      <div className="profile-container">
        <div className="about-container">
          <div className="left-section">
            <div className="left-section-wrapper">
              <h2>About the Guide</h2>
              <div>
                <h3>Languages</h3>
                <div className="languages-list">
                  <p>English</p>
                  <p>Spanish</p>
                  <p>French</p>
                </div>
              </div>
              <div>
                <h3>Regions to Guide</h3>
                <div className="regions-list">
                  <p>Europe</p>
                  <p>South America</p>
                  <p>Asia</p>
                </div>
              </div>
              <div>
                <h3>About</h3>
                <p className="about-text">
                  John is a seasoned travel guide with over 8 years of
                  experience. He specializes in cultural tours and adventure
                  trips. His passion for history and local traditions makes his
                  tours unique and memorable.
                </p>
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="right-section-wrapper">
              <img
                src={guidePerson}
                alt="Profile"
                className="profile-picture"
              />
              <h2 className="profile-name">John Doe</h2>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="experience-date">Experience since: January 2015</p>
            </div>
          </div>
        </div>
        <div className="bottom-profile-wrapper">
          <div className="profile-gallery">
            <div className="profile-gallery-wrapper">
              <h2>From John Doe's gallery</h2>
              <p>
                Ex optio sequi et quos praesentium in nostrum labore nam rerum
                iusto aut magni nesciunt? Quo quidem neque iste expedita est
                dolor similique ut quasi maxime ut deserunt autem At praesentium
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
                iusto aut magni nesciunt? Quo quidem neque iste expedita est
                dolo.
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
      </div>
    </>
  );
};

export default ProfilePage;
