// GuideToursListContainer.js
import React, { useState } from "react";
import GuideToursListView from "../views/GuideToursListView";
import CreateTourForm from "../views/CreateTourForm";
import EditTourForm from "../views/EditTourForm";
import { fetchGuideTours } from "../services/GuideToursService";
import { useFetch } from "../hooks/useFetch";
import FooterGuide from "../skeleton/FooterGuide";

const GuideToursListContainer = () => {
  const { data: tours, loading, error, refetch } = useFetch(fetchGuideTours);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState(null);

  const handleTourCreated = () => {
    setIsCreateModalOpen(false);
    refetch();
  };

  const handleTourUpdated = () => {
    setTourToEdit(null);
    refetch();
  };

  return (
    <>
      <GuideToursListView
        tours={tours || []}
        loading={loading}
        error={error}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onEditClick={(tour) => setTourToEdit(tour)}
      />
      {isCreateModalOpen && (
        <CreateTourForm
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={handleTourCreated}
        />
      )}
      {tourToEdit && (
        <EditTourForm
          tour={tourToEdit}
          onClose={() => setTourToEdit(null)}
          onSaved={handleTourUpdated}
        />
      )}
      {/* <FooterGuide /> */}
    </>
  );
};

export default GuideToursListContainer;
