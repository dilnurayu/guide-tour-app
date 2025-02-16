import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

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
export default renderStars;
