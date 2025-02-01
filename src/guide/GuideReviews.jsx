import "./GuideReviews.css";
import image from "../assets/guide-person.png";

const GuideReviews = () => {
  return (
    <>
      <div className="guide-reviews">
        <div className="line"></div>
        <h3>Reviews 123</h3>
        <textarea placeholder="Write your review here" />
        <div className="rate-comment">
          <div className="rate">
            <p>Rate:</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <button>Comment</button>
        </div>
        <div className="reviews-list">
          <div className="reviews-container">
            <img src={image} />
            <div>
              <h4>Alina K</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. 
              </p>
              <span>
                <span className="star">&#9733;</span>
                4/5
              </span>
            </div>
          </div>
          <div className="reviews-container">
            <img src={image} />
            <div>
              <h4>Alina K</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. 
              </p>
              <span>
                <span className="star">&#9733;</span>
                4/5
              </span>
            </div>
          </div>
          <div className="reviews-container">
            <img src={image} />
            <div>
              <h4>Alina K</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. 
              </p>
              <span>
                <span className="star">&#9733;</span>
                4/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GuideReviews;
