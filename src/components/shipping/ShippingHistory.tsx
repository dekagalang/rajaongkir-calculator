
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import GlassCard from '@/components/ui/GlassCard';
import { ShippingCost, getCalculationHistory, clearCalculationHistory } from '@/services/rajaOngkir';

const ShippingHistory = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState<ShippingCost[]>([]);
  
  useEffect(() => {
    const loadHistory = () => {
      const data = getCalculationHistory();
      setHistory(data);
    };
    
    loadHistory();
  }, []);
  
  const handleClearHistory = () => {
    clearCalculationHistory();
    setHistory([]);
    toast({
      title: "Riwayat dihapus",
      description: "Riwayat perhitungan Anda telah dihapus.",
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  if (history.length === 0) {
    return (
      <GlassCard className="w-full text-center py-12">
        <h3 className="text-lg font-medium mb-2">Tidak Ada Riwayat Perhitungan</h3>
        <p className="text-gray-500 text-sm mb-6">
          Perhitungan biaya pengiriman Anda akan muncul di sini.
        </p>
        <Button asChild variant="outline">
          <a href="/">Hitung Biaya Pengiriman</a>
        </Button>
      </GlassCard>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Riwayat Perhitungan</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearHistory}
          className="text-sm"
        >
          Hapus Riwayat
        </Button>
      </div>
      
      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <GlassCard className="overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-gray-500">
                    {formatDate(item.timestamp || new Date().toISOString())}
                  </div>
                  <h3 className="font-medium mt-1">
                    {item.origin.type} {item.origin.city_name} → {item.destination.type} {item.destination.city_name}
                  </h3>
                </div>
                <div className="text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {item.weight} kg
                  </span>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="space-y-3">
                {item.results.map((courier) => (
                  <div key={courier.code} className="text-sm">
                    <div className="font-medium">{courier.name}</div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {courier.costs.slice(0, 2).map((service) => (
                        <div key={service.service} className="flex justify-between p-2 rounded bg-secondary/30">
                          <span>{service.service}</span>
                          <span className="font-medium">{formatCurrency(service.cost[0].value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShippingHistory;
