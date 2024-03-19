import { Button } from "@/components/ui/button"
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { useEffect } from "react";


export function Aadhaar() {
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
                <LogInWithAnonAadhaar />
                <p className="text-sm text-muted-foreground font-semibold md:text-l text-center">{anonAadhaar?.status}</p>
                </div>
            </div>

        </>
    )
}
