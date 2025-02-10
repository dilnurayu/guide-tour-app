import "./style/GuideToursList.css";

const GuideToursListView = ({ tours, loading, error, onCreateClick }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="guide-tours-list">
      <div className="title-create-tour-wrapper">
        <h1>Tours</h1>
        <button onClick={onCreateClick}>Create New</button>
      </div>

      {tours.map((tour) => (
        <div className="guide-tour-list-container" key={tour.tourId}>
          <div className="guide-tour-list-left">
            <h3>{tour.about}</h3>
            <p>
              {tour.duration} Days | Languages: {tour.languageIds.join(", ")}
            </p>
            <p>
              Price: ${tour.price} / {tour.priceType}
            </p>
          </div>
          <div className="tours-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuideToursListView;
