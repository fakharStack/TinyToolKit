import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, Bold, Italic, Strikethrough, Code, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AdContainer from "@/components/AdContainer";
import { Card, CardContent } from "@/components/ui/card";

export default function WhatsAppMessageFormatter() {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormatting = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    let newText = "";
    if (start !== end) {
      // Wrap selection
      const selected = text.substring(start, end);
      newText = text.substring(0, start) + prefix + selected + suffix + text.substring(end);
    } else {
      // Append to the end if no selection
      newText = text + prefix + "text" + suffix;
    }

    setText(newText);
    
    // Focus back on textarea
    setTimeout(() => {
      textarea.focus();
      // Try to select the inserted placeholder text if we appended
      if (start === end) {
        textarea.setSelectionRange(text.length + prefix.length, text.length + prefix.length + 4);
      }
    }, 0);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: "Text copied!",
        description: "Ready to paste into WhatsApp.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
      });
    }
  };

  // Basic markdown parser for live preview
  const renderPreview = (content: string) => {
    if (!content) return <span className="text-muted-foreground italic">Your preview will appear here...</span>;

    // A very simple regex parser for demonstration.
    // In a real robust app, a proper markdown parser might be better, 
    // but WhatsApp's flavor is unique and simple.
    
    let html = content
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>")
      .replace(/```([\s\S]*?)```/g, "<code>$1</code>") // Monospace
      .replace(/\*([^\*]+)\*/g, "<strong>$1</strong>") // Bold
      .replace(/_([^_]+)_/g, "<em>$1</em>")             // Italic
      .replace(/~([^~]+)~/g, "<s>$1</s>");             // Strikethrough

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <>
      <Helmet>
        <title>WhatsApp Message Formatter — Format Text for WhatsApp | TinyToolKit</title>
        <meta name="description" content="Format your WhatsApp messages instantly. Apply bold, italic, strikethrough, and monospace formatting with one click." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            WhatsApp Message Formatter
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Apply bold, italic, strikethrough, and monospace formatting visually. Perfect for crafting long announcements or structured messages.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Editor Side */}
          <div className="space-y-4">
            <div className="flex items-center flex-wrap gap-2 p-2 bg-muted/50 border rounded-t-lg border-b-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => applyFormatting("*", "*")}
                className="font-bold hover:bg-muted"
                data-testid="btn-format-bold"
              >
                <Bold className="h-4 w-4 mr-1" /> Bold
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => applyFormatting("_", "_")}
                className="italic hover:bg-muted"
                data-testid="btn-format-italic"
              >
                <Italic className="h-4 w-4 mr-1" /> Italic
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => applyFormatting("~", "~")}
                className="line-through hover:bg-muted"
                data-testid="btn-format-strike"
              >
                <Strikethrough className="h-4 w-4 mr-1" /> Strike
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => applyFormatting("```", "```")}
                className="font-mono hover:bg-muted"
                data-testid="btn-format-mono"
              >
                <Code className="h-4 w-4 mr-1" /> Mono
              </Button>
            </div>
            
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here... Select text and click the buttons above to format."
              className="min-h-[300px] text-base resize-y rounded-t-none focus-visible:ring-offset-0 focus-visible:ring-1"
              data-testid="textarea-formatter"
            />

            <div className="flex gap-4">
              <Button 
                className="flex-1 text-base font-semibold h-12"
                onClick={handleCopy}
                disabled={!text}
                data-testid="btn-copy-formatted"
              >
                {isCopied ? (
                  <><CheckCircle2 className="mr-2 h-5 w-5" /> Copied!</>
                ) : (
                  <><Copy className="mr-2 h-5 w-5" /> Copy Formatted Text</>
                )}
              </Button>
              <Button 
                variant="outline"
                className="h-12 px-6"
                onClick={() => setText("")}
                disabled={!text}
                data-testid="btn-clear-text"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            <Card className="mt-8 border-dashed bg-muted/20">
              <CardContent className="pt-6 text-sm text-muted-foreground">
                <p className="font-semibold mb-2 text-foreground">How it works:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>WhatsApp uses specific characters to format text.</li>
                  <li>Our tool wraps your text in these characters automatically.</li>
                  <li>When you paste the copied text into WhatsApp, it will render beautifully.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Preview Side */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center px-1">
              Live Preview
            </h2>
            <div className="bg-[#EFEAE2] dark:bg-[#0B141A] rounded-xl p-4 min-h-[300px] relative shadow-inner border border-[#D1D7DB] dark:border-[#202C33] overflow-hidden">
              {/* Fake WhatsApp Chat Bubble */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M54.627 0l.83.83v58.34l-.83.83H5.373l-.83-.83V.83l.83-.83h49.254zM53.5 1.5H6.5v57h47v-57z\" fill=\"%23000\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')" }}></div>
              
              <div className="bg-white dark:bg-[#005C4B] rounded-lg rounded-tl-none p-3 shadow-[0_1px_1px_rgba(0,0,0,0.1)] max-w-[85%] relative z-10 text-[15px] leading-relaxed text-[#111B21] dark:text-[#E9EDEF]">
                <div className="break-words font-sans">
                  {renderPreview(text)}
                </div>
                <div className="text-[11px] text-[#667781] dark:text-[#8696A0] text-right mt-1 pt-1 flex justify-end items-center gap-1">
                  12:00 PM <CheckCircle2 className="h-3 w-3 inline" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <AdContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
