// src/containers/GuideDetailsContainer.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchGuideDetails } from "../services/GuideService";
import GuideDetailsView from "../views/GuideDetailsView";

const GuideDetailsContainer = () => {
  const { id } = useParams();
  const guideId = id ? parseInt(id, 10) : 1;

  const {
    data: guide,
    loading,
    error,
  } = useFetch(() => fetchGuideDetails(guideId));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <GuideDetailsView guide={guide} />;
};

export default GuideDetailsContainer;
