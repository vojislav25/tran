import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { Language } from '../utils/types';
import { translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhoneCall = () => {
    window.open('tel:+381654512033', '_self');
  };

  const getContactText = () => {
    switch (language) {
      case 'en':
        return 'Contact';
      case 'ru':
        return 'Контакт';
      default:
        return 'Kontakt';
    }
  };

  return (
    <>
      {/* Top contact bar - now sticky */}
      <div className="bg-slate-800 text-white py-2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <button
              onClick={handlePhoneCall}
              className="flex items-center hover:text-lime-400 transition-colors font-medium"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">{getContactText()}: +381 65 451 2033</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header - now sticky below contact bar */}
      <header className="bg-lime-400 sticky top-9 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={scrollToTop}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://i.ibb.co/p6fFc7qf/17205110121672944867logo.png" 
                alt="Transferko Logo" 
                className="h-12 w-auto object-contain max-w-[200px] sm:h-14 md:h-16"
              />
            </button>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-slate-800 hover:text-slate-600 font-semibold text-lg transition-colors">
                {t.home}
              </a>
              <a href="#pricing" className="text-slate-800 hover:text-slate-600 font-semibold text-lg transition-colors">
                {t.pricing}
              </a>
              <a href="#about" className="text-slate-800 hover:text-slate-600 font-semibold text-lg transition-colors">
                {t.about}
              </a>
              <a href="#contact" className="text-slate-800 hover:text-slate-600 font-semibold text-lg transition-colors">
                {t.contact}
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-lime-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#home" 
                  className="text-slate-800 hover:text-slate-600 font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.home}
                </a>
                <a 
                  href="#pricing" 
                  className="text-slate-800 hover:text-slate-600 font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.pricing}
                </a>
                <a 
                  href="#about" 
                  className="text-slate-800 hover:text-slate-600 font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.about}
                </a>
                <a 
                  href="#contact" 
                  className="text-slate-800 hover:text-slate-600 font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.contact}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;