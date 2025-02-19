import React, { useState } from "react";
import GuideToursListView from "../views/GuideToursListView";
import CreateTourForm from "../views/CreateTourForm";
import EditTourForm from "../views/EditTourForm";
import DeleteTourModal from "../components/DeleteTourModal";
import { fetchGuideTours, deleteTour } from "../services/GuideToursService";
import { useFetch } from "../hooks/useFetch";
// import FooterGuide from "../skeleton/FooterGuide";

const GuideToursListContainer = () => {
  const { data: tours, loading, error, refetch } = useFetch(fetchGuideTours);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState(null);
  const [tourToDelete, setTourToDelete] = useState(null);

  const handleTourCreated = () => {
    setIsCreateModalOpen(false);
    refetch();
  };

  const handleTourUpdated = () => {
    setTourToEdit(null);
    refetch();
  };

  const handleDeleteClick = (tour) => {
    setTourToDelete(tour);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTour(tourToDelete.tourId);
      setTourToDelete(null);
      refetch();
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const handleDeleteCancel = () => {
    setTourToDelete(null);
  };

  return (
    <>
      <GuideToursListView
        tours={tours || []}
        loading={loading}
        error={error}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onEditClick={(tour) => setTourToEdit(tour)}
        onDeleteClick={handleDeleteClick}
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
      {tourToDelete && (
        <DeleteTourModal
          tour={tourToDelete}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
      {/* <FooterGuide /> */}
    </>
  );
};

export default GuideToursListContainer;
