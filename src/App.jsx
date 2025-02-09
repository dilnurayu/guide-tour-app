// App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Footer from "./skeleton/Footer";
import Header from "./skeleton/Header";
import Content from "./landing/Content";
import LandingBlock from "./landing/LandingBlock";
import StartJourney from "./guide/StartJourney";
import ScrollToTop from "./ScrollToTop";
import GuideReviews from "./guide/GuideReviews";
import TourSearch from "./tour/TourSearch";
import GuideSearch from "./guide/GuideSearch";
import TourDetails from "./tour/TourDetails";
import GuideTours from "./guide-tour/GuideToursList";
import { AuthProvider, AuthContext } from "./auth/AuthContext";
import GuideReviewList from "./guide-review/GuideReviewList";

import ToursListContainer from "./controllers/ToursListContainer";
import GuidesListContainer from "./controllers/GuidesListContainer";
import GuideToursListContainer from "./controllers/GuidesToursListContainer";
import ProfileContainer from "./controllers/ProfileContainer";
import FooterGuide from "./skeleton/FooterGuide";
import GuideDetailsContainer from "./controllers/GuideDetailsContainer";
import TourDetailsView from "./views/TourDetailsView";
import TourDetailsContainer from "./controllers/TourDetailsContainer";

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
            <Footer />
          </>
        }
      />
      <Route
        path="/guides"
        element={
          <>
            <GuideSearch />
            <GuidesListContainer />
            <StartJourney />
            <Footer />
          </>
        }
      />
      <Route
        path="/guides/:id"
        element={
          <>
            <GuideDetailsContainer />
            <GuideTours />
            <GuideReviews />
            <Footer />
          </>
        }
      />
      <Route
        path="/destinations/:id"
        element={
          <>
            <TourDetailsContainer />
            <GuideReviews />
            <Footer />
          </>
        }
      />
      <Route
        path="/destinations"
        element={
          <>
            <TourSearch />
            <ToursListContainer />
            <Footer />
          </>
        }
      />

      {user && user.role === "guide" && (
        <>
          <Route
            path="/profile"
            element={
              <>
                <ProfileContainer />
                <FooterGuide />
              </>
            }
          />
          <Route
            path="/guide-tours"
            element={
              <>
                <GuideToursListContainer />
                <FooterGuide />
              </>
            }
          />
          <Route
            path="/guide-reviews"
            element={
              <>
                <GuideReviewList />
                <FooterGuide />
              </>
            }
          />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
