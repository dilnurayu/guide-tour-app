// src/controllers/ToursListContainer.jsx
import React, { useEffect, useState } from "react";
import ToursListView from "../views/TourListView";
import { fetchTours } from "../services/TourService";

const ToursListContainer = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTours() {
      try {
        const data = await fetchTours();
        setTours(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTours();
  }, []);

  return <ToursListView tours={tours} loading={loading} error={error} />;
};

export default ToursListContainer;
