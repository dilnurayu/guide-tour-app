import React, { useState, useEffect } from "react";
import { fetchGuideResumeReviews } from "../services/ReviewService";
import GuideReviewListView from "../views/GuideReviewListView";

const GuideReviewListContainer = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuideResumeReviews()
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching reviews");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return <GuideReviewListView reviews={reviews} />;
};

export default GuideReviewListContainer;
