import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "IngenIA - Automatic JaamSim Simulations",
  description: "The world's first AI-powered JaamSim assistant",
  icons: {
    icon: "/logo-removebg-preview.ico",
    shortcut: "/logo-removebg-preview.ico",
    apple: "/logo-removebg-preview.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=6Lff3o0sAAAAAGXlAHl15Nc1mP4AoggLX99n9wM9`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className="antialiased font-sans"
      >
        {children}
      </body>
    </html>
  );
}
