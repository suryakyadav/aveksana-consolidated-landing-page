
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AudienceSection from './components/AudienceSection';
import SocialProof from './components/SocialProof';
import ProductSuite from './components/ProductSuite';
import Testimonials from './components/Testimonials';
import TopicGenerator from './components/TopicGenerator';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ProductDetailPage from './components/ProductDetailPage';
import ForStudentsPage from './components/ForStudentsPage';
import ForSupervisorsPage from './components/ForSupervisorsPage';
import ForUniversitiesPage from './components/ForUniversitiesPage';
import ForCorporationsPage from './components/ForCorporationsPage';
import { ModalProvider, useModal } from './contexts/ModalContext';
import { AuthProvider } from './contexts/AuthContext';
import RequestDemoModal from './components/RequestDemoModal';
import Resources from './components/Resources';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './components/dashboard/ProfilePage';
import IdeaGeneratorPage from './components/dashboard/IdeaGeneratorPage';
import GrantsPage from './components/dashboard/GrantsPage';
import PipelinePage from './components/dashboard/PipelinePage';
import ProjectDetailPage from './components/dashboard/ProjectDetailPage';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import AnalyticsPage from './components/dashboard/AnalyticsPage';
import StrategyPage from './components/dashboard/StrategyPage';
import MyTasksPage from './components/dashboard/MyTasksPage';
import DocumentationPage from './components/DocumentationPage';
import ResourcesPage from './components/ResourcesPage';
import ComingSoonPage from './components/ComingSoonPage';


const LandingPage = () => {
  return (
    <>
      <main>
        <Hero />
        <AudienceSection />
        <SocialProof />
        <ProductSuite />
        <Testimonials />
        <TopicGenerator />
        <Resources />
        <FinalCTA />
      </main>
    </>
  );
};

const AppContent = () => {
  const { isDemoModalOpen, closeDemoModal, isQuickViewModalOpen, quickViewProduct, closeQuickViewModal } = useModal();
  return (
    <div className="bg-brand-off-white font-sans text-brand-dark-grey">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/solutions/for-students" element={<ForStudentsPage />} />
        <Route path="/solutions/for-supervisors" element={<ForSupervisorsPage />} />
        <Route path="/solutions/for-universities" element={<ForUniversitiesPage />} />
        <Route path="/solutions/for-corporations" element={<ForCorporationsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/documentation" element={<DocumentationPage />} />
        
        {/* Footer Link Routes */}
        <Route path="/integrations" element={<ComingSoonPage />} />
        <Route path="/about" element={<ComingSoonPage />} />
        <Route path="/careers" element={<ComingSoonPage />} />
        <Route path="/press" element={<ComingSoonPage />} />
        <Route path="/status" element={<ComingSoonPage />} />
        <Route path="/legal" element={<ComingSoonPage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/idea-generator" element={<IdeaGeneratorPage />} />
          <Route path="/dashboard/grants" element={<GrantsPage />} />
          <Route path="/dashboard/pipeline" element={<PipelinePage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/strategy" element={<StrategyPage />} />
          <Route path="/dashboard/tasks" element={<MyTasksPage />} />
          <Route path="/dashboard/project/:projectTitle" element={<ProjectDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Footer />
      <RequestDemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />
      <ProductQuickViewModal 
        isOpen={isQuickViewModalOpen} 
        onClose={closeQuickViewModal} 
        product={quickViewProduct} 
      />
    </div>
  )
}


function App() {
  return (
    <HashRouter>
      <ModalProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ModalProvider>
    </HashRouter>
  );
}

export default App;
