import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import "../views/style/Profile.css";
import TouristProfileView from "../views/TouristProfileView";
import { useFetch } from "../hooks/useFetch";
import { getTouristProfile } from "../services/ProfileService";

const TouristProfileContainer = () => {
  const { logout } = useContext(AuthContext);
  const {
    data: profileData,
    loading,
    error,
    refetch,
  } = useFetch(getTouristProfile);

  return (
    <TouristProfileView
      logout={logout}
      profileData={profileData}
      loading={loading}
      error={error}
      refetch={refetch}
    />
  );
};

export default TouristProfileContainer;
