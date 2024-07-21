import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectWallet = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === "authenticated");

                if (!ready) {
                    return null;
                }

                if (!connected) {
                    return (
                        <Button onClick={openConnectModal}>Connect Wallet</Button>
                    );
                }

                if (chain.unsupported) {
                    return <Button onClick={openChainModal}>Wrong network</Button>;
                }

                return (
                    <div style={{ display: "flex", gap: 12 }}>
                        <Button onClick={openAccountModal}>
                            {account.displayName}
                            {account.displayBalance ? ` (${account.displayBalance})` : ""}
                        </Button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
