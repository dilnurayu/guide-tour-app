import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './skeleton/Footer';
import Header from './skeleton/Header';
import Content from './landing/Content';
import LandingBlock from './landing/LandingBlock';
import GuidesList from './guide/GuidesList'; 
import SearchSection from './guide/SearchSection';
import StartJourney from './guide/StartJourney';
import ToursList from './tour/ToursList';
import GuideDetails from './guide/GuideDetails';
import ScrollToTop from './ScrollToTop';
import GuideBook from './guide/GuideBook';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <LandingBlock />
            <Content />
          </>
        } />
        <Route path="/guides" element={
          <>
            <SearchSection />
            <GuidesList />
            <StartJourney />
          </>
        } />
        <Route path="/guides/:id" element={
          <>
            <GuideDetails />
            <GuideBook />
          </>
        } />
        <Route path="/destinations" element={
          <>
            <SearchSection />
            <ToursList />
          </>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
