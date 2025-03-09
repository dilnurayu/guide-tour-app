import { useState, useEffect } from "react";
import { createResume, editResume, getResume } from "../services/ResumeService";
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
  const [originalFormData, setOriginalFormData] = useState({
    bio: "",
    experience_start_date: "",
    languages: [],
    addresses: [],
    price: 0,
    price_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasResume, setHasResume] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [addressOptions, setAddressOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    fetch("https://guide-tour-api.vercel.app/languages")
      .then((res) => res.json())
      .then((data) => setLanguageOptions(data))
      .catch((err) => console.error("Error fetching languages:", err));
    fetch("https://guide-tour-api.vercel.app/addresses")
      .then((res) => res.json())
      .then((data) => setAddressOptions(data))
      .catch((err) => console.error("Error fetching addresses:", err));
  }, []);

  const fetchData = async () => {
    try {
      const [profile, resume] = await Promise.all([getProfile(), getResume()]);
      setProfileData(profile);
      if (resume) {
        const resumeData = {
          bio: resume.bio || "",
          experience_start_date: resume.experience_start_date
            ? resume.experience_start_date.split("T")[0]
            : "",
          languages: resume.languages
            ? resume.languages.map((l) => l.name)
            : [],
          addresses: resume.addresses
            ? resume.addresses.map((a) => a.address_id)
            : [],
          price: resume.price || 0,
          price_type: resume.price_type || "",
        };
        setFormData(resumeData);
        setOriginalFormData(resumeData);
        setHasResume(true);
        setEditMode(false);
      } else {
        setHasResume(false);
        setEditMode(true);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "languages" || name === "addresses"
          ? Array.isArray(value)
            ? value
            : value.split(",").map((v) => v.trim())
          : name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      let resume;
      if (!hasResume) {
        resume = await createResume(formData);
        alert("Resume created successfully!");
        fetchData();
      } else {
        resume = await editResume(formData);
        alert("Resume updated successfully!");
        fetchData();
      }
      const resumeData = {
        bio: resume.bio || "",
        experience_start_date: resume.experience_start_date
          ? resume.experience_start_date.split("T")[0]
          : "",
        languages: resume.languages ? resume.languages.map((l) => l.name) : [],
        addresses: resume.addresses
          ? resume.addresses.map((a) => a.address_id)
          : [],
        price: resume.price || 0,
        price_type: resume.price_type || "",
      };
      setFormData(resumeData);
      setOriginalFormData(resumeData);
      setHasResume(true);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalFormData);
    setEditMode(false);
  };

  return (
    <ProfileView
      profileData={profileData}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      editMode={editMode}
      setEditMode={setEditMode}
      handleCancel={handleCancel}
      hasResume={hasResume}
      languageOptions={languageOptions}
      addressOptions={addressOptions}
    />
  );
};

export default ProfileContainer;
