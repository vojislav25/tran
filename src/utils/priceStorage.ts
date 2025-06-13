export interface RoutePrice {
  id: string;
  price: string;
  icon: string;
  priceDescription?: string;
}

// Default routes that will be used if no custom data exists
const defaultRoutes: RoutePrice[] = [
  {
    id: 'novi-sad-aerodrom',
    price: '6.000',
    icon: '✈️',
    priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)'
  },
  {
    id: 'novi-sad-temisvar',
    price: '12.000',
    icon: '🚗',
    priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)'
  },
  {
    id: 'novi-sad-budimpesta',
    price: '23.500',
    icon: '🛫',
    priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)'
  },
  {
    id: 'novi-sad-nis',
    price: '15.000',
    icon: '🚙',
    priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)'
  },
  {
    id: 'novi-sad-segedin',
    price: '8.000',
    icon: '🚐',
    priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)'
  },
  {
    id: 'novi-sad-zagreb',
    price: '35.000',
    icon: '🛬',
    priceDescription: 'po vozilu (do 3 osobe + 1500 po osobi)'
  }
];

// Server-side storage simulation using localStorage as fallback
const STORAGE_KEY = 'transferko-prices';
const SERVER_ENDPOINT = '/api/prices'; // This would be your actual server endpoint

// Get prices from server or localStorage
export const getPrices = (): RoutePrice[] => {
  try {
    // Try to get from localStorage first (fallback)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : defaultRoutes;
    }
    return defaultRoutes;
  } catch (error) {
    console.error('Error loading prices:', error);
    return defaultRoutes;
  }
};

// Save prices to server and localStorage
export const savePrices = async (prices: RoutePrice[]): Promise<boolean> => {
  try {
    // Save to localStorage as immediate fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
    
    // In a real implementation, you would save to server here:
    // const response = await fetch(SERVER_ENDPOINT, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(prices)
    // });
    // return response.ok;
    
    return true;
  } catch (error) {
    console.error('Error saving prices:', error);
    return false;
  }
};

// Reset prices to default values
export const resetPrices = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRoutes));
    
    // In a real implementation, you would reset on server here:
    // fetch(SERVER_ENDPOINT + '/reset', { method: 'POST' });
    
  } catch (error) {
    console.error('Error resetting prices:', error);
  }
};

// Update a single route
export const updateRoute = async (routeId: string, updatedRoute: RoutePrice): Promise<boolean> => {
  try {
    const currentPrices = getPrices();
    const updatedPrices = currentPrices.map(route => 
      route.id === routeId ? updatedRoute : route
    );
    
    return await savePrices(updatedPrices);
  } catch (error) {
    console.error('Error updating route:', error);
    return false;
  }
};

// Delete a route
export const deleteRoute = async (routeId: string): Promise<boolean> => {
  try {
    const currentPrices = getPrices();
    const filteredPrices = currentPrices.filter(route => route.id !== routeId);
    
    return await savePrices(filteredPrices);
  } catch (error) {
    console.error('Error deleting route:', error);
    return false;
  }
};

// Add a new route
export const addRoute = async (newRoute: RoutePrice): Promise<boolean> => {
  try {
    const currentPrices = getPrices();
    
    // Check if route with same ID already exists
    if (currentPrices.some(route => route.id === newRoute.id)) {
      throw new Error('Route with this ID already exists');
    }
    
    const updatedPrices = [...currentPrices, newRoute];
    return await savePrices(updatedPrices);
  } catch (error) {
    console.error('Error adding route:', error);
    return false;
  }
};