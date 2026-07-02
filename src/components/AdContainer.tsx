import { useEffect } from "react";

const NATIVE_SCRIPT =
  "https://missiondifferentyawn.com/8443c8aa56086a449263b85c48bce7a0/invoke.js";

const NATIVE_CONTAINER =
  "container-8443c8aa56086a449263b85c48bce7a0";

const BANNER_KEY =
  "c7780a2e0ce0bffc7be227c93075792c";

const BANNER_SCRIPT =
  `https://missiondifferentyawn.com/${BANNER_KEY}/invoke.js`;

let initialized = false;

export default function AdContainer() {
  useEffect(() => {
    if (initialized) return;

    initialized = true;

    // Native Banner
    const nativeScript = document.createElement("script");
    nativeScript.async = true;
    nativeScript.setAttribute("data-cfasync", "false");
    nativeScript.src = NATIVE_SCRIPT;

    document.body.appendChild(nativeScript);

    // 728×90 Banner
    (window as any).atOptions = {
      key: BANNER_KEY,
      format: "iframe",
      width: 728,
      height: 90,
      params: {},
    };

    const bannerScript = document.createElement("script");
    bannerScript.async = true;
    bannerScript.src = BANNER_SCRIPT;

    document.body.appendChild(bannerScript);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 my-8">

      {/* Native Banner */}
      <div id={NATIVE_CONTAINER} />

      {/* 728×90 Banner */}
      <div className="w-full max-w-[728px] min-h-[90px] flex justify-center" />

    </div>
  );
}