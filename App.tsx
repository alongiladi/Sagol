import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Emergency } from './pages/Emergency';
import { Volunteer } from './pages/Volunteer';
import { FloatingActions } from './components/ui/FloatingActions';
import { LanguageToggle } from './components/LanguageToggle';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';

import { Terms } from './pages/Terms';

import { Payment } from './pages/Payment';


// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-alef">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </div>
          <FloatingActions />

          <LanguageToggle />

          <Footer />

        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;