import React from "react";
import GuidesListView from "../views/GuidesListView";
import { fetchGuides } from "../services/GuideService";
import { useFetch } from "../hooks/useFetch";

const GuidesListContainer = () => {
  const { data: guides, loading, error } = useFetch(fetchGuides);

  return <GuidesListView guides={guides} loading={loading} error={error} />;
};

export default GuidesListContainer;
