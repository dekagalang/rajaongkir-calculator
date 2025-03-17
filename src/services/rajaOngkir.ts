
import { toast } from "@/components/ui/use-toast";

// RajaOngkir API requires API Key
const API_KEY = "f04600f9bfae98152518bf9b6cb3cc8b";
const API_BASE_URL = "https://api.rajaongkir.com/starter";
// New API endpoints for city and province
const PROVINCE_API_URL = "https://node-api-appsvrs-projects.vercel.app/province";
const CITY_API_URL = "https://node-api-appsvrs-projects.vercel.app/city";
const COST_API_URL = "https://node-api-appsvrs-projects.vercel.app/cost";

export interface City {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
}

export interface Province {
  province_id: string;
  province: string;
}

export interface CourierCost {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

export interface CourierResult {
  code: string;
  name: string;
  costs: CourierCost[];
}

export interface ShippingCost {
  origin: City;
  destination: City;
  weight: number;
  courier: string;
  results: CourierResult[];
  timestamp?: string; // Optional timestamp property
}

// Helper function to make API requests to our backend
const fetchFromBackend = async (url: string, method = 'GET', body?: any) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.rajaongkir;
  } catch (error) {
    console.error(`API error: ${error}`);
    throw error;
  }
};

// Fetch all provinces from backend
export const fetchProvinces = async (): Promise<Province[]> => {
  try {
    console.log("Fetching provinces from backend");
    
    const response = await fetch(PROVINCE_API_URL);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.rajaongkir.results;
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    toast({
      title: "Error",
      description: "Failed to fetch provinces. Please try again.",
      variant: "destructive"
    });
    return [];
  }
};

// Fetch cities by province from backend
export const fetchCities = async (provinceId?: string): Promise<City[]> => {
  try {
    console.log(`Fetching cities for province ${provinceId} from backend`);
    
    let url = CITY_API_URL;
    // Our backend doesn't support query params for province filtering yet,
    // so we'll filter on the client side for now
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter cities by province if provinceId is provided
    if (provinceId) {
      return data.rajaongkir.results.filter((city: City) => city.province_id === provinceId);
    }
    
    return data.rajaongkir.results;
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    toast({
      title: "Error",
      description: "Failed to fetch cities. Please try again.",
      variant: "destructive"
    });
    
    return [];
  }
};

// Calculate domestic shipping cost using backend
export const calculateShipping = async (
  originId: string,
  destinationId: string,
  weight: number,
  courier: string
): Promise<CourierResult[] | null> => {
  try {
    console.log(`Calculating shipping from ${originId} to ${destinationId} with ${courier} for ${weight}kg`);
    
    // Backend expects POST request with these parameters
    const response = await fetch(COST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: originId,
        destination: destinationId,
        weight: Math.ceil(weight * 1000), // Convert to grams, as backend expects
        courier: courier
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.rajaongkir.status.code !== 200) {
      throw new Error(data.rajaongkir.status.description);
    }
    
    return data.rajaongkir.results;
  } catch (error) {
    console.error("Failed to calculate shipping:", error);
    toast({
      title: "Error",
      description: "Failed to calculate shipping cost. Please try again.",
      variant: "destructive"
    });
    
    return null;
  }
};

// Store calculation history in localStorage
export const saveCalculationToHistory = (calculation: ShippingCost) => {
  try {
    const historyString = localStorage.getItem('shippingHistory');
    const history: ShippingCost[] = historyString ? JSON.parse(historyString) : [];
    
    // Add timestamp to identify this calculation
    const calculationWithTimestamp = {
      ...calculation,
      timestamp: new Date().toISOString(),
    };
    
    // Add to beginning of array
    history.unshift(calculationWithTimestamp);
    
    // Limit history to 10 items
    const limitedHistory = history.slice(0, 10);
    
    localStorage.setItem('shippingHistory', JSON.stringify(limitedHistory));
    
    return limitedHistory;
  } catch (error) {
    console.error("Failed to save calculation to history:", error);
    return null;
  }
};

// Get calculation history from localStorage
export const getCalculationHistory = (): ShippingCost[] => {
  try {
    const historyString = localStorage.getItem('shippingHistory');
    return historyString ? JSON.parse(historyString) : [];
  } catch (error) {
    console.error("Failed to get calculation history:", error);
    return [];
  }
};

// Clear calculation history
export const clearCalculationHistory = (): void => {
  localStorage.removeItem('shippingHistory');
};
