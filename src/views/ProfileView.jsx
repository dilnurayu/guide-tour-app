import { useContext } from "react";
import guidePerson from "../assets/profile.png";
import { AuthContext } from "../auth/AuthContext";
import "./style/Profile.css";

const ProfileView = ({
  profileData,
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  error,
  editMode,
  setEditMode,
  handleCancel,
  hasResume,
  languageOptions,
  addressOptions,
}) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-image">
          <div className="profile-image-wrapper">
            <img
              src={profileData ? profileData.profile_photo : guidePerson}
              alt="Profile"
            />
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-details-wrapper">
            <ul>
              <li>
                <p>Full Name:</p>
                <span>
                  {profileData ? profileData.user_name : "Loading..."}
                </span>
              </li>
              <li>
                <p>Email:</p>
                <span>{profileData ? profileData.email : "Loading..."}</span>
              </li>
              <li>
                <p>Languages:</p>
                <span>
                  {editMode ? (
                    <select
                      name="languages"
                      value={formData.languages}
                      multiple
                      onChange={(e) => {
                        const selectedValues = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        handleInputChange({
                          target: { name: "languages", value: selectedValues },
                        });
                      }}
                      className="form-input"
                    >
                      {languageOptions.map((lang) => (
                        <option key={lang.language_id} value={lang.language_id}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  ) : languageOptions.length > 0 ? (
                    formData.languages
                      .map((id) => {
                        const language = languageOptions.find(
                          (lang) => lang.language_id === id
                        );
                        return language ? language.name : id;
                      })
                      .join(", ")
                  ) : (
                    formData.languages.join(", ")
                  )}
                </span>
              </li>
              <li>
                <p>Regions:</p>
                <span>
                  {editMode ? (
                    <select
                      name="addresses"
                      value={formData.addresses}
                      multiple
                      onChange={(e) => {
                        const selectedValues = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        handleInputChange({
                          target: { name: "addresses", value: selectedValues },
                        });
                      }}
                      className="form-input"
                    >
                      {addressOptions.map((addr) => (
                        <option key={addr.address_id} value={addr.address_id}>
                          {addr.region.region} - {addr.city.city}
                        </option>
                      ))}
                    </select>
                  ) : addressOptions.length > 0 ? (
                    formData.addresses
                      .map((id) => {
                        const address = addressOptions.find(
                          (addr) => addr.address_id === id
                        );
                        return address
                          ? `${address.region.region} - ${address.city.city}`
                          : id;
                      })
                      .join(", ")
                  ) : (
                    formData.addresses.join(", ")
                  )}
                </span>
              </li>
              <li>
                <p>Experience start date:</p>
                <span>
                  {editMode ? (
                    <input
                      type="date"
                      name="experience_start_date"
                      value={formData.experience_start_date}
                      onChange={handleInputChange}
                    />
                  ) : (
                    formData.experience_start_date
                  )}
                </span>
              </li>
              <li>
                <p>Price:</p>
                <span>
                  {editMode ? (
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    formData.price
                  )}
                </span>
              </li>
              <li>
                <p>Price type:</p>
                <span>
                  {editMode ? (
                    <select
                      name="price_type"
                      value={formData.price_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose price type</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                    </select>
                  ) : (
                    formData.price_type
                  )}
                </span>
              </li>
              <li>
                <p>Bio:</p>
                <span>
                  {editMode ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Enter bio"
                    />
                  ) : (
                    formData.bio
                  )}
                </span>
              </li>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </ul>
            <div className="buttons-container">
              {editMode ? (
                <div className="edit-mode-buttons">
                  <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                hasResume && (
                  <button onClick={() => setEditMode(true)}>Edit</button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
