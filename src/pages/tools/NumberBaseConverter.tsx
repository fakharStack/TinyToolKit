import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is binary (base 2)?", answer: "Binary uses only 0 and 1. It is the native language of computers. For example, the number 10 in decimal is 1010 in binary." },
  { question: "What is octal (base 8)?", answer: "Octal uses digits 0–7. It is sometimes used in Unix file permissions (e.g. chmod 755). The number 10 in decimal is 12 in octal." },
  { question: "What is hexadecimal (base 16)?", answer: "Hex uses digits 0–9 and letters A–F. It is widely used for memory addresses, colour codes, and encoding. The number 255 in decimal is FF in hex." },
  { question: "What is the maximum number this tool handles?", answer: "The tool uses JavaScript's safe integer range (up to 2^53 - 1). For very large numbers in cryptography or low-level systems, a BigInt-capable tool is needed." },
];

const BASES = [
  { label: "Decimal", short: "Dec", base: 10, prefix: "", pattern: /^-?[0-9]*$/ },
  { label: "Binary", short: "Bin", base: 2, prefix: "0b", pattern: /^[01]*$/ },
  { label: "Octal", short: "Oct", base: 8, prefix: "0o", pattern: /^[0-7]*$/ },
  { label: "Hexadecimal", short: "Hex", base: 16, prefix: "0x", pattern: /^[0-9a-fA-F]*$/ },
];

function CopyBtn({ text }: { text: string }) {
  const { isCopied, copy } = useCopy();
  return (
    <button onClick={() => copy(text)} className="text-muted-foreground hover:text-primary transition-colors p-1">
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export default function NumberBaseConverter() {
  const [values, setValues] = useState<Record<string, string>>({ "10": "", "2": "", "8": "", "16": "" });
  const [error, setError] = useState("");

  const handleChange = (base: number, raw: string) => {
    const entry = BASES.find((b) => b.base === base)!;
    if (raw !== "" && !entry.pattern.test(raw)) return;
    setError("");

    if (raw === "" || raw === "-") {
      setValues({ "10": raw === "-" ? "-" : "", "2": "", "8": "", "16": "" });
      return;
    }

    const decimal = parseInt(raw, base);
    if (isNaN(decimal) || !isFinite(decimal)) {
      setError("Invalid number");
      return;
    }

    setValues({
      "10": decimal.toString(10),
      "2": decimal.toString(2),
      "8": decimal.toString(8),
      "16": decimal.toString(16).toUpperCase(),
    });
  };

  return (
    <ToolPageShell
      toolId="number-base-converter"
      title="Number Base Converter"
      description="Convert numbers between decimal, binary, octal, and hexadecimal instantly. Edit any field and the rest update automatically."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        {error && <p className="text-destructive text-sm">{error}</p>}

        {BASES.map(({ label, short, base, prefix }) => (
          <div key={base} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-semibold text-sm">{label}</span>
                <span className="text-xs text-muted-foreground ml-2">Base {base}</span>
              </div>
              {values[String(base)] && <CopyBtn text={values[String(base)]} />}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground shrink-0 w-6">{prefix || ""}</span>
              <Input
                value={values[String(base)]}
                onChange={(e) => handleChange(base, e.target.value)}
                placeholder={`Enter ${short} value`}
                className="font-mono"
                data-testid={`input-base-${base}`}
              />
            </div>
          </div>
        ))}
      </div>
    </ToolPageShell>
  );
}
