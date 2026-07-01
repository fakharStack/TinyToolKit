import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "Is the sort alphabetical?", answer: "Yes, the A-Z and Z-A sorts are alphabetical (lexicographic), meaning numbers come before letters and uppercase may sort differently from lowercase depending on the 'case-sensitive' setting." },
  { question: "What does 'Reverse' do?", answer: "Reverse flips the order of your lines — the last line becomes the first and vice versa. It does not sort alphabetically." },
  { question: "What does 'Shuffle' do?", answer: "Shuffle randomly reorders your lines. Each click produces a different random order." },
  { question: "What is this useful for?", answer: "Sorting word lists, CSV rows, email lists, to-do items, or any line-based content you want in a different order." },
];

export default function LineSorter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { isCopied, copy } = useCopy();

  const sort = (fn: (lines: string[]) => string[]) => {
    const lines = input.split("\n");
    setOutput(fn(lines).join("\n"));
  };

  const sortAZ = () =>
    sort((lines) => [...lines].sort((a, b) => caseSensitive ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase())));
  const sortZA = () =>
    sort((lines) => [...lines].sort((a, b) => caseSensitive ? b.localeCompare(a) : b.toLowerCase().localeCompare(a.toLowerCase())));
  const reverse = () => sort((lines) => [...lines].reverse());
  const shuffle = () =>
    sort((lines) => {
      const arr = [...lines];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });

  return (
    <ToolPageShell
      toolId="line-sorter"
      title="Line Sorter"
      description="Sort lines alphabetically A-Z or Z-A, reverse order, or shuffle them randomly. Works on any line-based text."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Banana\nApple\nCherry\nDate"}
          className="min-h-[200px] resize-y font-mono text-sm"
          data-testid="textarea-input"
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={sortAZ} disabled={!input.trim()} data-testid="button-sort-az">Sort A–Z</Button>
          <Button onClick={sortZA} disabled={!input.trim()} variant="outline" data-testid="button-sort-za">Sort Z–A</Button>
          <Button onClick={reverse} disabled={!input.trim()} variant="outline" data-testid="button-reverse">Reverse</Button>
          <Button onClick={shuffle} disabled={!input.trim()} variant="outline" data-testid="button-shuffle">Shuffle</Button>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none ml-2">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
            Case-sensitive
          </label>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Result</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
              </Button>
            </div>
            <Textarea value={output} readOnly className="min-h-[200px] resize-y bg-muted/30 font-mono text-sm" data-testid="textarea-output" />
          </div>
        )}
        <Button variant="outline" onClick={() => { setInput(""); setOutput(""); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
