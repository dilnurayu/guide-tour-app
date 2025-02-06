import React from "react";
import GuideToursList from "../views/GuideToursListView";
import { fetchGuideTours } from "../services/GuideToursService";
import { useFetch } from "../hooks/useFetch";

const GuideToursListContainer = () => {
  const { data: tours, loading, error } = useFetch(fetchGuideTours);

  return <GuideToursList tours={tours || []} loading={loading} error={error} />;
};

export default GuideToursListContainer;
