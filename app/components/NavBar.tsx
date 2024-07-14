'use client';
import { Box, Flex, Link, Image, useBreakpointValue, } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        if (window) {
            const isMobile = window.innerWidth < 768
            setIsMobile(isMobile)
        }
    }, [])
    return (
        <Box bg="gray.800" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between" maxW="7xl" mx="auto">
                <Flex alignItems="center">
                    <Image
                        display={{ base: "none", lg: "block" }}
                        h={8}
                        w="auto"
                        src="https://gnars.com/images/logo.png"
                        alt="Workflow"
                    />
                    <Flex ml={10} display={{ base: "none", sm: "flex" }}>
                        <Link
                            href="/proposals"
                            px={3}
                            py={2}
                            rounded="md"
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.300"
                            _hover={{ bg: "gray.700", color: "white" }}
                        >
                            Proposals
                        </Link>
                        <Link
                            href="/"
                            px={3}
                            py={2}
                            rounded="md"
                            fontSize="sm"
                            fontWeight="medium"
                            bg="gray.900"
                            color="white"
                        >
                            Updates
                        </Link>
                        <Link
                            href="#"
                            px={3}
                            py={2}
                            rounded="md"
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.300"
                            _hover={{ bg: "gray.700", color: "white" }}
                        >
                            Auction
                        </Link>
                        <Link
                            href="https://gnarsdocs.vercel.app"
                            px={3}
                            py={2}
                            rounded="md"
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.300"
                            _hover={{ bg: "gray.700", color: "white" }}
                        >
                            Docs
                        </Link>
                    </Flex>
                </Flex>
                <ConnectButton
                    accountStatus={isMobile ? "avatar" : "address"}
                    chainStatus={isMobile ? "icon" : "full"}
                    showBalance={isMobile}
                    label="Connect Wallet"
                />
            </Flex>
        </Box>
    );
}