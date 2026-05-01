/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import GoalsSection from "./components/GoalsSection";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MockupSection from "./components/MockupSection";
import PaymentPage from "./components/PaymentPage";
import PricesPage from "./components/PricesPage";
import ReviewsSection from "./components/ReviewsSection";
import ServicesPage from "./components/ServicesPage";
import AboutPage from "./components/AboutPage";
import Skeleton from "./components/Skeleton";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [currentLang, setCurrentLang] = useState("ar");



  const renderPage = () => {
    switch (currentPage) {
      case "supervisor":
        return <Dashboard onLogout={() => setCurrentPage('home')} isAr={currentLang === 'ar'} role="supervisor" />;
      case "pilgrim":
        return <Dashboard onLogout={() => setCurrentPage('home')} isAr={currentLang === 'ar'} role="pilgrim" />;
      case "services":
        return <ServicesPage />;
      case "prices":
        return <PricesPage onSubscribe={() => setCurrentPage('payment')} />;
      case "about":
        return <AboutPage />;
      case "payment":
        return <PaymentPage onBack={() => setCurrentPage('prices')} isAr={currentLang === 'ar'} />;
      default:
        return (
          <>
            <Hero />
            <GoalsSection />
            <MockupSection />
            <ReviewsSection />
          </>
        );
    }
  };

  const isAr = currentLang === 'ar';
  const isDashboard = currentPage === "supervisor" || currentPage === "pilgrim";

  return (
    <div className={`min-h-screen bg-surface ${isAr ? 'rtl' : 'ltr'}`} style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      <AnimatePresence mode="wait">
        {loading ? (
          <Skeleton onComplete={() => setLoading(false)} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {!isDashboard && (
              <Header 
                currentPage={currentPage} 
                currentLang={currentLang}
                onNavigate={setCurrentPage}
                onLanguageChange={setCurrentLang}
                onAuthClick={() => {}}
              />
            )}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage + currentLang}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>

            {!isDashboard && <Footer />}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

