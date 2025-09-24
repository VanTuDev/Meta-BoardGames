import React from "react";

const Button = ({ className = "", children, ...props }) => {
   return (
      <button
         className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors ${className}`}
         {...props}
      >
         {children}
      </button>
   );
};

export default Button;

