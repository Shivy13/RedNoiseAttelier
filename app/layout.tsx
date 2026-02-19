import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import LenisProvider from './providers/LenisProvider';
import 'lenis/dist/lenis.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RED NOISE ATTLIER',
  description: 'The ultimate creative agency template with sleek layouts and dynamic animations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.17/dist/lenis.css" />
      </head>
      <Script src="https://unpkg.com/lenis@1.3.17/dist/lenis.min.js"></Script>
      <body className={inter.className}>
        <LenisProvider>
          
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}