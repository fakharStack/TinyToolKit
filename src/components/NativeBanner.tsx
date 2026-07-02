import React, { useEffect } from "react";

const NativeBanner: React.FC = () => {
  useEffect(() => {
    const scriptId = "adsterra-script";

    // Check if the script is already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://pl30158263.effectivecpmnetwork.com/8443c8aa56086a449263b85c48bce7a0/invoke.js";
      document.body.appendChild(script);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      id="container-8443c8aa56086a449263b85c48bce7a0"
      className="ad-container my-8 w-full max-w-[728px] mx-auto h-[90px] border border-dashed border-muted flex items-center justify-center bg-muted/10 rounded-md text-muted-foreground text-sm font-medium tracking-wider uppercase"
    ></div>
  );
};

export default NativeBanner;