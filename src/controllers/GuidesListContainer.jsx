import React, { useState, useCallback } from "react";
import GuidesListView from "../views/GuidesListView";
import { fetchGuides } from "../services/GuideService";
import { useFetch } from "../hooks/useFetch";
import GuideSearch from "../components/GuideSearch";

const GuidesListContainer = () => {
  const [filters, setFilters] = useState({});

  const fetchGuidesWithFilters = useCallback(
    () => fetchGuides(filters),
    [filters]
  );
  const { data: guides, loading, error } = useFetch(fetchGuidesWithFilters);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <GuideSearch filters={filters} setFilters={setFilters} />
      <GuidesListView
        guides={guides}
        loading={loading}
        error={error}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default GuidesListContainer;
