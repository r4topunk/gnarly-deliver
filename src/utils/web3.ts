import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { getBalance } from "@wagmi/core";
import { base } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: 'Gnars',
  projectId: '752fee4818746ba72ef88000b0b95d3e',
  chains: [base],
});

/**
 * Fetch tokens for a wallet
 * @param holder token holder address
 * @param tokens list of tokens to find
 * @returns the data of the tokens
 */
export function getTokensValues(holder: `0x${string}`, tokens: `0x${string}`[]) {
  const ethBalancePromise = getBalance(wagmiConfig, { address: holder })
  const balancePromises = tokens.map((token) => getBalance(wagmiConfig, { address: holder, token }))
  return Promise.all([ethBalancePromise, ...balancePromises])
}