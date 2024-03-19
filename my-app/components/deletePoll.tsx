import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";

export default function DeletePoll() {
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const { mutateAsync: deletePoll, isLoading } = useContractWrite(contract, "deletePoll")
    const id = useParams().id;
    const call = async () => {
        try {
            const data = await deletePoll({ args: [id] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    return (
        <div>
            <Button variant="destructive" onClick={call} disabled={isLoading}>Delete Poll</Button>
        </div>
    )
}