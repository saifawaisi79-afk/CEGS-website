import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import HRConsulting from './pages/services/HRConsulting';
import PayrollManagement from './pages/services/PayrollManagement';
import StaffingSolutions from './pages/services/StaffingSolutions';
import WebDevelopment from './pages/services/WebDevelopment';
import BPOKPOServices from './pages/services/BPOKPOServices';
import TrainingCourses from './pages/services/TrainingCourses';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import RequestCandidates from './pages/RequestCandidates';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/hr-consulting" element={<HRConsulting />} />
          <Route path="/services/payroll-management" element={<PayrollManagement />} />
          <Route path="/services/staffing-solutions" element={<StaffingSolutions />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/bpo-kpo-services" element={<BPOKPOServices />} />
          <Route path="/services/bpo-sales" element={<Navigate to="/services/bpo-kpo-services" replace />} />
          <Route path="/services/training-courses" element={<TrainingCourses />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-candidates" element={<RequestCandidates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App

