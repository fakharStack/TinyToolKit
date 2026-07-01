import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw, AlertCircle } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds (or milliseconds) that have elapsed since 00:00:00 UTC on 1 January 1970 (the Unix epoch). It is a universal, timezone-independent way to represent a moment in time." },
  { question: "How do I know if my timestamp is in seconds or milliseconds?", answer: "Timestamps in seconds are around 10 digits (e.g. 1735689600). Timestamps in milliseconds are around 13 digits (e.g. 1735689600000). This tool auto-detects which one you entered." },
  { question: "What is UTC vs local time?", answer: "UTC is the reference timezone with no offset. Local time is adjusted to your device's timezone. For example, UTC 2026-01-01 00:00 might be 2025-12-31 19:00 in New York (EST, UTC-5)." },
  { question: "What is ISO 8601?", answer: "ISO 8601 is an international date/time format like 2026-01-01T00:00:00.000Z. The trailing Z means UTC. It is widely used in APIs and databases." },
];

function CopyBtn({ text }: { text: string }) {
  const { isCopied, copy } = useCopy();
  return (
    <button onClick={() => copy(text)} className="text-muted-foreground hover:text-primary transition-colors">
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0">
      <span className="text-sm text-muted-foreground w-40 shrink-0">{label}</span>
      <span className="font-mono text-sm flex-1 text-right mr-3">{value}</span>
      <CopyBtn text={value} />
    </div>
  );
}

function getResults(rawInput: string): { rows: { label: string; value: string }[]; error: string } {
  if (!rawInput.trim()) return { rows: [], error: "" };

  let ms: number;

  // Try as Unix timestamp (number)
  const num = parseFloat(rawInput.trim());
  if (!isNaN(num) && /^-?\d+$/.test(rawInput.trim())) {
    // auto-detect seconds vs ms
    ms = Math.abs(num) > 1e10 ? num : num * 1000;
  } else {
    // Try as date string
    const parsed = Date.parse(rawInput.trim());
    if (isNaN(parsed)) return { rows: [], error: "Cannot parse. Enter a Unix timestamp or a date string like 2026-01-01T00:00:00Z" };
    ms = parsed;
  }

  const d = new Date(ms);
  if (isNaN(d.getTime())) return { rows: [], error: "Invalid date" };

  const sec = Math.floor(ms / 1000);

  return {
    rows: [
      { label: "Unix (seconds)", value: String(sec) },
      { label: "Unix (milliseconds)", value: String(ms) },
      { label: "ISO 8601", value: d.toISOString() },
      { label: "UTC", value: d.toUTCString() },
      { label: "Local time", value: d.toLocaleString() },
      { label: "Date only (UTC)", value: d.toISOString().slice(0, 10) },
      { label: "Time only (UTC)", value: d.toISOString().slice(11, 19) },
      { label: "Day of week", value: d.toLocaleDateString("en-US", { weekday: "long" }) },
    ],
    error: "",
  };
}

export default function TimestampConverter() {
  const [input, setInput] = useState(String(Math.floor(Date.now() / 1000)));
  const { rows, error } = getResults(input);

  const setNow = () => setInput(String(Math.floor(Date.now() / 1000)));

  return (
    <ToolPageShell
      toolId="timestamp-converter"
      title="Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates (UTC, local, ISO 8601) and back. Auto-detects seconds vs milliseconds."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1.5">Unix Timestamp or Date String</label>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 1735689600 or 2026-01-01T00:00:00Z"
              className="font-mono"
              data-testid="input-timestamp"
            />
            <Button variant="outline" onClick={setNow} data-testid="button-now" title="Use current time">
              <RefreshCw className="h-4 w-4 mr-1" /> Now
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Enter a Unix timestamp (seconds or ms) or any recognisable date string.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />{error}
          </div>
        )}

        {rows.length > 0 && (
          <div className="bg-card border border-border rounded-xl px-5 py-2" data-testid="div-results">
            {rows.map((r) => <Row key={r.label} label={r.label} value={r.value} />)}
          </div>
        )}
      </div>
    </ToolPageShell>
  );
}
