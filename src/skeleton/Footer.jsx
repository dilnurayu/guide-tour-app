import React from "react";
import "./Footer.css";
import footerImage from "../assets/footer.png";
import logo from "../assets/UzGuideWhite.png";
import stayUpdated from "../assets/footer/stayupdated.png";
import contactUs from "../assets/footer/contact-us.png";
import socialMedia from "../assets/footer/social-media.png";
import tiktok from "../assets/footer/tiktok.png";
import telegram from "../assets/footer/telegram.png";
import instagram from "../assets/footer/instagram.png";
import facebook from "../assets/footer/facebook.png";

const Footer = () => {
  return (
    <div className="footer" id="contact">
      <div className="footer-photo">
        <img src={footerImage} />
        <div className="footer-overlay">
          <img src={stayUpdated} />
          <div className="footer-input">
            <input type="email" />
            <button>Subscribe</button>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-left">
            <img src={logo} />
            <p>
              Discover amazing destinations, guides, and tips to make your
              journey unforgettable.
            </p>
          </div>
          <div className="footer-right">
            <div className="footer-contact-us">
              <img src={contactUs} />
              <ul>
                <li>Email: support@example.com</li>
                <li>Phone: +123 456 789</li>
                <li>Address: 123 Main Street, City, Country</li>
              </ul>
            </div>
            <div className="footer-socials">
              <img src={socialMedia} />
              <ul>
                <li>
                  <img src={tiktok} />
                </li>
                <li>
                  <img src={telegram} />
                </li>
                <li>
                  <img src={instagram} />
                </li>
                <li>
                  <img src={facebook} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
