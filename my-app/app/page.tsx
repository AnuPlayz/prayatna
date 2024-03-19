"use client"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import { useAnonAadhaar } from "anon-aadhaar-react";
import { useEffect } from "react";
import { Aadhaar } from "@/components/aadhaar";


export default function IndexPage() {
  const [anonAadhaar] = useAnonAadhaar();
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
      <div className="h-dvh flex items-center justify-center">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    Beautifully designed voting application <br className="hidden sm:inline" />
                    built with Next.js and Solidity.
                  </h1>
                  <br></br>
                  <p className="max-w-[700px] text-lg text-muted-foreground">
                    Easy to host elections and polls and get real-time dashboard for the results. <br />
                    Free. Open Source. And Ready.
                  </p>
                  <div className="flex gap-6 pt-10">
                    <ConnectWallet
                      theme={darkTheme({
                        colors: {
                          secondaryIconHoverBg: "#22232b",
                          accentText: "#7c3aed",
                          accentButtonBg: "#7c3aed",
                          secondaryButtonBg: "#7c3aed",
                          secondaryIconColor: "#7c3aed",
                          primaryButtonBg: "#7c3aed",
                          primaryButtonText: "#ebecf0",
                          secondaryButtonHoverBg: "#d6d9e5",
                          connectedButtonBg: "#7c3aed",
                          connectedButtonBgHover: "#1f2937",
                          walletSelectorButtonHoverBg:
                            "#1f2937",
                          secondaryText: "#c3c0d8",
                        },
                      })}
                      modalSize={"wide"}
                    />
                  </div>
                  <div className="flex flex-row mt-10">
                    <Aadhaar />
                  </div>
                </div>
                <img src="/visual-image.png" alt="Hero" className="w-full max-w-[580px] h-auto justify-end" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
