import React from "react";
import "./Footer.css";
import footerImage from "../assets/footer.png";
import logo from "../assets/UzGuideWhite.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-photo">
        <img src={footerImage} />
        <div className="footer-overlay">
          <h2>Stay Updated</h2>
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
            <h3>Contact Us</h3>
            <ul>
              <li>Email: support@example.com</li>
              <li>Phone: +123 456 789</li>
              <li>Address: 123 Main Street, City, Country</li>
            </ul>
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
