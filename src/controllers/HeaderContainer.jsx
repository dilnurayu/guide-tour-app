import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import HeaderView from "../views/HeaderView";
import { parseJwt } from "../auth/jwtDecoder";
import { authService } from "../services/AuthService";
import { INITIAL_FORM_STATE } from "../models/authModel";

const HeaderContainer = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addressOptions, setAddressOptions] = useState([]);

  useEffect(() => {
    fetch("https://guide-tour-api.vercel.app/addresses")
      .then((res) => res.json())
      .then((data) => setAddressOptions(data))
      .catch((err) => console.error("Error fetching addresses:", err));
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { email, password } = formData;
      const data = await authService.login({ email, password });
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
      const data = await authService.register(formData);
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

  return (
    <HeaderView
      user={user}
      activeModal={activeModal}
      formData={formData}
      error={error}
      loading={loading}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      handleInputChange={handleInputChange}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      openModal={openModal}
      closeModal={closeModal}
      addressOptions={addressOptions}
    />
  );
};

export default HeaderContainer;
