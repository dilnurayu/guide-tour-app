import React, { useEffect, useState } from "react";
import { fetchToursByGuide } from "../services/TourService";
import GuideToursView from "../views/GuideToursView";
import { useParams } from "react-router-dom";

const GuideToursContainer = () => {
  const { id } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchToursByGuide(id)
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message.includes("404")) {
          setTours([]);
        } else {
          setError(err.message);
        }

        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading"></div>;
  if (error) return <div>Error: {error}</div>;
  return <GuideToursView tours={tours} />;
};

export default GuideToursContainer;
