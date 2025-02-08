import { useState, useEffect } from "react";
import { createResume, getResume } from "../services/ResumeService";
import { getProfile } from "../services/ProfileService";
import ProfileView from "../views/ProfileView";

const ProfileContainer = () => {
  const [profileData, setProfileData] = useState(null);

  const [formData, setFormData] = useState({
    bio: "",
    experience_start_date: "",
    languages: [],
    addresses: [],
    price: 0,
    price_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, resume] = await Promise.all([
          getProfile(),
          getResume(),
        ]);
        setProfileData(profile);
        if (resume) {
          setFormData({
            bio: resume.bio || "",
            experience_start_date: resume.experience_start_date || "",
            languages: resume.languages
              ? resume.languages.map((l) => l.name)
              : [],
            addresses: resume.addresses
              ? resume.addresses.map((a) => a.address_id)
              : [],
            price: resume.price || 0,
            price_type: resume.price_type || "",
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "languages" || name === "addresses"
          ? value.split(",").map((v) => v.trim())
          : name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const resume = await createResume(formData);
      setFormData({
        bio: resume.bio || "",
        experience_start_date: resume.experience_start_date || "",
        languages: resume.languages ? resume.languages.map((l) => l.name) : [],
        addresses: resume.addresses
          ? resume.addresses.map((a) => a.address_id)
          : [],
        price: resume.price || 0,
        price_type: resume.price_type || "",
      });
      alert("Resume created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileView
      profileData={profileData}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default ProfileContainer;
