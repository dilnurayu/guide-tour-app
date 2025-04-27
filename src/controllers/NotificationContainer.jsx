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
        const guidePromise = NotificationService.getTouristGuideBookings();
        const tourPromise = NotificationService.getTouristTourBookings();

        const [guideData, tourData] = await Promise.allSettled([
          guidePromise,
          tourPromise,
        ]);

        if (guideData.status === "fulfilled") {
          setGuideBookings(guideData.value);
        } else {
          console.error("Failed to fetch guide bookings:", guideData.reason);
        }

        if (tourData.status === "fulfilled") {
          setTourBookings(tourData.value);
        } else {
          console.error("Failed to fetch tour bookings:", tourData.reason);
        }

        if (guideData.status === "rejected" && tourData.status === "rejected") {
          setError("Both notifications failed to load.");
        }
      } else if (userType === "guide") {
        const guidePromise = NotificationService.getGuideGuideBookings();
        const tourPromise = NotificationService.getGuideTourBookings();

        const [guideData, tourData] = await Promise.allSettled([
          guidePromise,
          tourPromise,
        ]);

        if (guideData.status === "fulfilled") {
          setGuideBookings(guideData.value);
        } else {
          console.error("Failed to fetch guide bookings:", guideData.reason);
        }

        if (tourData.status === "fulfilled") {
          setTourBookings(tourData.value);
        } else {
          console.error("Failed to fetch tour bookings:", tourData.reason);
        }

        if (guideData.status === "rejected" && tourData.status === "rejected") {
          setError("Both notifications failed to load.");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred.");
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
