import { WEBSITE_URL } from "@/constants/lib";
import type { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Gnars Dao Proposals Update",
  description: "See the proposal",
  openGraph: {
    images: `${WEBSITE_URL}/api/proposal`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
