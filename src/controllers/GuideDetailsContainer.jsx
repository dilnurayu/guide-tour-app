import { useCallback } from "react";
import { fetchGuideDetails } from "../services/GuideService";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import GuideDetailsView from "../views/GuideDetailsView";

const GuideDetailsContainer = () => {
  const { id } = useParams();
  const guideId = id ? parseInt(id, 10) : 1;

  const fetchGuide = useCallback(() => fetchGuideDetails(guideId), [guideId]);

  const { data: guide, loading, error } = useFetch(fetchGuide);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <GuideDetailsView guide={guide} />;
};

export default GuideDetailsContainer;
