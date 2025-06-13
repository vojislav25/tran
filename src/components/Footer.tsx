import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Language } from '../utils/types';
import { translations } from '../utils/translations';
import AdminPanel from './AdminPanel';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleBrandClick = () => {
    setClickCount(prev => prev + 1);
    
    // Reset click count after 3 seconds
    setTimeout(() => {
      setClickCount(0);
    }, 3000);
    
    // Open admin panel after 5 clicks
    if (clickCount >= 4) {
      setIsAdminOpen(true);
      setClickCount(0);
    }
  };

  return (
    <>
      <footer className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <button
                onClick={handleBrandClick}
                className="text-3xl font-bold hover:text-lime-400 transition-colors mb-6 block"
              >
                Transferko
              </button>
              <p className="text-slate-300 mb-6 font-medium text-lg leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="bg-lime-400 text-slate-800 px-4 py-2 rounded-xl inline-block">
                <p className="font-bold text-sm">
                  {t.coverage}
                </p>
              </div>
            </div>

            {/* Quick Contact */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-lime-400">{t.contactUs}</h3>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="bg-lime-400 p-2 rounded-full mr-4 group-hover:bg-lime-300 transition-colors">
                    <Phone className="h-5 w-5 text-slate-800" />
                  </div>
                  <a 
                    href="tel:+381654512033"
                    className="font-medium hover:text-lime-400 transition-colors"
                  >
                    +381 65 451 2033
                  </a>
                </div>
                <div className="flex items-center group">
                  <div className="bg-lime-400 p-2 rounded-full mr-4 group-hover:bg-lime-300 transition-colors">
                    <Mail className="h-5 w-5 text-slate-800" />
                  </div>
                  <a 
                    href="mailto:transferkons@gmail.com"
                    className="font-medium hover:text-lime-400 transition-colors"
                  >
                    transferkons@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="bg-lime-400 p-2 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-slate-800" />
                  </div>
                  <span className="font-medium">{t.locationValue}</span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-lime-400">{t.companyInfo}</h3>
              <div className="space-y-3 text-slate-300">
                <div className="bg-slate-700 p-3 rounded-lg">
                  <p><span className="text-lime-400 font-bold">{t.pib}:</span> 113424217</p>
                </div>
                <div className="bg-slate-700 p-3 rounded-lg">
                  <p><span className="text-lime-400 font-bold">{t.maticniBroj}:</span> 66815692</p>
                </div>
                <div className="bg-slate-700 p-3 rounded-lg">
                  <p><span className="text-lime-400 font-bold">{t.status}:</span></p>
                  <p className="text-sm mt-1">{t.statusValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 font-medium mb-4 md:mb-0">
                &copy; 2024 Transferko. Sva prava zadržana.
              </p>
              <div className="flex items-center space-x-4 text-slate-400 text-sm">
                <span>Licencirani prevoznik putnika</span>
                <span>•</span>
                <span>24/7 dostupnost</span>
                <span>•</span>
                <span>Fiksne cene</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </>
  );
};

export default Footer;