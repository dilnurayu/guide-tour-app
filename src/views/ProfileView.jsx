import { useContext } from "react";
import guidePerson from "../assets/guide-person.png";
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
}) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-image">
          <div className="profile-image-wrapper">
            <img src={guidePerson} alt="Profile" />
            <button className="delete">Delete</button>
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
                    <input
                      name="languages"
                      value={
                        Array.isArray(formData.languages)
                          ? formData.languages.join(",")
                          : ""
                      }
                      onChange={handleInputChange}
                      placeholder="Add languages (comma-separated)"
                    />
                  ) : Array.isArray(formData.languages) ? (
                    formData.languages.join(", ")
                  ) : (
                    ""
                  )}
                </span>
              </li>
              <li>
                <p>Regions:</p>
                <span>
                  {editMode ? (
                    <input
                      name="addresses"
                      value={formData.addresses.join(",")}
                      onChange={handleInputChange}
                      placeholder="Add regions (comma-separated)"
                    />
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
