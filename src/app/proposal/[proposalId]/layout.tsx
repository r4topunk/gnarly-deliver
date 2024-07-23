import type { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Gnars Dao Proposals Update",
  description: "See the proposal",
  openGraph: {
    images: `/api/proposal`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
