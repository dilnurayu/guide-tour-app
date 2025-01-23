import React from 'react';
import './GuidesList.css'; 
import { FaRegClock, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import guidePerson from '../assets/guide-person.png';
import { CiFilter } from "react-icons/ci";

const guides = [
  { id: 1, name: "John Doe", duration: "2 Days 2 Nights", price: "$13.00/per hour", rating: 4.5 },
  { id: 2, name: "Jane Smith", duration: "2 Days 2 Nights", price: "$13.00/per hour", rating: 5 },
  { id: 3, name: "Alex Johnson", duration: "2 Days 2 Nights", price: "$13.00/per hour", rating: 3.5 },
  { id: 4, name: "John Doe", duration: "2 Days 2 Nights", price: "$13.00/per hour", rating: 4.5 },
  { id: 5, name: "Jane Smith", duration: "2 Days 2 Nights", price: "$13.00/per hour", rating: 5 },
  { id: 6, name: "Alex Johnson", duration: "2 Days 2 Nights", price: "$13.00/per hour", rating: 3.5 },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="star full-star" />
      ))}
      {halfStar === 1 && <FaStarHalfAlt className="star half-star" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="star empty-star" />
      ))}
    </>
  );
};

const GuidesList = () => {
  return (
    <div className="guides-list-container">
      <div className='guide-wrapper'>
        <h2>Results {guides.length}</h2>
        <h3><CiFilter/> Advanced Filter</h3>
      </div>
      <ul className="guides-list">
        {guides.map((guide) => (
          <li key={guide.id} className="guide-item">
            <img src={guidePerson}/>
            <div className="rating">
              {renderStars(guide.rating)}
            </div>
            <h3>{guide.name}</h3>
            <p><FaRegClock /> {guide.duration}</p>
            <p>Price: {guide.price}</p>
            <button>Book this guide</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuidesList;
