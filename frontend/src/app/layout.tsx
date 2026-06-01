import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "IngenIA - Automatic JaamSim Simulations",
  description: "The world's first AI-powered JaamSim assistant",
  icons: {
    icon: `${basePath}/logo-removebg-preview.ico`,
    shortcut: `${basePath}/logo-removebg-preview.ico`,
    apple: `${basePath}/logo-removebg-preview.ico`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
