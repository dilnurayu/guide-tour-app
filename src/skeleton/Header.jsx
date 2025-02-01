import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import './Modal.css';
import logo from '../assets/UzGuide.png';

const Header = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <header className="header">
        <div className='header-wrapper'>
          <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/guides">Guides</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
        <div className="auth">
          <a href="#login" onClick={() => openModal('login')}>Login</a>
          <a href="#register" onClick={() => openModal('register')}>Register</a>
        </div>
        </div>
      </header>

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {activeModal === 'login' && (
              <>
                <h2>Login</h2>
                <form>
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button type="submit">Sign In</button>
                  <div className="user-type-select">
                    <div className="guest">
                      <p>Tourists:</p>
                      <input type="checkbox" />
                    </div>
                    <div className="guide">
                      <p>Guide:</p>
                      <input type="checkbox" />
                    </div>
                  </div>
                </form>
              </>
            )}
            {activeModal === 'register' && (
              <>
                <h2>Register</h2>
                <form>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button type="submit">Sign Up</button>
                  <div className="user-type-select">
                    <div className="guest">
                      <p>Tourists:</p>
                      <input type="checkbox" />
                    </div>
                    <div className="guide">
                      <p>Guide:</p>
                      <input type="checkbox" />
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
