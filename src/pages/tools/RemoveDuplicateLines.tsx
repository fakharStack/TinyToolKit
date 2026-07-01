import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "Does this preserve the original line order?", answer: "Yes. The tool keeps the first occurrence of each line and removes subsequent duplicates, preserving the original order." },
  { question: "Is the comparison case-sensitive?", answer: "The default comparison is case-sensitive. 'Hello' and 'hello' are treated as different lines." },
  { question: "Are blank lines removed too?", answer: "No, blank lines are kept by default. Use the Remove Blank Lines tool if you also want to strip empty lines." },
  { question: "What is this useful for?", answer: "Great for cleaning up lists, email addresses, keywords, log files, and any text that may contain repeated entries." },
];

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [removedCount, setRemovedCount] = useState<number | null>(null);
  const { isCopied, copy } = useCopy();

  const process = () => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    const unique = lines.filter((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setOutput(unique.join("\n"));
    setRemovedCount(lines.length - unique.length);
  };

  return (
    <ToolPageShell
      toolId="remove-duplicate-lines"
      title="Remove Duplicate Lines"
      description="Paste any list or text and remove all duplicate lines instantly, keeping only the first occurrence of each unique line."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Paste lines here...\nDuplicate line\nUnique line\nDuplicate line"}
          className="min-h-[200px] resize-y font-mono text-sm"
          data-testid="textarea-input"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={process} disabled={!input.trim()} data-testid="button-remove-dupes">
            Remove Duplicates
          </Button>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded"
              data-testid="checkbox-case-sensitive"
            />
            Case-sensitive
          </label>
          {removedCount !== null && (
            <span className="text-sm text-muted-foreground">
              Removed <strong className="text-primary">{removedCount}</strong> duplicate{removedCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Result</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[200px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}

        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setRemovedCount(null); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
