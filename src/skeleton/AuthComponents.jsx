import "../views/style/Header.css";
import "../views/style/Modal.css";

// FormInput.jsx
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

// UserTypeSelect.jsx
const UserTypeSelect = ({ value, onChange }) => (
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
  </div>
);

// AuthForm.jsx
const AuthForm = ({ type, formData, onChange, onSubmit, loading }) => {
  const isLogin = type === "login";

  return (
    <form onSubmit={onSubmit}>
      {!isLogin && (
        <>
          <FormInput
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Full Name"
          />
          <FormInput
            type="number"
            name="address_id"
            value={formData.address_id}
            onChange={onChange}
            placeholder="Address"
          />
        </>
      )}
      <FormInput
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email"
      />
      <FormInput
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
      />
      {!isLogin && (
        <UserTypeSelect value={formData.user_type} onChange={onChange} />
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
