"use client"
import "@/styles/globals.css"
import { AnonAadhaarProvider } from "anon-aadhaar-react";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  useContract
} from "@thirdweb-dev/react";
import GitHubButton from 'react-github-btn';

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

function Component() {
  const { contract, isLoading } = useContract("0xa777a9517C0761203C835974c494FA3f169fe441");
  console.log(contract, isLoading);

  return (
    <div className="flex flex-row items-center justify-center">
    <GitHubButton href="https://github.com/AnuPlayz/anya" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star AnuPlayz/anya on GitHub">Star</GitHubButton>
    </div>
  );
}


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="db6a42c09cffd69f9948764333016f18"
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          localWallet(),
          embeddedWallet({
            auth: {
              options: [
                "email",
                "google",
                "apple",
                "facebook",
              ],
            },
          }),
        ]}
      >
        <AnonAadhaarProvider _appId="db6a42c09cffd69f9948764333016f18">
          <html lang="en" suppressHydrationWarning>
            <head>
              <title>Pixel Vote</title>
              <link rel="icon" href="/logo.svg" />
            </head>
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
              )}
            >
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}    <Component /></div>
                </div>
                <TailwindIndicator />
              </ThemeProvider>
            </body>
          </html>
        </AnonAadhaarProvider>
      </ThirdwebProvider>
    </>
  )
}