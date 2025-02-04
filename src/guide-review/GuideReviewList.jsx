import "./GuideReviewList.css";
import image from "../assets/guide-person.png";

const GuideReviewList = () => {
  return (
    <>
      <div className="guide-review-list">
        <h1>Reviews</h1>
        <div className="review-list-container">
          <img src={image} />
          <div>
            <div className="name-date-review">
              <h4>Alina K</h4>
              <h5>12.03.2024</h5>
            </div>
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
            <div className="reply-button">
              <button>Reply</button>
            </div>
          </div>
        </div>
        <div className="review-list-container">
          <img src={image} />
          <div>
            <div className="name-date-review">
              <h4>Alina K</h4>
              <h5>12.03.2024</h5>
            </div>
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
            <div className="reply-button">
              <button>Reply</button>
            </div>
          </div>
        </div>
        <div className="review-list-container">
          <img src={image} />
          <div>
            <div className="name-date-review">
              <h4>Alina K</h4>
              <h5>12.03.2024</h5>
            </div>
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
            <div className="reply-button">
              <button>Reply</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GuideReviewList;
