import { Button } from "@/components/ui/button"
import { useAnonAadhaar } from "anon-aadhaar-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export function Aadhaar() {
    const [clickedButton, setClickedButton] = useState(null);

    const handleButtonClick = (buttonName: any) => {
        setClickedButton(buttonName);
    }
    const [anonAadhaar] = useAnonAadhaar();

    useEffect(() => {
        console.log("Anon Aadhaar status: ", anonAadhaar.status);
    }, [anonAadhaar]);

    return (
        <>
            <div className="flex flex-row gap-4">
                <p className="text-l font-semibold leading-tight tracking-tighter md:text-2xl">
                    Generate your aadhaar proof for voting here :
                </p>
                <div className="flex flex-col">
                    <Link href="https://app.teamnexus.tech" target="_blank" className="flex items-center text-sm font-medium text-muted-foreground">
                        <Button variant={"default"}
                            onClick={() => {
                                handleButtonClick("yes");
                            }}>
                            Generate Proof
                        </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground font-semibold md:text-l text-center">
                        {clickedButton ? `Logged In` : `Logged Out`}
                    </p>
                </div>
            </div >

        </>
    )
}
