import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Utensils, Home, Phone, Info, DollarSign, Pizza } from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import DonatersList from './pages/DonatersList';
import DonationTrackingPage from './pages/DonationTrackingPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donaters" element={<DonatersList />} />
          <Route path="/tracking" element={<DonationTrackingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;