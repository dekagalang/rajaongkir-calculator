
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import GlassCard from '@/components/ui/GlassCard';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (type === 'sign-in') {
        await login(email, password);
        toast({
          title: "Selamat datang kembali!",
          description: "Anda berhasil masuk.",
        });
      } else {
        await register(name, email, password);
        toast({
          title: "Akun berhasil dibuat!",
          description: "Akun Anda telah berhasil dibuat.",
        });
      }
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Kesalahan autentikasi",
        description: "Terjadi kesalahan saat autentikasi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <GlassCard className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">
            {type === 'sign-in' ? 'Selamat datang kembali' : 'Buat akun baru'}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {type === 'sign-in' 
              ? 'Masuk ke akun Anda untuk melanjutkan' 
              : 'Daftar untuk mulai menghitung biaya pengiriman'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {type === 'sign-up' && (
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Masukkan nama Anda"
                className="rounded-xl h-12"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Masukkan email Anda"
              className="rounded-xl h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan kata sandi Anda"
              className="rounded-xl h-12"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full rounded-xl h-12 mt-6"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                {/* Spinner animation */}
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {type === 'sign-in' ? 'Sedang masuk...' : 'Sedang mendaftar...'}
              </span>
            ) : (
              <span>{type === 'sign-in' ? 'Masuk' : 'Daftar'}</span>
            )}
          </Button>
          
          <div className="text-center text-sm mt-6">
            {type === 'sign-in' ? (
              <p className="text-gray-500">
                Belum punya akun?{' '}
                <a 
                  href="/sign-up" 
                  className="text-black font-medium hover:underline"
                >
                  Daftar
                </a>
              </p>
            ) : (
              <p className="text-gray-500">
                Sudah punya akun?{' '}
                <a 
                  href="/sign-in" 
                  className="text-black font-medium hover:underline"
                >
                  Masuk
                </a>
              </p>
            )}
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );
};

export default AuthForm;
