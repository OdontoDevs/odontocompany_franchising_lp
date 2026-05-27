import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-brand",
  subsets: ["latin"],
  display: "swap",
});

const brandLogo =
  "https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/logo_odontocompany%20(2).svg";

const pageTitle = "OdontoCompany Franchising - Seja um franqueado";
const pageDescription =
  "Abra sua clínica OdontoCompany com o suporte completo da maior rede de franquias odontológicas do Brasil. Invista em um negócio consolidado com marketing, gestão e operação prontos.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: brandLogo,
    shortcut: brandLogo,
    apple: brandLogo,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://lp-odc.op7franquia.com.br/",
    siteName: "OdontoCompany Franchising",
    images: [
      {
        url: brandLogo,
        alt: "OdontoCompany Franchising",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [brandLogo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
