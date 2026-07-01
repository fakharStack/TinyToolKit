import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is JSON formatting?", answer: "JSON formatting (also called pretty-printing) adds consistent indentation and line breaks to minified or compressed JSON, making it easy to read and navigate." },
  { question: "What indentation level should I use?", answer: "2 spaces is the most common convention for JSON files. 4 spaces is preferred in some codebases. Tab indentation is used in some editors." },
  { question: "Will formatting change my data?", answer: "No. Formatting only changes whitespace. The data structure, keys, and values remain identical." },
  { question: "Can I minify JSON instead of formatting it?", answer: "Yes, use the Minify button to remove all whitespace and produce the smallest possible JSON string — useful for reducing file size." },
];

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const { isCopied, copy } = useCopy();

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <ToolPageShell
      toolId="json-formatter"
      title="JSON Formatter"
      description="Paste any JSON string and format it with proper indentation for easy reading. Also supports JSON minification."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1.5">JSON Input</p>
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); setOutput(""); }}
            placeholder={'{"name":"TinyToolKit","free":true,"tools":18}'}
            className="min-h-[180px] resize-y font-mono text-sm"
            data-testid="textarea-input"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={format} disabled={!input.trim()} data-testid="button-format">Format JSON</Button>
          <Button onClick={minify} disabled={!input.trim()} variant="outline" data-testid="button-minify">Minify</Button>
          <div className="flex items-center gap-2 text-sm ml-auto">
            <span className="text-muted-foreground">Indent:</span>
            {[2, 4].map((n) => (
              <button
                key={n}
                onClick={() => setIndent(n)}
                className={`px-2.5 py-1 rounded border text-xs font-mono transition-colors ${indent === n ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="font-mono">{error}</span>
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" /> Valid JSON — Formatted
              </div>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[250px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setError(""); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
