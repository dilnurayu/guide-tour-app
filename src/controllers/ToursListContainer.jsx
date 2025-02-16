import React, { useState, useCallback } from "react";
import ToursListView from "../views/ToursListView";
import TourSearch from "../components/TourSearch";
import { fetchTours } from "../services/TourService";
import { useFetch } from "../hooks/useFetch";

const ToursListContainer = () => {
  const [filters, setFilters] = useState({});

  const fetchToursWithFilters = useCallback(
    () => fetchTours(filters),
    [filters]
  );
  const { data: tours, loading, error } = useFetch(fetchToursWithFilters);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <TourSearch filters={filters} setFilters={setFilters} />
      <ToursListView
        tours={tours}
        loading={loading}
        error={error}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default ToursListContainer;
