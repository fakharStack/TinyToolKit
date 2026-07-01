import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is camelCase?", answer: "camelCase joins words without spaces, capitalizing the first letter of each word except the first: e.g. myVariableName." },
  { question: "What is snake_case?", answer: "snake_case joins words with underscores in all lowercase: e.g. my_variable_name. Common in Python and database column names." },
  { question: "What is kebab-case?", answer: "kebab-case joins words with hyphens in all lowercase: e.g. my-variable-name. Common in URLs and CSS class names." },
  { question: "What is Title Case?", answer: "Title Case capitalizes the first letter of every word: e.g. The Quick Brown Fox." },
];

function toTitleCase(s: string) {
  return s.toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
}
function toSentenceCase(s: string) {
  return s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}
function toCamelCase(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}
function toSnakeCase(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
function toKebabCase(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CASES = [
  { label: "UPPER CASE", fn: (s: string) => s.toUpperCase() },
  { label: "lower case", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: toTitleCase },
  { label: "Sentence case", fn: toSentenceCase },
  { label: "camelCase", fn: toCamelCase },
  { label: "snake_case", fn: toSnakeCase },
  { label: "kebab-case", fn: toKebabCase },
];

export default function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { isCopied, copy } = useCopy();

  const convert = (fn: (s: string) => string) => setOutput(fn(input));

  return (
    <ToolPageShell
      toolId="text-case-converter"
      title="Text Case Converter"
      description="Convert text between UPPER CASE, lower case, Title Case, Sentence case, camelCase, snake_case, and kebab-case."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="min-h-[150px] resize-y"
          data-testid="textarea-input"
        />

        <div className="flex flex-wrap gap-2">
          {CASES.map((c) => (
            <Button
              key={c.label}
              variant="outline"
              size="sm"
              onClick={() => convert(c.fn)}
              data-testid={`button-case-${c.label.replace(/\s/g, "-").toLowerCase()}`}
            >
              {c.label}
            </Button>
          ))}
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Result</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[150px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
