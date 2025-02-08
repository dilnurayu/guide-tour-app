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
}) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-image">
          <div className="profile-image-wrapper">
            <img src={guidePerson} alt="Profile" />
            <button className="edit">Edit</button>
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
                </span>
              </li>
              <li>
                <p>Regions:</p>
                <span>
                  <input
                    name="addresses"
                    value={formData.addresses.join(",")}
                    onChange={handleInputChange}
                    placeholder="Add regions (comma-separated)"
                  />
                </span>
              </li>
              <li>
                <p>Experience start date:</p>
                <span>
                  <input
                    type="date"
                    name="experience_start_date"
                    value={formData.experience_start_date}
                    onChange={handleInputChange}
                  />
                </span>
              </li>
              <li>
                <p>Price:</p>
                <span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </span>
              </li>
              <li>
                <p>Price type:</p>
                <span>
                  <select
                    name="price_type"
                    value={formData.price_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Choose price type</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </span>
              </li>
              <li>
                <p>Bio:</p>
                <span>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Enter bio"
                  />
                </span>
              </li>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </ul>
            <div className="right-save-button">
              <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
