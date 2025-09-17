"use client";

import type { ReactNode } from "react";

interface TVLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
}

export function TVLayout({ children, backgroundImage }: TVLayoutProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="fixed inset-0 bg-black/60" />
        </div>
      )}

      {/* Default gradient background if no image */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      )}

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col">{children}</div>
    </div>
  );
}
