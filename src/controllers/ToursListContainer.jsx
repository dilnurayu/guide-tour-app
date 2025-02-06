import React from "react";
import ToursListView from "../views/ToursListView";
import { fetchTours } from "../services/TourService";
import { useFetch } from "../hooks/useFetch";

const ToursListContainer = () => {
  const { data: tours, loading, error } = useFetch(fetchTours);

  return <ToursListView tours={tours} loading={loading} error={error} />;
};

export default ToursListContainer;
