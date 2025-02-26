import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchToursDetails } from "../services/TourService";
import TourDetailsView from "../views/TourDetailsView";
import { useCallback, useState } from "react";
import { tourBookingService } from "../services/BookingService";

const TourDetailsContainer = () => {
  const { id } = useParams();
  const tourId = id ? parseInt(id, 10) : 1;

  const fetchTours = useCallback(() => fetchToursDetails(tourId), [tourId]);
  const { data: tour, loading, error } = useFetch(fetchTours);

  const [bookingData, setBookingData] = useState({
    reserve_count: "",
    language_id: "",
    message: "",
  });

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookNow = async () => {
    if (!tour) return;
    try {
      const dataToSend = {
        tour_id: tour.tourId,
        reserve_count: Number(bookingData.reserve_count),
        language_id: Number(bookingData.language_id),
        message: bookingData.message,
      };
      await tourBookingService.bookTour(dataToSend);
      alert("Tour booking successful!");

      setBookingData({
        reserve_count: "",
        language_id: "",
        message: "",
      });
    } catch (err) {
      alert("Tour booking failed: " + err.message);
    }
  };

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TourDetailsView
      tour={tour}
      bookingData={bookingData}
      onBookingInputChange={handleBookingInputChange}
      onBookNow={handleBookNow}
    />
  );
};

export default TourDetailsContainer;
