import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Checkbox = forwardRef(({ 
  checked = false,
  disabled = false,
  className = "",
  onChange,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        "checkbox-custom",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;