import { useContext } from "react";
import guidePerson from "../assets/profile.png";
import { AuthContext } from "../auth/AuthContext";
import "../views/style/Profile.css";
const TouristProfileContainer = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div className="profile">
        <h1>Profile</h1>
        <div className="profile-content">
          <div className="profile-image">
            <div className="profile-image-wrapper">
              <img src={guidePerson} alt="Profile" />
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TouristProfileContainer;
