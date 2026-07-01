import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "How random is the generated password?", answer: "The tool uses the browser's built-in crypto.getRandomValues() API, which produces cryptographically strong random numbers — far better than Math.random()." },
  { question: "Is my password saved or sent anywhere?", answer: "No. Passwords are generated locally in your browser. Nothing is sent to any server." },
  { question: "What is a good password length?", answer: "Security experts recommend at least 16 characters for important accounts. Longer is always better." },
  { question: "Should I include all character types?", answer: "Yes. Using uppercase, lowercase, numbers, and symbols significantly increases the number of possible combinations and makes the password much harder to crack." },
];

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(length: number, opts: Record<string, boolean>): string {
  const pool = Object.entries(CHARS)
    .filter(([k]) => opts[k])
    .map(([, v]) => v)
    .join("");
  if (!pool) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => pool[n % pool.length]).join("");
}

function strength(pwd: string): { label: string; color: string; width: string } {
  if (!pwd) return { label: "", color: "bg-muted", width: "0%" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-destructive", width: "20%" };
  if (score <= 3) return { label: "Fair", color: "bg-yellow-500", width: "60%" };
  return { label: "Strong", color: "bg-green-500", width: "100%" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState(() => generatePassword(16, { uppercase: true, lowercase: true, numbers: true, symbols: true }));
  const { isCopied, copy } = useCopy();

  const generate = useCallback(() => setPassword(generatePassword(length, opts)), [length, opts]);

  const toggleOpt = (key: string) => setOpts((prev) => {
    const next = { ...prev, [key]: !prev[key as keyof typeof prev] };
    if (!Object.values(next).some(Boolean)) return prev;
    return next;
  });

  const str = strength(password);

  return (
    <ToolPageShell
      toolId="password-generator"
      title="Password Generator"
      description="Generate strong, random passwords with custom length and character options. Uses cryptographically secure randomness."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-5">
        {/* Generated password display */}
        <div className="bg-muted/40 border border-border rounded-xl p-4">
          <div className="flex items-center gap-2">
            <Input
              value={password}
              readOnly
              className="font-mono text-base tracking-widest bg-transparent border-none shadow-none px-0 flex-1"
              data-testid="input-password"
            />
            <Button size="icon" variant="ghost" onClick={() => copy(password)} data-testid="button-copy">
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={generate} data-testid="button-refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          {/* Strength bar */}
          <div className="mt-3 space-y-1">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${str.color} rounded-full transition-all duration-300`} style={{ width: str.width }} />
            </div>
            {str.label && <p className="text-xs text-muted-foreground">Strength: <span className="font-medium">{str.label}</span></p>}
          </div>
        </div>

        {/* Length */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Length</label>
            <span className="text-sm font-mono text-primary">{length}</span>
          </div>
          <input
            type="range" min={4} max={64} value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
            data-testid="slider-length"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>4</span><span>64</span></div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(CHARS) as Array<keyof typeof CHARS>).map((key) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                checked={opts[key]}
                onChange={() => toggleOpt(key)}
                className="rounded accent-primary"
                data-testid={`checkbox-${key}`}
              />
              <span className="text-sm capitalize font-medium">{key}</span>
              <span className="text-xs text-muted-foreground font-mono ml-auto">{CHARS[key].slice(0, 6)}…</span>
            </label>
          ))}
        </div>

        <Button onClick={generate} className="w-full" size="lg" data-testid="button-generate">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate New Password
        </Button>
      </div>
    </ToolPageShell>
  );
}
