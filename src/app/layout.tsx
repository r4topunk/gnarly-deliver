import NavBar from "@/components/NavBar";
import { Providers } from "@/components/wagmiProvider";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Londrina_Solid } from "next/font/google";
import * as React from "react";
import "./globals.css";

const londrina = Londrina_Solid({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gnars Dao Proposals Updates",
  description: "Show us what you did with the money we gave you!",
  openGraph: {
    images: `https://gnars.com/images/logo.png`,
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
        <meta name="description" content={metadata.description || ''} />
      </head>
      <body className={londrina.className}>
        <Providers>
          <ChakraProvider>
            <NavBar />
            {children}
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
