import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Copy, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, Check, ChevronsUpDown } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import AdContainer from "@/components/AdContainer";
import { countries } from "@/data/countries";

const formSchema = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z.string()
    .min(1, "Phone number is required")
    .transform(val => val.replace(/[\s\-\(\)]/g, ''))
    .refine(val => /^\d+$/.test(val), "Must contain only numbers")
    .refine(val => {
      const stripped = val.replace(/^0+/, '');
      return stripped.length >= 6 && stripped.length <= 15;
    }, "Phone number must be between 6 and 15 digits"),
  message: z.string().optional(),
});

export default function WhatsAppLinkGenerator() {
  const { toast } = useToast();
  const [generatedLink, setGeneratedLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: "1", // Default US
      phoneNumber: "",
      message: "",
    },
    mode: "onChange",
  });

  const { watch, setValue } = form;
  const countryCode = watch("countryCode");
  const phoneNumberRaw = watch("phoneNumber");
  const message = watch("message");

  useEffect(() => {
    // Live update the link if valid
    const strippedPhone = phoneNumberRaw.replace(/[\s\-\(\)]/g, '').replace(/^0+/, '');
    if (strippedPhone.length >= 6 && strippedPhone.length <= 15 && /^\d+$/.test(strippedPhone)) {
      let link = `https://wa.me/${countryCode}${strippedPhone}`;
      if (message && message.trim()) {
        link += `?text=${encodeURIComponent(message.trim())}`;
      }
      setGeneratedLink(link);
    } else {
      setGeneratedLink("");
    }
  }, [countryCode, phoneNumberRaw, message]);

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setIsCopied(true);
      toast({
        title: "Link copied!",
        description: "Your WhatsApp link is ready to share.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try copying manually.",
      });
    }
  };

  const handleOpen = () => {
    if (generatedLink) {
      window.open(generatedLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleReset = () => {
    form.reset({
      countryCode: "1",
      phoneNumber: "",
      message: "",
    });
    setGeneratedLink("");
  };

  return (
    <>
      <Helmet>
        <title>WhatsApp Link Generator — Create wa.me Links Instantly | TinyToolKit</title>
        <meta name="description" content="Generate WhatsApp click-to-chat links for any phone number. Free, instant, no login required." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            WhatsApp Click-to-Chat Link Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create direct links to your WhatsApp without saving numbers. Enter your details below to generate your custom wa.me link instantly.
          </p>
        </header>

        <div className="grid md:grid-cols-[1fr_400px] gap-8 items-start">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <Form {...form}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Country Code</FormLabel>
                        <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={comboboxOpen}
                                className={cn("w-full justify-between font-normal", !field.value && "text-muted-foreground")}
                              >
                                {field.value
                                  ? `+${field.value} (${countries.find(c => c.code === field.value)?.name || "Custom"})`
                                  : "Select country"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search country or type code (e.g. 92)..." />
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country, index) => (
                                    <CommandItem
                                      key={`${country.code}-${index}`}
                                      value={`${country.name} +${country.code}`}
                                      onSelect={() => {
                                        setValue("countryCode", country.code, { shouldValidate: true });
                                        setComboboxOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === country.code ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {country.name} <span className="ml-auto text-muted-foreground">+{country.code}</span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. 555 123 4567" 
                            type="tel"
                            data-testid="input-phone-number"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pre-filled Message <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Hello! I have a question about..." 
                          className="min-h-[120px] resize-y"
                          data-testid="textarea-message"
                          {...field} 
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-2">
                        This text will automatically appear in the user's text field when they open the chat.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/30 border border-primary/20 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Your Link Preview
              </h2>
              
              <div className="bg-background border rounded-lg p-4 mb-6 break-all font-mono text-sm shadow-inner min-h-[80px] flex items-center">
                {generatedLink ? (
                  <span className="text-foreground">{generatedLink}</span>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Enter a valid phone number to see your link
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  onClick={handleCopy}
                  disabled={!generatedLink}
                  className="w-full text-base font-semibold"
                  data-testid="button-copy-link"
                >
                  {isCopied ? (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Copied!</>
                  ) : (
                    <><Copy className="mr-2 h-5 w-5" /> Copy Link</>
                  )}
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleOpen}
                  disabled={!generatedLink}
                  className="w-full"
                  data-testid="button-open-whatsapp"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Open in WhatsApp
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={handleReset}
                  className="w-full mt-2"
                  data-testid="button-reset"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset Form
                </Button>
              </div>
            </div>
            
            <AdContainer />
          </div>
        </div>
      </div>
    </>
  );
}
