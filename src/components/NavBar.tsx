"use client";
import { Box, Flex, Image, Link, useMediaQuery } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isMobile] = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  return (
    <Box bg="gray.800" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="7xl"
        mx="auto"
      >
        <Flex alignItems="center">
          <Image
            display={{ base: "block", lg: "block" }}
            h={8}
            w="auto"
            src="https://gnars.com/images/logo.png"
            alt="Workflow"
            mr={4}
          />
          <Flex>
            <Link
              href="/"
              px={3}
              py={2}
              rounded="md"
              fontSize="sm"
              fontWeight={pathname === "/" ? "bold" : "medium"}
              color={pathname === "/" ? "white" : "gray.300"}
              bg={pathname === "/" ? "gray.700" : "transparent"}
              _hover={{ bg: "gray.700", color: "white" }}
              _active={{ bg: "gray.700", color: "white" }}
              as={NextLink}
            >
              Updates
            </Link>
            <Link
              href="/proposals"
              px={3}
              py={2}
              rounded="md"
              fontSize="sm"
              fontWeight={pathname === "/proposals" ? "bold" : "medium"}
              color={pathname === "/proposals" ? "white" : "gray.300"}
              bg={pathname === "/proposals" ? "gray.700" : "transparent"}
              _hover={{ bg: "gray.700", color: "white" }}
              _active={{ bg: "gray.700", color: "white" }}
              as={NextLink}
            >
              Proposals
            </Link>
            <Link
              href="https://nouns.build/dao/base/0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17/6030?tab=activity"
              px={3}
              py={2}
              rounded="md"
              fontSize="sm"
              fontWeight="medium"
              color="gray.300"
              _hover={{ bg: "gray.700", color: "white" }}
              _active={{ bg: "gray.700", color: "white" }}
              isExternal
              as={NextLink}
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
              _active={{ bg: "gray.700", color: "white" }}
              isExternal
              as={NextLink}
            >
              Docs
            </Link>
            <Link
              href="/voters"
              px={3}
              py={2}
              rounded="md"
              fontSize="sm"
              fontWeight={pathname === "/proposals" ? "bold" : "medium"}
              color={pathname === "/proposals" ? "white" : "gray.300"}
              bg={pathname === "/proposals" ? "gray.700" : "transparent"}
              _hover={{ bg: "gray.700", color: "white" }}
              _active={{ bg: "gray.700", color: "white" }}
              as={NextLink}
            >
              Voters
            </Link>
          </Flex>
        </Flex>
        <ConnectButton
          accountStatus={isMobile ? "avatar" : "address"}
          chainStatus={isMobile ? "none" : "icon"}
          showBalance={isMobile ? false : true}
          label="Connect Wallet"
        />
      </Flex>
    </Box>
  );
}
