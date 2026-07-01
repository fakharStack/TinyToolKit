import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export function useCopy(successMessage = "Copied to clipboard!") {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        toast({ title: successMessage });
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        toast({ variant: "destructive", title: "Copy failed", description: "Please copy manually." });
      }
    },
    [toast, successMessage]
  );

  return { isCopied, copy };
}
