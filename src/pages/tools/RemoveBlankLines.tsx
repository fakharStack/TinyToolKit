import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What counts as a blank line?", answer: "Any line that is empty or contains only whitespace characters (spaces, tabs) is considered blank and will be removed." },
  { question: "Will this remove all formatting?", answer: "Only blank/empty lines are removed. Lines with content are left exactly as they are, preserving all formatting and indentation." },
  { question: "Can I also trim leading and trailing spaces per line?", answer: "Enable the 'Trim each line' option to strip leading and trailing whitespace from every line as well." },
  { question: "What is this useful for?", answer: "Useful for cleaning up code, pasted content, log files, and CSV data that has unwanted empty rows." },
];

export default function RemoveBlankLines() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [trimLines, setTrimLines] = useState(false);
  const [removedCount, setRemovedCount] = useState<number | null>(null);
  const { isCopied, copy } = useCopy();

  const process = () => {
    const lines = input.split("\n");
    const filtered = lines.filter((line) => {
      const l = trimLines ? line.trim() : line;
      return l !== "";
    });
    const result = trimLines ? filtered.map((l) => l.trim()).join("\n") : filtered.join("\n");
    setOutput(result);
    setRemovedCount(lines.length - filtered.length);
  };

  return (
    <ToolPageShell
      toolId="remove-blank-lines"
      title="Remove Blank Lines"
      description="Strip all empty and blank lines from your text in one click, keeping all content lines intact."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Line one\n\nLine two\n\n\nLine three"}
          className="min-h-[200px] resize-y font-mono text-sm"
          data-testid="textarea-input"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={process} disabled={!input} data-testid="button-remove-blanks">
            Remove Blank Lines
          </Button>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded"
              data-testid="checkbox-trim"
            />
            Trim each line
          </label>
          {removedCount !== null && (
            <span className="text-sm text-muted-foreground">
              Removed <strong className="text-primary">{removedCount}</strong> blank line{removedCount !== 1 ? "s" : ""}
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
