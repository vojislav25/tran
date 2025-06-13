import React from 'react';
import { DollarSign, Car, Users, Clock } from 'lucide-react';
import { Language } from '../utils/types';
import { translations } from '../utils/translations';

interface FeaturesProps {
  language: Language;
}

const FeaturesSection: React.FC<FeaturesProps> = ({ language }) => {
  const t = translations[language];

  const features = [
    {
      icon: DollarSign,
      title: t.fixedPrices,
      bgColor: 'bg-lime-400',
      iconColor: 'text-slate-800'
    },
    {
      icon: Car,
      title: t.comfortableVehicles,
      bgColor: 'bg-slate-800',
      iconColor: 'text-lime-400'
    },
    {
      icon: Users,
      title: t.professionalDrivers,
      bgColor: 'bg-lime-400',
      iconColor: 'text-slate-800'
    },
    {
      icon: Clock,
      title: t.available24_7,
      bgColor: 'bg-slate-800',
      iconColor: 'text-lime-400'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t.whyChooseUs}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-3xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`${feature.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <IconComponent className={`h-10 w-10 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;