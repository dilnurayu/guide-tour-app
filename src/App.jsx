import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./skeleton/Footer";
import Header from "./skeleton/Header";
import Content from "./landing/Content";
import LandingBlock from "./landing/LandingBlock";
import GuidesList from "./guide/GuidesList";
import StartJourney from "./guide/StartJourney";
import ToursList from "./tour/ToursList";
import GuideDetails from "./guide/GuideDetails";
import ScrollToTop from "./ScrollToTop";
import GuideTours from "./guide/GuideTours";
import GuideReviews from "./guide/GuideReviews";
import TourSearch from "./tour/TourSearch";
import GuideSearch from "./guide/GuideSearch";
import TourDetails from "./tour/TourDetails";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingBlock />
              <Content />
            </>
          }
        />
        <Route
          path="/guides"
          element={
            <>
              <GuideSearch />
              <GuidesList />
              <StartJourney />
            </>
          }
        />
        <Route
          path="/guides/:id"
          element={
            <>
              <GuideDetails />
              <GuideTours />
              <GuideReviews />
            </>
          }
        />
        <Route
          path="/destinations/:id"
          element={
            <>
              <TourDetails />
              <GuideReviews />
            </>
          }
        />
        <Route
          path="/destinations"
          element={
            <>
              <TourSearch />
              <ToursList />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
