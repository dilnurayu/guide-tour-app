import React, { useEffect, useState } from "react";
import { fetchReviewsByTours } from "../services/ReviewService";
import ReviewsView from "../views/ReviewsView";
import { useParams } from "react-router-dom";

const TourReviewsContainer = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviewsByTours(id)
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setReviews([]);
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Error: {error}</div>;

  return <ReviewsView reviews={reviews} />;
};

export default TourReviewsContainer;
