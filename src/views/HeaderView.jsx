import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiMapPin,
  FiPhone,
  FiStar,
  FiCalendar,
} from "react-icons/fi";
import logo from "../assets/UzGuide.png";
import "./style/Header.css";
import { IoIosNotifications } from "react-icons/io";
import AuthForm from "../components/AuthForm";

const HeaderView = ({
  user,
  activeModal,
  formData,
  error,
  loading,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleInputChange,
  handleLogin,
  handleRegister,
  openModal,
  closeModal,
  addressOptions,
}) => {
  const renderNavLinks = () => (
    <ul className="nav-links">
      {user?.role === "guide" ? (
        <>
          <li>
            <Link to="/guide-reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/guide-tours">Tours</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/guides">Guides</Link>
          </li>
          <li>
            <Link to="/destinations">Destinations</Link>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </>
      )}
    </ul>
  );

  const renderMobileNavLinks = () => {
    if (user?.role === "guide") {
      return (
        <ul className="mobile-nav-links">
          <li>
            <Link to="/guide-reviews" onClick={() => setMobileMenuOpen(false)}>
              <FiStar size={20} style={{ marginRight: "8px" }} />
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/guide-tours" onClick={() => setMobileMenuOpen(false)}>
              <FiCalendar size={20} style={{ marginRight: "8px" }} />
              Tours
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <FiHome size={20} style={{ marginRight: "8px" }} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/guides" onClick={() => setMobileMenuOpen(false)}>
              <FiUsers size={20} style={{ marginRight: "8px" }} />
              Guides
            </Link>
          </li>
          <li>
            <Link to="/destinations" onClick={() => setMobileMenuOpen(false)}>
              <FiMapPin size={20} style={{ marginRight: "8px" }} />
              Destinations
            </Link>
          </li>
          <li>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              <FiPhone size={20} style={{ marginRight: "8px" }} />
              Contact Us
            </a>
          </li>
        </ul>
      );
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <nav className="nav">{renderNavLinks()}</nav>
          <div className="auth">
            {user ? (
              <div className="profile">
                <Link to="/notifications">
                  <IoIosNotifications size={25} color="gray" />
                </Link>
                <Link to="/profile">
                  <CgProfile size={25} color="gray" />
                </Link>
              </div>
            ) : (
              <>
                <a href="#login" onClick={() => openModal("login")}>
                  Login
                </a>
                <a href="#register" onClick={() => openModal("register")}>
                  Register
                </a>
              </>
            )}
          </div>
          <div
            className="mobile-menu-icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            {renderMobileNavLinks()}
            <div className="mobile-auth">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <CgProfile size={25} color="gray" />
                    <span style={{ marginLeft: "8px" }}>Profile</span>
                  </Link>
                  <Link to="/notifications">
                    <IoIosNotifications size={25} color="gray" />
                    <span style={{ marginLeft: "8px" }}>Notifications</span>
                  </Link>
                </>
              ) : (
                <>
                  <a href="#login" onClick={() => openModal("login")}>
                    Login
                  </a>
                  <a href="#register" onClick={() => openModal("register")}>
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {error && <div className="error-message">{error}</div>}
            <h2>{activeModal === "login" ? "Login" : "Register"}</h2>
            <AuthForm
              addressOptions={addressOptions}
              type={activeModal}
              formData={formData}
              onChange={handleInputChange}
              onSubmit={activeModal === "login" ? handleLogin : handleRegister}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderView;
