import guidePerson from "../assets/profile.png";
import "../views/style/Profile.css";

const TouristProfileView = ({
  logout,
  profileData,
  loading,
  error,
  refetch,
}) => {
  if (loading)
    return (
      <div className="profile">
        <h2>Loading profile...</h2>
      </div>
    );

  if (error)
    return (
      <div className="profile">
        <h2>Error: {error}</h2>
        <button onClick={refetch}>Try Again</button>
      </div>
    );

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-image">
          <div className="profile-image-wrapper">
            <img
              src={profileData?.profile_photo || guidePerson}
              alt="Profile"
              onError={(e) => {
                e.target.src = guidePerson;
              }}
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
                <p>Username:</p>
                <span>{profileData?.user_name || "Not available"}</span>
              </li>
              <li>
                <p>Email:</p>
                <span>{profileData?.email || "Not available"}</span>
              </li>
              {profileData?.address && (
                <>
                  <li>
                    <p>Region:</p>
                    <span>
                      {profileData.address.region?.region || "Not specified"}
                    </span>
                  </li>
                  <li>
                    <p>City:</p>
                    <span>
                      {profileData.address.city?.city || "Not specified"}
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristProfileView;
