import React from "react";
import { personalInfo } from "@/data/portfolio";

/**
 * Structured Data (JSON-LD) for Google Search / Rich Results
 *
 * Implements Schema.org 'WebSite' and 'Person' schemas using verified
 * professional details for Md Emran Chokder (theemrandev).
 *
 * NOTE: Production domain is pending deployment confirmation.
 * Resolves dynamically to NEXT_PUBLIC_SITE_URL or local runtime.
 */
export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "theemrandev | Frontend Developer — Md Emran Chokder",
    alternateName: [personalInfo.brandName, `${personalInfo.name} Portfolio`],
    url: siteUrl,
    description:
      "Md Emran Chokder (theemrandev) is a Frontend Developer from Bangladesh specializing in React.js, Next.js, TypeScript, and responsive web development.",
    inLanguage: "en-US",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: personalInfo.name,
    alternateName: personalInfo.brandName,
    jobTitle: personalInfo.role,
    description:
      "Md Emran Chokder (theemrandev) is a Frontend Developer from Bangladesh specializing in React.js, Next.js, TypeScript, and responsive web development.",
    url: siteUrl,
    image: `${siteUrl}${personalInfo.photoPath}`,
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone.replace(/\s+/g, ""),
    address: {
      "@type": "PostalAddress",
      addressCountry: "Bangladesh",
    },
    sameAs: [personalInfo.github, personalInfo.linkedin],
    knowsAbout: [
      "Frontend Development",
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Responsive Web Development",
      "HTML5",
      "CSS3",
      "Web Performance Optimization",
      "UI/UX Implementation",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
