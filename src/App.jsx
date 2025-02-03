// App.js
import React, { useContext } from "react";
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
import GuideReviews from "./guide/GuideReviews";
import TourSearch from "./tour/TourSearch";
import GuideSearch from "./guide/GuideSearch";
import TourDetails from "./tour/TourDetails";
import Profile from "./profile/Profile";
import GuideTours from "./guide-tour/GuideTours";
// import MyReviews from "./guide/MyReviews"; // Component for guide's own reviews
import { AuthProvider, AuthContext } from "./auth/AuthContext";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
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
      {user && user.role === "guide" && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/guide-tours" element={<GuideTours />} />
          {/* <Route path="/my-reviews" element={
            // <MyReviews />
          } /> */}
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <AppRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
