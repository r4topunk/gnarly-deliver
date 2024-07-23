import * as React from "react";

export async function generateMetadata({
  params,
}: {
  params: { proposalId: string };
}) {
  const proposalNumber = params.proposalId ?? 0;

  console.log({ proposalNumber });

  return {
    title: "Gnars Pro",
    description: "Check the proposal",
    openGraph: {
      images: `/api/proposal/${proposalNumber}`,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
