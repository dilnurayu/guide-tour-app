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
import StartJourney from "./components/StartJourney";
import ScrollToTop from "./ScrollToTop";
import { AuthProvider, AuthContext } from "./auth/AuthContext";

import ToursListContainer from "./controllers/ToursListContainer";
import GuidesListContainer from "./controllers/GuidesListContainer";
import ProfileContainer from "./controllers/ProfileContainer";
import GuideDetailsContainer from "./controllers/GuideDetailsContainer";
import TourDetailsContainer from "./controllers/TourDetailsContainer";
import GuideToursListContainer from "./controllers/GuidesToursListContainer";
import GuideToursContainer from "./controllers/GuideToursContainer";
import GuideReviewsContainer from "./controllers/GuideReviewsContainer";
import TourReviewsContainer from "./controllers/TourReviewsContainer";
import GuideReviewListContainer from "./controllers/GuideReviewListContainer";

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
            <GuideToursContainer />
            <GuideReviewsContainer />
            <Footer />
          </>
        }
      />
      <Route
        path="/destinations/:id"
        element={
          <>
            <TourDetailsContainer />
            <TourReviewsContainer />
            <Footer />
          </>
        }
      />
      <Route
        path="/destinations"
        element={
          <>
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
                {/* <FooterGuide /> */}
              </>
            }
          />
          <Route
            path="/guide-tours"
            element={
              <>
                <GuideToursListContainer />
              </>
            }
          />
          <Route
            path="/guide-reviews"
            element={
              <>
                <GuideReviewListContainer />
                {/* <FooterGuide /> */}
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
