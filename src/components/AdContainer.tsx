import { useEffect } from "react";

const AD_KEY = "c7780a2e0ce0bffc7be227c93075792c";
const SCRIPT_SRC = `https://missiondifferentyawn.com/${AD_KEY}/invoke.js`;

let scriptInjected = false;

export default function AdContainer() {
  useEffect(() => {
    if (scriptInjected) return;
    scriptInjected = true;

    // Set atOptions before loading the script
    (window as unknown as Record<string, unknown>).atOptions = {
      key: AD_KEY,
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-8 w-full max-w-[728px] mx-auto flex justify-center min-h-[90px]" />
  );
}