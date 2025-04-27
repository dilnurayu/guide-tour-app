import React, { useState } from "react";
import "../views/style/Header.css";
import "../views/style/Modal.css";

const AuthForm = ({
  type,
  formData,
  onChange,
  onSubmit,
  loading,
  addressOptions,
}) => {
  const [errors, setErrors] = useState({});
  const isLogin = type === "login";

  const validate = () => {
    const newErrors = {};
    if (!isLogin && (!formData.name || formData.name.trim() === "")) {
      newErrors.name = "Full name is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email address.";
      }
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!isLogin && !formData.address_id) {
      newErrors.address_id = "Region selection is required.";
    }
    if (!isLogin && !formData.user_type) {
      newErrors.user_type = "User type is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSubmit(e);
  };

  const handleFileChange = (e) => {
    onChange({
      target: {
        name: e.target.name,
        value: e.target.files[0] || null,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {!isLogin && (
        <>
          <FormInput
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Full Name"
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <select
            name="address_id"
            value={formData.address_id}
            onChange={onChange}
            className="form-input"
          >
            <option value="">Select Region</option>
            {addressOptions.map((addr) => (
              <option key={addr.address_id} value={addr.address_id}>
                {addr.region.region} - {addr.city.city}
              </option>
            ))}
          </select>
          {errors.address_id && (
            <span className="error">{errors.address_id}</span>
          )}

          <div className="form-input-file">
            <label htmlFor="profile_photo">Profile Photo:</label>
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </>
      )}

      <FormInput
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <FormInput
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}

      {!isLogin && (
        <UserTypeSelect
          value={formData.user_type}
          onChange={onChange}
          error={errors.user_type}
        />
      )}

      <button type="submit" disabled={loading}>
        {loading
          ? `Signing ${isLogin ? "in" : "up"}...`
          : `Sign ${isLogin ? "In" : "Up"}`}
      </button>
    </form>
  );
};

export default AuthForm;

const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = true,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="form-input"
  />
);

const UserTypeSelect = ({ value, onChange, error }) => (
  <div className="user-type-select">
    {["tourist", "guide"].map((type) => (
      <div key={type} className={type}>
        <p>{type.charAt(0).toUpperCase() + type.slice(1)}:</p>
        <input
          type="radio"
          name="user_type"
          value={type}
          checked={value === type}
          onChange={onChange}
        />
      </div>
    ))}
    {error && <span className="error">{error}</span>}
  </div>
);
