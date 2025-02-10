import React, { useState } from "react";
import GuideToursListView from "../views/GuideToursListView";
import CreateTourForm from "../views/CreateTourForm";
import { fetchGuideTours } from "../services/GuideToursService";
import { useFetch } from "../hooks/useFetch";
import FooterGuide from "../skeleton/FooterGuide";

const GuideToursListContainer = () => {
  const { data: tours, loading, error, refetch } = useFetch(fetchGuideTours);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTourCreated = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <>
      <GuideToursListView
        tours={tours || []}
        loading={loading}
        error={error}
        onCreateClick={() => setIsModalOpen(true)}
      />
      <FooterGuide />
      {isModalOpen && (
        <CreateTourForm
          onClose={() => setIsModalOpen(false)}
          onCreated={handleTourCreated}
        />
      )}
    </>
  );
};

export default GuideToursListContainer;
