import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, fullWidth = false, className = "", ...props }) => {
  const baseStyles =
    "rounded-md border border-gray-300 px-4 py-2 text-base focus:border-[#2196F3] focus:outline-none focus:ring-1 focus:ring-[#2196F3]";
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <div className={`${widthStyles}`}>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <input className={`${baseStyles} ${errorStyles} ${widthStyles} ${className}`} {...props} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
