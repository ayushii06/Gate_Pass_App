import * as React from "react";
import { cn } from "../../utils/mergeClass";

const Input = React.forwardRef(({
  className,
  type,
  ...props
}, ref) => {
  const inputRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      inputRef.current.style.setProperty('--mouse-x', `${x}px`);
      inputRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  

  return (
    <div
      ref={inputRef}
      className="input-highlight w-full"
      onMouseMove={handleMouseMove}
    >
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent px-3  text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
