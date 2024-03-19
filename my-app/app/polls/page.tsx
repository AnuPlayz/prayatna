"use client"
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SkeletonCard } from "@/components/skeletonPolls";


export default function Component() {
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const { data, isLoading } = useContractRead(contract, "getPolls", []);
    const router = useRouter()
    if (isLoading) {
        return <SkeletonCard />;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center pt-10">
                <Link href="/polls/create"><Button>Create Poll</Button></Link>
                <h2 className="mb-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 pt-10">
                    Current Polls :
                </h2>
            </div>
            <div className="grid grid-cols-auto md:grid-cols-4 gap-5 p-3">
                {data.map((poll: any) => (
                    <Card className="w-[350px]">
                        <CardHeader className="text-center">
                            <CardTitle>{poll.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <img src={poll.image} alt={poll.title} />
                            <CardDescription >{poll.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex flex-col justify-center items-center">
                            <p className="text-sm">Starts at: {poll.startsAt.toString()}</p>
                            <p className="text-sm">Ends at: {poll.endsAt.toString()}</p>
                            <Button onClick={() => router.push(`/polls/${poll.id}`)}>Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}