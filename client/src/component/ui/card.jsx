import * as React from "react";
import { cn } from "../../utils/mergeClass";

const Card = React.forwardRef(({className,animatedBorder=false,...props}, ref) => {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current && animatedBorder) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      cardRef.current.style.setProperty('--mouse-x', `${x}%`);
      cardRef.current.style.setProperty('--mouse-y', `${y}%`);

      const angle = Math.atan2(y - 50, x - 50) * (180 / Math.PI);
      cardRef.current.style.setProperty('--border-angle', `${angle}deg`);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && animatedBorder) {
      const borderElement = cardRef.current.querySelector(':before');
      if (borderElement) {
        borderElement.style.opacity = '0';
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn( "rounded-lgbg-[#191919]  shadow-lg shadow-black",
        animatedBorder && "animated-border-card p-0",
        className)}
      {...props}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {animatedBorder ? (
        <div className="card-content p-6">{props.children}</div>
      ) : (
        props.children
      )}
      </div>
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...rest} />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <h3 ref={ref} className={cn("text-2xl text-white font-semibold leading-none tracking-tight", className)} {...rest} />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <p ref={ref} className={cn("text-sm", className)} {...rest} />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...rest} />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...rest} />
  );
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
