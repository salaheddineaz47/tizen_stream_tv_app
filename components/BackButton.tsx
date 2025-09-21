"use client";

import React, { forwardRef } from "react";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/**
 * Reusable Back Button component for TV apps.
 * Supports focus scaling, glassmorphism, and customizable label.
 */
export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ label = "Back", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        tabIndex={-1}
        className={`
          flex items-center gap-3 text-white hover:text-primary transition-colors
          focus:text-primary focus:scale-110 glassmorphism px-4 py-2 rounded-xl
          ${className}
        `}
        {...props}
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-lg font-medium">{label}</span>
      </button>
    );
  }
);

BackButton.displayName = "BackButton";
