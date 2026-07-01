import React from "react";

export default function AdContainer() {
  return (
    <div 
      className="ad-container my-8 w-full max-w-[728px] mx-auto h-[90px] border border-dashed border-muted flex items-center justify-center bg-muted/10 rounded-md text-muted-foreground text-sm font-medium tracking-wider uppercase"
      data-testid="ad-placeholder"
    >
      Advertisement
    </div>
  );
}
