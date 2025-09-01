import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text",
  error = false,
  disabled = false,
  className = "",
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2.5 border rounded-lg text-sm placeholder-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "border-gray-300 bg-white text-gray-900 hover:border-gray-400",
    error: "border-red-300 bg-red-50 text-red-900 focus:ring-red-500"
  };
  
  return (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        baseStyles,
        error ? variants.error : variants.default,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;