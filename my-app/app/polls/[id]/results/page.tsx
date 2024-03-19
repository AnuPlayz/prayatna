"use client"
import { SkeletonCard } from "@/components/skeletonPolls";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Overview } from "@/components/overview";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Result() {
    const { id } = useParams();
    const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
    const { data: poll } = useContractRead(contract, "getPoll", [id]);
    const { data, isLoading } = useContractRead(contract, "getContestants", [id]);

    if (isLoading) {
        return <SkeletonCard />;
    }
    return (
        <>
            <head>
                <title>{poll.title}</title>
                <meta name="description" content="Results of the poll" />
                <meta name="viewport" content="width=1167" />
            </head>
            <div>
                <div className="flex flex-col justify-center items-center pt-10">
                    <h2 className="scroll-m-20 border-b text-slate-300 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                        Poll Title : {poll.title}
                    </h2>
                    <p className="text-slate-300 leading-7 pb-5 [&:not(:first-child)]:mt-6">
                        Poll Description : {poll.description}
                    </p>
                    <h3 className="mb-10 scroll-m-20 border-b pb-2 text-green-300 text-xl font-semibold tracking-tight transition-colors first:mt-0">
                        Results
                    </h3>
                </div>
                <div className="grid md:grid-flow-col md:auto-cols-max auto-rows-auto gap-10 p-3">
                    {data.map((item: any, index: number) => (
                        <div key={index}>
                            <Card className="w-[550px]">
                                <CardHeader>
                                    <div className="flex flex-row justify-center items-center">
                                        <CardTitle>Contestant #{parseInt(item.id._hex)}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-row justify-center items-center">
                                        <img src={item[1]} alt={item[2]} width={200} />
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="px-10">Username : {item[2]}</p>
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant="link" className="text-slate-600">@address</Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-90">
                                                    <div className="flex justify-between space-x-4">
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">Address of the contestant</h4>
                                                            <p className="text-sm">
                                                                {item[3]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                            <p className="text-purple-300">Number of Votes : {parseInt(item[4]._hex)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <Card className="w-[330px] h-[150px]">
                            <CardHeader>
                                <div className="flex flex-row justify-center items-center">
                                    <CardTitle>Poll Creater</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col justify-center items-center">
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button variant="link" className="text-green-300">@address</Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-90">
                                            <div className="flex justify-between space-x-4">
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">Address of the creater</h4>
                                                    <p className="text-sm">
                                                        {poll.director}
                                                    </p>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-[330px] h-[120px] mt-7">
                            <div className="flex flex-col justify-center items-center">
                                <CardContent className="p-10 text-slate-300">
                                    Ending of the poll : {poll.endsAt}
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start">
                    <Card className="w-[717px] p-5 m-3">
                        <CardTitle className="p-3">Overview</CardTitle>
                        <Overview />
                    </Card>
                    <ScrollArea className="h-[391.6px] w-[400px] rounded-md border p-4 ml-3">
                        <h2 className="text-2xl font-semibold text-slate-300">Poll Voters</h2>
                        <div className="flex flex-col justify-center items-center pt-5">
                            {poll.voters.map((voter: string, index: number) => (
                                <p className="text-sm" key={index}>{voter}</p>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div >
        </>
    )
}