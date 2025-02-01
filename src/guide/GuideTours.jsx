import "./GuideTours.css";

const GuideTours = () => {
  return (
    <>
      <div className="guide-tours">
        <div className="line"></div>
        <h3>
          Choose from available tours by <span>Sam Smith</span>
        </h3>
        <p>5 Available </p>
        <div className="guide-tours-list">
          <div className="guide-tour-container">
            <div className="guide-tour-left">
              <h3>Tashkent - Samarkand - Bukhara - Khiva:Pearl of the East</h3>
              <p>4 Days 3 Nights | English, Spanish</p>
              <p>Price: $250.00/per person</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <button>Choose</button>
          </div>
          <div className="guide-tour-container">
            <div className="guide-tour-left">
              <h3>Tashkent - Samarkand - Bukhara - Khiva:Pearl of the East</h3>
              <p>4 Days 3 Nights | English, Spanish</p>
              <p>Price: $250.00/per person</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <button>Choose</button>
          </div>
          <div className="guide-tour-container">
            <div className="guide-tour-left">
              <h3>Tashkent - Samarkand - Bukhara - Khiva:Pearl of the East</h3>
              <p>4 Days 3 Nights | English, Spanish</p>
              <p>Price: $250.00/per person</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <button>Choose</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default GuideTours;
