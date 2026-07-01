import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is CSV?", answer: "CSV (Comma-Separated Values) is a plain-text format for tabular data. Each line is a row and each column is separated by a comma (or another delimiter like semicolon or tab)." },
  { question: "Does the first row need to be headers?", answer: "By default yes — the tool uses the first row as the JSON keys. You can disable this if your CSV has no header row." },
  { question: "Does this handle quoted fields with commas?", answer: "Yes. Fields wrapped in double quotes (e.g. \"Smith, John\") are handled correctly, including escaped quotes inside them." },
  { question: "What delimiter options are supported?", answer: "Comma (,), semicolon (;), and tab (\\t) are the most common. Select the delimiter that matches your file." },
];

type Delimiter = "," | ";" | "\t";

function parseCsv(csv: string, delimiter: Delimiter, hasHeaders: boolean): Record<string, string>[] {
  const parseRow = (line: string): string[] => {
    const fields: string[] = [];
    let cur = "", inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === delimiter && !inQuotes) {
        fields.push(cur); cur = "";
      } else {
        cur += ch;
      }
    }
    fields.push(cur);
    return fields;
  };

  const rows = csv.trim().split(/\r?\n/).map(parseRow);
  if (rows.length === 0) return [];

  if (!hasHeaders) {
    return rows.map((row) => {
      const obj: Record<string, string> = {};
      row.forEach((val, i) => { obj[`col${i + 1}`] = val.trim(); });
      return obj;
    });
  }

  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = (row[i] ?? "").trim(); });
    return obj;
  });
}

const SAMPLE = `name,age,city
Alice,30,New York
Bob,25,London
Carol,35,Tokyo`;

export default function CsvToJson() {
  const [input, setInput] = useState(SAMPLE);
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { isCopied, copy } = useCopy();

  const convert = () => {
    try {
      const result = parseCsv(input, delimiter, hasHeaders);
      setOutput(JSON.stringify(result, null, 2));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  return (
    <ToolPageShell
      toolId="csv-to-json"
      title="CSV to JSON Converter"
      description="Convert CSV data to a clean JSON array instantly. Supports custom delimiters and optional header row. Runs in your browser."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Delimiter:</label>
            {([",", ";", "\t"] as Delimiter[]).map((d) => (
              <button
                key={d}
                onClick={() => setDelimiter(d)}
                className={`px-3 py-1 rounded border text-sm font-mono transition-colors ${delimiter === d ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
              >
                {d === "\t" ? "Tab" : d}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={hasHeaders} onChange={(e) => setHasHeaders(e.target.checked)} className="rounded" />
            First row is headers
          </label>
        </div>

        <Textarea value={input} onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
          className="min-h-[180px] resize-y font-mono text-sm" placeholder="Paste CSV here..." data-testid="textarea-input" />

        <Button onClick={convert} disabled={!input.trim()} data-testid="button-convert">Convert to JSON</Button>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />{error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold">JSON Output</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[220px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setError(""); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
