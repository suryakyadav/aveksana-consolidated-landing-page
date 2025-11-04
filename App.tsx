import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import ProductSuite from './components/ProductSuite';
import Testimonials from './components/Testimonials';
import TopicGenerator from './components/TopicGenerator';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ProductDetailPage from './components/ProductDetailPage';
import ForIndividualsPage from './components/ForIndividualsPage';
import ForUniversitiesPage from './components/ForUniversitiesPage';
import ForCorporationsPage from './components/ForCorporationsPage';

const LandingPage = () => (
  <>
    <main>
      <Hero />
      <SocialProof />
      <ProductSuite />
      <Testimonials />
      <TopicGenerator />
      <FinalCTA />
    </main>
  </>
);


function App() {
  return (
    <HashRouter>
      <div className="bg-brand-off-white font-sans text-brand-dark-grey">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/solutions/for-individuals" element={<ForIndividualsPage />} />
          <Route path="/solutions/for-universities" element={<ForUniversitiesPage />} />
          <Route path="/solutions/for-corporations" element={<ForCorporationsPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;