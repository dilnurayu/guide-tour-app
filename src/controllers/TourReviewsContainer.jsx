import React, { useEffect, useState } from "react";
import { fetchReviewsByTours, postTourReview } from "../services/ReviewService";
import ReviewsView from "../views/ReviewsView";
import { useParams } from "react-router-dom";

const TourReviewsContainer = () => {
  const { id } = useParams();
  const tourId = id ? parseInt(id, 10) : 1;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    description: "",
    rating: 0,
  });

  const loadReviews = () => {
    setLoading(true);
    fetchReviewsByTours(tourId)
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
  };

  useEffect(() => {
    loadReviews();
  }, [tourId]);

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmitReview = async () => {
    try {
      await postTourReview({
        tour_id: tourId,
        description: reviewForm.description,
        rating: reviewForm.rating,
      });
      alert("Review submitted successfully!");
      setReviewForm({ description: "", rating: 0 });
      loadReviews();
    } catch (err) {
      alert("Failed to submit review: " + err.message);
    }
  };

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ReviewsView
      reviews={reviews}
      reviewForm={reviewForm}
      onReviewInputChange={handleReviewInputChange}
      onSubmitReview={handleSubmitReview}
    />
  );
};

export default TourReviewsContainer;
