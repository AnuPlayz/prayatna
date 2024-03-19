import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <Skeleton className="h-[40px] w-[104px] rounded-xl" />
      <div className="grid md:grid-flow-col md:auto-cols-4 auto-rows-auto gap-5 p-3">
        <Skeleton className="h-[400px] w-[250px]" />
        </div>
    </div>
  )
}
