import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/ui/GlassCard";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-3xl font-bold mb-2">
                Selamat datang, {user?.name}
              </h1>
              <p className="text-gray-600">Informasi akun Anda.</p>
            </motion.div>
            <div className="max-w-md mx-auto">
              <GlassCard className="w-full">
                <h3 className="text-lg font-medium mb-6">Informasi Akun</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Nama</p>
                    <p className="font-medium text-lg">{user?.name}</p>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-lg">{user?.email}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
