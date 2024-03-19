"use client"
import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import Contest from "@/components/contest";
import { SkeletonCard } from "@/components/skeletonPolls";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeletePoll from "@/components/deletePoll";

export default function Component() {
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");

    const id = useParams().id;
    const { data, isLoading } = useContractRead(contract, "getPoll", [id]);
    const { data: contestants } = useContractRead(contract, "getContestants", [id]);

    if (isLoading) {
        return <SkeletonCard />;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <>
            <div className="flex flex-row items-end justify-end pt-5 p-5 space-x-4">
                <Link href={`/polls/${id}/results`}>
                    <Button>Results</Button>
                </Link>
                <DeletePoll />
            </div>
            <div className="flex flex-col items-center justify-start pb-10">
                <Card className="w-[350px]">
                    <CardHeader className="text-center">
                        <CardTitle>{data.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <img src={data.image} alt={data.title} />
                        <CardDescription >{data.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-center items-center">
                        <p>Starts at: {data.startsAt.toString()}</p>
                        <p>Ends at: {data.endsAt.toString()}</p>
                    </CardFooter>
                </Card>
                <div className="p-10">
                    <Contest />
                </div>
                <h2 className="mb-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                    Current Contestants :
                </h2>
                <div className="grid md:grid-flow-col md:auto-cols-max grid-cols-auto grid-cols-2 gap-5 p-3">
                    {contestants.map((contestant: any) => (
                        <Card key={contestant.cid} className="lg:w-[350px] w-[170px]">
                            <CardHeader className="text-center">
                                <CardTitle>{contestant.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <img className="rounded" src={contestant.image} alt={contestant.name} />
                                <div className="flex flex-row align-center justify-center m-3">
                                    <Web3Button
                                        contractAddress="0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984"
                                        action={(contract) => {
                                            contract.call("vote", [id, contestant.id])
                                        }}
                                    >
                                        Vote
                                    </Web3Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

