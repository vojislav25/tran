import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PricingSection from './components/PricingSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import { Language } from './utils/types';

function App() {
  const [language, setLanguage] = useState<Language>('sr');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <Hero language={language} />
      <PricingSection language={language} />
      <FeaturesSection language={language} />
      <ContactSection language={language} />
      <Footer language={language} />
      <WhatsAppFloat />
    </div>
  );
}

export default App;