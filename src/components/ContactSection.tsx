import React from 'react';
import { Phone, MessageCircle, Clock, Mail, MapPin, FileText } from 'lucide-react';
import { Language } from '../utils/types';
import { translations } from '../utils/translations';

interface ContactProps {
  language: Language;
}

const ContactSection: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language];

  const handleWhatsAppCall = () => {
    window.open('tel:+381654512033', '_self');
  };

  const handleWhatsAppMessage = () => {
    window.open('https://wa.me/381654512033', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:transferkons@gmail.com', '_self');
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t.contactUs}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                {t.whatsappCall}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWhatsAppCall}
                  className="bg-lime-400 text-slate-800 px-6 py-4 rounded-2xl font-bold hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
                >
                  <Phone className="mr-3 h-6 w-6" />
                  +381 65 451 2033
                </button>
                <button
                  onClick={handleWhatsAppMessage}
                  className="border-2 border-lime-400 text-slate-800 px-6 py-4 rounded-2xl font-bold hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  {t.sendWhatsapp}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-lime-400 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-slate-800" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {t.workingHours}
                </h3>
              </div>
              <p className="text-xl font-bold text-slate-800 mb-2">
                {t.workingHoursValue}
              </p>
              <p className="text-slate-600 font-medium">
                {t.workingHoursDesc}
              </p>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">
              {t.companyInfo}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-4 mt-1">
                  <FileText className="h-5 w-5 text-lime-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">{t.pib}:</div>
                  <div className="text-slate-600 font-medium">113424217</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-4 mt-1">
                  <FileText className="h-5 w-5 text-lime-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">{t.maticniBroj}:</div>
                  <div className="text-slate-600 font-medium">66815692</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-4 mt-1">
                  <FileText className="h-5 w-5 text-lime-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">{t.status}:</div>
                  <div className="text-slate-600 font-medium">{t.statusValue}</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-4 mt-1">
                  <Mail className="h-5 w-5 text-lime-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">{t.email}:</div>
                  <button
                    onClick={handleEmailClick}
                    className="text-slate-800 hover:text-slate-600 underline font-medium"
                  >
                    transferkons@gmail.com
                  </button>
                  <div className="text-sm text-slate-500 mt-1">
                    {t.emailDesc}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-slate-800 p-2 rounded-full mr-4 mt-1">
                  <MapPin className="h-5 w-5 text-lime-400" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">{t.location}:</div>
                  <div className="text-slate-600 font-medium">{t.locationValue}</div>
                  <div className="text-sm text-lime-600 font-bold mt-1">
                    {t.coverage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;