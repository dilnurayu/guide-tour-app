import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Modal.css";
import logo from "../assets/UzGuide.png";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../auth/AuthContext";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // For demonstration, when the form is submitted,
  // we simulate login by setting a user with role "guide"
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, determine the role based on form inputs
    setUser({ role: "guide", name: "Guide User" });
    closeModal();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // For demonstration, we assume registration as a guide
    setUser({ role: "guide", name: "Guide User" });
    closeModal();
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
          <nav className="nav">
            <ul className="nav-links">
              {user && user.role === "guide" ? (
                // When logged in as a guide, show only Reviews and Tours
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
          </nav>
          <div className="auth">
            {user ? (
              <div className="profile">
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
        </div>
      </header>

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {activeModal === "login" && (
              <>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button type="submit">Sign In</button>
                  <div className="user-type-select">
                    <div className="guest">
                      <p>Tourists:</p>
                      <input type="radio" name="role" value="tourist" />
                    </div>
                    <div className="guide">
                      <p>Guide:</p>
                      <input type="radio" name="role" value="guide" />
                    </div>
                  </div>
                </form>
              </>
            )}
            {activeModal === "register" && (
              <>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button type="submit">Sign Up</button>
                  <div className="user-type-select">
                    <div className="guest">
                      <p>Tourists:</p>
                      <input type="radio" name="role" value="tourist" />
                    </div>
                    <div className="guide">
                      <p>Guide:</p>
                      <input type="radio" name="role" value="guide" />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
