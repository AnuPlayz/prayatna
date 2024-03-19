"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useParams } from "next/navigation";

export function Overview() {
  const id = useParams().id;
  const { contract } = useContract("0x7194f5404B7E34E8D9A27580a1fe8d63feCFF984");
  const { data, isLoading } = useContractRead(contract, "getContestants", [id])

  return (
    <ResponsiveContainer width="100%" height={304}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={17}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={17}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey={(entry) => parseInt(entry[4]._hex)}
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}