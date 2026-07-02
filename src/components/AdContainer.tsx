import { useEffect } from "react";

const SCRIPT_SRC =
  "https://missiondifferentyawn.com/8443c8aa56086a449263b85c48bce7a0/invoke.js";
const CONTAINER_ID = "container-8443c8aa56086a449263b85c48bce7a0";

let scriptInjected = false;

export default function AdContainer() {
  useEffect(() => {
    if (scriptInjected) return;
    scriptInjected = true;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = SCRIPT_SRC;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-8 w-full max-w-[728px] mx-auto min-h-[90px] flex justify-center">
      <div id={CONTAINER_ID} />
    </div>
  );
}
