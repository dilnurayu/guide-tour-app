import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { AuthContext } from "../auth/AuthContext";
import "./Header.css";
import "./Modal.css";
import logo from "../assets/UzGuide.png";
import AuthForm from "./AuthComponents";
import { parseJwt } from "../auth/jwtDecoder";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  password: "",
  address_id: 0,
  user_type: "",
};

const API_BASE_URL = "https://guide-tour-api.vercel.app/auth";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuth = async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || `${endpoint} failed`);
    }
    return responseData;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { email, password } = formData;
      const data = await handleAuth("signin", { email, password });

      localStorage.setItem("token", data.access_token);

      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken.role) {
          localStorage.setItem("userType", decodedToken.role);
        }
        setUser({
          token,
          role: decodedToken ? decodedToken.role : null,
        });
      }

      closeModal();
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await handleAuth("signup", formData);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userType", formData.user_type);

      setUser({
        role: formData.user_type,
        token: data.access_token,
      });

      closeModal();
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type) => {
    setActiveModal(type);
    setError("");
    setFormData(INITIAL_FORM_STATE);

    setMobileMenuOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
    setError("");
  };
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
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <CgProfile size={25} color="gray" />
                  <span style={{ marginLeft: "8px" }}>Profile</span>
                </Link>
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

export default Header;
