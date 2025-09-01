import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "sm",
  className = "",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 border border-primary-200",
    secondary: "bg-gradient-to-r from-accent-100 to-accent-50 text-accent-800 border border-accent-200",
    success: "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200",
    danger: "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
    high: "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200",
    medium: "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200",
    low: "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200"
  };
  
  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;