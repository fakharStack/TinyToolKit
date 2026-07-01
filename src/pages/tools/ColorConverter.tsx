import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is HEX color format?", answer: "HEX (hexadecimal) is a 6-character code like #FF5733 used in HTML and CSS. Each pair of characters (R, G, B) represents a value from 00 to FF (0–255)." },
  { question: "What is RGB?", answer: "RGB specifies a color using three values (0–255) for Red, Green, and Blue. For example rgb(255, 87, 51) is the same orange as #FF5733." },
  { question: "What is HSL?", answer: "HSL stands for Hue (0–360°), Saturation (0–100%), and Lightness (0–100%). It is more intuitive than RGB because you can easily adjust brightness and vividness." },
  { question: "Which format should I use in CSS?", answer: "All three are valid in CSS. HSL is often preferred for theming because changing lightness alone creates tints and shades. HEX is most compact for hardcoded colors." },
];

// --- Conversion math ---
function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const n = parseInt(clean, 16);
  if (isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return [v, v, v];
  }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hue2rgb = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(hue2rgb(hn + 1 / 3) * 255), Math.round(hue2rgb(hn) * 255), Math.round(hue2rgb(hn - 1 / 3) * 255)];
}

function CopyBtn({ text }: { text: string }) {
  const { isCopied, copy } = useCopy();
  return (
    <button onClick={() => copy(text)} className="ml-auto text-muted-foreground hover:text-primary transition-colors">
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [error, setError] = useState("");

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(...rgb) : null;

  const handleHexChange = (v: string) => {
    setHex(v);
    setError(hexToRgb(v) ? "" : "Invalid HEX color");
  };
  const handleRgbChange = (r: string, g: string, b: string) => {
    const ri = parseInt(r), gi = parseInt(g), bi = parseInt(b);
    if ([ri, gi, bi].every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
      setHex(rgbToHex(ri, gi, bi));
      setError("");
    }
  };
  const handleHslChange = (h: string, s: string, l: string) => {
    const hi = parseInt(h), si = parseInt(s), li = parseInt(l);
    if (!isNaN(hi) && !isNaN(si) && !isNaN(li)) {
      const [r, g, b] = hslToRgb(hi, si, li);
      setHex(rgbToHex(r, g, b));
      setError("");
    }
  };

  const rgbStr = rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : "";
  const hslStr = hsl ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : "";

  return (
    <ToolPageShell
      toolId="color-converter"
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats instantly. Click any field to edit and all formats update in real time."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-6">
        {/* Swatch */}
        <div
          className="w-full h-28 rounded-2xl border border-border transition-colors duration-200 shadow-inner"
          style={{ backgroundColor: rgb ? hex : "#e5e7eb" }}
          data-testid="div-color-swatch"
        />

        {error && <p className="text-destructive text-sm">{error}</p>}

        {/* HEX */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">HEX</span>
            {rgb && <CopyBtn text={hex.toUpperCase()} />}
          </div>
          <Input
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="font-mono"
            placeholder="#000000"
            data-testid="input-hex"
          />
        </div>

        {/* RGB */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">RGB</span>
            {rgb && <CopyBtn text={rgbStr} />}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["R", "G", "B"].map((ch, i) => (
              <div key={ch}>
                <label className="text-xs text-muted-foreground">{ch}</label>
                <Input
                  type="number" min={0} max={255}
                  value={rgb ? rgb[i] : ""}
                  onChange={(e) => {
                    const vals = rgb ? [...rgb] : [0, 0, 0];
                    vals[i] = parseInt(e.target.value) || 0;
                    handleRgbChange(String(vals[0]), String(vals[1]), String(vals[2]));
                  }}
                  className="font-mono mt-1"
                  data-testid={`input-rgb-${ch.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
          {rgb && <p className="font-mono text-xs text-muted-foreground">{rgbStr}</p>}
        </div>

        {/* HSL */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">HSL</span>
            {hsl && <CopyBtn text={hslStr} />}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[["H", "°", 360], ["S", "%", 100], ["L", "%", 100]].map(([ch, unit, max], i) => (
              <div key={ch as string}>
                <label className="text-xs text-muted-foreground">{ch} ({unit})</label>
                <Input
                  type="number" min={0} max={max as number}
                  value={hsl ? hsl[i] : ""}
                  onChange={(e) => {
                    const vals = hsl ? [...hsl] : [0, 0, 0];
                    vals[i] = parseInt(e.target.value) || 0;
                    handleHslChange(String(vals[0]), String(vals[1]), String(vals[2]));
                  }}
                  className="font-mono mt-1"
                  data-testid={`input-hsl-${(ch as string).toLowerCase()}`}
                />
              </div>
            ))}
          </div>
          {hsl && <p className="font-mono text-xs text-muted-foreground">{hslStr}</p>}
        </div>
      </div>
    </ToolPageShell>
  );
}
