import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import { BRAND_DESCRIPTION, BRAND_NAME } from "../lib/brand";
import { safeFetchFresh } from "../lib/sanity";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-cairo",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteName = BRAND_NAME;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const description = BRAND_DESCRIPTION;
  const shareImage = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=85&w=1200&h=630&fit=crop";
  const logo = await safeFetchFresh<{ logoImageUrl?: string }>(
    `*[_type == "settings"][0]{"logoImageUrl": logo.asset->url}`,
    {},
  );
  const siteIcon = logo?.logoImageUrl || "/site-logo.png";

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: {
      default: `${siteName} | النخيل والشبوك والأشجار والزيتون والهناجر والسواتر`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: ["سياج ونخيل المملكة", "زراعة النخيل", "تركيب الشبوك", "زراعة الأشجار", "مزارع الزيتون", "الهناجر والسواتر", "المملكة العربية السعودية"],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      ...(siteUrl ? { url: siteUrl } : {}),
      title: `${siteName} | النخيل والشبوك والأشجار والزيتون والهناجر والسواتر`,
      description,
      siteName,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | النخيل والشبوك والأشجار والزيتون والهناجر والسواتر`,
      description,
      images: [shareImage],
    },
    icons: { icon: siteIcon, shortcut: siteIcon },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteName = BRAND_NAME;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": siteName,
    ...(siteUrl ? { "url": siteUrl } : {}),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
    },
    "priceRange": "$$",
    "areaServed": [{ "@type": "Country", "name": "Saudi Arabia" }],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "مجالات سياج ونخيل المملكة",
      "itemListElement": [
        ...["النخيل", "الشبوك", "الأشجار", "الزيتون", "هناجر وسواتر"].map((name) => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", name },
        })),
      ]
    }
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cairo.className}>
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
