
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  hoverEffect?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  variant = "light",
  hoverEffect = false 
}: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 shadow-sm",
        variant === "light" ? "bg-white/80 border border-white/20" : "bg-black/60 border border-white/10",
        hoverEffect && "hover:shadow-md hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
