import React, { useEffect, useState, useContext } from "react";
import NotificationView from "../views/NotificationView";
import { NotificationService } from "../services/NotificationService";
import { AuthContext } from "../auth/AuthContext";

const NotificationContainer = () => {
  const { user } = useContext(AuthContext);
  const userType = user?.role || "tourist";

  const [guideBookings, setGuideBookings] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      if (userType === "tourist") {
        const [guideData, tourData] = await Promise.all([
          NotificationService.getTouristGuideBookings(),
          NotificationService.getTouristTourBookings(),
        ]);
        setGuideBookings(guideData);
        setTourBookings(tourData);
      } else if (userType === "guide") {
        const [guideData, tourData] = await Promise.all([
          NotificationService.getGuideGuideBookings(),
          NotificationService.getGuideTourBookings(),
        ]);
        setGuideBookings(guideData);
        setTourBookings(tourData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userType]);

  const handleConfirm = async (bookingId, type) => {
    try {
      await NotificationService.confirmBooking(bookingId, type);
      alert("Booking confirmed successfully!");
      fetchNotifications();
    } catch (error) {
      alert("Failed to confirm booking.");
    }
  };

  return (
    <NotificationView
      userType={userType}
      guideBookings={guideBookings}
      tourBookings={tourBookings}
      loading={loading}
      error={error}
      onConfirm={handleConfirm}
    />
  );
};

export default NotificationContainer;
