import React from "react";
import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | TinyToolKit</title>
        <meta name="description" content="Privacy Policy for TinyToolKit. We don't collect or store your data. All processing is client-side." />
      </Helmet>

      <article className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        
        <div className="prose prose-lg prose-green max-w-none text-muted-foreground">
          <p className="lead font-medium text-foreground">
            We respect your privacy. TinyToolKit is designed to process everything locally on your device.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Data Collection</h2>
          <p>
            TinyToolKit does not collect, store, or transmit any personal data, phone numbers, or messages entered into our tools. All data processing (link generation, text formatting) happens strictly within your web browser (client-side).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Analytics</h2>
          <p>
            We may use standard, privacy-friendly analytics to understand general website traffic (like page views and tool usage). This data is aggregated and does not identify individual users or log any content you enter into our tools.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Third-Party Links</h2>
          <p>
            Our tools generate links that open the official WhatsApp application or website. Once you click those links, you are subject to WhatsApp's privacy policy and terms of service.
          </p>
        </div>
      </article>
    </>
  );
}
