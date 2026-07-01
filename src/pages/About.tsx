import React from "react";
import { Helmet } from "react-helmet-async";
import AdContainer from "@/components/AdContainer";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About TinyToolKit</title>
        <meta name="description" content="Learn about TinyToolKit. We provide free, secure, client-side WhatsApp utilities for everyone." />
      </Helmet>

      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground">About TinyToolKit</h1>
        
        <div className="prose prose-lg prose-green max-w-none text-muted-foreground">
          <p>
            TinyToolKit was created with a simple mission: to provide the fastest, cleanest, and most reliable utility tools for everyday WhatsApp users and small business owners.
          </p>
          <p>
            We noticed that many existing tools required signups, were cluttered with intrusive popups, or routed your data through their servers. We built TinyToolKit to solve this. Our tools run 100% in your browser. This means your phone numbers and messages are never sent to a server, never stored, and never shared. It's completely private by design.
          </p>
          <p>
            Whether you need a quick link for your Instagram bio, or you're formatting a long announcement for your community group, TinyToolKit is here to help you get it done in seconds—for free, forever.
          </p>
        </div>

        <AdContainer />
      </article>
    </>
  );
}
