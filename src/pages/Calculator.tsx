import { useEffect } from "react";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Calculator from "@/components/shipping/Calculator";

const CalculatorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">Kalkulator Ongkir</h1>
              <p className="text-gray-600">
                Hitung biaya pengiriman antar kota di Indonesia
              </p>
            </div>
            <Calculator />
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default CalculatorPage;
