import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ToolPageShell from "@/components/ToolPageShell";
import type { FAQItem } from "@/components/FAQ";
import { cn } from "@/lib/utils";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What does the Diff Checker do?", answer: "It compares two blocks of text line by line and highlights which lines were added, removed, or are the same. Green lines exist only in the right text; red lines exist only in the left text." },
  { question: "Is the comparison case-sensitive?", answer: "Yes by default. Lines that differ only by capitalisation are shown as removed/added. You can disable this with the case-sensitive toggle." },
  { question: "What is this useful for?", answer: "Comparing code versions, checking document revisions, spotting differences between two config files, or verifying that a copy matches the original." },
  { question: "Does this show word-level differences?", answer: "This tool does line-level diffing. Each changed line is shown in full as removed or added. For character-level diff, a dedicated code diff viewer is needed." },
];

type DiffLine = { type: "same" | "added" | "removed"; text: string; lineA?: number; lineB?: number };

function diffLines(a: string, b: string, caseSensitive: boolean): DiffLine[] {
  const la = a.split("\n");
  const lb = b.split("\n");
  const m = la.length, n = lb.length;
  const key = (s: string) => (caseSensitive ? s : s.toLowerCase());

  // LCS DP table (space-optimised won't work for backtracking — keep full)
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = key(la[i - 1]) === key(lb[j - 1]) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);

  const result: DiffLine[] = [];
  let i = m, j = n, ai = 1, bi = 1;
  const seq: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && key(la[i - 1]) === key(lb[j - 1])) {
      seq.unshift({ type: "same", text: la[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      seq.unshift({ type: "added", text: lb[j - 1] });
      j--;
    } else {
      seq.unshift({ type: "removed", text: la[i - 1] });
      i--;
    }
  }
  // assign line numbers
  for (const line of seq) {
    if (line.type === "same") { line.lineA = ai++; line.lineB = bi++; }
    else if (line.type === "removed") { line.lineA = ai++; }
    else { line.lineB = bi++; }
    result.push(line);
  }
  return result;
}

export default function DiffChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const compare = () => setDiff(diffLines(textA, textB, caseSensitive));
  const added = diff?.filter((l) => l.type === "added").length ?? 0;
  const removed = diff?.filter((l) => l.type === "removed").length ?? 0;

  return (
    <ToolPageShell
      toolId="diff-checker"
      title="Diff Checker"
      description="Paste two blocks of text and instantly see which lines were added, removed, or unchanged. Great for comparing code and documents."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-1.5">Original (A)</p>
            <Textarea
              value={textA}
              onChange={(e) => { setTextA(e.target.value); setDiff(null); }}
              placeholder="Paste original text here..."
              className="min-h-[200px] resize-y font-mono text-sm"
              data-testid="textarea-a"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-1.5">Modified (B)</p>
            <Textarea
              value={textB}
              onChange={(e) => { setTextB(e.target.value); setDiff(null); }}
              placeholder="Paste modified text here..."
              className="min-h-[200px] resize-y font-mono text-sm"
              data-testid="textarea-b"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={compare} disabled={!textA && !textB} data-testid="button-compare">Compare</Button>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
            Case-sensitive
          </label>
          {diff && (
            <div className="flex gap-3 ml-auto text-sm">
              <span className="text-green-700 font-medium">+{added} added</span>
              <span className="text-red-700 font-medium">−{removed} removed</span>
            </div>
          )}
        </div>

        {diff && (
          <div className="border border-border rounded-xl overflow-hidden text-sm font-mono" data-testid="div-diff-output">
            {diff.length === 0 && (
              <div className="px-4 py-6 text-center text-muted-foreground">No differences found — texts are identical.</div>
            )}
            {diff.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-2 px-4 py-1 border-b border-border/40 last:border-0",
                  line.type === "added" && "bg-green-50 text-green-900",
                  line.type === "removed" && "bg-red-50 text-red-900",
                  line.type === "same" && "bg-card text-foreground"
                )}
              >
                <span className="shrink-0 w-4 text-xs opacity-50 mt-0.5">
                  {line.type === "added" ? "+" : line.type === "removed" ? "−" : " "}
                </span>
                <span className="w-10 text-xs text-muted-foreground shrink-0 text-right select-none">
                  {line.lineA ?? ""}
                </span>
                <span className="w-10 text-xs text-muted-foreground shrink-0 text-right select-none">
                  {line.lineB ?? ""}
                </span>
                <span className="flex-1 break-all whitespace-pre-wrap">{line.text || " "}</span>
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" onClick={() => { setTextA(""); setTextB(""); setDiff(null); }} data-testid="button-clear">Clear</Button>
      </div>
    </ToolPageShell>
  );
}
