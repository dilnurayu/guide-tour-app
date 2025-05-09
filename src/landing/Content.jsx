import "./Content.css";
import guide1 from "../assets/guides/guide1.png";
import guide2 from "../assets/guides/guide2.png";
import guide3 from "../assets/guides/guide3.png";
import guide4 from "../assets/guides/guide4.png";

import dest1 from "../assets/dest/dest1.jpg";
import dest2 from "../assets/dest/dest2.jpg";
import dest3 from "../assets/dest/dest3.jpg";
import dest4 from "../assets/dest/dest4.jpg";

import dest from "../assets/dest.png";

const Content = () => {
  return (
    <>
      <div className="guides-container">
        <div className="top-guides">
          <img src={guide1} alt="Guide 1" />
          <img src={guide2} alt="Guide 2" />
          <img src={guide3} alt="Guide 3" />
          <img src={guide4} alt="Guide 4" />
        </div>
        <div className="top-destinations">
          <img src={dest} alt="Destinations" />
          <p>
            It’s hard enough deciding to move, you don’t have to worry about
            where to move to. These are some of the most popular and best
            locations to move to based on a number of factors.
          </p>
          <div className="grid-container">
            <div className="destination">
              <img src={dest1} alt="Destination 1" />
            </div>
            <div className="destination">
              <img src={dest2} alt="Destination 2" />
            </div>
            <div className="destination">
              <img src={dest4} alt="Destination 4" />
            </div>
            <div className="destination">
              <img src={dest3} alt="Destination 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
