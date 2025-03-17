
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import CitySelector from './CitySelector';
import GlassCard from '@/components/ui/GlassCard';
import { 
  City, 
  CourierResult, 
  calculateShipping, 
  saveCalculationToHistory 
} from '@/services/rajaOngkir';
import { useAuth } from '@/context/AuthContext';

const Calculator = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const [originCity, setOriginCity] = useState<City | null>(null);
  const [destinationCity, setDestinationCity] = useState<City | null>(null);
  const [weight, setWeight] = useState<number>(1);
  const [courier, setCourier] = useState<string>("jne");
  const [results, setResults] = useState<CourierResult[] | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  const handleCalculate = async () => {
    if (!originCity || !destinationCity) {
      toast({
        title: "Informasi kurang lengkap",
        description: "Silakan pilih kota asal dan tujuan.",
        variant: "destructive",
      });
      return;
    }
    
    if (weight <= 0) {
      toast({
        title: "Berat tidak valid",
        description: "Berat harus lebih dari 0 kg.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCalculating(true);
    setResults(null);
    
    try {
      const data = await calculateShipping(
        originCity.city_id,
        destinationCity.city_id,
        weight,
        courier
      );
      
      setResults(data);
      
      // Save calculation to history if user is authenticated
      if (isAuthenticated && data) {
        saveCalculationToHistory({
          origin: originCity,
          destination: destinationCity,
          weight,
          courier,
          results: data,
        });
      }
    } catch (error) {
      toast({
        title: "Perhitungan gagal",
        description: "Terjadi kesalahan saat menghitung biaya pengiriman.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <GlassCard className="w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CitySelector 
              label="Asal" 
              value={originCity} 
              onChange={setOriginCity} 
            />
          </div>
          
          <div>
            <CitySelector 
              label="Tujuan" 
              value={destinationCity} 
              onChange={setDestinationCity} 
            />
          </div>
          
          <div>
            <div className="space-y-3">
              <Label htmlFor="weight">Berat (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="rounded-xl h-11"
              />
            </div>
          </div>
          
          <div>
            <div className="space-y-3">
              <Label htmlFor="courier">Kurir</Label>
              <Select value={courier} onValueChange={setCourier}>
                <SelectTrigger id="courier" className="rounded-xl h-11">
                  <SelectValue placeholder="Pilih kurir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jne">JNE</SelectItem>
                  <SelectItem value="tiki">TIKI</SelectItem>
                  <SelectItem value="pos">POS Indonesia</SelectItem>
                  <SelectItem value="all">Semua Kurir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleCalculate} 
          disabled={isCalculating || !originCity || !destinationCity || weight <= 0}
          className="w-full mt-8 rounded-xl h-12"
        >
          {isCalculating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menghitung...
            </span>
          ) : (
            "Hitung Biaya Pengiriman"
          )}
        </Button>
      </GlassCard>
      
      {/* Results section */}
      <AnimatePresence>
        {results && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="w-full">
              <h3 className="text-lg font-medium mb-4">Biaya Pengiriman</h3>
              
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={result.code}>
                    {index > 0 && <Separator className="my-4" />}
                    
                    <div className="mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {result.name}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {result.costs.map((service) => (
                        <div 
                          key={service.service}
                          className="p-4 rounded-xl bg-white/50 border border-gray-100"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{service.service}</p>
                              <p className="text-sm text-gray-500">{service.description}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Estimasi pengiriman: {service.cost[0].etd} hari
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">
                                {formatCurrency(service.cost[0].value)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {!isAuthenticated && (
                <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-secondary">
                  <p className="text-sm text-center">
                    <a href="/sign-in" className="font-medium hover:underline">Masuk</a> atau <a href="/sign-up" className="font-medium hover:underline">buat akun</a> untuk menyimpan riwayat perhitungan Anda.
                  </p>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calculator;
