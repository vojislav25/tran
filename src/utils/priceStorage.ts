export interface RoutePrice {
  id: string;
  price: string;
  icon: string;
  priceDescription?: string;
}

const DEFAULT_PRICES: RoutePrice[] = [
  { id: 'novi-sad-aerodrom', price: '6.000', icon: '✈️', priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)' },
  { id: 'novi-sad-temisvar', price: '12.000', icon: '🏛️', priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)' },
  { id: 'novi-sad-budimpesta', price: '23.500', icon: '🏰', priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)' },
  { id: 'novi-sad-nis', price: '21.500', icon: '🏔️', priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)' },
  { id: 'novi-sad-segedin', price: '17.500', icon: '🌉', priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)' },
  { id: 'novi-sad-zagreb', price: '35.000', icon: '🏙️', priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)' }
];

export const getPrices = (): RoutePrice[] => {
  const stored = localStorage.getItem('transferko-prices');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored prices:', e);
    }
  }
  return DEFAULT_PRICES;
};

export const savePrices = (prices: RoutePrice[]): void => {
  localStorage.setItem('transferko-prices', JSON.stringify(prices));
};

export const resetPrices = (): void => {
  localStorage.removeItem('transferko-prices');
};