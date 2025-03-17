
import { useState, useEffect } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { City, Province, fetchProvinces, fetchCities } from '@/services/rajaOngkir';
import { motion } from 'framer-motion';

interface CitySelectorProps {
  label: string;
  value: City | null;
  onChange: (city: City) => void;
}

const CitySelector = ({ label, value, onChange }: CitySelectorProps) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch provinces on mount
  useEffect(() => {
    const getProvinces = async () => {
      setIsLoading(true);
      const data = await fetchProvinces();
      setProvinces(data);
      setIsLoading(false);
    };
    
    getProvinces();
  }, []);

  // Fetch cities when province is selected
  useEffect(() => {
    if (!selectedProvinceId) return;
    
    const getCities = async () => {
      setIsLoading(true);
      const data = await fetchCities(selectedProvinceId);
      setCities(data);
      setIsLoading(false);
    };
    
    getCities();
  }, [selectedProvinceId]);

  // Handle province selection
  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    setCities([]);
    onChange(null as any); // Reset city when province changes
  };

  // Handle city selection
  const handleCityChange = (cityId: string) => {
    const selectedCity = cities.find(city => city.city_id === cityId);
    if (selectedCity) {
      onChange(selectedCity);
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {/* Province selector */}
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Provinsi</Label>
        <Select
          value={selectedProvinceId}
          onValueChange={handleProvinceChange}
          disabled={isLoading || provinces.length === 0}
        >
          <SelectTrigger className="rounded-xl h-11">
            <SelectValue placeholder="Pilih provinsi" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.province_id} value={province.province_id}>
                {province.province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* City selector - only show if province is selected */}
      {selectedProvinceId && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-1"
        >
          <Label className="text-xs text-muted-foreground">Kota</Label>
          <Select
            value={value?.city_id || ""}
            onValueChange={handleCityChange}
            disabled={isLoading || cities.length === 0}
          >
            <SelectTrigger className="rounded-xl h-11">
              <SelectValue placeholder="Pilih kota" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.city_id} value={city.city_id}>
                  {city.type} {city.city_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      )}
    </div>
  );
};

export default CitySelector;
