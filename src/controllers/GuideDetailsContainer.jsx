import React, { useCallback, useState } from "react";
import { fetchGuideDetails } from "../services/GuideService";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import GuideDetailsView from "../views/GuideDetailsView";
import { BookingService } from "../services/BookingService";

const GuideDetailsContainer = () => {
  const { id } = useParams();
  const resumeId = id ? parseInt(id, 10) : 1;

  const fetchGuide = useCallback(() => fetchGuideDetails(resumeId), [resumeId]);
  const { data: guide, loading, error } = useFetch(fetchGuide);

  const [bookingData, setBookingData] = useState({
    tour_date: "",
    reserve_count: "",
    language_id: "",
    message: "",
  });

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNow = async () => {
    if (!guide) return;
    try {
      const dataToSend = {
        guide_id: guide.guideId,
        tour_date: bookingData.tour_date,
        reserve_count: Number(bookingData.reserve_count),
        language_id: Number(bookingData.language_id),
        message: bookingData.message,
      };
      await BookingService.bookGuide(dataToSend);
      alert("Booking successful!");

      setBookingData({
        tour_date: "",
        reserve_count: "",
        language_id: "",
        message: "",
      });
    } catch (err) {
      alert("Booking failed: " + err.message);
    }
  };

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <GuideDetailsView
      guide={guide}
      bookingData={bookingData}
      onBookingInputChange={handleBookingInputChange}
      onBookNow={handleBookNow}
    />
  );
};

export default GuideDetailsContainer;
