import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchToursDetails } from "../services/TourService";
import TourDetailsView from "../views/TourDetailsView";
import { useCallback } from "react";

const TourDetailsContainer = () => {
  const { id } = useParams();
  const tourId = id ? parseInt(id, 10) : 1;

  const fetchTours = useCallback(() => fetchToursDetails(tourId), [tourId]);

  const { data: tour, loading, error } = useFetch(fetchTours);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <TourDetailsView tour={tour} />;
};

export default TourDetailsContainer;
