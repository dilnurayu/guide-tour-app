import React, { useEffect, useState } from "react";
import {
  fetchReviewsByGuide,
  postGuideReview,
} from "../services/ReviewService";
import ReviewsView from "../views/ReviewsView";
import { useParams } from "react-router-dom";

const GuideReviewsContainer = () => {
  const { id } = useParams();
  const guideId = id ? parseInt(id, 10) : 1;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const loadReviews = () => {
    setLoading(true);
    fetchReviewsByGuide(guideId)
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
  }, [guideId]);

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmitReview = async () => {
    try {
      await postGuideReview({
        resume_id: guideId,
        title: reviewForm.title,
        description: reviewForm.description,
        rating: reviewForm.rating,
      });
      alert("Review submitted successfully!");
      setReviewForm({ title: "", description: "", rating: 0 });
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

export default GuideReviewsContainer;
