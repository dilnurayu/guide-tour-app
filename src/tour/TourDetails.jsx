import "./TourDetails.css";
import image from "../assets/tour-image.png";

const TourDetails = () => {
  return (
    <div className="tour-details">
      <div className="tour-details-wrapper">
        <div className="tour-about">
          <div className="tour-about-wrapper">
            <h1>Samarkand - Bukhara - Khiva: Pearl of the East</h1>
            <h5>4 Days 3 Nights</h5>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
              (2.3k review)
            </div>
            <p>
              Ex optio sequi et quos praesentium in nostrum labore nam rerum
              iusto aut magni nesciunt? Quo quidem neque iste expedita est dolor
              similique ut quasi maxime ut deserunt autem At praesentium
              voluptatem aut libero nisi. Et eligendi sint ab cumque veritatis
              aut provident aliquam. Aut aspernatur consequuntur eum quaerat
              distinctio ut inventore aliquid et quasi alias ut rerum suscipit
              et nihil deleniti. Ex optio sequi et quos praesentium in nostrum
              labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste
              expedita est dolor similique ut quasi maxime ut deserunt autem At
              praesentium voluptatem aut libero nisi. Et eligendi sint ab cumque
              veritatis aut provident aliquam. Aut aspernatur consequuntur eum
              quaerat distinctio ut inventore aliquid et quasi alias ut rerum
              suscipit et nihil deleniti.
            </p>
            <ul>
              <li>
                <p>Destination(s)</p> <span>Samarkand / Bukhara / Khiva</span>
              </li>
              <li>
                <p>Departure</p> <span>Tashkent Airport</span>
              </li>
              <li>
                <p>Departure Time</p> <span>Approximately 08:10 AM</span>
              </li>
              <li>
                <p>Return time</p> <span>Approximately 07:20 PM</span>
              </li>
              <li>
                <p>Dress Code</p> <span>Casual, comfortable, light</span>
              </li>
              <li>
                <p>Not included</p> <span>Gallery Ticket, Lunch</span>
              </li>
              <li>
                <p>Included</p>
                <span>
                  5 star Accommodations, Airport Transfer, Breakfast, Personal
                  Guide
                </span>
              </li>
            </ul>
            <div className="tour-about-button-wrapper">
              <div></div>
              <button>$250 / per person</button>
            </div>
          </div>
        </div>
        <div className="book-tour">
          <div className="book-tour-wrapper">
            <h1>Book This Tour</h1>
            <p>
              Ex optio sequi et quos praesentium in nostrum labore nam rerum
              iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.
            </p>
            <input placeholder="Name" />
            <input placeholder="Phone" />
            <input placeholder="dd-mm-yy" />
            <input placeholder="Number of guests" />
            <input placeholder="Language" />
            <input placeholder="Message" />
            <button className="book-btn">Book Now</button>
          </div>
        </div>
      </div>
      <div className="tour-gallery">
        <h1>From Gallery</h1>
        <p>
          Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto
          aut magni nesciunt? Quo quidem neque iste expedita est dolor similique
          ut quasi maxime ut deserunt autem At praesentium voluptatem aut libero
          nisi.
        </p>
        <div className="tour-gallery-photos">
          <img src={image} />
          <img src={image} />
          <img src={image} />
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
