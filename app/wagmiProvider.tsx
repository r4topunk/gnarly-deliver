'use client';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import {
    base,
    mainnet,
} from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
    appName: 'Gnars',
    projectId: '752fee4818746ba72ef88000b0b95d3e',
    chains: [mainnet, base],
    ssr: true,
});


const queryClient = new QueryClient();


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

