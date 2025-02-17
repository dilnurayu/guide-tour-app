import React, { useEffect, useState } from "react";
import { fetchReviewsByGuide } from "../services/ReviewService";
import GuideReviewsView from "../views/GuideReviewsView";
import { useParams } from "react-router-dom";

const GuideReviewsContainer = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviewsByGuide(id)
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return <GuideReviewsView reviews={reviews} />;
};

export default GuideReviewsContainer;
