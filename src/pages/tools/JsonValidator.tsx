import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import type { FAQItem } from "@/components/FAQ";
import { cn } from "@/lib/utils";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is JSON validation?", answer: "JSON validation checks whether a string follows the JSON specification — correct syntax, properly quoted keys, balanced brackets, valid data types, and no trailing commas." },
  { question: "What are common JSON errors?", answer: "The most common mistakes are: trailing commas after the last item, using single quotes instead of double quotes, unquoted keys, and missing brackets or braces." },
  { question: "Does valid JSON mean correct data?", answer: "No. A JSON string can be syntactically valid but logically incorrect for your use case. Validation only checks the syntax." },
  { question: "Can I validate large JSON files?", answer: "Yes. This tool handles large JSON strings entirely in your browser — there is no size limit imposed by a server." },
];

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string; type?: string } | null>(null);

  const validate = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const type = Array.isArray(parsed) ? "Array" : typeof parsed === "object" && parsed !== null ? "Object" : typeof parsed;
      setResult({ valid: true, message: `Valid JSON — Root type: ${type}`, type });
    } catch (e: unknown) {
      setResult({ valid: false, message: e instanceof Error ? e.message : "Invalid JSON" });
    }
  };

  return (
    <ToolPageShell
      toolId="json-validator"
      title="JSON Validator"
      description="Validate any JSON string and get clear error messages pinpointing exactly what is wrong. Runs entirely in your browser."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1.5">JSON to Validate</p>
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setResult(null); }}
            placeholder={'{\n  "name": "TinyToolKit",\n  "free": true\n}'}
            className="min-h-[220px] resize-y font-mono text-sm"
            data-testid="textarea-input"
          />
        </div>

        <Button onClick={validate} disabled={!input.trim()} data-testid="button-validate">Validate JSON</Button>

        {result && (
          <div
            className={cn(
              "flex items-start gap-3 rounded-xl px-5 py-4 border text-sm",
              result.valid
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-destructive/10 border-destructive/20 text-destructive"
            )}
            data-testid="validation-result"
          >
            {result.valid
              ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-green-600" />
              : <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />}
            <div>
              <p className="font-semibold">{result.valid ? "Valid JSON" : "Invalid JSON"}</p>
              <p className="font-mono mt-1 text-xs opacity-80">{result.message}</p>
            </div>
          </div>
        )}

        <Button variant="outline" onClick={() => { setInput(""); setResult(null); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
