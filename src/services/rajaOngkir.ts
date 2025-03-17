import { toast } from "@/components/ui/use-toast";

const PROVINCE_API_URL =
  "https://node-api-appsvrs-projects.vercel.app/province";
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
  timestamp?: string;
}

export const fetchProvinces = async (): Promise<Province[]> => {
  try {
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
      variant: "destructive",
    });
    return [];
  }
};

export const fetchCities = async (provinceId?: string): Promise<City[]> => {
  try {
    const url = CITY_API_URL;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (provinceId) {
      return data.rajaongkir.results.filter(
        (city: City) => city.province_id === provinceId
      );
    }

    return data.rajaongkir.results;
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    toast({
      title: "Error",
      description: "Failed to fetch cities. Please try again.",
      variant: "destructive",
    });

    return [];
  }
};

export const calculateShipping = async (
  originId: string,
  destinationId: string,
  weight: number,
  courier: string
): Promise<CourierResult[] | null> => {
  try {
    const response = await fetch(COST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: originId,
        destination: destinationId,
        weight: Math.ceil(weight * 1000),
        courier: courier,
      }),
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
      variant: "destructive",
    });

    return null;
  }
};

export const getCalculationHistory = (): ShippingCost[] => {
  try {
    const historyString = localStorage.getItem("shippingHistory");
    return historyString ? JSON.parse(historyString) : [];
  } catch (error) {
    console.error("Failed to get calculation history:", error);
    return [];
  }
};
