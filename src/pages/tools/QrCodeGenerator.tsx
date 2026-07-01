import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is a QR code?", answer: "A QR (Quick Response) code is a two-dimensional barcode that can be scanned by any smartphone camera to open a URL, display text, or perform other actions instantly." },
  { question: "What can I encode in a QR code?", answer: "URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, and more. Most commonly QR codes link to websites." },
  { question: "What does the error correction level do?", answer: "Error correction allows the QR code to be read even if part of it is damaged or obscured. Higher levels (L → M → Q → H) increase redundancy but also increase the code's complexity." },
  { question: "How do I download the QR code?", answer: "Click the Download PNG button to save the QR code as an image file you can use in print, web, or marketing materials." },
];

const EC_LEVELS = ["L", "M", "Q", "H"] as const;
type ECLevel = (typeof EC_LEVELS)[number];

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://tinytoolkit.com");
  const [size, setSize] = useState(256);
  const [ecLevel, setEcLevel] = useState<ECLevel>("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadPng = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = "qr-code.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  };

  return (
    <ToolPageShell
      toolId="qr-code-generator"
      title="QR Code Generator"
      description="Generate a QR code for any URL or text. Customise size, colours, and error correction. Download as PNG instantly."
      faqItems={FAQ_ITEMS}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">URL or Text</label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              data-testid="input-qr-text"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Size: <span className="text-primary font-mono">{size}px</span>
            </label>
            <input
              type="range" min={128} max={512} step={32} value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>128px</span><span>512px</span></div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Error Correction</label>
            <div className="flex gap-2">
              {EC_LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setEcLevel(l)}
                  className={`flex-1 py-1.5 rounded-lg border text-sm font-mono transition-colors ${ecLevel === l ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">L=Low · M=Medium · Q=Quartile · H=High</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1.5">Foreground</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent" />
                <span className="font-mono text-sm">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Background</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent" />
                <span className="font-mono text-sm">{bgColor}</span>
              </div>
            </div>
          </div>

          <Button onClick={downloadPng} disabled={!text.trim()} className="w-full" data-testid="button-download">
            <Download className="mr-2 h-4 w-4" /> Download PNG
          </Button>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center bg-muted/30 border border-border rounded-xl p-6">
          {text.trim() ? (
            <QRCodeSVG
              ref={svgRef}
              value={text}
              size={Math.min(size, 280)}
              level={ecLevel}
              fgColor={fgColor}
              bgColor={bgColor}
              data-testid="svg-qr-code"
            />
          ) : (
            <p className="text-muted-foreground text-sm">Enter text above to generate a QR code</p>
          )}
        </div>
      </div>
    </ToolPageShell>
  );
}
