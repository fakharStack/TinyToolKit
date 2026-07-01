import React from "react";
import { Helmet } from "react-helmet-async";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | TinyToolKit</title>
        <meta name="description" content="Get in touch with the TinyToolKit team for support or feedback." />
      </Helmet>

      <article className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Contact Us</h1>
        
        <div className="bg-card border rounded-lg p-8 md:p-12 shadow-sm">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Have a question, feedback, or a feature request? We'd love to hear from you. Drop us an email and we'll get back to you as soon as possible.
          </p>
          
          <Button asChild size="lg" className="px-8 font-medium">
            <a href="mailto:hello@tinytoolkit.com">
              Email Us
            </a>
          </Button>
        </div>
      </article>
    </>
  );
}
