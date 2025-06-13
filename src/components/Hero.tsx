import React from 'react';
import { Phone, MessageCircle, Star, Shield, Clock } from 'lucide-react';
import { Language } from '../utils/types';
import { getTranslations } from '../utils/translations';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = getTranslations(language);

  const handleWhatsAppCall = () => {
    window.open('tel:+381654512033', '_self');
  };

  const handleWhatsAppMessage = () => {
    window.open('https://wa.me/381654512033', '_blank');
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-white min-h-screen flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-lime-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-700 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-lime-400 rounded-full opacity-15 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="max-w-4xl">
            {/* Mobile car image - only visible on mobile */}
            <div className="lg:hidden mb-8 text-center">
              <img 
                src="/IMG_20250528_120341-removebg-preview.png" 
                alt="Transferko vozilo - profesionalni aerodromski transfer Novi Sad"
                className="w-full max-w-md mx-auto h-auto rounded-2xl shadow-2xl"
                loading="eager"
              />
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-lime-400 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-slate-800 mr-2" />
                <span className="text-slate-800 font-bold text-sm">{t.licensedCarrier}</span>
              </div>
              <div className="flex items-center bg-slate-800 px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-lime-400 mr-2" />
                <span className="text-lime-400 font-bold text-sm">{t.experienceYears}</span>
              </div>
              <div className="flex items-center bg-lime-400 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5 text-slate-800 mr-2" />
                <span className="text-slate-800 font-bold text-sm">{t.availability247}</span>
              </div>
            </div>

            {/* Hero content in speech bubble style */}
            <div className="relative bg-lime-400 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
              <div className="absolute -bottom-6 left-12 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[24px] border-t-lime-400"></div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                {t.heroTitle}
              </h1>
              <div className="text-lg md:text-xl text-slate-700 font-medium space-y-3">
                <p className="leading-relaxed">
                  {t.heroDescription1}
                </p>
                <p className="leading-relaxed">
                  {t.heroDescription2}
                </p>
              </div>
            </div>

            {/* Response bubble */}
            <div className="relative bg-slate-800 rounded-3xl p-8 md:p-12 ml-4 md:ml-16 shadow-2xl">
              <div className="absolute -top-6 left-12 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[24px] border-b-slate-800"></div>
              
              <p className="text-lg md:text-xl text-lime-400 font-bold mb-8">
                {t.heroResponse}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <button
                  onClick={handleWhatsAppMessage}
                  className="bg-lime-400 text-slate-800 px-6 md:px-8 py-4 rounded-2xl font-bold text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  {t.bookNow}
                </button>
                <button
                  onClick={handleWhatsAppCall}
                  className="border-2 border-lime-400 text-lime-400 px-6 md:px-8 py-4 rounded-2xl font-bold text-lg hover:bg-lime-400 hover:text-slate-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Phone className="mr-3 h-6 w-6" />
                  {t.callNow}
                </button>
              </div>
            </div>

            {/* Key benefits */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                <div className="text-2xl font-bold text-slate-800">6.000 RSD</div>
                <div className="text-sm text-slate-600 font-medium">{t.belgradeAirport}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                <div className="text-2xl font-bold text-slate-800">60min</div>
                <div className="text-sm text-slate-600 font-medium">{t.freeWaiting}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                <div className="text-2xl font-bold text-slate-800">24/7</div>
                <div className="text-sm text-slate-600 font-medium">{t.availability}</div>
              </div>
            </div>
          </div>

          {/* Right side - Car image with better positioned badges - only visible on desktop */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative max-w-lg">
              <div className="absolute inset-0 bg-lime-400 rounded-3xl opacity-20 transform rotate-6"></div>
              <img 
                src="/IMG_20250528_120341-removebg-preview.png" 
                alt="Transferko vozilo - profesionalni aerodromski transfer Novi Sad"
                className="relative z-10 max-w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;