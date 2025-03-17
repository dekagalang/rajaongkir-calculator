import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/layout/Navbar";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";

const SignUp = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <AuthForm type="sign-up" />
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default SignUp;
