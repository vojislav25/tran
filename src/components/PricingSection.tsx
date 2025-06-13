import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, MapPin, Car } from 'lucide-react';
import { Language } from '../utils/types';
import { getTranslations } from '../utils/translations';
import { getPrices, RoutePrice } from '../utils/priceStorage';

interface PricingProps {
  language: Language;
}

const PricingSection: React.FC<PricingProps> = ({ language }) => {
  const t = getTranslations(language);
  const [routes, setRoutes] = useState<RoutePrice[]>([]);

  useEffect(() => {
    setRoutes(getPrices());
    
    // Listen for storage changes to update prices in real-time
    const handleStorageChange = () => {
      setRoutes(getPrices());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handlePriceUpdate = () => {
      setRoutes(getPrices());
    };
    
    window.addEventListener('pricesUpdated', handlePriceUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pricesUpdated', handlePriceUpdate);
    };
  }, []);

  const handleBookRoute = (routeId: string) => {
    const message = encodeURIComponent(t.whatsappMessages[routeId as keyof typeof t.whatsappMessages] || `Zdravo! Zainteresovan/a sam za transfer ${routeId}.`);
    window.open(`https://wa.me/381654512033?text=${message}`, '_blank');
  };

  return (
    <section id="pricing" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.pricingTitle}
          </h2>
          <p className="text-lg md:text-xl text-lime-400 font-semibold">
            {t.pricingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {routes.map((route, index) => (
            <div
              key={route.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="text-2xl md:text-3xl mr-4">{route.icon}</div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-slate-800 leading-tight">
                      {t.routes[route.id as keyof typeof t.routes] || route.id}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-slate-600">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 mr-3 text-lime-500 flex-shrink-0" />
                    <span className="font-medium text-sm md:text-base">{t.available247}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-3 text-lime-500 flex-shrink-0" />
                    <span className="font-medium text-sm md:text-base">{t.waitingIncluded}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Car className="h-4 w-4 md:h-5 md:w-5 mr-3 text-lime-500 flex-shrink-0" />
                    <span className="font-medium text-sm md:text-base">
                      {language === 'sr' && 'Komforno vozilo'}
                      {language === 'en' && 'Comfortable vehicle'}
                      {language === 'ru' && 'Комфортное авто'}
                    </span>
                  </div>
                </div>

                <div className="bg-lime-50 rounded-2xl p-4 md:p-6 mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-slate-800">{route.price}</span>
                    <span className="text-base md:text-lg font-semibold text-slate-600 ml-2">RSD</span>
                  </div>
                  <div className="text-slate-600 text-center mt-1 font-medium text-sm md:text-base">
                    {route.priceDescription || t.perVehicle}
                  </div>
                </div>

                <button
                  onClick={() => handleBookRoute(route.id)}
                  className="w-full bg-lime-400 text-slate-800 py-3 md:py-4 px-4 md:px-6 rounded-2xl font-bold text-base md:text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {language === 'sr' && 'Rezerviši odmah'}
                  {language === 'en' && 'Book now'}
                  {language === 'ru' && 'Забронировать'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;