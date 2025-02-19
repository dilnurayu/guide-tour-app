import "./style/GuideToursList.css";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";

const GuideToursListView = ({
  tours,
  loading,
  error,
  onCreateClick,
  onEditClick,
  onDeleteClick,
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading tours...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-state">
          <p>Error loading tours: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      );
    }

    if (!tours || tours.length === 0) {
      return (
        <div className="empty-state">
          <p>No tours available</p>
          <button onClick={onCreateClick}>Create Your First Tour</button>
        </div>
      );
    }

    return tours.map((tour) => (
      <div className="guide-tour-list-container" key={tour.tourId}>
        <div className="guide-tour-list-left">
          <h3>{tour.title}</h3>
          <p>
            {tour.duration} Days | Languages: {tour.languageIds.join(", ")}
          </p>
          <p>
            Price: ${tour.price} / {tour.priceType}
          </p>
        </div>
        <div className="tours-buttons">
          <button className="edit-btn" onClick={() => onEditClick(tour)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDeleteClick(tour)}>
            Delete
          </button>
        </div>
        <div className="tours-mobile-buttons">
          <button className="edit-btn" onClick={() => onEditClick(tour)}>
            <MdOutlineModeEdit size={20} />
          </button>
          <button className="delete-btn" onClick={() => onDeleteClick(tour)}>
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="guide-tours-list">
      <div className="title-create-tour-wrapper">
        <h1>Tours</h1>
        <button className="create-btn" onClick={onCreateClick}>
          Create New
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default GuideToursListView;
