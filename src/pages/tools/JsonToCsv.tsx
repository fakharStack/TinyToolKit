import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle, Download } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What JSON structure does this expect?", answer: "An array of objects where each object is a row. All objects should share the same keys, which become the CSV column headers." },
  { question: "What if objects have different keys?", answer: "The tool uses the union of all keys as headers. Missing values for a key will produce an empty cell for that row." },
  { question: "How are commas inside values handled?", answer: "Any field containing a comma, double quote, or newline is automatically wrapped in double quotes to produce valid CSV." },
  { question: "Can I open the result in Excel?", answer: "Yes. Save the CSV file and open it in Excel or Google Sheets. If you see special characters, make sure to import with UTF-8 encoding." },
];

type Delimiter = "," | ";" | "\t";

function jsonToCsv(jsonStr: string, delimiter: Delimiter): string {
  const data = JSON.parse(jsonStr);
  if (!Array.isArray(data)) throw new Error("JSON must be an array of objects");
  if (data.length === 0) return "";

  const headers = Array.from(new Set(data.flatMap((row) => Object.keys(row))));

  const escape = (val: unknown): string => {
    const s = val === null || val === undefined ? "" : String(val);
    if (s.includes(delimiter) || s.includes('"') || s.includes("\n")) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const rows = [
    headers.map(escape).join(delimiter),
    ...data.map((row) => headers.map((h) => escape((row as Record<string, unknown>)[h])).join(delimiter)),
  ];
  return rows.join("\n");
}

const SAMPLE = `[
  {"name": "Alice", "age": 30, "city": "New York"},
  {"name": "Bob", "age": 25, "city": "London"},
  {"name": "Carol", "age": 35, "city": "Tokyo"}
]`;

export default function JsonToCsv() {
  const [input, setInput] = useState(SAMPLE);
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { isCopied, copy } = useCopy();

  const convert = () => {
    try {
      setOutput(jsonToCsv(input, delimiter));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.csv";
    a.click();
  };

  return (
    <ToolPageShell
      toolId="json-to-csv"
      title="JSON to CSV Converter"
      description="Convert a JSON array of objects to a CSV spreadsheet. Choose your delimiter and download or copy the result instantly."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
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

        <Textarea value={input} onChange={(e) => { setInput(e.target.value); setOutput(""); setError(""); }}
          className="min-h-[180px] resize-y font-mono text-sm" placeholder='[{"key": "value"}]' data-testid="textarea-input" />

        <Button onClick={convert} disabled={!input.trim()} data-testid="button-convert">Convert to CSV</Button>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />{error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold">CSV Output</p>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                  {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
                </Button>
                <Button size="sm" variant="ghost" onClick={download} data-testid="button-download">
                  <Download className="h-4 w-4 mr-1" />Download
                </Button>
              </div>
            </div>
            <Textarea value={output} readOnly className="min-h-[200px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setError(""); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
