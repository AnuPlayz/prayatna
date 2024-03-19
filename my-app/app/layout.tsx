"use client"
import "@/styles/globals.css"
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { ClerkProvider } from '@clerk/nextjs'
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
  return (
    <div className="flex flex-row items-center justify-center p-5">
          <p className="flex items-center text-sm font-medium text-muted-foreground">PRAYATNA_4090e11952b94b5b8aac0d47c4187116</p>
    </div>
  );
}


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ClerkProvider>
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
      </ClerkProvider>
    </>
  )
}