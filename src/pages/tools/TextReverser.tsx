import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What does 'Reverse Characters' do?", answer: "It reverses every character in the entire text, so the last character becomes the first. The full string is flipped." },
  { question: "What does 'Reverse Words' do?", answer: "It reverses the order of words but keeps each word's spelling intact. 'Hello World' becomes 'World Hello'." },
  { question: "What does 'Reverse Lines' do?", answer: "Each line is kept intact but the line order is reversed — the last line becomes the first." },
  { question: "What is this used for?", answer: "Fun messages, mirror text, obfuscating text, word puzzles, and testing text parsing code." },
];

export default function TextReverser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { isCopied, copy } = useCopy();

  const reverseChars = () => setOutput(input.split("").reverse().join(""));
  const reverseWords = () => setOutput(input.split(/\s+/).reverse().join(" "));
  const reverseLines = () => setOutput(input.split("\n").reverse().join("\n"));

  return (
    <ToolPageShell
      toolId="text-reverser"
      title="Text Reverser"
      description="Reverse characters, words, or lines in any text. Great for mirror text, fun messages, and text puzzles."
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
          <Button onClick={reverseChars} disabled={!input} data-testid="button-reverse-chars">Reverse Characters</Button>
          <Button onClick={reverseWords} disabled={!input} variant="outline" data-testid="button-reverse-words">Reverse Words</Button>
          <Button onClick={reverseLines} disabled={!input} variant="outline" data-testid="button-reverse-lines">Reverse Lines</Button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Result</p>
              <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
                {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
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
