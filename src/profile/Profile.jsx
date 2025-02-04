import { useContext } from "react";
import guidePerson from "../assets/guide-person.png";
import { AuthContext } from "../auth/AuthContext";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="profile">
        <h1>Profile</h1>
        <div className="profile-content">
          <div className="profile-image">
            <div className="profile-image-wrapper">
              <img src={guidePerson} />
              <button className="edit">Edit</button>
              <button className="delete">Delete</button>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-details-wrapper">
              <ul>
                <li>
                  <p>Full Name:</p>
                  <span>Akhmedov Sherzod Murodovich</span>
                </li>
                <li>
                  <p>Languages:</p>
                  <span>
                    <input placeholder="Add languages" />
                  </span>
                </li>
                <li>
                  <p>Regions:</p>
                  <span>
                    <input placeholder="Add regions" />
                  </span>
                </li>
                <li>
                  <p>Experience start date:</p>
                  <span>
                    <input placeholder="Add date" />
                  </span>
                </li>
                <li>
                  <p>Payment type:</p>
                  <span>
                    <input placeholder="Choose payment type" />
                  </span>
                </li>
                <li>
                  <p>Capacity:</p>
                  <span>
                    <input placeholder="Add languages maximum number of guests" />
                  </span>
                </li>
                <li>
                  <p>Bio:</p>
                  <span>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem.{" "}
                  </span>
                </li>
                <li>
                  <p>Certification:</p>
                  <span>
                    <button>Upload</button>
                  </span>
                </li>
                <li>
                  <p>Gallery:</p>
                  <span>
                    <button>Upload</button>
                  </span>
                </li>
              </ul>
              <div className="right-save-button">
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
