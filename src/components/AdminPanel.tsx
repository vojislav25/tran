import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, X, DollarSign, Edit3, Plus, Trash2 } from 'lucide-react';
import { RoutePrice, getPrices, savePrices, resetPrices } from '../utils/priceStorage';
import { translations } from '../utils/translations';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [prices, setPrices] = useState<RoutePrice[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<RoutePrice | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoute, setNewRoute] = useState({
    id: '',
    price: '',
    icon: '🚗',
    priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)',
    namesr: '',
    nameen: '',
    nameru: ''
  });

  // Complex password: Tr@nsf3rk0_2024!
  const ADMIN_PASSWORD = 'Tr@nsf3rk0_2024!';

  useEffect(() => {
    if (isOpen) {
      setPrices(getPrices());
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Neispravni podaci za prijavu');
    }
  };

  const handleSave = () => {
    savePrices(prices);
    // Dispatch custom event to update prices in real-time
    window.dispatchEvent(new Event('pricesUpdated'));
    alert('Cene su uspešno sačuvane!');
  };

  const handleReset = () => {
    if (confirm('Da li ste sigurni da želite da resetujete sve cene na početne vrednosti?')) {
      resetPrices();
      setPrices(getPrices());
      window.dispatchEvent(new Event('pricesUpdated'));
      alert('Cene su resetovane na početne vrednosti!');
    }
  };

  const startEditing = (route: RoutePrice) => {
    setEditingId(route.id);
    setEditingData({ ...route });
  };

  const saveEdit = () => {
    if (editingId && editingData) {
      setPrices(prev => prev.map(price => 
        price.id === editingId 
          ? editingData
          : price
      ));
      setEditingId(null);
      setEditingData(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData(null);
  };

  const handleAddRoute = () => {
    if (newRoute.id && newRoute.price && newRoute.namesr) {
      // Check if ID already exists
      if (prices.some(p => p.id === newRoute.id)) {
        alert('Transfer sa ovim ID već postoji!');
        return;
      }

      // Create new route object
      const newRouteData: RoutePrice = {
        id: newRoute.id,
        price: newRoute.price,
        icon: newRoute.icon,
        priceDescription: newRoute.priceDescription
      };

      // Add to prices array
      const updatedPrices = [...prices, newRouteData];
      setPrices(updatedPrices);

      // Save prices immediately
      savePrices(updatedPrices);

      // Add translations to localStorage
      const existingTranslations = JSON.parse(localStorage.getItem('transferko-translations') || '{}');
      
      const updatedTranslations = {
        ...existingTranslations,
        sr: {
          ...existingTranslations.sr,
          routes: {
            ...existingTranslations.sr?.routes,
            [newRoute.id]: newRoute.namesr
          },
          whatsappMessages: {
            ...existingTranslations.sr?.whatsappMessages,
            [newRoute.id]: `Zdravo! Zainteresovan/a sam za transfer ${newRoute.namesr}.`
          }
        },
        en: {
          ...existingTranslations.en,
          routes: {
            ...existingTranslations.en?.routes,
            [newRoute.id]: newRoute.nameen || newRoute.namesr
          },
          whatsappMessages: {
            ...existingTranslations.en?.whatsappMessages,
            [newRoute.id]: `Hello! I am interested in transfer ${newRoute.nameen || newRoute.namesr}.`
          }
        },
        ru: {
          ...existingTranslations.ru,
          routes: {
            ...existingTranslations.ru?.routes,
            [newRoute.id]: newRoute.nameru || newRoute.namesr
          },
          whatsappMessages: {
            ...existingTranslations.ru?.whatsappMessages,
            [newRoute.id]: `Здравствуйте! Меня интересует трансфер ${newRoute.nameru || newRoute.namesr}.`
          }
        }
      };

      localStorage.setItem('transferko-translations', JSON.stringify(updatedTranslations));

      // Dispatch event to update UI
      window.dispatchEvent(new Event('pricesUpdated'));

      // Reset form
      setNewRoute({
        id: '',
        price: '',
        icon: '🚗',
        priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)',
        namesr: '',
        nameen: '',
        nameru: ''
      });
      setShowAddForm(false);
      
      alert('Novi transfer je uspešno dodat i sačuvan!');
    } else {
      alert('Molimo unesite sve obavezne podatke (ID, cena, naziv na srpskom)');
    }
  };

  const handleDeleteRoute = (routeId: string) => {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj transfer?')) {
      const updatedPrices = prices.filter(p => p.id !== routeId);
      setPrices(updatedPrices);
      savePrices(updatedPrices);
      
      // Remove from translations
      const existingTranslations = JSON.parse(localStorage.getItem('transferko-translations') || '{}');
      
      ['sr', 'en', 'ru'].forEach(lang => {
        if (existingTranslations[lang]?.routes) {
          delete existingTranslations[lang].routes[routeId];
        }
        if (existingTranslations[lang]?.whatsappMessages) {
          delete existingTranslations[lang].whatsappMessages[routeId];
        }
      });

      localStorage.setItem('transferko-translations', JSON.stringify(existingTranslations));
      window.dispatchEvent(new Event('pricesUpdated'));
      alert('Transfer je obrisan!');
    }
  };

  const getRouteName = (routeId: string) => {
    const customTranslations = JSON.parse(localStorage.getItem('transferko-translations') || '{}');
    return customTranslations.sr?.routes?.[routeId] || 
           translations.sr.routes[routeId as keyof typeof translations.sr.routes] || 
           routeId;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Admin Panel - Upravljanje Cenama</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-8">
            <form onSubmit={handleLogin} className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Prijavite se</h3>
              
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {loginError}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Korisničko ime
                  </label>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Lozinka
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-lime-400 text-slate-800 py-3 px-6 rounded-xl font-bold hover:bg-lime-300 transition-colors"
                >
                  Prijavite se
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Upravljanje Cenama Transfera</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-slate-800 text-lime-400 px-4 py-2 rounded-xl font-bold hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Dodaj Transfer
                </button>
                <button
                  onClick={handleSave}
                  className="bg-lime-400 text-slate-800 px-4 py-2 rounded-xl font-bold hover:bg-lime-300 transition-colors flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Sačuvaj
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Resetuj
                </button>
              </div>
            </div>

            {/* Add New Route Form */}
            {showAddForm && (
              <div className="bg-lime-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-bold text-slate-800 mb-4">Dodaj Novi Transfer</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ID (jedinstveni identifikator) *
                    </label>
                    <input
                      type="text"
                      value={newRoute.id}
                      onChange={(e) => setNewRoute(prev => ({ ...prev, id: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      placeholder="npr. novi-sad-pariz"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Cena (RSD) *
                    </label>
                    <input
                      type="text"
                      value={newRoute.price}
                      onChange={(e) => setNewRoute(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      placeholder="npr. 45.000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ikona
                    </label>
                    <input
                      type="text"
                      value={newRoute.icon}
                      onChange={(e) => setNewRoute(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      placeholder="🚗"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Opis cene
                    </label>
                    <input
                      type="text"
                      value={newRoute.priceDescription}
                      onChange={(e) => setNewRoute(prev => ({ ...prev, priceDescription: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      placeholder="po vozilu (do 3 osobe + 1500 po osobi)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Naziv (srpski) *
                    </label>
                    <input
                      type="text"
                      value={newRoute.namesr}
                      onChange={(e) => setNewRoute(prev => ({ ...prev, namesr: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      placeholder="Novi Sad ⇄ Pariz Aerodrom"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Naziv (engleski)
                    </label>
                    <input
                      type="text"
                      value={newRoute.nameen}
                      onChange={(e) => setNewRoute(prev => ({ ...prev, nameen: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      placeholder="Novi Sad ⇄ Paris Airport"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Naziv (ruski)
                    </label>
                    <input
                      type="text"
                      value={newRoute.nameru}
                      onChange={(e) => setNewRoute(prev => ({ ...prev, nameru: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      placeholder="Нови Сад ⇄ Аэропорт Париж"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleAddRoute}
                    className="bg-lime-400 text-slate-800 px-4 py-2 rounded-lg font-bold hover:bg-lime-300 transition-colors"
                  >
                    Dodaj Transfer
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Otkaži
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prices.map((route) => (
                <div key={route.id} className="bg-slate-50 rounded-2xl p-6 relative">
                  <button
                    onClick={() => handleDeleteRoute(route.id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    title="Obriši transfer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{route.icon}</span>
                    <h4 className="font-bold text-slate-800 text-sm pr-8">
                      {getRouteName(route.id)}
                    </h4>
                  </div>
                  
                  {editingId === route.id && editingData ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Cena</label>
                        <input
                          type="text"
                          value={editingData.price}
                          onChange={(e) => setEditingData(prev => prev ? { ...prev, price: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Ikona</label>
                        <input
                          type="text"
                          value={editingData.icon}
                          onChange={(e) => setEditingData(prev => prev ? { ...prev, icon: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Opis cene</label>
                        <input
                          type="text"
                          value={editingData.priceDescription || ''}
                          onChange={(e) => setEditingData(prev => prev ? { ...prev, priceDescription: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="bg-lime-400 text-slate-800 px-3 py-2 rounded-lg hover:bg-lime-300 transition-colors text-sm font-bold"
                        >
                          Sačuvaj
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition-colors text-sm"
                        >
                          Otkaži
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-slate-600 mr-1" />
                          <span className="text-2xl font-bold text-slate-800">{route.price}</span>
                          <span className="text-slate-600 font-medium ml-2">RSD</span>
                        </div>
                        <button
                          onClick={() => startEditing(route)}
                          className="bg-slate-800 text-lime-400 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-xs text-slate-600 font-medium">
                        {route.priceDescription || 'po vozilu (do 3 osobe + 1500 po osobi)'}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-lime-50 rounded-xl">
              <h4 className="font-bold text-slate-800 mb-2">Napomene:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Cene se čuvaju lokalno u browseru</li>
                <li>• Kliknite "Sačuvaj" da primenite izmene</li>
                <li>• "Resetuj" vraća sve cene na početne vrednosti</li>
                <li>• Izmene će biti vidljive odmah na sajtu</li>
                <li>• Možete dodati nove transfere sa "Dodaj Transfer" dugmetom</li>
                <li>• ID mora biti jedinstven (npr. novi-sad-pariz)</li>
                <li>• Novi transferi se automatski čuvaju kada ih dodate</li>
                <li>• Možete editovati sve podatke klikom na edit dugme</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;