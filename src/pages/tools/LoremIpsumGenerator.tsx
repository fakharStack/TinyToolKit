import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is placeholder text derived from Cicero's 'de Finibus Bonorum et Malorum' (45 BC). It has been the industry standard dummy text for typesetting and design since the 1500s." },
  { question: "Why do designers use Lorem Ipsum?", answer: "It mimics the distribution of letters and word lengths in natural language, making layouts look realistic without distracting readable content during the design phase." },
  { question: "Can I generate just a few words?", answer: "Yes. Switch the type to 'Words' and enter how many words you need. The tool also supports sentences and paragraphs." },
  { question: "Will the generated text always start with 'Lorem ipsum'?", answer: "Only when generating paragraphs. For words or sentences only, the classic opening phrase may or may not appear depending on the count." },
];

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function randomWords(n: number) {
  const arr: string[] = [];
  for (let i = 0; i < n; i++) arr.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  return arr.join(" ");
}

function makeSentence() {
  const len = Math.floor(Math.random() * 10) + 6;
  const w = randomWords(len);
  return w.charAt(0).toUpperCase() + w.slice(1) + ".";
}

function makeParagraph() {
  const count = Math.floor(Math.random() * 4) + 4;
  return Array.from({ length: count }, makeSentence).join(" ");
}

function generate(type: string, count: number, startWithLorem: boolean): string {
  if (type === "words") {
    const w = randomWords(count);
    return startWithLorem ? "Lorem ipsum " + w : w;
  }
  if (type === "sentences") {
    const sentences = Array.from({ length: count }, makeSentence);
    if (startWithLorem) sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    return sentences.join(" ");
  }
  const paras = Array.from({ length: count }, makeParagraph);
  if (startWithLorem) paras[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return paras.join("\n\n");
}

export default function LoremIpsumGenerator() {
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [startLorem, setStartLorem] = useState(true);
  const [output, setOutput] = useState(() => generate("paragraphs", 3, true));
  const { isCopied, copy } = useCopy();

  const gen = () => setOutput(generate(type, count, startLorem));

  return (
    <ToolPageShell
      toolId="lorem-ipsum-generator"
      title="Lorem Ipsum Generator"
      description="Generate Lorem Ipsum placeholder text by words, sentences, or paragraphs. Instant, free, and runs in your browser."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-sm font-medium block mb-1.5">Type</label>
            <div className="flex gap-1">
              {["words", "sentences", "paragraphs"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-lg border text-sm capitalize transition-colors ${type === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
                  data-testid={`button-type-${t}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Count</label>
            <input
              type="number" min={1} max={50} value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
              className="w-20 border border-border rounded-lg px-3 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary/30"
              data-testid="input-count"
            />
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer select-none pb-1.5">
            <input type="checkbox" checked={startLorem} onChange={(e) => setStartLorem(e.target.checked)} className="rounded" />
            Start with "Lorem ipsum"
          </label>

          <Button onClick={gen} className="pb-[6px]" data-testid="button-generate">
            <RefreshCw className="mr-2 h-4 w-4" /> Generate
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-sm font-medium">Generated Text</p>
            <Button size="sm" variant="ghost" onClick={() => copy(output)} data-testid="button-copy">
              {isCopied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
            </Button>
          </div>
          <Textarea value={output} readOnly className="min-h-[280px] resize-y bg-muted/30 text-sm leading-relaxed" data-testid="textarea-output" />
        </div>
      </div>
    </ToolPageShell>
  );
}
