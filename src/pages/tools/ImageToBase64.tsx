import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Upload, X } from "lucide-react";
import ToolPageShell from "@/components/ToolPageShell";
import { useCopy } from "@/hooks/use-copy";
import type { FAQItem } from "@/components/FAQ";

const FAQ_ITEMS: FAQItem[] = [
  { question: "What is Base64 image encoding?", answer: "Base64 encoding converts binary image data into a text string. You can embed this string directly in HTML, CSS, or JSON without hosting the image file separately." },
  { question: "When would I use Base64 for images?", answer: "Useful for small icons or logos you want to embed directly in HTML/CSS to reduce HTTP requests, or for APIs that expect image data as a string." },
  { question: "Are there downsides to Base64 images?", answer: "Yes. Base64 encodes images ~33% larger than the original binary file, increasing page size. For large images, host the file separately and use a URL instead." },
  { question: "What image formats are supported?", answer: "Any image format your browser supports: PNG, JPEG, GIF, WebP, SVG, AVIF, and more." },
];

export default function ImageToBase64() {
  const [dataUrl, setDataUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [mimeType, setMimeType] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { isCopied: copiedFull, copy: copyFull } = useCopy("Full data URL copied!");
  const { isCopied: copiedBase64, copy: copyBase64 } = useCopy("Base64 string copied!");

  const handleFile = (file: File) => {
    setFileName(file.name);
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => setDataUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const base64Only = dataUrl ? dataUrl.split(",")[1] : "";
  const clear = () => { setDataUrl(""); setFileName(""); setMimeType(""); if (fileRef.current) fileRef.current.value = ""; };

  return (
    <ToolPageShell
      toolId="image-to-base64"
      title="Image to Base64 Converter"
      description="Upload any image and get the Base64 encoded string or full data URL instantly. Runs entirely in your browser — no upload to any server."
      faqItems={FAQ_ITEMS}
    >
      <div className="space-y-5">
        {!dataUrl ? (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer hover:border-primary/60 hover:bg-muted/30 transition-colors"
            data-testid="div-dropzone"
          >
            <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <p className="font-semibold">Drop an image here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">Supports PNG, JPEG, GIF, WebP, SVG, and more</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" data-testid="input-file" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview */}
            <div className="relative bg-muted/30 border border-border rounded-2xl p-4 flex flex-col items-center gap-3">
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={clear}>
                <X className="h-4 w-4" />
              </Button>
              <img src={dataUrl} alt="Preview" className="max-h-48 max-w-full rounded-lg object-contain" data-testid="img-preview" />
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{fileName}</p>
                <p>{mimeType} · {Math.round(base64Only.length / 1024)} KB (Base64)</p>
              </div>
            </div>

            {/* Full data URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-semibold">Full Data URL <span className="text-xs text-muted-foreground font-normal">(use in &lt;img src="..."&gt;)</span></p>
                <Button size="sm" variant="ghost" onClick={() => copyFull(dataUrl)} data-testid="button-copy-full">
                  {copiedFull ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
                </Button>
              </div>
              <Textarea value={dataUrl} readOnly rows={3} className="font-mono text-xs bg-muted/30 resize-none break-all" data-testid="textarea-data-url" />
            </div>

            {/* Base64 only */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-semibold">Base64 String only</p>
                <Button size="sm" variant="ghost" onClick={() => copyBase64(base64Only)} data-testid="button-copy-base64">
                  {copiedBase64 ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
                </Button>
              </div>
              <Textarea value={base64Only} readOnly rows={3} className="font-mono text-xs bg-muted/30 resize-none break-all" data-testid="textarea-base64" />
            </div>
          </div>
        )}
      </div>
    </ToolPageShell>
  );
}
